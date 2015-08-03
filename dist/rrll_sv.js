/* @license
License file for RudeRogueLikeLike (RRLL)

The MIT License (MIT)

Copyright (c) 2015 Tatsuhiko Suzuki

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/*
 * Licenses of included libraries:
 **
 * Pixi Renderer - MIT License, Copyright (c) 2013-2015 Mathew Groves
 **
 * stats.js - MIT License, Copyright (c) 2009-2012 Mr.doob
 **
 * buckets 1.90.0 - MIT License, Copyright (c) 2015 Mauricio Santos
 **
 * clone - Copyright (c) 2011-2015 Paul Vorbach and contributors.
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the “Software”), to deal in the Software without
 * restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 **
 * dat-gui JavaScript Controller Library - Apache License Version 2.0,
 * Copyright 2011 Data Arts Team, Google Creative Lab
 **
 * Keypress version 2.1.0 - Apache License Version 2.0, (c) 2014 David Mauro
 **
 * PIXI.DOM v.0.1.0 - MIT License, Copyright (c) 2014 Sebastian Nette
 **
 * PixiParticles 1.4.1 - MIT License, Copyright (c) 2014 CloudKid
 **
 * recursive-shadowcasting.js - Copyright (c) 2012-now(), Ondrej Zara
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * * Redistributions of source code must retain the above
 *   copyright notice, this list of conditions and the following disclaimer.
 * * Redistributions in binary form must reproduce
 *   the above copyright notice, this list of conditions and the
 *   following disclaimer in the documentation and/or other
 *   materials provided with the distribution. 
 * * Neither the name of Ondrej Zara nor the names of its contributors
 *   may be used to endorse or promote products derived from this
 *   software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 **
 * javascript-astar 0.4.0 - MIT License, Copyright (c) Brian Grinstead
 */


// common.js
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var RC = RC || {};

//// Level
RC.ENTITY_TYPE = {
    ROOT: 0, // for asset
    HUMANOID: 1, MULTILEG: 2, NOLEG: 3, // for actor
    EQUIPMENT: 4, ITEM: 5, // for item
    WALL: 6, STRUCTURE: 7 // for terrain
};

RC.TERRAIN_WIDTH = 50;
RC.TERRAIN_HEIGHT = 50;
RC.TERRAIN_WALL_DIR = {
    NOTHING: 0,
    NORTH: 1,
    SOUTH: 2,
    EAST: 4,
    WEST: 8
};

//// scene control
RC.NEXT_SCENE = {
    CONTINUE: 0,
    MAINMENU: 1,
    SETTINGMENU: 2,
    ABOUTMENU: 3,
    TALKMENU: 4,
    SANDBOX: 5,
    GAMEOVER: 6,
    INTRO: 7,
    LOADING: 8,
    PLAYING: 9,
    RANKING: 10,
    RETURN: 11,
    ACCEPT: 12
};

//// client commands
RC.CMD_SYS = {
    NEXT_SCENE: 0,
    POP_SCENE: 1,
    RESTART_SCENE: 2
};

RC.CMD_ACTOR_ACT = {
    WAIT: 0,
    MOVE: 1,
    USE: 2,
    PICKUP: 3,
    TALK: 4,
    MENU: 5,
    AUTOMATION: 6,
    CHANGE_SCENE: 7
};

RC.CMD_ACTOR_AUTOMATION = {
    STATUS: 0,
    EXPLORING: 1
};

RC.CMD_ACTOR_DIR = {
    UP: 0,
    DOWN: 1,
    RIGHT: 2,
    LEFT: 3,
    UPRIGHT: 4,
    UPLEFT: 5,
    DOWNRIGHT: 6,
    DOWNLEFT: 7
};

// bitmask test (not using)
RC.CMD_TYPE = {
    ACTOR: 0x10000000,
    CLIENT: 0x20000000,
    NETWORK: 0x40000000,
    RESERVED: 0x80000000
};

//// Visual
RC.TILE_SCREEN_WIDTH = 45.0;
RC.TILE_SCREEN_HEIGHT = 22.5;

RC.TEXTURE_CATEGORY = {
    HEAD: 0,
    TORSO: 1,
    ARM: 2,
    LEG: 3,
    PART: 4,
    BODY: 5,
    WEAPON: 6,
    ARMOR: 7,
    CONSUMABLE: 8,
    TOOL: 9
};

RC.APPEARANCE_TYPE = {
    MONO: 0,
    ANIMATION: 1,
    EMITTER: 2,
    SKELETON: 3,
    UNDEFINED: 4
};

RC.UI_SPRITE_TYPE = {
    MENU: 0,
    DOM: 1,
    BUTTON: 2,
    UNDEFINED: 9
};

//// Network
// server to client
RC.S2C = {
    HEARTBEAT: 0,
    STATE: 1,
    SNAPSHOT: 2,
    SERVER_CMD: 3,
    DOWNLOAD: 4
};
// client to server
RC.C2S = {
    HEARTBEAT: 0,
    MOVE: 1,
    CLIENT_CMD: 2
};

