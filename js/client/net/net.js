class Net {
    constructor() {
        this.tx = null;
        this.rx = null;
        this.socketio = null;
        this.myname = 'watashi client';

        this.tx_queue = new buckets.Queue();
        this.rx_queue = new buckets.Queue();
    }

    init() {
        console.log('net initialization');
        if (typeof io == 'undefined') { return; }
        this.socketio = io.connect('http://localhost:8080');
        console.log('connect to localhost');
        this.socketio.on("connected", this.start_.bind(this));
        this.socketio.on("publish", this.view_.bind(this));
        this.socketio.on("disconnect", this.disconnect_.bind(this));

        this.start_('mogemog');
    }

    tick() {}

    set_tx(queue_) {
        if (queue_.peek())
        {
            this.send_(queue_.peek());
            // console.log(queue_.peek());
        }
    }

    get_rx() {}

    start_(name_) {
        this.socketio.emit("connection", name_);
        console.log('sent "connected" ');
    }

    view_(data_) {
        // Date().toLocaleTimeString() + 
        console.log(' ' + data_.value);
    }

    send_(message_) {
        var msg = "[" + this.myname + "] " + message_;
        this.socketio.emit("publish", {value: msg});
    }

    disconnect_() { console.log('disconnected'); }

}
