function UI() {
    this.listener = new window.keypress.Listener();
    this.menu = [];
    this.move_controller = new Menu();
    this.command_queue = new buckets.Queue();
}

UI.prototype.init = function(container_)
{
    // make panel for moving
    this.move_controller.init(container_, this.command_queue, 100, 200);

    var move_menu = [['.', [RC.ACTOR_CMD.WAIT, RC.ACTOR_DIR.LEFT], 0, 300, 50, 50],
                     ['h', [RC.ACTOR_CMD.MOVE, RC.ACTOR_DIR.LEFT], 60, 300, 50, 50],
                     ['j', [RC.ACTOR_CMD.MOVE, RC.ACTOR_DIR.DOWN], 120, 300, 50, 50],
                     ['k', [RC.ACTOR_CMD.MOVE, RC.ACTOR_DIR.UP], 180, 300, 50, 50],
                     ['l', [RC.ACTOR_CMD.MOVE, RC.ACTOR_DIR.RIGHT], 240, 300, 50, 50],
                     ['y', [RC.ACTOR_CMD.MOVE, RC.ACTOR_DIR.UPLEFT], 300, 300, 50, 50],
                     ['u', [RC.ACTOR_CMD.MOVE, RC.ACTOR_DIR.UPRIGHT], 360, 300, 50, 50],
                     ['b', [RC.ACTOR_CMD.MOVE, RC.ACTOR_DIR.DOWNLEFT], 420, 300, 50, 50],
                     ['n', [RC.ACTOR_CMD.MOVE, RC.ACTOR_DIR.DOWNRIGHT], 480, 300, 50, 50]];

    for (var i in move_menu)
    {
        var menuitem = new MenuItem();
        menuitem.init.apply(menuitem, move_menu[i]);
        this.move_controller.add_item(menuitem);
    }
    this.add_menu(this.move_controller);

    return true;
};

UI.prototype.is_command_queued = function() { return !(this.command_queue.isEmpty()); };
UI.prototype.get_command_queue = function() { return this.command_queue; };
UI.prototype.get_menu = function() { return this.menu; };
UI.prototype.set_debug_console = function(asset_) {};

UI.prototype.set_asset = function(asset_) {
};

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
        {   "keys"          : ".",
            "on_keydown"    : function() { this.command_queue.add([RC.ACTOR_CMD.WAIT, RC.ACTOR_DIR.LEFT]); },
            "this"          : my_scope },
        // move
        {   "keys"          : "h",
            "on_keydown"    : function() { this.command_queue.add([RC.ACTOR_CMD.MOVE, RC.ACTOR_DIR.LEFT]); },
            "this"          : my_scope },
        {   "keys"          : "j",
            "on_keydown"    : function() { this.command_queue.add([RC.ACTOR_CMD.MOVE, RC.ACTOR_DIR.DOWN]); },
            "this"          : my_scope },
        {   "keys"          : "k",
            "on_keydown"    : function() { this.command_queue.add([RC.ACTOR_CMD.MOVE, RC.ACTOR_DIR.UP]); },
            "this"          : my_scope },
        {   "keys"          : "l",
            "on_keydown"    : function() { this.command_queue.add([RC.ACTOR_CMD.MOVE, RC.ACTOR_DIR.RIGHT]); },
            "this"          : my_scope },
        {   "keys"          : "y",
            "on_keydown"    : function() { this.command_queue.add([RC.ACTOR_CMD.MOVE, RC.ACTOR_DIR.UPLEFT]); },
            "this"          : my_scope },
        {   "keys"          : "u",
            "on_keydown"    : function() { this.command_queue.add([RC.ACTOR_CMD.MOVE, RC.ACTOR_DIR.UPRIGHT]); },
            "this"          : my_scope },
        {   "keys"          : "b",
            "on_keydown"    : function() { this.command_queue.add([RC.ACTOR_CMD.MOVE, RC.ACTOR_DIR.DOWNLEFT]); },
            "this"          : my_scope },
        {   "keys"          : "n",
            "on_keydown"    : function() { this.command_queue.add([RC.ACTOR_CMD.MOVE, RC.ACTOR_DIR.DOWNRIGHT]); },
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