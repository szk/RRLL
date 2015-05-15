function ConfigScene() {
    Scene.apply(this, arguments);
}

ConfigScene.prototype = Object.create(Scene.prototype);
ConfigScene.prototype.constructor = ConfigScene;

ConfigScene.prototype.init = function(asset_) {
    return true;
};

ConfigScene.prototype.update = function(ui_) {
};
