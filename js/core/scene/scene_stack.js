function SceneStack() {
    this.stack = [];
    this.top = null;
}

SceneStack.prototype.init = function(asset_, ui_) {
//     this.loading_scene = new LoadingScene();
//     this.intro_scene = new IntroScene();
    this.playing_scene = new PlayingScene();
    this.config_scene = new ConfigScene();
//     this.info_scene = new InfoScene();
//     this.gameover_scene = new GameoverScene();
//     this.ranking_scene = new RankingScene();

    this.push_(this.playing_scene);
    this.top.init(asset_);
    ui_.set_keybinding();
};

SceneStack.prototype.update_top = function(ui_) {
    var result = this.top.update(ui_);
    this.result_check_(result, ui_);
};

SceneStack.prototype.get_top = function() {
    return this.top;
};

SceneStack.prototype.get_top_level = function() {
    if (this.top.get_level()) { return this.top.get_level(); }

    var i = this.stack.length - 1;
    while (this.stack[i])
    {
        if (this.stack[i].get_level() != null)
        { return this.stack[i].get_level(); }
        --i;
    }
    return null;
};

SceneStack.prototype.push_ = function(scene_) {
    this.stack.push(scene_);
    this.top = scene_;
};

SceneStack.prototype.result_check_ = function (result_, ui_) {
    if (result_ == RC.NEXT_SCENE.CONTINUE) { return; }

    switch (result_)
    {
    case RC.NEXT_SCENE.CONFIG:
        this.push_(this.config_scene);
        break;
    case RC.NEXT_SCENE.GAMEOVER: break;
    case RC.NEXT_SCENE.INTRO: break;
    case RC.NEXT_SCENE.LOADING: break;
    case RC.NEXT_SCENE.PLAYING: break;
    case RC.NEXT_SCENE.RANKING: break;
    case RC.NEXT_SCENE.INFO:
        this.push_(this.info_scene);
        break;
    case RC.NEXT_SCENE.RETURN: break;
    }
};
