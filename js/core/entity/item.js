function Item() {
    // for pseudo class
    Entity.apply(this, arguments);
    this.entity = Entity.prototype;
    //
}

Item.prototype = Object.create(Entity.prototype);
Item.prototype.constructor = Item;

Item.prototype.init = function(eid_, type_, sprite_, x_, y_, flag_)
{
    this.entity.init.call(this, eid_, type_, sprite_, x_, y_, flag_);
    this.entity.next_tick = 15;
};

Item.prototype.action = function(current_tick_) {
    ;
};
