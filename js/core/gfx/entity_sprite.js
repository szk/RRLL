function EntitySprite() {
    this.sprite = PIXI.Sprite.prototype;

    this.type = null;
    this.appearance = null;
    // this.tile_pos_x = tile_x_;
    // this.tile_pos_y = tile_y_;

    // // make skewing matrix of floor
    // this.m = new PIXI.Matrix(1.0, 1.0, 1.0, 1.0, 0, 0);
    // this.m.rotate(Math.PI / 4.0);
    // this.m.scale(2.0, 1.0);

    // for pseudo class
    PIXI.Sprite.apply(this, arguments);
    // this.tilesprite = PIXI.Sprite.prototype;
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

        // PIXI.spine.AnimationStateData
        // this.statedata = new PIXI.spine.AnimationStateData(pixi_container_);
        // this.state = new PIXI.spine.AnimationState(this.statedata);

        for (let s of this.appearance.children)
        {
            let child_sprite = new PIXI.Sprite(PIXI.Texture.fromImage("img/null_tile.png"));
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

    // this.lastTime = this.lastTime || Date.now();
    // var timeDelta = (Date.now() - this.lastTime) * 0.001;
    // this.lastTime = Date.now();

    this.appearance.update(0.0001);

    for (let i = 0; this.appearance.children.length > i; ++i)
    {
        this.children[i].position = this.appearance.children[i].position;
        this.children[i].scale = this.appearance.children[i].scale;
        this.children[i].pivot = this.appearance.children[i].pivot;
        this.children[i].rotation = this.appearance.children[i].rotation;
    }

    /*
    for (let s of this.appearance.children)
    {
        let child_sprite = new PIXI.Sprite(PIXI.Texture.fromImage("img/null_tile.png"));
        child_sprite.texture = s.children[0].texture;
        child_sprite.position = s.position;
        child_sprite.scale = s.scale;
        child_sprite.pivot = s.pivot;
        child_sprite.rotation = s.rotation;
    }
*/
    this.sprite.updateTransform.call(this);
};
// EntitySprite.prototype.init = function(x_, y_) {
//     this.position.x = x_;
//     this.position.y = y_;
// };

