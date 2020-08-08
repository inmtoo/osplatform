import Ws from "./Ws.js";
import Rtc from "./Rtc.js";
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

    onCall(call) {
        call.answer();
    }

    onStream(stream) {
        elements.video.width = window.innerWidth / 2;
        elements.video.height = window.innerHeight / 2;
        elements.video.srcObject = stream;
        elements.video.onloadedmetadata = () => elements.video.play();
    }

}

const elements = {
    video: document.getElementById("video"),
    connectButton: document.getElementById("connect")
}

// const webSocket = new Ws("ws://192.168.1.50:8080");
const webSocket = new Ws("ws://45.133.19.19:8080");
let rtc = new Rtc(new Webinar());

webSocket.listeners.open = function () {
    if (rtc.id !== null) {
        webSocket.send({
            action: "peerId",
            peerId: rtc.id
        });
    }
}


elements.connectButton.addEventListener("click", function () {
    this.disabled = false;

    webSocket.send({
        action: "connectWebinar"
    });
});

window.addEventListener("resize", function () {
    elements.video.width = window.innerWidth / 2;
    elements.video.height = window.innerHeight / 2;
});