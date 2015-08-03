class Database {
    constructor() {
        this.cl = require('fakeredis').createClient('rrlltest');
        this.cl.on('connect', () => { console.log('redis connected'); });
    }

    init() {
        this.init_appearance();
        this.init_items();
        this.init_terrain();
        this.init_avatar();
        this.init_actor();
        this.init_level();
        this.init_img();
    }

    get_client()
    {
        return this.cl;
    }

    get_content_func()
    {
        var dbclient = this.cl;
        return (key_) =>
            {
                return dbclient.hkeys(key_, (err_, replies_) =>
                                      { return replies_; } );
            };
        // let routes = [];
        // this.cl.keys("*", (err_ ,reply_) => {
        //     routes = reply_;
        //     return reply_;
        // });
        // return 'u-m';
    }

    init_appearance()
    {
        this.cl.hmset('appearance',
                      {"defaulthuman": "{'type': 'humanoid'}",
                       "defaultanimal": "{'type': 'multileg'}",
                       "defaultworm": "{'type': 'noleg'}"});
    }

    init_items()
    {
        this.cl.hmset('item',
                      {"sword":  "mogera",
                       "shield": "mogera"});
    }

    init_terrain()
    {
        this.cl.hmset('terrain',
                      {"bg_texture_id": "0",
                       "name": "defaultmap",
                       "fg_texture_id": "1",
                       "blank_texture_id": "1",
                       "tile": "hogehogemuga-",
                       "chip":
                       ".................................................." +
                       ".................................................." +
                       "..OOOOOOOOOOOOOOO..OOOOOOOO..........OOOOOOOOOOO.." +
                       "..O.............O..O......O..........O.........O.." +
                       "..O.............O..O......O..OOOOOO..O.........O.." +
                       "..OOOOOOOOOOOO..O..OOOOOOOO..O....O..OOOOOOOOOOO.." +
                       ".............O..O............O....O..............." +
                       ".............OOOO............O....OOOOOOOOO......." +
                       "..OOOOOOOOO........OOOOOOOO..O............O......." +
                       "..O.......O........O......O..O............O......." +
                       "..O.......OOOOOOO..O...O..O..OOOOOOOOOOOOOO......." +
                       "..O.............O..O..OOO.O......................." +
                       "..O.............O..O...O..O..OOOOOOOOOOOOOOOOO...." +
                       "..O.............O..O...O..O..O...............O...." +
                       "..O.............O..O......O..O....O..........O...." +
                       "..O.............O..OOOOOOOO..O.OOOOO.........O...." +
                       "..OOOOOOOOOOOOOOO............O....O..........O...." +
                       ".............................O...............O...." +
                       ".............................OOOOOOOOOOOOOOOOO...." +
                       "..OOOOOOOOO..OOOOOOOO............................." +
                       "..O.......O..O......O............................." +
                       "..O.......O..O......O........OOOOOOO.OOOOOOOO.OOO." +
                       "..O.......O..O......O........O.....O.O......O.O.O." +
                       "..OOOOOOOOO..O......OOOOOOO..O.....O.O......O.O.O." +
                       ".............O............O..O.....O.O......O.O.O." +
                       ".............O............O..OOOOOOO.O......O.O.O." +
                       "..OOOOOOOOO..O............O..........O......O.OOO." +
                       "..O.......O..O............O..........OOOOOOOO....." +
                       "..O.......O..OOOOOOOOOOOOOO..OOOOOOO.............." +
                       "..O.......O..................O.....O.............." +
                       "..O.......O..................O.....O.............." +
                       "..O.......O..OOOOOOOOOOOOOOOOO.....OOOOOOOOOOOOO.." +
                       "..OOOOOOOOO..O.................................O.." +
                       ".............O.................................O.." +
                       ".............OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO.." +
                       "..OOOOOOOOO......................................." +
                       "..O.......O..OOOO..OOOOOOOOOOOOOOOOOOOO..OOOOOOO.." +
                       "..O.......O........O..................O..O.....O.." +
                       "..O.......OOOOOOO..O..................O..O.....O.." +
                       "..O.............O..OOOOOOOOOOOOOOOOOOOO..O.....O.." +
                       "..OOOOOOOOOOOOOOO........................O.....O.." +
                       ".........................................O.....O.." +
                       "...................OOOOOOOOOOOOOOOOOOOO..OOOOOOO.." +
                       "..OOOOOOOOOOOOOOO..O..................O.......OO.." +
                       "..O.............O..O..................O.OOOOO.OO.." +
                       "..O.............O..OOOOOOOOOOOOOOOOOOOO.O...O.OO.." +
                       "..O.............O.......................O...O....." +
                       "..OOOOOOOOOOOOOOO.......................OOOOO....." +
                       ".................................................." +
                       ".................................................."});
    }

    init_avatar()
    {
        this.cl.hmset('avatar', {"defaultavatar": "human",
                                 "advancedavatar": "dog"});
    }

    init_actor()
    {
        this.cl.hmset('actor', {"human": "10/20/humanoid",
                                "dog":"10/20/multileg",
                                "worm":"10/20/noleg"});
    }

    init_level()
    {
        this.cl.hmset('level', {"texture_id": "1",
                                "name": "defaultlevel",
                                "height": "54",
                                "width": "54",
                                "avatar": "defaultavatar/y:12/x:12"});
    }

    init_img()
    {
        this.cl.hmset('img', {"texture_id": "1",
                              "name": "defaultlevel",
                              "height": "54",
                              "width": "54",
                              "avatar": "defaultavatar/y:12/x:12"});
    }
}
