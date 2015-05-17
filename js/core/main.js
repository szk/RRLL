function RRLL(asset_location_) {
    this.asset_location = asset_location_;
    this.poll_interval = null;

    this.gfx = new Gfx();
    this.sound = new Sound();
    this.asset = new Asset("img/texture.png");
    this.ui = new UI();

    this.scene_stack = new SceneStack();

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
    this.ui.init(this.asset, this.gfx.get_uicontainer());
    this.scene_stack.init(this.asset, this.ui);
};

RRLL.prototype.animate = function me() {
    requestAnimationFrame(me.bind(this));

    // when top scene is changed
    if (this.scene_stack.top_is_initialized() == false)
    {
        this.scene_stack.init_top(this.asset, this.ui);
    }

    // normal tick
    if (this.ui.is_command_queued())
    {
        if (this.gfx.is_animating()) { ; }
        else { this.scene_stack.update_top(this.ui); }
    }

    this.gfx.update(this.scene_stack.get_top_level());

    // render the stage
    this.renderer.render(this.gfx.get_root());
};
