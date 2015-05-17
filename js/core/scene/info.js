function InfoScene() {
    Scene.apply(this, arguments);
}

InfoScene.prototype = Object.create(Scene.prototype);
InfoScene.prototype.constructor = InfoScene;

InfoScene.prototype.init = function(asset_, ui_) {
    return true;
};

InfoScene.prototype.update = function(ui_) {
};
