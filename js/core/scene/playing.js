function PlayingScene() {
    Scene.apply(this, arguments);
    this.menus = [];
}

PlayingScene.prototype = Object.create(Scene.prototype);
PlayingScene.prototype.constructor = PlayingScene;

PlayingScene.prototype.init = function(asset_, ui_) {
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
    var move_menu = asset_.gen_menu(ui_.command_queue, asset_.get_texture(1), 10, 400,
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

    ui_.add_sprite(move_menu.get_sprite());
    this.menus.push(move_menu);

    var inventry_menu = asset_.gen_menu(ui_.command_queue, asset_.get_texture(1), 824, 400,
                                        [['inv', [RC.CMD_ACTOR_ACT.MENU, RC.CMD_MENU_TYPE.INVENTRY], 0, 0, 200, 200,
                                          asset_.get_texture(3)]]);
    ui_.add_sprite(inventry_menu.get_sprite());
    this.menus.push(inventry_menu);

    var automation_menu = asset_.gen_menu(ui_.command_queue, asset_.get_texture(1), 320, 550,
                                        [['stat', [RC.CMD_ACTOR_ACT.AUTOMATION, RC.CMD_ACTOR_AUTOMATION.STATUS],
                      0, 0, 100, 50, asset_.get_texture(3)],
                                         ['expl', [RC.CMD_ACTOR_ACT.AUTOMATION, RC.CMD_ACTOR_AUTOMATION.EXPLORING],
                                          210, 0, 100, 50, asset_.get_texture(3)]]);
    ui_.add_sprite(automation_menu.get_sprite());
    this.menus.push(automation_menu);

    var config_menu = asset_.gen_menu(ui_.command_queue, asset_.get_texture(1), 0, 0,
                                     [['config', [RC.CMD_ACTOR_ACT.MENU, RC.CMD_MENU_TYPE.CONFIG], 0, 0, 50, 50,
                                       asset_.get_texture(3)]]);
    ui_.add_sprite(config_menu.get_sprite());
    this.menus.push(config_menu);

    var info_menu = asset_.gen_menu(ui_.command_queue, asset_.get_texture(1), 974, 0,
                                    [['i', [RC.CMD_ACTOR_ACT.MENU, RC.CMD_MENU_TYPE.INFO], 0, 0, 50, 50,
                                      asset_.get_texture(3)]]);
    ui_.add_sprite(info_menu.get_sprite());
    this.menus.push(info_menu);

    this.initialized = true;

    return true;
};

PlayingScene.prototype.terminate = function()
{
    console.log('terminate');
};

PlayingScene.prototype.update = function(ui_) {
    console.log('update in playing scene');

    // what type of command in command queue?
    var cmd = ui_.get_command_queue().peek();
    if (!cmd && !cmd[0] && !cmd[1])
    {
        ui_.clear_command_queue();
        return RC.NEXT_SCENE.CONTINUE;
    }

    if (cmd[0] == RC.CMD_ACTOR_ACT.MENU)
    {
        var next_menu = cmd[1];
        ui_.clear_command_queue();
        switch (next_menu)
        {
        case RC.CMD_MENU_TYPE.CONFIG:
            console.log('next scene is config menu');
            return RC.NEXT_SCENE.CONFIG;

        case RC.CMD_MENU_TYPE.INFO:
            return RC.NEXT_SCENE.INFO;
        }
        return RC.NEXT_SCENE.CONTINUE;
    }

    this.level.update(ui_.get_command_queue());
    return RC.NEXT_SCENE.CONTINUE;
};
