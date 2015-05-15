function ConfigScene() {
    Scene.apply(this, arguments);
}

ConfigScene.prototype = Object.create(Scene.prototype);
ConfigScene.prototype.constructor = ConfigScene;

ConfigScene.prototype.init = function(asset_) {
    console.log('config scene initializing');
    this.initialized = true;
    return true;
};

ConfigScene.prototype.update = function(ui_) {
};

ConfigScene.prototype.get_menus = function() {
    return [];
};
