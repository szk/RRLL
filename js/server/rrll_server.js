class RRLLServer {
    constructor() {
        this.db = null;
        this.net = new Net();
    }

    init(port_)
    {
        this.net.init(port_);
        this.db = new Database();
        this.db.init();
        this.net.add_db(this.db.get_client());
    }


}

var sv = new RRLLServer();
sv.init(8080);
