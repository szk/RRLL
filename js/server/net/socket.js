class Socket {
    constructor() {
        this.io = null;
        this.userHash = {};
    }

    init(attaching_svr_) {
        this.io = require('socket.io')(attaching_svr_);
        var self = this;
        console.log("initializing socket");
        this.io.sockets.on("connection",
                           (socket_) => {
                               console.log('connection received');
                               self.socket = socket_;
                               self.socket.on("connected", self.connected_.bind(self));
                               self.socket.on("publish", self.publish_.bind(self));
                               self.socket.on("disconnect", self.disconnect_.bind(self));
                           });
    }

    connected_(name_) {
        var msg = name_ + " is connected";
        console.log("msg = ", msg);
        this.userHash[this.socket.id] = name_;
        this.io.sockets.emit("publish", { value: msg });
    }

    publish_(data_) {
        this.io.sockets.emit("publish", { value: data_.value });
    }

    disconnect_() {
        if (this.userHash[this.socket.id]) {
            var msg = this.userHash[this.socket.id] + " is disconnected";
            console.log("msg = ", msg);
            delete this.userHash[this.socket.id];
            this.io.sockets.emit("publish", { value: msg });
        }
    }
}
