function MenuScene() {
    Scene.apply(this, arguments);

    this.dompanel = null;
    this.asset = null;
    this.ui = null;
    this.panels = [];
}

MenuScene.prototype = Object.create(Scene.prototype);
MenuScene.prototype.constructor = MenuScene;

MenuScene.prototype.init = function(asset_, ui_, x_, y_, tags_, cmds_) {
    this.asset = asset_;
    this.ui = ui_;
    this.ui.set_keybinding([]);

    this.dompanel = this.asset.gen_dom(ui_.command_queue, asset_.get_texture(1), x_, y_,
                                            [tags_, cmds_]);
    this.panels.push(this.dompanel);
    this.initialized = true;
    return true;
};

MenuScene.prototype.activate = function() {
    this.ui.add_sprite(this.dompanel.get_sprite());
//    var dom = this.dompanel.get_sprite().domElement.contentWindow;
};

MenuScene.prototype.deactivate = function() {
    this.ui.remove_sprite(this.dompanel.get_sprite());
    for (var i in this.panels)
    {
//         this.panels[i].terminate();
//         this.asset.free(this.panels[i]);
    }

};

MenuScene.prototype.update = function(ui_) {
    var cmd = ui_.get_command_queue().peek();
    ui_.clear_command_queue();
    if (!cmd && !cmd[0] && !cmd[1])
    {

        return RC.NEXT_SCENE.CONTINUE;
    }

    if (cmd[0] == RC.CMD_ACTOR_ACT.MENU)
    {
        var pressed_button = cmd[1];
        ui_.clear_command_queue();
        switch (pressed_button)
        {
            case RC.CMD_MENU_TYPE.CANCEL:
            console.log('cancel clicked'); return RC.NEXT_SCENE.RETURN;
            case RC.CMD_MENU_TYPE.OK:
            console.log('ok clicked'); return RC.NEXT_SCENE.RETURN;
        }
        console.log('clicked: ' + cmd[1]);
        return cmd[1];
    }

    return RC.NEXT_SCENE.CONTINUE;
};