//
RC.MAX_TICK = Number.MAX_SAFE_INTEGER;
RC.MIN_TICK = 0;

//
RC.SCREEN_WIDTH = 1024;
RC.SCREEN_HEIGHT = 600;

// for gfx.js
RC.SCROLL_FRAME = 5;
RC.MAP_RADIUS = 17;

//
RC.BG = 0x888888;

var Database = (function () {
    function Database() {
        _classCallCheck(this, Database);

        this.cl = require('fakeredis').createClient('rrlltest');
        this.cl.on('connect', function () {
            console.log('redis connected');
        });
    }

    _createClass(Database, [{
        key: 'init',
        value: function init() {
            this.init_appearance();
            this.init_items();
            this.init_terrain();
            this.init_avatar();
            this.init_actor();
            this.init_level();
            this.init_img();
        }
    }, {
        key: 'get_client',
        value: function get_client() {
            return this.cl;
        }
    }, {
        key: 'get_content_func',
        value: function get_content_func() {
            var dbclient = this.cl;
            return function (key_) {
                return dbclient.hkeys(key_, function (err_, replies_) {
                    return replies_;
                });
            };
            // let routes = [];
            // this.cl.keys("*", (err_ ,reply_) => {
            //     routes = reply_;
            //     return reply_;
            // });
            // return 'u-m';
        }
    }, {
        key: 'init_appearance',
        value: function init_appearance() {
            this.cl.hmset('appearance', { 'defaulthuman': '{\'type\': \'humanoid\'}',
                'defaultanimal': '{\'type\': \'multileg\'}',
                'defaultworm': '{\'type\': \'noleg\'}' });
        }
    }, {
        key: 'init_items',
        value: function init_items() {
            this.cl.hmset('item', { 'sword': 'mogera',
                'shield': 'mogera' });
        }
    }, {
        key: 'init_terrain',
        value: function init_terrain() {
            this.cl.hmset('terrain', { 'bg_texture_id': '0',
                'name': 'defaultmap',
                'fg_texture_id': '1',
                'blank_texture_id': '1',
                'tile': 'hogehogemuga-',
                'chip': '..................................................' + '..................................................' + '..OOOOOOOOOOOOOOO..OOOOOOOO..........OOOOOOOOOOO..' + '..O.............O..O......O..........O.........O..' + '..O.............O..O......O..OOOOOO..O.........O..' + '..OOOOOOOOOOOO..O..OOOOOOOO..O....O..OOOOOOOOOOO..' + '.............O..O............O....O...............' + '.............OOOO............O....OOOOOOOOO.......' + '..OOOOOOOOO........OOOOOOOO..O............O.......' + '..O.......O........O......O..O............O.......' + '..O.......OOOOOOO..O...O..O..OOOOOOOOOOOOOO.......' + '..O.............O..O..OOO.O.......................' + '..O.............O..O...O..O..OOOOOOOOOOOOOOOOO....' + '..O.............O..O...O..O..O...............O....' + '..O.............O..O......O..O....O..........O....' + '..O.............O..OOOOOOOO..O.OOOOO.........O....' + '..OOOOOOOOOOOOOOO............O....O..........O....' + '.............................O...............O....' + '.............................OOOOOOOOOOOOOOOOO....' + '..OOOOOOOOO..OOOOOOOO.............................' + '..O.......O..O......O.............................' + '..O.......O..O......O........OOOOOOO.OOOOOOOO.OOO.' + '..O.......O..O......O........O.....O.O......O.O.O.' + '..OOOOOOOOO..O......OOOOOOO..O.....O.O......O.O.O.' + '.............O............O..O.....O.O......O.O.O.' + '.............O............O..OOOOOOO.O......O.O.O.' + '..OOOOOOOOO..O............O..........O......O.OOO.' + '..O.......O..O............O..........OOOOOOOO.....' + '..O.......O..OOOOOOOOOOOOOO..OOOOOOO..............' + '..O.......O..................O.....O..............' + '..O.......O..................O.....O..............' + '..O.......O..OOOOOOOOOOOOOOOOO.....OOOOOOOOOOOOO..' + '..OOOOOOOOO..O.................................O..' + '.............O.................................O..' + '.............OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO..' + '..OOOOOOOOO.......................................' + '..O.......O..OOOO..OOOOOOOOOOOOOOOOOOOO..OOOOOOO..' + '..O.......O........O..................O..O.....O..' + '..O.......OOOOOOO..O..................O..O.....O..' + '..O.............O..OOOOOOOOOOOOOOOOOOOO..O.....O..' + '..OOOOOOOOOOOOOOO........................O.....O..' + '.........................................O.....O..' + '...................OOOOOOOOOOOOOOOOOOOO..OOOOOOO..' + '..OOOOOOOOOOOOOOO..O..................O.......OO..' + '..O.............O..O..................O.OOOOO.OO..' + '..O.............O..OOOOOOOOOOOOOOOOOOOO.O...O.OO..' + '..O.............O.......................O...O.....' + '..OOOOOOOOOOOOOOO.......................OOOOO.....' + '..................................................' + '..................................................' });
        }
    }, {
        key: 'init_avatar',
        value: function init_avatar() {
            this.cl.hmset('avatar', { 'defaultavatar': 'human',
                'advancedavatar': 'dog' });
        }
    }, {
        key: 'init_actor',
        value: function init_actor() {
            this.cl.hmset('actor', { 'human': '10/20/humanoid',
                'dog': '10/20/multileg',
                'worm': '10/20/noleg' });
        }
    }, {
        key: 'init_level',
        value: function init_level() {
            this.cl.hmset('level', { 'texture_id': '1',
                'name': 'defaultlevel',
                'height': '54',
                'width': '54',
                'avatar': 'defaultavatar/y:12/x:12' });
        }
    }, {
        key: 'init_img',
        value: function init_img() {
            this.cl.hmset('img', { 'texture_id': '1',
                'name': 'defaultlevel',
                'height': '54',
                'width': '54',
                'avatar': 'defaultavatar/y:12/x:12' });
        }
    }]);

    return Database;
})();

