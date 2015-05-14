function Avatar() {
    // for pseudo class
    Entity.apply(this, arguments);
    this.entity = Entity.prototype;
    //
}

Avatar.prototype = Object.create(Entity.prototype);
Avatar.prototype.constructor = Avatar;

Avatar.prototype.init = function(eid_, type_, sprite_, x_, y_)
{
    this.entity.init.call(this, eid_, type_, sprite_, x_, y_);
    this.entity.set_next_tick.call(this, 0);

    // refer type.js
    this.cmd_table = [this.cmd_wait, this.cmd_move, this.cmd_use, this.cmd_pickup, this.cmd_talk,
                      this.cmd_menu, this.cmd_automation];
    this.cmd_move_target = [this.entity.up,
                            this.entity.down,
                            this.entity.right,
                            this.entity.left,
                            this.entity.upright,
                            this.entity.upleft,
                            this.entity.downright,
                            this.entity.downleft];

    // center the sprites anchor point
    if (this.entity.sprite != null)
    {
        this.entity.sprite.anchor.x = -0.5;
        this.entity.sprite.anchor.y = -0.5;
    }

};

Avatar.prototype.cmd = function(cmd_id_, cmd_target_) {
    this.cmd_table[cmd_id_].call(this, cmd_target_);
};

Avatar.prototype.action = function(current_tick_) {
    this.entity.set_next_tick.call(this, current_tick_ + 10);
};

Avatar.prototype.cmd_wait = function(target_) { console.log('wait'); };
Avatar.prototype.cmd_move = function(target_) { this.cmd_move_target[target_].call(this); };

Avatar.prototype.cmd_use = function(target_) { console.log('use'); };
Avatar.prototype.cmd_pickup = function(target_) { console.log('pickup'); };
Avatar.prototype.cmd_talk = function(target_) { console.log('talk'); };
Avatar.prototype.cmd_menu = function(target_) { console.log('menu'); };
Avatar.prototype.cmd_automation = function(target_) { console.log('automation'); };
