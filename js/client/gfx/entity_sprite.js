function EntitySprite() {
    this.sprite = PIXI.Sprite.prototype;

    this.localtime = 0;
    this.type = null;
    this.appearance = null;

    // for pseudo class
    PIXI.Sprite.apply(this, arguments);
};

EntitySprite.prototype = Object.create(PIXI.Sprite.prototype);
EntitySprite.prototype.constructor = EntitySprite;

EntitySprite.prototype.init = function(type_, pixi_container_) {
    this.type = type_;

    switch(this.type) {
    case RC.APPEARANCE_TYPE.MONO:
        break;
    case RC.APPEARANCE_TYPE.ANIMATION:
        break;
    case RC.APPEARANCE_TYPE.EMITTER:
        break;
    case RC.APPEARANCE_TYPE.SKELETON:
        this.appearance = pixi_container_;
        this.appearance.update(0.5);

        for (let s of this.appearance.children)
        {
            let child_sprite = new PIXI.Sprite(PIXI.Texture.fromImage(CL.NULL_TILE_IMG));
            child_sprite.texture = s.children[0].texture;
            child_sprite.position = s.position;
            child_sprite.scale = s.scale;
            child_sprite.pivot = s.pivot;
            child_sprite.rotation = s.rotation;
            this.addChild(child_sprite);
        }
        break;
    }
};

EntitySprite.prototype.updateTransform = function() {
    if (this.appearance == null) { return; }
    /* from Spine.prototype.autoUpdateTransform (not working)
    this.lastTime = this.lastTime || Date.now();
    var timeDelta = (Date.now() - this.lastTime) * 0.001;
    this.lastTime = Date.now();
    this.update(timeDelta);
     */
    this.localtime += 0.01;
    this.appearance.state.tracks[0].time = this.localtime;
    this.appearance.update(0);

    for (let i = 0; this.appearance.children.length > i; ++i)
    {
        this.children[i].position = this.appearance.children[i].position;
        this.children[i].scale = this.appearance.children[i].scale;
        this.children[i].pivot = this.appearance.children[i].pivot;
        this.children[i].rotation = this.appearance.children[i].rotation;
    }
    this.sprite.updateTransform.call(this);
};
