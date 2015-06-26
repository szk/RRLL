class Server {
    constructor() {
        this.tx = null;
        this.rx = null;
        this.userHash = {};

        this.fs = require("fs");
        this.server = require("http").createServer(function(req, res) {
            res.writeHead(200, {"Content-Type":"text/html"});
            let output = this.fs.readFileSync("./index.html", "utf-8");
            res.end(output);
        }).listen(8080);
        this.io = require("socket.io").listen(this.server);
    }

    init() {
        this.io.sockets.on("connection", function (socket) {
            socket.on("connected", function (name) {
                let msg = name + "が入室しました";
                this.userHash[socket.id] = name;
                this.io.sockets.emit("publish", {value: msg});
            });

            socket.on("publish", function (data) {
                this.io.sockets.emit("publish", {value:data.value});
            });

            socket.on("disconnect", function () {
                if (this.userHash[socket.id]) {
                    let msg = this.userHash[socket.id] + "が退出しました";
                    delete this.userHash[socket.id];
                    this.io.sockets.emit("publish", {value: msg});
                }
            });
        });
    }

    loop() {}
}

var app = new Server();
app.init();
app.loop();
