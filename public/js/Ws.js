export default class Ws {

    listeners = {
        open: function () {
        },
        message: function () {
        },
        close: function () {
        },
        error: function () {
        }
    }

    constructor(address) {
        this.webSocket = new WebSocket(address);
        this.webSocket.binaryType = "arraybuffer";

        this.webSocket.addEventListener("message", (event) => {
            try {
                let message = new TextDecoder().decode(event.data);
                if (!message) throw("");

                message = JSON.parse(message);
                if (!message.action) throw("");

                this.listeners.message(message);
            } catch {
            }
        });

        this.webSocket.addEventListener("open", () => this.listeners.open());
        this.webSocket.addEventListener("close", () => this.listeners.close());
        this.webSocket.addEventListener("error", () => this.listeners.error());
    }

    /**
     * @param message {Object|Array}
     */
    send(message) {
        try {
            if (typeof message !== "object" || !message.action) throw("");

            message = JSON.stringify(message);
            message = new TextEncoder().encode(message);
            this.webSocket.send(message);
        } catch {
        }
    }

}