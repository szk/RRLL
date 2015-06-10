function RankingScene() {
    Scene.apply(this, arguments);
    this.panels = [];
}

RankingScene.prototype = Object.create(Scene.prototype);
RankingScene.prototype.constructor = RankingScene;

RankingScene.prototype.init = function(asset_, ui_) {
    return true;
};

RankingScene.prototype.activate = function()
{
};

RankingScene.prototype.deactivate = function()
{
};

RankingScene.prototype.update = function(ui_) {
    return RC.NEXT_SCENE.CONTINUE;
};
