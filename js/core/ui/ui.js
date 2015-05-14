function UI() {
    this.listener = new window.keypress.Listener();
    this.menu = [];
    this.asset = null;
    this.move_panel = new Menu();
    this.config_panel = new Menu();
    this.command_queue = new buckets.Queue();
}

UI.prototype.init = function(asset_, container_)
{
    this.asset = asset_;
    // make panel for moving
    this.move_panel.init(this.command_queue, this.asset.get_texture(1), 100, 200);

    var move_menu = [['s', [RC.CMD_ACTOR_ACT.WAIT, RC.CMD_ACTOR_DIR.LEFT], 0, 0, 50, 50,
                      this.asset.get_texture(3)],
                     ['a', [RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.LEFT], 60, 0, 50, 50,
                      this.asset.get_texture(3)],
                     ['x', [RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.DOWN], 120, 0, 50, 50,
                      this.asset.get_texture(3)],
                     ['w', [RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.UP], 180, 0, 50, 50,
                      this.asset.get_texture(3)],
                     ['d', [RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.RIGHT], 240, 0, 50, 50,
                      this.asset.get_texture(3)],
                     ['s', [RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.UPLEFT], 300, 0, 50, 50,
                      this.asset.get_texture(3)],
                     ['e', [RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.UPRIGHT], 360, 0, 50, 50,
                      this.asset.get_texture(3)],
                     ['z', [RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.DOWNLEFT], 420, 0, 50, 50,
                      this.asset.get_texture(3)],
                     ['c', [RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.DOWNRIGHT], 480, 0, 50, 50,
                      this.asset.get_texture(3)]];
/*
 * qwe aqw
 * asd zse
 * zxc xcd
 */
    // should be simpler
    for (var i in move_menu)
    {
        var menuitem = new MenuItem();
        menuitem.init.apply(menuitem, move_menu[i]);
        this.move_panel.add_item(menuitem);
    }
    this.add_menu(this.move_panel);

    // make panel for configuration
    this.config_panel.init(this.command_queue, this.asset.get_texture(1), 0, 0);
    var config_button = new MenuItem();
    config_button.init('esc', [RC.CMD_ACTOR_ACT.MENU, RC.CMD_MENU_TYPE.CONFIG], 0, 0, 50, 50,
                       this.asset.get_texture(3));
    this.config_panel.add_item(config_button);
    this.add_menu(this.config_panel);

    return true;
};

UI.prototype.is_command_queued = function() { return !(this.command_queue.isEmpty()); };
UI.prototype.get_command_queue = function() { return this.command_queue; };
UI.prototype.clear_command_queue = function() { this.command_queue.clear(); };

UI.prototype.get_menu = function() { return this.menu; };

UI.prototype.set_entity = function(entity_) {
    this.set_keybinding(entity_);
};

UI.prototype.add_menu = function(menu_) {
    this.menu.push(menu_);
};

UI.prototype.set_keybinding = function(entity_) {
    var my_scope = this;
    var my_combos = this.listener.register_many([
        // wait
        {   "keys"          : "s",
            "on_keydown"    : function() { this.command_queue.add([RC.CMD_ACTOR_ACT.WAIT, RC.CMD_ACTOR_DIR.LEFT]); },
            "this"          : my_scope },
        // move
        {   "keys"          : "a",
            "on_keydown"    : function() { this.command_queue.add([RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.LEFT]); },
            "this"          : my_scope },
        {   "keys"          : "x",
            "on_keydown"    : function() { this.command_queue.add([RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.DOWN]); },
            "this"          : my_scope },
        {   "keys"          : "w",
            "on_keydown"    : function() { this.command_queue.add([RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.UP]); },
            "this"          : my_scope },
        {   "keys"          : "d",
            "on_keydown"    : function() { this.command_queue.add([RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.RIGHT]); },
            "this"          : my_scope },
        {   "keys"          : "q",
            "on_keydown"    : function() { this.command_queue.add([RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.UPLEFT]); },
            "this"          : my_scope },
        {   "keys"          : "e",
            "on_keydown"    : function() { this.command_queue.add([RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.UPRIGHT]); },
            "this"          : my_scope },
        {   "keys"          : "z",
            "on_keydown"    : function() { this.command_queue.add([RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.DOWNLEFT]); },
            "this"          : my_scope },
        {   "keys"          : "c",
            "on_keydown"    : function() { this.command_queue.add([RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.DOWNRIGHT]); },
            "this"          : my_scope }
    ]);
};


/*
    //     this.menu = new dat.GUI({
    //     //height : 5 * 32 - 1,
    //     //width : 350
    //     });
    // var map = asset_.map;
    // var map_folder = this.menu.addFolder('map scew');
    // map_folder.add(filtersSwitchs, '0').name("apply");
    // map_folder.add(map.m, 'a', -5.00, 5.00, 0.01).name("a");
    // map_folder.add(map.m, 'b', -5.00, 5.00, 0.01).name("b");
    // map_folder.add(map.m, 'c', -5.00, 5.00, 0.01).name("c");
    // map_folder.add(map.m, 'd', -5.00, 5.00, 0.01).name("d");
    // map_folder.add(map.m, 'tx', 0, 500).name("Translate X");
    // map_folder.add(map.m, 'ty', 0, 500).name("Translate Y");
 */