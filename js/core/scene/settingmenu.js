function SettingMenuScene() {
    Scene.apply(this, arguments);

    this.setting_panel = null;
    this.asset = null;
    this.ui = null;
}

SettingMenuScene.prototype = Object.create(Scene.prototype);
SettingMenuScene.prototype.constructor = SettingMenuScene;

SettingMenuScene.prototype.init = function(asset_, ui_) {
    this.asset = asset_;
    this.ui = ui_;
    this.ui.set_keybinding([]);

    this.setting_panel = asset_.gen_dom(ui_.command_queue, asset_.get_texture(1), 128, 0,
                                       ['<div style="width: 768px;" class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close" id="cancel"><span aria-hidden="true" id="cancel">&times;</span></button><h4 class="modal-title">Modal title</h4></div><div class="modal-body"><p>One fine body&hellip;</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal" id="close">Close</button><button type="button" class="btn btn-primary" id="ok">Save changes</button></div></div></div>',
                                        [['cancel', [RC.CMD_ACTOR_ACT.MENU, RC.CMD_MENU_TYPE.CANCEL]],
                                         ['close', [RC.CMD_ACTOR_ACT.MENU, RC.CMD_MENU_TYPE.CANCEL]],
                                         ['ok', [RC.CMD_ACTOR_ACT.MENU, RC.CMD_MENU_TYPE.OK]]]]);

    this.ui.add_sprite(this.setting_panel.get_sprite());
    this.panels.push(this.setting_panel);

    this.initialized = true;
    return true;
};

SettingMenuScene.prototype.terminate = function() {
    var dom = this.setting_panel.get_sprite().domElement.contentWindow;
//     console.log(dom.$('#system'));

    for (var i in this.panels)
    {
        this.panels[i].terminate();
        this.asset.free(this.panels[i]);
    }

};

SettingMenuScene.prototype.update = function(ui_) {
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

SettingMenuScene.prototype.is_initialized = function() {
    return this.initialized;
};
