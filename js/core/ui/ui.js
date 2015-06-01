function UI() {
    this.listener = new window.keypress.Listener();
    this.uicontainer = null;
    this.asset = null;
    this.command_queue = new buckets.Queue();
}

UI.prototype.init = function(asset_, container_)
{
    this.asset = asset_;
    this.uicontainer = container_;

    return true;
};

UI.prototype.add_sprite = function(sprite_)
{
    this.uicontainer.addChild(sprite_);
};

UI.prototype.is_command_queued = function() { return !(this.command_queue.isEmpty()); };
UI.prototype.get_command_queue = function() { return this.command_queue; };
UI.prototype.clear_command_queue = function() { this.command_queue.clear(); };

UI.prototype.set_keybinding = function() {
    var my_scope = this;
    var my_combos = this.listener.register_many([
        // wait
        {"keys": "s", "this": my_scope,
         "on_keydown": function() { this.command_queue.add([RC.CMD_ACTOR_ACT.WAIT, RC.CMD_ACTOR_DIR.LEFT]); }},
        // move
        {"keys": "q", "this": my_scope,
         "on_keydown" : function() { this.command_queue.add([RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.LEFT]); }},
        {"keys": "z", "this": my_scope,
         "on_keydown" : function() { this.command_queue.add([RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.DOWN]); }},
        {"keys": "e", "this": my_scope,
         "on_keydown" : function() { this.command_queue.add([RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.UP]); }},
        {"keys": "c", "this": my_scope,
         "on_keydown" : function() { this.command_queue.add([RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.RIGHT]); }},
        {"keys": "w", "this": my_scope,
         "on_keydown" : function() { this.command_queue.add([RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.UPLEFT]); }},
        {"keys": "d", "this": my_scope,
         "on_keydown" : function() { this.command_queue.add([RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.UPRIGHT]); }},
        {"keys": "a", "this": my_scope,
         "on_keydown" : function() { this.command_queue.add([RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.DOWNLEFT]); }},
        {"keys": "x", "this": my_scope,
         "on_keydown" : function() { this.command_queue.add([RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.DOWNRIGHT]); }},
        // menus
        {"keys": "esc", "this": my_scope,
         "on_keydown" : function() { this.command_queue.add([RC.CMD_ACTOR_ACT.MENU, RC.CMD_MENU_TYPE.MAIN]); }},
        {"keys": "i", "this": my_scope,
         "on_keydown" : function() { this.command_queue.add([RC.CMD_ACTOR_ACT.MENU, RC.CMD_MENU_TYPE.ABOUT]); }}
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

UI.prototype.set_keybinding_bak = function() {
    this.listener.reset();
    var my_scope = this;

    this.kb = [["s", [RC.CMD_ACTOR_ACT.WAIT, RC.CMD_ACTOR_DIR.LEFT]],
               ["q", [RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.LEFT]],
               ["z", [RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.DOWN]],
               ["e", [RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.UP]],
               ["c", [RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.RIGHT]],
               ["w", [RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.UPLEFT]],
               ["d", [RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.UPRIGHT]],
               ["a", [RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.DOWNLEFT]],
               ["x", [RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.DOWNRIGHT]],
               ["esc", [RC.CMD_ACTOR_ACT.MENU, RC.CMD_MENU_TYPE.MAIN]],
               ["i", [RC.CMD_ACTOR_ACT.MENU, RC.CMD_MENU_TYPE.ABOUT]]];

    for (var k in this.kb)
    {
        var key = this.kb[k][0];
        var cmd = this.kb[k][1];
        this.combos.push({"keys"       : key,
                          "on_keydown" : function() { console.log(key); this.command_queue.add(cmd); },
                          "this"       : my_scope });
    }
    this.listener.register_many(this.combos);
    console.log(this.listener.get_registered_combos());
};

 */