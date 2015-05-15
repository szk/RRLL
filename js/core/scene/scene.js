function Scene() {
    this.avatar = null;
    this.level = null;
    this.initialized = false;
}

Scene.prototype.init = function(asset_) {
    return true;
};

Scene.prototype.update = function(ui_) {
};

Scene.prototype.is_initialized = function() {
    return this.initialized;
};

Scene.prototype.get_avatar = function() {
    return this.avatar;
};

Scene.prototype.get_level = function() {
    return this.level;
};

Scene.prototype.get_menus = function() {
};
