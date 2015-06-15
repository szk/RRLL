class Actor extends Entity {
    constructor() {
        super();
        this.appearance = null;
        this.anim_slots = null;
        this.anim_state = null;
        this.target = null;
    }

    // pseudo proc
    update_animation(dt_)
    {
        this.appearance.slotContainers = this.anim_slots;
        this.appearance.state = this.anim_state;
        //     this.appearance.update(dt_);
    }

    make(type_name_, appearance_, health_, energy_)
    {
        this.appearance = appearance_;
        //     switch(appearance_)
        //     {
        //         case 'humanoid': this.appearance = new Humanoid(null); break;
        //         case 'multileg': this.appearance = new Multileg(null); break;
        //         case 'noleg': this.appearance = new Noleg(null); break;
        //         default: console.log('invalid appearance: ' + appearance_); break;
        //     }
    }

    init(eid_, type_, appearance_, x_, y_, flag_)
    {

         // var sprite = sprite_;
         // if (PIXI.spine.Spine.prototype.isPrototypeOf(sprite_))
         // {
         // console.log('spine found');
         // sprite_.autoUpdate = true;

         // this.anim_slots = clone(sprite_.slotContainer, false, 2);
         // this.anim_state = clone(sprite_.state);
         // //         this.appearance = clone(sprite_.slotContainers, false, 2);
         // sprite = this.anim_slots;
         // }

        super.init(eid_, type_, appearance_, x_, y_, flag_);
        super.set_next_tick(5);

        // center the sprites anchor point
        //     if (this.sprite != null)
        //     {
        //         this.sprite.anchor.x = -0.5;
        //         this.sprite.anchor.y = -0.5;
        //     }
    }

    observe()
    {
        for (var t in this.target)
        {
        }
    }

    action(current_tick_)
    {
        //     this.right();
        super.set_next_tick(current_tick_ + 20);

        //     // 
        if (this.appearance.lastTime)
        {
            this.appearance.lastTime = this.appearance.lastTime || Date.now();
            var timeDelta = (Date.now() - this.appearance.lastTime) * 0.001;
            this.appearance.lastTime = Date.now();
            this.appearance.update(timeDelta);
            console.log(timeDelta);
        }
        //     console.log('action');
    }
}


