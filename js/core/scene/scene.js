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
    this.level.update(ui_.get_command_queue());
};
