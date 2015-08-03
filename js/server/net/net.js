class Net {
    constructor() {
        this.tx = null;
        this.rx = null;

        this.web = new Web();
        this.socket = new Socket();
    }

    init(port_) {
        this.socket.init(this.web.get_http());
        this.web.init(port_);
    }


    add_db(cl_)
    {
        this.web.add_binder(cl_);
    }

    set_content_binder(func_) {
        this.web.add_binder(func_);

        // for (let r of routes_)
        // {
        //     console.log(r);
        // }
    }
}
