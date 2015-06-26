class Appearance {
    constructor() {
        this.children = [];
        this.type = RC.APPEARANCE_TYPE.UNDEFINED;
    }

    init(template_)
    {
        this.template = template_;
        if (PIXI.spine.Spine.prototype.isPrototypeOf(template_))
        {
            // initial spine state
            // set current skin
            this.template.skeleton.setSlotsToSetupPose();
            // play animation
            this.template.state.setAnimationByName(0, "walk", true);
            this.template.update(0);
            this.template.autoUpdate = false;

            this.type = RC.APPEARANCE_TYPE.SKELETON;
        }
        else if (PIXI.extras.MovieClip.prototype.isPrototypeOf(appearance_))
        {
            // initial animation state
            this.type = RC.APPEARANCE_TYPE.ANIMATION;
        }
        else if (cloudkid.Emitter.prototype.isPrototypeOf(appearance_))
        {
            // initial emitter state
            this.type = RC.APPEARANCE_TYPE.EMITTER;
        }
        else // PIXI.Sprite
        {
            // initial sprite state
            this.type = RC.APPEARANCE_TYPE.MONO;
        }
    }

    get_type() { return this.type; }
    set_part_texture() { }

    build_sprite()
    {
        switch(this.type) {
        case RC.APPEARANCE_TYPE.MONO:
            break;
        case RC.APPEARANCE_TYPE.ANIMATION:
            break;
        case RC.APPEARANCE_TYPE.EMITTER:
            break;
        case RC.APPEARANCE_TYPE.SKELETON:
            var new_sprite = new EntitySprite(PIXI.Texture.fromImage(CL.NULL_TILE_IMG));
            new_sprite.init(RC.APPEARANCE_TYPE.SKELETON, this.template);
            this.template.update(0.5);
            for (let s of this.template.children)
            {
                let child_sprite = new EntitySprite(PIXI.Texture.fromImage(CL.NULL_TILE_IMG));
                child_sprite.texture = s.children[0].texture;
                child_sprite.position = s.position;
                child_sprite.scale = s.scale;
                child_sprite.pivot = s.pivot;
                child_sprite.rotation = s.rotation;
                new_sprite.addChild(child_sprite);
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
