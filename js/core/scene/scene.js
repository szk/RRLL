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

Scene.prototype.has_own_level = function() {
    return false;
};

Scene.prototype.init = function(asset_) {
    return true;
};

Scene.prototype.update = function(ui_) {
};
