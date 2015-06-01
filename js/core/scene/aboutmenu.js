function AboutMenuScene() {
    Scene.apply(this, arguments);
}

AboutMenuScene.prototype = Object.create(Scene.prototype);
AboutMenuScene.prototype.constructor = AboutMenuScene;

AboutMenuScene.prototype.init = function(asset_, ui_) {
    return true;
};

AboutMenuScene.prototype.update = function(ui_) {
};
