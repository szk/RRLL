function GameoverScene() {
    Scene.apply(this, arguments);
    this.panels = [];
}

GameoverScene.prototype = Object.create(Scene.prototype);
GameoverScene.prototype.constructor = GameoverScene;

GameoverScene.prototype.init = function(asset_, ui_) {
    return true;
};

GameoverScene.prototype.activate = function()
{
};

GameoverScene.prototype.deactivate = function()
{
};

GameoverScene.prototype.update = function(ui_) {
    return RC.NEXT_SCENE.CONTINUE;
};
