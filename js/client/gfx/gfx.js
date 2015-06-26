class Gfx {
    constructor () {
    this.bg = new PIXI.Graphics();
    this.root = new PIXI.Container;
    }

    get_root() { return this.root; }

    init(asset_) {
        this.bg.beginFill(RC.BG, 1);
        this.bg.drawRect(0, 0, RC.SCREEN_WIDTH, RC.SCREEN_HEIGHT);
        this.root.addChild(this.bg);

        // maps
        this.map = new Map(25, 25, 2);
        this.map.init();
        this.root.addChild(this.map.get_mapcontainer());
        this.root.addChild(this.map.get_entitycontainer());

        // ui and sfx
        this.overlay = new Overlay();
        this.overlay.init();
        this.root.addChild(this.overlay.get_fxcontainer());
        this.root.addChild(this.overlay.get_uicontainer());

        return true;
    }

    update(level_) {
        this.map.update_fov(level_);
    }

    is_animating() {
        return this.map.is_animating();
    }

    get_uicontainer() {
        return this.overlay.get_uicontainer();
    }
}
