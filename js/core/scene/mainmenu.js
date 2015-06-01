function MainMenuScene() {
    Scene.apply(this, arguments);

    this.menu_panel = null;
    this.asset = null;
    this.ui = null;
}

MainMenuScene.prototype = Object.create(Scene.prototype);
MainMenuScene.prototype.constructor = MainMenuScene;

MainMenuScene.prototype.init = function(asset_, ui_) {
    this.asset = asset_;
    this.ui = ui_;

    this.menu_panel = asset_.gen_dom(ui_.command_queue, asset_.get_texture(1), 384, 64,
                                       ['<div style="width: 256px;" class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" id="cancel"><span aria-hidden="true" id="cancel">&times;</span></button><h4 class="modal-title">Main menu</h4></div><div class="modal-body"><div class="container-fluid"><div class="row"><button type="button" class="btn btn-default col-xs-offset-2 col-xs-8" id="restart">Restart</button></div><br/><div class="row"><button type="button" class="btn btn-default col-xs-offset-2 col-xs-8" id="sandbox">Sandbox</button></div><br/><div class="row"><button type="button" class="btn btn-default col-xs-offset-2 col-xs-8" id="setting">Setting</button></div><br/><div class="row"><button type="button" class="btn btn-default col-xs-offset-2 col-xs-8" id="about">About</button></div><br/><div class="row"><button type="button" class="btn btn-default col-xs-offset-2 col-xs-8" id="close">Close</button></div><br/></div></div></div></div>',
                                        [['cancel', [RC.CMD_ACTOR_ACT.MENU, RC.CMD_MENU_TYPE.CANCEL]],
                                         ['close', [RC.CMD_ACTOR_ACT.MENU, RC.CMD_MENU_TYPE.CANCEL]],
                                         ['ok', [RC.CMD_ACTOR_ACT.MENU, RC.CMD_MENU_TYPE.OK]]]]);

    this.ui.add_sprite(this.menu_panel.get_sprite());
    this.panels.push(this.menu_panel);

    this.initialized = true;
    return true;
};

MainMenuScene.prototype.terminate = function() {
    var dom = this.menu_panel.get_sprite().domElement.contentWindow;
//     console.log(dom.$('#system'));

    for (var i in this.panels)
    {
        this.panels[i].terminate();
        this.asset.free(this.panels[i]);
    }

};

MainMenuScene.prototype.update = function(ui_) {
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

MainMenuScene.prototype.is_initialized = function() {
    return this.initialized;
};
