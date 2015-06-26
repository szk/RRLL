class RRLLServer {
    constructor(port_) {
        this.app = require('express')();
        this.http = require('http').Server(this.app);
        this.io = require('socket.io')(this.http);

        this.db = null;

        this.app.get('*', function(req_, res_, next_){

            console.log(req_.path);

            var file = req_.path;

            var options = {
                root: __dirname + '/../../dist/',
                dotfiles: 'deny',
                headers: {
                    'x-timestamp': Date.now(),
                    'x-sent': true
                }
            };
            // console.log("file = ", file);
            res_.sendFile(file, options, function (err_) {
                if (err_) {
                    console.log(err_);
                    res_.status(err_.status).end();
                }
                else {
                    console.log('Sent:', file);
                };
            });
        });

        this.http.listen(port_, function(){
            console.log('listening on *:' + port_);
        });

        this.userHash = {};
    }

    init()
    {
        var self = this;
        this.io.sockets.on("connection",
                           function (socket_) {
                               self.socket = socket_;
                               self.socket.on("connected", self.connected_.bind(self));
                               self.socket.on("publish", self.publish_.bind(self));
                               self.socket.on("disconnect", self.disconnect_.bind(self));
                           });

        this.db = new Database();
        this.db.init();
    }

    connected_(name_) {
        var msg = name_ + " is connected";
        // console.log("msg = ", msg);
        this.userHash[this.socket.id] = name_;
        this.io.sockets.emit("publish", { value: msg });
    }
    publish_(data_) {
        this.io.sockets.emit("publish", { value: data_.value });
    }
    disconnect_() {
        if (this.userHash[this.socket.id]) {
            var msg = this.userHash[this.socket.id] + " is disconnected";
            // console.log("msg = ", msg);
            delete this.userHash[this.socket.id];
            this.io.sockets.emit("publish", { value: msg });
        }
    }
}

var sv = new RRLLServer(8080);
sv.init();
