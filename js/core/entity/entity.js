function Entity() {
}

Entity.prototype.create = function(id_, type_, sprite_, x_, y_)
{
};

Entity.prototype.init = function(id_, type_, appearance_, x_, y_, flag_)
{
    this.id = id_;
    this.next_tick = RC.MAX_TICK;
    this.live = true;

    this.type = type_;
    this.sys_flag = 0;
    this.sprite = appearance_;
    this.tile_pos_x = x_;
    this.tile_pos_y = y_;

    this.sys_flag = flag_;

    // center the sprites anchor point
//     if (this.sprite != null)
//     {
//         this.sprite.anchor.x = 0.5;
//         this.sprite.anchor.y = 0.5;

//         this.sprite.position.x = x_;
//         this.sprite.position.y = y_;
//     }
    return true;
};

Entity.prototype.is_live = function() { return this.live; };
Entity.prototype.get_id = function() { return this.id; };
Entity.prototype.get_flag = function() { return this.sys_flag; };
Entity.prototype.get_next_tick = function() { return this.next_tick; };
Entity.prototype.get_displayobject = function() { return this.sprite; };

Entity.prototype.set_flag = function(flag_) { this.sys_flag = flag_; };
Entity.prototype.set_next_tick = function(tick_) { return this.next_tick = tick_; };

Entity.prototype.observe = function(current_tick_) {;};
Entity.prototype.action = function(current_tick_) {;};

Entity.prototype.get_type = function() { return this.type; };
Entity.prototype.get_sprite = function() { return this.sprite; };
Entity.prototype.get_x = function() { return this.tile_pos_x; };
Entity.prototype.get_y = function() { return this.tile_pos_y; };
Entity.prototype.rotate = function() { this.sprite.rotation += 0.1; };

Entity.prototype.up = function() { this.tile_pos_y -= 1; };
Entity.prototype.down = function() { this.tile_pos_y += 1; };
Entity.prototype.right = function() { this.tile_pos_x += 1; };
Entity.prototype.left = function() { this.tile_pos_x -= 1; };
Entity.prototype.upright = function() { this.tile_pos_x += 1; this.tile_pos_y -= 1; };
Entity.prototype.upleft = function() { this.tile_pos_x -= 1; this.tile_pos_y -= 1; };
Entity.prototype.downright = function() { this.tile_pos_x += 1; this.tile_pos_y += 1; };
Entity.prototype.downleft = function() { this.tile_pos_x -= 1; this.tile_pos_y += 1; };
