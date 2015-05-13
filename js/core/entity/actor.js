function Actor() {
    // for pseudo class
    Entity.apply(this, arguments);
    this.entity = Entity.prototype;
    //

    this.target = null;
}

Actor.prototype = Object.create(Entity.prototype);
Actor.prototype.constructor = Actor;

Actor.prototype.init = function(eid_, type_, sprite_, x_, y_)
{
    this.entity.init.call(this, eid_, type_, sprite_, x_, y_);
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
