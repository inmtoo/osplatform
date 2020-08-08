export default class Rtc {
    /**
     * @type {null|String}
     */
    id = null;
    calls = [];
    /**
     * @type {null|Manage}
     */
    manage = null;
    /**
     * @type {null|MediaStream}
     */
    stream = null;

    /**
     * @param manager {null|Manage}
     */
    constructor(manager = null) {
        this.manage = manager;
        this.peer = new Peer();

        this.peer.on("open", id => {
            this.id = id;
            this.manage?.onPeerId(id);
        });

        this.peer.on("call", call => {
            this.calls.push(call);
            this.manage?.onCall(call);
            call.on("stream", remoteStream => this.manage?.onStream(remoteStream));
            call.on("close", () => {
                this.manage?.onCloseCall();
                this.removeCall(call.peer);
            });
        });
    }

    startCall(address) {
        const call = this.peer.call(address, this.stream);

        call.on("stream", remoteStream => this.manage?.onStream(remoteStream));
        call.on("close", () => {
            this.manage?.onCloseCall();
            this.removeCall(call.peer);
        });
        this.calls.push(call);
    }

    removeCall(peerId) {
        let index = this.calls.findIndex(call => call.peer === peerId);
        if (!~index) return;
        this.calls.splice(index, 1);
    }

}