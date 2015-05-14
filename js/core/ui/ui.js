function UI() {
    this.listener = new window.keypress.Listener();
    this.menu = [];
    this.asset = null;

    this.move_panel = new Menu();
    this.inventry_panel = new Menu();
    this.automation_panel = new Menu();

    this.config_panel = new Menu();
    this.info_panel = new Menu();
    this.command_queue = new buckets.Queue();
}

UI.prototype.init = function(asset_, container_)
{
    this.asset = asset_;
    // make panel for moving
    this.move_panel.init(this.command_queue, this.asset.get_texture(1), 10, 400);

    /*
     * qwe wed
     * asd qsc
     * zxc azx
     */
    this.build_menu(this.move_panel,
                    [['s', [RC.CMD_ACTOR_ACT.WAIT, RC.CMD_ACTOR_DIR.LEFT], 60, 60, 50, 50,
                      this.asset.get_texture(3)],
                     ['q', [RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.LEFT], 0, 0, 50, 50,
                      this.asset.get_texture(3)],
                     ['z', [RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.DOWN], 0, 120, 50, 50,
                      this.asset.get_texture(3)],
                     ['e', [RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.UP], 120, 0, 50, 50,
                      this.asset.get_texture(3)],
                     ['c', [RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.RIGHT], 120, 120, 50, 50,
                      this.asset.get_texture(3)],
                     ['w', [RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.UPLEFT], 60, 0, 50, 50,
                      this.asset.get_texture(3)],
                     ['d', [RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.UPRIGHT], 120, 60, 50, 50,
                      this.asset.get_texture(3)],
                     ['a', [RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.DOWNLEFT], 0, 60, 50, 50,
                      this.asset.get_texture(3)],
                     ['x', [RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.DOWNRIGHT], 60, 120, 50, 50,
                      this.asset.get_texture(3)]]);

    // make panel for inventry
    this.inventry_panel.init(this.command_queue, this.asset.get_texture(1), 824, 400);
    this.build_menu(this.inventry_panel,
                    [['inv', [RC.CMD_ACTOR_ACT.MENU, RC.CMD_MENU_TYPE.INVENTRY], 0, 0, 200, 200,
                      this.asset.get_texture(3)]]);

    // make panel for automation
    this.automation_panel.init(this.command_queue, this.asset.get_texture(1), 320, 550);
    this.build_menu(this.automation_panel,
                    [['stat', [RC.CMD_ACTOR_ACT.AUTOMATION, RC.CMD_ACTOR_AUTOMATION.STATUS],
                      0, 0, 100, 50, this.asset.get_texture(3)],
                     ['expl', [RC.CMD_ACTOR_ACT.AUTOMATION, RC.CMD_ACTOR_AUTOMATION.EXPLORING],
                      210, 0, 100, 50, this.asset.get_texture(3)]]);

    // make panel for configuration
    this.config_panel.init(this.command_queue, this.asset.get_texture(1), 0, 0);
    this.build_menu(this.config_panel,
                    [['config', [RC.CMD_ACTOR_ACT.MENU, RC.CMD_MENU_TYPE.CONFIG], 0, 0, 50, 50,
                      this.asset.get_texture(3)]]);

    // make panel for information
    this.info_panel.init(this.command_queue, this.asset.get_texture(1), 974, 0);
    this.build_menu(this.info_panel,
                    [['i', [RC.CMD_ACTOR_ACT.MENU, RC.CMD_MENU_TYPE.INFO], 0, 0, 50, 50,
                      this.asset.get_texture(3)]]);

    return true;
};

UI.prototype.is_command_queued = function() { return !(this.command_queue.isEmpty()); };
UI.prototype.get_command_queue = function() { return this.command_queue; };
UI.prototype.clear_command_queue = function() { this.command_queue.clear(); };

UI.prototype.build_menu = function(panel_, menu_array_) {
    for (var i in menu_array_)
    {
        var menuitem = new MenuItem();
        menuitem.init.apply(menuitem, menu_array_[i]);
        panel_.add_item(menuitem);
    }
    this.add_menu(panel_);
};

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
        {   "keys"       : "s",
            "on_keydown" : function() { this.command_queue.add([RC.CMD_ACTOR_ACT.WAIT, RC.CMD_ACTOR_DIR.LEFT]); },
            "this"       : my_scope },
        // move
        {   "keys"       : "q",
            "on_keydown" : function() { this.command_queue.add([RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.LEFT]); },
            "this"       : my_scope },
        {   "keys"       : "z",
            "on_keydown" : function() { this.command_queue.add([RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.DOWN]); },
            "this"       : my_scope },
        {   "keys"       : "e",
            "on_keydown" : function() { this.command_queue.add([RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.UP]); },
            "this"       : my_scope },
        {   "keys"       : "c",
            "on_keydown" : function() { this.command_queue.add([RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.RIGHT]); },
            "this"       : my_scope },
        {   "keys"       : "w",
            "on_keydown" : function() { this.command_queue.add([RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.UPLEFT]); },
            "this"       : my_scope },
        {   "keys"       : "d",
            "on_keydown" : function() { this.command_queue.add([RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.UPRIGHT]); },
            "this"       : my_scope },
        {   "keys"       : "a",
            "on_keydown" : function() { this.command_queue.add([RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.DOWNLEFT]); },
            "this"       : my_scope },
        {   "keys"       : "x",
            "on_keydown" : function() { this.command_queue.add([RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.DOWNRIGHT]); },
            "this"       : my_scope },
        // config
        {   "keys"       : "esc",
            "on_keydown" : function() { this.command_queue.add([RC.CMD_ACTOR_ACT.MENU, RC.CMD_MENU_TYPE.CONFIG]); },
            "this"       : my_scope },
        {   "keys"       : "i",
            "on_keydown" : function() { this.command_queue.add([RC.CMD_ACTOR_ACT.MENU, RC.CMD_MENU_TYPE.INFO]); },
            "this"       : my_scope }
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