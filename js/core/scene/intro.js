function IntroScene() {
    Scene.apply(this, arguments);
    this.panels = [];
}

IntroScene.prototype = Object.create(Scene.prototype);
IntroScene.prototype.constructor = IntroScene;

IntroScene.prototype.init = function(asset_, ui_) {
    return true;
};

IntroScene.prototype.activate = function()
{
};

IntroScene.prototype.deactivate = function()
{
};

IntroScene.prototype.update = function(ui_) {
    return RC.NEXT_SCENE.CONTINUE;
};
