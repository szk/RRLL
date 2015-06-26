class Entity {
    constructor() {
        this.id = null;
        this.next_tick = null;
        this.live = true;

        this.type = null;
        this.sys_flag = 0;
        this.sprite = null;
        this.tile_pos_x = 0;
        this.tile_pos_y = 0;

        this.sys_flag = 0;
    }

    init(eid_, type_, appearance_, x_, y_, flag_)
    {
        this.id = eid_;
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
    }

    is_live() { return this.live; }
    get_id() { return this.id; }
    get_flag() { return this.sys_flag; }
    get_next_tick() { return this.next_tick; }
    get_displayobject() { return this.sprite; }

    set_flag(flag_) { this.sys_flag = flag_; }
    set_next_tick(tick_) { return this.next_tick = tick_; }

    observe() {;}
    action(current_tick_) {;}

    get_type() { return this.type; }
    get_sprite() { return this.sprite; }
    get_x() { return this.tile_pos_x; }
    get_y() { return this.tile_pos_y; }
    rotate() { this.sprite.rotation += 0.1; }

    up() { this.tile_pos_y -= 1; }
    down() { this.tile_pos_y += 1; }
    right() { this.tile_pos_x += 1; }
    left() { this.tile_pos_x -= 1; }
    upright() { this.tile_pos_x += 1; this.tile_pos_y -= 1; }
    upleft() { this.tile_pos_x -= 1; this.tile_pos_y -= 1; }
    downright() { this.tile_pos_x += 1; this.tile_pos_y += 1; }
    downleft() { this.tile_pos_x -= 1; this.tile_pos_y += 1; }
}
