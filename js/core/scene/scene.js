function Scene() {
    this.avatar = null;
    this.level = null;
    this.initialized = false;
    this.panels = [];
}

Scene.prototype.init = function(asset_, ui_) {
    this.initialized = true;
    this.ui = ui_;
    return true;
};

Scene.prototype.activate = function() {
};

Scene.prototype.deactivate = function() {
};

Scene.prototype.activate = function() {
    console.log('activate of base class is called');
};

Scene.prototype.deactivate = function() {
    console.log('activate of base class is called');
};

Scene.prototype.update = function(ui_) {
};

Scene.prototype.get_avatar = function() {
    return this.avatar;
};

Scene.prototype.get_level = function() {
    return this.level;
};
