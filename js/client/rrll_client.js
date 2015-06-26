class RRLLClient {
    constructor(asset_loc_) {
        this.asset_location = asset_loc_;
        this.poll_interval = null;

        this.gfx = new Gfx();
        this.sound = new Sound();
        this.asset = new Asset("data/texture.png");
        this.ui = new UI();

        this.scene_stack = new SceneStack();

        this.net = new Net();

        // create a renderer instance.
        this.renderer = PIXI.autoDetectRenderer(RC.SCREEN_WIDTH, RC.SCREEN_HEIGHT);
        // add the renderer view element to the DOM
        document.body.appendChild(this.renderer.view);
        PIXI.DOM.Setup(this.renderer, true);

        // stats.js
        this.stats = new Stats();
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.left = '' + RC.SCREEN_WIDTH - 80 + 'px';
        this.stats.domElement.style.top = '0px';
        document.body.appendChild(this.stats.domElement);
    }

    start()
    {
        this.asset.init(this.asset_location);
        this.net.init();

        var self = this;

        this.poll_interval = window.setInterval(function() {
            if (!self.asset.is_load_base_completed()) { return; }
            if (!self.asset.is_load_variable_completed()) { return; }

            // load completed and go
            window.clearInterval(self.poll_interval);
            // init
            self.gfx.init();
            self.init_scene();

            requestAnimationFrame(self.animate.bind(self));
        },
                                                200);
    }

    init_scene() {
        this.ui.init(this.asset, this.gfx.get_uicontainer());
        this.scene_stack.init(this.asset, this.ui);
    }

    animate() {
        this.stats.begin();
        this.net.tick();

        // normal tick
        if (this.ui.is_command_queued())
        {
            if (this.gfx.is_animating()) { ; }
            else { this.scene_stack.update_top(this.ui); }
        }

        this.gfx.update(this.scene_stack.get_top_level());

        //     TODO: should own animations
        //     all_of_actors.update_animation(using_own_anim_slots_and_anim_state_by_update(dt))

        // render the stage
        this.renderer.render(this.gfx.get_root());
        this.stats.end();

        requestAnimationFrame(this.animate.bind(this));
    }
}

