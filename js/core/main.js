function RRLL(asset_location_) {
    this.asset_location = asset_location_;
    this.poll_interval = null;

    this.gfx = new Gfx();
    this.sound = new Sound();
    this.scene = new Playing();
//     this.playing_scene = new Playing();
    this.asset = new Asset("img/texture.png");
    this.ui = new UI();

    this.scene_stack = [];
    this.scene_stack.push(this.scene);

    // create a renderer instance.
    this.renderer = PIXI.autoDetectRenderer(RC.SCREEN_WIDTH, RC.SCREEN_HEIGHT);
    // add the renderer view element to the DOM
    document.body.appendChild(this.renderer.view);
    PIXI.DOM.Setup(this.renderer, true);
}

RRLL.prototype.start = function()
{
    this.asset.init(this.asset_location);

    var self = this;

    this.poll_interval = window.setInterval(function() {
        if (!self.asset.is_load_base_completed() || !self.asset.is_load_variable_completed()) { return; }

        // load completed and go
        window.clearInterval(self.poll_interval);
        // init
        self.gfx.init();
        self.init_scene();
        requestAnimationFrame(self.animate.bind(self));
    },
                                          200);
};

RRLL.prototype.init_scene = function() {
    this.scene_stack[this.scene_stack.length - 1].init(this.asset);

    this.ui.init(this.asset, this.gfx.get_uicontainer());
    this.ui.set_entity(this.scene_stack[this.scene_stack.length - 1].get_avatar());

    // initialize overlay menu
    this.gfx.build_sprite(this.ui.get_menu());
};

RRLL.prototype.animate = function me() {
    var current_scene = this.scene_stack[this.scene_stack.length - 1];
    requestAnimationFrame(me.bind(this));

    if (this.ui.is_command_queued())
    {
        if (this.gfx.is_animating()) { ; }
        else { this.scene_check(current_scene.update(this.ui)); }
    }
    this.gfx.update(current_scene.get_avatar(), current_scene.get_level());

    // render the stage
    this.renderer.render(this.gfx.get_root());
};

RRLL.prototype.scene_check = function (scene_result_) {
    if (scene_result_ == RC.NEXT_SCENE.CONTINUE) { return; }
    switch (scene_result_)
    {
        case RC.NEXT_SCENE.CONFIG: console.log('config scene'); break;
        case RC.NEXT_SCENE.GAMEOVER: break;
        case RC.NEXT_SCENE.INTRO: break;
        case RC.NEXT_SCENE.LOADING: break;
        case RC.NEXT_SCENE.PLAYING: break;
        case RC.NEXT_SCENE.RANKING: break;
        case RC.NEXT_SCENE.INFO: console.log('config info'); break;
        case RC.NEXT_SCENE.RETURN: break;
    }
};