var ProcGen = (function () {
    function ProcGen() {
        _classCallCheck(this, ProcGen);
    }

    _createClass(ProcGen, [{
        key: 'init',
        value: function init() {}
    }]);

    return ProcGen;
})();

var Socket = (function () {
    function Socket() {
        _classCallCheck(this, Socket);

        this.io = null;
        this.userHash = {};
    }

    _createClass(Socket, [{
        key: 'init',
        value: function init(attaching_svr_) {
            this.io = require('socket.io')(attaching_svr_);
            var self = this;
            console.log('initializing socket');
            this.io.sockets.on('connection', function (socket_) {
                console.log('connection received');
                self.socket = socket_;
                self.socket.on('connected', self.connected_.bind(self));
                self.socket.on('publish', self.publish_.bind(self));
                self.socket.on('disconnect', self.disconnect_.bind(self));
            });
        }
    }, {
        key: 'connected_',
        value: function connected_(name_) {
            var msg = name_ + ' is connected';
            console.log('msg = ', msg);
            this.userHash[this.socket.id] = name_;
            this.io.sockets.emit('publish', { value: msg });
        }
    }, {
        key: 'publish_',
        value: function publish_(data_) {
            this.io.sockets.emit('publish', { value: data_.value });
        }
    }, {
        key: 'disconnect_',
        value: function disconnect_() {
            if (this.userHash[this.socket.id]) {
                var msg = this.userHash[this.socket.id] + ' is disconnected';
                console.log('msg = ', msg);
                delete this.userHash[this.socket.id];
                this.io.sockets.emit('publish', { value: msg });
            }
        }
    }]);

    return Socket;
})();

var Web = (function () {
    function Web() {
        _classCallCheck(this, Web);

        this.app = require('express')();
        this.http = require('http').Server(this.app);

        this.binder = null;
    }

    _createClass(Web, [{
        key: 'init',
        value: function init(port_) {
            var _this = this;

            this.app.get('/appearance', function (req_, res_) {
                _this.binder.hgetall('appearance', function (err_, replies_) {
                    res_.send(replies_);
                });
            });

            this.app.get('*', function (req_, res_, next_) {
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
                res_.sendFile(file, options, function (err_) {
                    if (err_) {
                        // console.log(err_);
                        res_.status(err_.status).end();
                    } else {};
                });
            });

            this.http.listen(port_, function () {
                console.log('listening on localhost:' + port_);
            });
        }
    }, {
        key: 'get_http',
        value: function get_http() {
            return this.http;
        }
    }, {
        key: 'add_binder',
        value: function add_binder(cl_) {
            this.binder = cl_;
        }
    }]);

    return Web;
})();

var Net = (function () {
    function Net() {
        _classCallCheck(this, Net);

        this.tx = null;
        this.rx = null;

        this.web = new Web();
        this.socket = new Socket();
    }

    _createClass(Net, [{
        key: 'init',
        value: function init(port_) {
            this.socket.init(this.web.get_http());
            this.web.init(port_);
        }
    }, {
        key: 'add_db',
        value: function add_db(cl_) {
            this.web.add_binder(cl_);
        }
    }, {
        key: 'set_content_binder',
        value: function set_content_binder(func_) {
            this.web.add_binder(func_);

            // for (let r of routes_)
            // {
            //     console.log(r);
            // }
        }
    }]);

    return Net;
})();

var World = (function () {
    function World() {
        _classCallCheck(this, World);
    }

    _createClass(World, [{
        key: 'init',
        value: function init() {}
    }]);

    return World;
})();

var RRLLServer = (function () {
    function RRLLServer() {
        _classCallCheck(this, RRLLServer);

        this.db = null;
        this.net = new Net();
    }

    _createClass(RRLLServer, [{
        key: 'init',
        value: function init(port_) {
            this.net.init(port_);
            this.db = new Database();
            this.db.init();
            this.net.add_db(this.db.get_client());
        }
    }]);

    return RRLLServer;
})();

var sv = new RRLLServer();
sv.init(8080);

// console.log('Sent:', file);
