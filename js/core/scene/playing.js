function Playing() {
    Scene.apply(this, arguments);
}

Playing.prototype = Object.create(Scene.prototype);
Playing.prototype.constructor = Playing;

Playing.prototype.get_avatar = function() {
    return this.avatar;
};

Playing.prototype.get_level = function() {
    return this.level;
};

Playing.prototype.init = function(asset_) {
    // initialize terrain
    this.terrain = asset_.get_terrain("defaultmap");
    this.terrain.init();
    // initialize level
    this.level = asset_.get_level("defaultlevel");
    this.level.init(this.terrain);
    this.avatar = this.level.get_avatar();

    return true;
};

Playing.prototype.update = function(ui_) {
    // what type of command in command queue?
    var cmd = ui_.get_command_queue().peek();
    if (!cmd && !cmd[0] && !cmd[1])
    {
        ui_.clear_command_queue();
        return RC.NEXT_SCENE.CONTINUE;
    }

    if (cmd[0] == RC.CMD_ACTOR_ACT.MENU)
    {
        ui_.clear_command_queue();
        switch (cmd[1])
        {
        case RC.CMD_MENU_TYPE.CONFIG:
            return RC.NEXT_SCENE.CONFIG;

        case RC.CMD_MENU_TYPE.INFO:
            return RC.NEXT_SCENE.INFO;
        }
        return RC.NEXT_SCENE.CONTINUE;
    }

    this.level.update(ui_.get_command_queue());
    return RC.NEXT_SCENE.CONTINUE;
};
