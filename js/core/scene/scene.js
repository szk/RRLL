function Scene() {
    this.avatar = null;
    this.level = null;
}

Scene.prototype.get_avatar = function() {
    return this.avatar;
};

Scene.prototype.get_level = function() {
    return this.level;
};

Scene.prototype.init = function(asset_) {
    // initialize terrain
    this.terrain = asset_.get_terrain("defaultmap");
    this.terrain.init();
    // initialize level
    this.level = asset_.get_level("defaultlevel");
    this.level.init(this.terrain);
    this.avatar = this.level.get_avatar();

    return true;
};

Scene.prototype.update = function(ui_) {
    // what type of command in command queue?
    var cmd = ui_.get_command_queue().peek();
    if (!cmd && !cmd[0] && !cmd[1])
    {
        ui_.clear_command_queue();
        return;
    }

    if (cmd[0] == RC.CMD_ACTOR_ACT.MENU)
    {
        switch (cmd[1])
        {
        case RC.CMD_MENU_TYPE.CONFIG:
            console.log('config menu');
            break;
        case RC.CMD_MENU_TYPE.INFO:
            console.log('info menu');
            break;
        }
        ui_.clear_command_queue();
        return;
    }

    this.level.update(ui_.get_command_queue());
};
