function RRLL(asset_location_) {
    this.asset_location = asset_location_;
    this.poll_interval = null;

    this.gfx = new Gfx();
    this.sound = new Sound();
    this.scene = new Scene();
    this.asset = new Asset("img/texture.png");
    this.ui = new UI();

    // create a renderer instance.
    this.renderer = PIXI.autoDetectRenderer(RC.SCREEN_WIDTH, RC.SCREEN_HEIGHT);
    // add the renderer view element to the DOM
    document.body.appendChild(this.renderer.view);
    PIXI.DOM.Setup(this.renderer, true );
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
    this.scene.init(this.asset);

    this.ui.init(this.gfx.get_uicontainer());
    this.ui.set_entity(this.scene.get_avatar());
    this.ui.set_asset(this.asset);

    this.gfx.build_sprite(this.ui.get_menu());
};

RRLL.prototype.animate = function me() {
    requestAnimationFrame(me.bind(this));

    if (this.ui.is_command_queued())
    {
        if (this.gfx.is_animating()) { ; }
        else { this.scene.update(this.ui); }
    }
    this.gfx.update(this.scene.get_avatar(), this.scene.get_level());

    // render the stage
    this.renderer.render(this.gfx.get_root());
};
