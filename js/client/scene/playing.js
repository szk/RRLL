class PlayingScene extends Scene {
    constructor() {
        super();
        this.panels = [];
        this.ui = null;
    }

    init(asset_, ui_) {
        this.ui = ui_;
        // initialize terrain
        this.terrain = asset_.find_terrain("defaultmap");
        this.terrain.init();
        // initialize level
        this.level = asset_.find_level("defaultlevel");
        this.level.init(this.terrain);
        this.avatar = this.level.get_avatar();

        /*
         * qwe wed
         * asd qsc
         * zxc azx
         */
        var move_panel = asset_.gen_panel(ui_.command_queue, asset_.get_texture(1), 10, 400,
                                          [['s', [RC.CMD_ACTOR_ACT.WAIT, RC.CMD_ACTOR_DIR.LEFT], 60, 60, 50, 50,
                                            asset_.get_texture(3)],
                                           ['q', [RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.LEFT], 0, 0, 50, 50,
                                            asset_.get_texture(3)],
                                           ['z', [RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.DOWN], 0, 120, 50, 50,
                                            asset_.get_texture(3)],
                                           ['e', [RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.UP], 120, 0, 50, 50,
                                            asset_.get_texture(3)],
                                           ['c', [RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.RIGHT], 120, 120, 50, 50,
                                            asset_.get_texture(3)],
                                           ['w', [RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.UPLEFT], 60, 0, 50, 50,
                                            asset_.get_texture(3)],
                                           ['d', [RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.UPRIGHT], 120, 60, 50, 50,
                                            asset_.get_texture(3)],
                                           ['a', [RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.DOWNLEFT], 0, 60, 50, 50,
                                            asset_.get_texture(3)],
                                           ['x', [RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.DOWNRIGHT], 60, 120, 50, 50,
                                            asset_.get_texture(3)]]);

        ui_.add_sprite(move_panel.get_sprite());
        this.panels.push(move_panel);

        var inventry_panel = asset_.gen_panel(ui_.command_queue, asset_.get_texture(1), 824, 400,
                                              [['inv', [RC.CMD_ACTOR_ACT.CHANGE_SCENE, RC.NEXT_SCENE.MAINMENU], 0, 0, 200, 200,
                                                asset_.get_texture(3)]]);
        ui_.add_sprite(inventry_panel.get_sprite());
        this.panels.push(inventry_panel);

        var automation_panel = asset_.gen_panel(ui_.command_queue, asset_.get_texture(1), 320, 550,
                                                [['stat', [RC.CMD_ACTOR_ACT.AUTOMATION, RC.CMD_ACTOR_AUTOMATION.STATUS],
                                                  0, 0, 100, 50, asset_.get_texture(3)],
                                                 ['expl', [RC.CMD_ACTOR_ACT.AUTOMATION, RC.CMD_ACTOR_AUTOMATION.EXPLORING],
                                                  210, 0, 100, 50, asset_.get_texture(3)]]);
        ui_.add_sprite(automation_panel.get_sprite());
        this.panels.push(automation_panel);

        var menu_panel = asset_.gen_panel(ui_.command_queue, asset_.get_texture(1), 0, 0,
                                          [['menu', [RC.CMD_ACTOR_ACT.CHANGE_SCENE, RC.NEXT_SCENE.MAINMENU], 0, 0, 50, 50,
                                            asset_.get_texture(3)]]);
        ui_.add_sprite(menu_panel.get_sprite());
        this.panels.push(menu_panel);

        this.initialized = true;

        return true;
    }

    activate()
    {
        console.log('activate playing scene');
        this.ui.set_keybinding([
            // wait
            {"keys": "s", "this": this, "on_keydown": function() { this.ui.command_queue.add([RC.CMD_ACTOR_ACT.WAIT, RC.CMD_ACTOR_DIR.LEFT]); }},
            // move
            {"keys": "q", "this": this, "on_keydown" : function() { this.ui.command_queue.add([RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.LEFT]); }},
            {"keys": "z", "this": this, "on_keydown" : function() { this.ui.command_queue.add([RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.DOWN]); }},
            {"keys": "e", "this": this, "on_keydown" : function() { this.ui.command_queue.add([RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.UP]); }},
            {"keys": "c", "this": this, "on_keydown" : function() { this.ui.command_queue.add([RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.RIGHT]); }},
            {"keys": "w", "this": this, "on_keydown" : function() { this.ui.command_queue.add([RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.UPLEFT]); }},
            {"keys": "d", "this": this, "on_keydown" : function() { this.ui.command_queue.add([RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.UPRIGHT]); }},
            {"keys": "a", "this": this, "on_keydown" : function() { this.ui.command_queue.add([RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.DOWNLEFT]); }},
            {"keys": "x", "this": this, "on_keydown" : function() { this.ui.command_queue.add([RC.CMD_ACTOR_ACT.MOVE, RC.CMD_ACTOR_DIR.DOWNRIGHT]); }},
            // menus
            {"keys": "esc", "this": this, "on_keydown" : function() { this.ui.command_queue.add([RC.CMD_ACTOR_ACT.CHANGE_SCENE, RC.NEXT_SCENE.MAINMENU]); }},
            {"keys": "enter", "this": this, "on_keydown" : function() { this.ui.command_queue.add([RC.CMD_ACTOR_ACT.CHANGE_SCENE, RC.NEXT_SCENE.TALKMENU]); }},
            {"keys": "i", "this": this, "on_keydown" : function() { this.ui.command_queue.add([RC.CMD_ACTOR_ACT.CHANGE_SCENE, RC.NEXT_SCENE.ABOUTMENU]); }}
        ]);
    }

    deactivate()
    {
        console.log('deactivate playing scene');
    }

    update(ui_) {
        // what type of command in command queue?
        var cmd = ui_.get_command_queue().peek();
        if (!cmd && !cmd[0] && !cmd[1])
        {
            ui_.clear_command_queue();
            return RC.NEXT_SCENE.CONTINUE;
        }

        if (cmd[0] == RC.CMD_ACTOR_ACT.CHANGE_SCENE)
        {
            ui_.clear_command_queue();
            return cmd[1];
        }

        this.level.update(ui_.get_command_queue());
        return RC.NEXT_SCENE.CONTINUE;
    }
}
