class Tile {
    constructor(texture_, x_, y_, wall_dir_,
                wall_north_, wall_east_, wall_west_, wall_south_)
    {
        this.texture = texture_;
        this.wall_north = wall_north_;
        this.wall_east = wall_east_;
        this.wall_west = wall_west_;
        this.wall_south = wall_south_;

        this.wall_dir = wall_dir_;

        this.visible = false;
        this.known = false;
    }

    move(x_, y_) {}

    update(image_) { return; }
    get_wall_dir() { return this.wall_dir; }

    set_visible(flag_) { this.visible = flag_; }
    is_visible() { return this.visible; }

    set_known(flag_) { this.known = flag_; }
    is_known() { return this.known; }
}
