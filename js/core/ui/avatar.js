function Avatar() {
    this.actor = null;
};

Avatar.prototype.create = function(type_, appearance_, health_, energy_)
{
};

Avatar.prototype.init = function(actor_)
{
    this.actor = actor_;
    this.actor.set_flag(1);

    this.actor.set_next_tick(0);

    // refer type.js
    this.cmd_table = [this.cmd_wait, this.cmd_move, this.cmd_use, this.cmd_pickup, this.cmd_talk,
                      this.cmd_menu, this.cmd_automation, this.cmd_changescene ];
    this.cmd_move_target = [this.actor.up,
                            this.actor.down,
                            this.actor.right,
                            this.actor.left,
                            this.actor.upright,
                            this.actor.upleft,
                            this.actor.downright,
                            this.actor.downleft];
};

Avatar.prototype.cmd = function(cmd_id_, cmd_target_) {
    console.log('cmd: ' + cmd_id_ + ', ' +  cmd_target_);
    this.cmd_table[cmd_id_].call(this, cmd_target_);
};

Avatar.prototype.get_actor = function() { return this.actor; };

Avatar.prototype.cmd_wait = function(target_) { console.log('wait'); };
Avatar.prototype.cmd_move = function(target_) { console.log('move'); this.cmd_move_target[target_].call(this.actor); };

Avatar.prototype.cmd_use = function(target_) { console.log('use'); };
Avatar.prototype.cmd_pickup = function(target_) { console.log('pickup'); };
Avatar.prototype.cmd_talk = function(target_) { console.log('talk'); };
Avatar.prototype.cmd_menu = function(target_) { console.log('menu'); };
Avatar.prototype.cmd_automation = function(target_) { console.log('automation'); };
Avatar.prototype.cmd_changescene = function(target_) { console.log('changescene'); };

