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
    this.top.init(asset_, ui_);
    ui_.set_keybinding();
};

SceneStack.prototype.update_top = function(ui_) {
    var result = this.top.update(ui_);
    this.result_check_(result, ui_);
};

SceneStack.prototype.init_top = function(asset_, ui_) {
    return this.top.init(asset_, ui_);
};

SceneStack.prototype.top_is_initialized = function(asset_, ui_) {
    return this.top.is_initialized();
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

SceneStack.prototype.get_top_menus = function() {
    return this.top.get_menus();
};

SceneStack.prototype.push_ = function(scene_) {
    this.stack.push(scene_);
    this.top = scene_;
};

SceneStack.prototype.pop_ = function() {
    this.top.teminate();
    this.stack.pop();
    this.top = this.stack[this.stack.length - 1];
};

SceneStack.prototype.result_check_ = function (result_, ui_) {
    if (result_ == RC.NEXT_SCENE.CONTINUE) { return; }

    switch (result_)
    {
    case RC.NEXT_SCENE.CONFIG:
        console.log("result check says next is config");
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
    case RC.NEXT_SCENE.RETURN:
        this.pop_();
        break;
    }
};
