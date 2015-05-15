function Gfx() {
    this.bg = new PIXI.Graphics();
    this.root = new PIXI.Container;

    this.sprite_builder = new SpriteBuilder;
}

Gfx.prototype.get_root = function() { return this.root; };

Gfx.prototype.init = function(asset_) {
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

    this.sprite_builder.init(this.map.get_mapcontainer(),
                             this.map.get_entitycontainer(),
                             this.overlay.get_fxcontainer(),
                             this.overlay.get_uicontainer());

    return true;
};

Gfx.prototype.update = function(level_) {
    this.map.update_fov(level_);
};

Gfx.prototype.is_animating = function() {
    return this.map.is_animating();
};

Gfx.prototype.get_uicontainer = function() {
    return this.overlay.get_uicontainer();
};

Gfx.prototype.build_sprite = function(resource_) {
    this.sprite_builder.ui(resource_);

//     this.sprite_builder.dom();
};
