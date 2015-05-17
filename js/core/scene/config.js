function ConfigScene() {
    Scene.apply(this, arguments);

    this.main_panel = new Menu();
    this.transition_panel = new Menu();

    this.menus = [];
    this.asset = null;
    this.ui = null;
}

ConfigScene.prototype = Object.create(Scene.prototype);
ConfigScene.prototype.constructor = ConfigScene;

ConfigScene.prototype.init = function(asset_, ui_) {
    this.asset = asset_;
    this.ui = ui_;

    var result_btn = asset_.gen_menu(ui_.command_queue, asset_.get_texture(1), 512, 300,
                                     [['Cancel', [RC.CMD_ACTOR_ACT.MENU, RC.CMD_MENU_TYPE.CANCEL],
                                       0, 0, 100, 50, asset_.get_texture(3)],
                                      ['OK', [RC.CMD_ACTOR_ACT.MENU, RC.CMD_MENU_TYPE.OK],
                                       210, 0, 100, 50, asset_.get_texture(3)]]);
    this.ui.add_sprite(result_btn.get_sprite());
    this.menus.push(result_btn);

    var config_panel = asset_.gen_menu(ui_.command_queue, asset_.get_texture(1), 512, 0,
                                       ["http://www.pixijs.com"]);
    this.ui.add_sprite(config_panel.get_sprite());
    this.menus.push(config_panel);

    this.initialized = true;
    return true;
};

ConfigScene.prototype.terminate = function() {
    for (var i in this.menus)
    {
        this.asset.free(this.menus[i]);
//         console.log(this.menus[i].get_id());
    }
};

ConfigScene.prototype.update = function(ui_) {
    var cmd = ui_.get_command_queue().peek();
    if (!cmd && !cmd[0] && !cmd[1])
    {
        ui_.clear_command_queue();
        return RC.NEXT_SCENE.CONTINUE;
    }

    if (cmd[0] == RC.CMD_ACTOR_ACT.MENU)
    {
        var pressed_button = cmd[1];
        ui_.clear_command_queue();
        switch (pressed_button)
        {
            case RC.CMD_MENU_TYPE.CANCEL:
            console.log('cancel clicked'); break;
            case RC.CMD_MENU_TYPE.OK:
            console.log('ok clicked'); break;
        }
        return RC.NEXT_SCENE.RETURN;
    }
    return RC.NEXT_SCENE.CONTINUE;
};

ConfigScene.prototype.is_initialized = function() {
    return this.initialized;
};

ConfigScene.prototype.get_menus = function() {
    return [this.transition_panel];
};
