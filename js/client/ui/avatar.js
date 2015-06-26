class Avatar {
    constructor() {
        this.actor = null;
    }

    init(actor_)
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
    }

    cmd(cmd_id_, cmd_target_) {
        console.log('cmd: ' + cmd_id_ + ', ' +  cmd_target_);
        this.cmd_table[cmd_id_].call(this, cmd_target_);
    }

    get_actor() { return this.actor; }

    cmd_wait(target_) { console.log('wait'); }
    cmd_move(target_) { console.log('move'); this.cmd_move_target[target_].call(this.actor); }

    cmd_use(target_) { console.log('use'); }
    cmd_pickup(target_) { console.log('pickup'); }
    cmd_talk(target_) { console.log('talk'); }
    cmd_menu(target_) { console.log('menu'); }
    cmd_automation(target_) { console.log('automation'); }
    cmd_changescene(target_) { console.log('changescene'); }
}
