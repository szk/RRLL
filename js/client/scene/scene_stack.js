class SceneStack {
    constructor() {
        this.stack = [];
        this.top = null;
        this.asset = null;
        this.ui = null;
        this.stat_queue = new buckets.Queue();
    }

    init(asset_, ui_) {
        this.asset = asset_;
        this.ui = ui_;

        // menus
        this.mainmenu_scene = new MenuScene(this.stat_queue);
        this.mainmenu_scene.init(this.asset, this.ui, 384, 64, MENU.MAIN['tag'], MENU.MAIN['command']);
        this.settingmenu_scene = new MenuScene(this.stat_queue);
        this.settingmenu_scene.init(this.asset, this.ui, 0, 0, MENU.SETTING['tag'], MENU.SETTING['command']);
        this.aboutmenu_scene = new MenuScene(this.stat_queue);
        this.aboutmenu_scene.init(this.asset, this.ui, 0, 0, MENU.ABOUT['tag'], MENU.ABOUT['command']);
        this.talkmenu_scene = new MenuScene(this.stat_queue);
        this.talkmenu_scene.init(this.asset, this.ui, 0, 0, MENU.TALK['tag'], MENU.TALK['command']);

        // playing
        this.loading_scene = new LoadingScene();
        this.loading_scene.init(this.asset, this.ui);
        this.intro_scene = new IntroScene();
        this.intro_scene.init(this.asset, this.ui);
        this.playing_scene = new PlayingScene();
        this.playing_scene.init(this.asset, this.ui);
        this.sandbox_scene = new SandboxScene();
        // this.sandbox_scene.init(this.asset, this.ui);
        this.gameover_scene = new GameoverScene();
        this.gameover_scene.init(this.asset, this.ui);
        this.ranking_scene = new RankingScene();
        this.ranking_scene.init(this.asset, this.ui);

        this.push_(this.playing_scene);
    }

    update_top(ui_) {
        this.stat_queue.clear();

        var result = this.top.update(ui_);
        this.result_check_(result, ui_);
    }

    get_top_level() {
        if (this.top.get_level()) { return this.top.get_level(); }

        var i = this.stack.length - 1;
        while (this.stack[i])
        {
            if (this.stack[i].get_level() != null)
            { return this.stack[i].get_level(); }
            --i;
        }
        return null;
    }

    get_local_cmd() {
        return this.stat_queue;
    }

    set_remote_cmd(queue_) {
    }

    sync_local() {
        this.stat_queue.clear();
    }

    push_(scene_) {
        this.stack.push(scene_);
        this.top = scene_;
        this.top.activate();
    }

    pop_() {
        if (this.top == null && this.stack.length == 0) { return; }
        this.top.deactivate();
        this.stack.pop();
        this.top = this.stack[this.stack.length - 1];
        this.top.activate();
    }

    result_check_(result_, ui_) {
        if (result_ == RC.NEXT_SCENE.CONTINUE) { return; }

        // scene is changing
        if (this.top) { this.top.deactivate(); }
        switch (result_)
        {
            // menus
        case RC.NEXT_SCENE.MAINMENU:
            console.log("result check says next is mainmenu");
            this.push_(this.mainmenu_scene); break;
        case RC.NEXT_SCENE.SETTINGMENU:
            console.log("result check says next is setting");
            this.push_(this.settingmenu_scene); break;
        case RC.NEXT_SCENE.ABOUTMENU:
            console.log("result check says next is about");
            this.push_(this.aboutmenu_scene); break;
        case RC.NEXT_SCENE.TALKMENU:
            console.log("result check says next is talk");
            this.push_(this.talkmenu_scene); break;
            // controller
        case RC.NEXT_SCENE.GAMEOVER: this.push_(this.gameover_scene); break;
        case RC.NEXT_SCENE.INTRO: this.push_(this.intro_scene); break;
        case RC.NEXT_SCENE.LOADING: this.push_(this.loading_scene); break;
        case RC.NEXT_SCENE.PLAYING: this.push_(this.playing_scene); break;
        case RC.NEXT_SCENE.SANDBOX: this.push_(this.sandbox_scene); break;
        case RC.NEXT_SCENE.RANKING: this.push_(this.ranking_scene); break;
        case RC.NEXT_SCENE.RETURN: this.pop_(); break;
        }
    }
}
