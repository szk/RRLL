function LoadingScene() {
    Scene.apply(this, arguments);
    this.panels = [];
}

LoadingScene.prototype = Object.create(Scene.prototype);
LoadingScene.prototype.constructor = LoadingScene;

LoadingScene.prototype.init = function(asset_, ui_) {
    return true;
};

LoadingScene.prototype.activate = function()
{
};

LoadingScene.prototype.deactivate = function()
{
};

LoadingScene.prototype.update = function(ui_) {
    return RC.NEXT_SCENE.CONTINUE;
};
