function Terrain(max_x_, max_y_, blank_texture_)
{
    this.walls = [];
    this.tiles = [];

    // create tile matrix
    this.tile_array = new Array(RC.TERRAIN_WIDTH);
    for (var i = 0; i < RC.TERRAIN_WIDTH; ++i)
    { this.tile_array[i] = new Array([RC.TERRAIN_HEIGHT]); }

    this.blank_tile = new Tile(blank_texture_, 0, 0, RC.TERRAIN_WALL_DIR.NOTHING);
}

Terrain.prototype.init = function()
{
};

Terrain.prototype.load = function(chips_, fg_texture_, bg_texture_)
{
    for (var i = 0; i < chips_.length; ++i) // i = y position
    {
        for (var j = 0; j < chips_[i].length; ++j) // j = x position
        {
            if (chips_[i][j] == '.')
            {
                this.tile_array[j][i] = new Tile(fg_texture_, j, i, RC.TERRAIN_WALL_DIR.NOTHING,
                                                 null, null, null, null);

            }
            else
            {
                this.tile_array[j][i] = new Tile(bg_texture_, j, i, RC.TERRAIN_WALL_DIR.SOUTH,
                                                 null, null, null, null);
            }
        }
    }
};

Terrain.prototype.get_tile = function(x_, y_)
{
    if (this.tile_array[x_] && this.tile_array[x_][y_]) { return this.tile_array[x_][y_]; }
    return this.blank_tile;
};

Terrain.prototype.get_wall_array = function()
{
    return this.wall_array;
};
