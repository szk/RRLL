class Web {
    constructor() {
        this.app = require('express')();
        this.http = require('http').Server(this.app);

        this.binder = null;
    }

    init(port_) {

        this.app.get('/appearance', (req_, res_) =>
                     { this.binder.hgetall('appearance',
                                           (err_, replies_) =>
                                           { res_.send(replies_); } );
                     });

        this.app.get('*', (req_, res_, next_) => {
            var file = req_.path;
            var options = {
                root: __dirname + '/',
                dotfiles: 'deny',
                headers: {
                    'x-timestamp': Date.now(),
                    'x-sent': true
                }
            };
            // console.log("file = ", file);
            res_.sendFile(file, options, (err_) => {
                if (err_) {
                    // console.log(err_);
                    res_.status(err_.status).end();
                }
                else
                {
                    // console.log('Sent:', file);
                };
            });
        });

        this.http.listen(port_, () =>
                         { console.log('listening on localhost:' + port_); });
    }

    get_http()
    {
        return this.http;
    }

    add_binder(cl_) { this.binder = cl_; }
}
