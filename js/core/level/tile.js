function Tile(texture_, x_, y_, wall_dir_,
              wall_north_, wall_east_, wall_west_, wall_south_) {
    this.texture = texture_;
    this.wall_north = wall_north_;
    this.wall_east = wall_east_;
    this.wall_west = wall_west_;
    this.wall_south = wall_south_;

    this.wall_dir = wall_dir_;

    this.visible = false;
    this.known = false;
}

Tile.prototype.move = function(x_, y_) {};

Tile.prototype.update = function(image_) { return; };
Tile.prototype.get_wall_dir = function() { return this.wall_dir; };

Tile.prototype.set_visible = function(flag_) { this.visible = flag_; };
Tile.prototype.is_visible = function() { return this.visible; };

Tile.prototype.set_known = function(flag_) { this.known = flag_; };
Tile.prototype.is_known = function() { return this.known; };
