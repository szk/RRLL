function Tile(texture_, x_, y_, wall_dir_,
              wall_north_texture_, wall_east_texture_, wall_west_texture_, wall_south_texture_) {
    this.texture = texture_;
    this.wall_north_texture = wall_north_texture_;
    this.wall_east_texture = wall_east_texture_;
    this.wall_west_texture = wall_west_texture_;
    this.wall_south_texture = wall_south_texture_;

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
