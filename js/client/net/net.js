class Net {
    constructor() {
        this.tx = null;
        this.rx = null;
        this.socketio = null;
        this.myname = 'watashi client';
    }

    start_(name) {
        this.socketio.emit("connected: ", name);
    }

    view_(data_) {
        console.log(Date().toLocaleTimeString() + ' ' + data_.value);
    }

    send_(message_) {
        var msg = "[" + this.myname + "] " + message_;
        this.socketio.emit("publish", {value: msg});
    }

    disconnect_() { console.log('disconnected'); }

    init() {
        if (typeof io == 'undefined') { return; }
        this.socketio = io.connect('http://localhost:8080');
        this.socketio.on("connected", this.start_.bind(this));
        this.socketio.on("publish", this.view_.bind(this));
        this.socketio.on("disconnect", this.disconnect_.bind(this));
    }

    tick() {}
}
