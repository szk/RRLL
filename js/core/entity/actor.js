function Actor() {
    // for pseudo class
    Entity.apply(this, arguments);
    this.entity = Entity.prototype;
    //

    this.appearance = null;
    this.anim_slots = null;
    this.anim_state = null;
    this.target = null;
}

Actor.prototype = Object.create(Entity.prototype);
Actor.prototype.constructor = Actor;

// create as template
Actor.prototype.create = function(type_, appearance_, health_, energy_)
{
    this.appearance = appearance_;

//     console.log(this.appearance);

//     switch(appearance_)
//     {
//         case 'humanoid': this.appearance = new Humanoid(null); break;
//         case 'multileg': this.appearance = new Multileg(null); break;
//         case 'noleg': this.appearance = new Noleg(null); break;
//         default: console.log('invalid appearance: ' + appearance_); break;
//     }
};

// pseudo proc
Actor.prototype.update_animation = function(dt_)
{

    this.appearance.slotContainers = this.anim_slots;
    this.appearance.state = this.anim_state;
    this.appearance.update(dt_);
};

Actor.prototype.init = function(eid_, type_, sprite_, x_, y_)
{
    this.entity.init.call(this, eid_, type_, sprite_, x_, y_);

    if (PIXI.spine.Spine.prototype.isPrototypeOf(sprite_))
    {
        console.log('spine found');
        this.anim_slots = clone(sprite_.slotContainers, false, 2);
        this.anim_state = clone(sprite_.state);
    }

    this.entity.set_next_tick.call(this, 5);
};

Actor.prototype.observe = function()
{
    for (var t in this.target)
    {
    }
};

Actor.prototype.action = function(current_tick_)
{
    this.right();
    this.entity.set_next_tick.call(this, current_tick_ + 20);
};
