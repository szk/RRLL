class Appearance {
    constructor() {
        this.sprite = null;
        // this.id = id_;
        this.children = [];
        this.entity_appearance_type = RC.ENTITY_APPEARANCE_TYPE.UNDEFINED;
    }

    init(appearance_)
    {
        this.appearance = appearance_;
        if (PIXI.spine.Spine.prototype.isPrototypeOf(appearance_))
        {
            appearance_.update(0.1);
            this.entity_appearance_type = RC.ENTITY_APPEARANCE_TYPE.SKELETON;
            this.sprite = new PIXI.Sprite(PIXI.Texture.fromImage("img/null_tile.png"));
            for (let s of appearance_.slotContainers)
            {
                this.sprite.addChild(s);
            }
        }
        else if (PIXI.extras.MovieClip.prototype.isPrototypeOf(appearance_))
        {
            this.entity_appearance_type = RC.ENTITY_APPEARANCE_TYPE.ANIMATION;
        }
        else if (cloudkid.Emitter.prototype.isPrototypeOf(appearance_))
        {
            this.entity_appearance_type = RC.ENTITY_APPEARANCE_TYPE.EMITTER;
        }
        else // PIXI.Sprite
        {
            this.entity_appearance_type = RC.ENTITY_APPEARANCE_TYPE.MONO;
        }
    }

    get_type() { return this.entity_appearance_type; }
    get_spine() { return this.sprite; }
    set_part_texture() { }

    build_sprite()
    {
        switch(this.entity_appearance_type) {
        case RC.ENTITY_APPEARANCE_TYPE.MONO:
            break;
        case RC.ENTITY_APPEARANCE_TYPE.ANIMATION:
            break;
        case RC.ENTITY_APPEARANCE_TYPE.EMITTER:
            break;
        case RC.ENTITY_APPEARANCE_TYPE.SKELETON:
            var new_sprite = new PIXI.Sprite(PIXI.Texture.fromImage("img/null_tile.png"));
            this.appearance.update(0.1);
            for (let s of this.appearance.children)
            {
                // let child_sprite = clone(s, false, 1);
                let child_sprite = new PIXI.Sprite(PIXI.Texture.fromImage("img/null_tile.png"));
                child_sprite.texture = s.children[0].texture;
                child_sprite.position = s.position;
                child_sprite.scale = s.scale;
                child_sprite.pivot = s.pivot;
                child_sprite.rotation = s.rotation;
                new_sprite.addChild(child_sprite);
                // console.log(s);
            }

            return new_sprite;
            break;
        }
        return this;
    }


}

/*
Humanoid.prototype.set_torso = function(texture_) {
    this.spine.skeleton.slots[0].sprites['torso'].texture = texture_;
};

Humanoid.prototype.set_head = function(texture_) {
    this.spine.skeleton.slots[1].sprites['head'].texture = texture_;
};

Humanoid.prototype.set_rightarm = function(texture_) {
    this.spine.skeleton.slots[2].sprites['right-arm'].texture = texture_;
};

Humanoid.prototype.set_leftarm = function(texture_) {
    this.spine.skeleton.slots[3].sprites['left-arm'].texture = texture_;
};

Humanoid.prototype.set_rightleg = function(texture_) {
    this.spine.skeleton.slots[4].sprites['right-leg'].texture = texture_;
};

Humanoid.prototype.set_leftleg = function(texture_) {
    this.spine.skeleton.slots[5].sprites['left-leg'].texture = texture_;
};

// equips on the head
Humanoid.prototype.set_hatted = function() {
};

// equips on the body
Humanoid.prototype.set_weared = function() {
};

// equips on hands
Humanoid.prototype.set_rightgrabbed = function() {
};

Humanoid.prototype.set_leftgrabbed = function() {
};

// equips on legs
Humanoid.prototype.set_rightshod = function() {
};

Humanoid.prototype.set_leftshod = function() {
};
*/
