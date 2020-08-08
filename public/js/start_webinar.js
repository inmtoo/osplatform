import Rtc from "./Rtc.js";
import Ws from "./Ws.js";
import Manage from "./Manage.js";

class Webinar extends Manage {

    constructor() {
        super();
    }

    onPeerId(id) {
        webSocket.send({
            action: "peerId",
            peerId: id
        });
    }

}

const elements = {
    video: document.getElementById("video"),
    startButton: document.getElementById("start_streaming")
}

const webSocket = new Ws("ws://45.133.19.19:8080");
// const webSocket = new Ws("ws://192.168.1.50:8080");
const rtc = new Rtc(new Webinar());

webSocket.listeners.open = function () {
    if (rtc.id !== null) {
        webSocket.send({
            action: "peerId",
            peerId: rtc.id
        });
    }
}

webSocket.listeners.message = function (data) {
    if (data.action === "connectWebinar") {
        rtc.startCall(data.peerId);
    }
}

elements.startButton.addEventListener("click", function () {
    navigator.mediaDevices.getUserMedia({
        video: {
            width: window.innerWidth / 2,
            height: window.innerHeight / 2
        },
        audio: true
    })
        .then(stream => {
            this.disabled = true;

            elements.video.srcObject = stream;
            elements.video.onloadedmetadata = function () {
                this.play();
            };
            rtc.stream = stream;
            webSocket.send({
                action: "startWebinar"
            });
        })
        .catch(() => alert("Permission denied"));
});

