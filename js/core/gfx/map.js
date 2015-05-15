function Map(max_x_, max_y_, aspect_) {
    // map information
    this.max_x = max_x_;
    this.max_y = max_y_;

    // player information
    this.avatar_x = this.avatar_x = this.avatar_prev_y = this.avatar_prev_y = 16;

    // displaying area
    this.dpy_ids = {};
    this.avatar_offset_x = this.avatar_offset_y = RC.MAP_RADIUS;
    this.subtile_x = this.subtile_y = 0;

    // drawing
    this.aspect = aspect_; // not using
    this.x_start = 512, this.y_start = -64;
    this.tile_width = 45.0, this.tile_height = 22.5; // width = 45.248, height = 22.624 :skewed 32 and 16
    this.tile_amount = new Array();

    // sprites
    this.tile_container = new PIXI.Container;
    this.entity_container = new PIXI.Container;

    this.wall_pool = new ObjectPool(WallSprite);

    // animation (mainly scroll)
    this.scroll_wait = 0;
    this.scroll_x = this.scroll_y = 0;
    this.scroll_pos = [];
}

Map.prototype.init = function() {
    this.gen_dpys(RC.MAP_RADIUS, RC.MAP_RADIUS, RC.MAP_RADIUS);
};

Map.prototype.update_avatar_pos_ = function(x_, y_)
{
    this.avatar_x = x_;
    this.avatar_y = y_;

    if (this.avatar_x == this.avatar_prev_x && this.avatar_y == this.avatar_prev_y) { return; }

    this.scroll_x = this.avatar_prev_x - this.avatar_x;
    this.scroll_y = this.avatar_prev_y - this.avatar_y;

    this.avatar_prev_x = this.avatar_x;
    this.avatar_prev_y = this.avatar_y;

    this.scroll_pos = this.iso_to_screen(this.scroll_x, this.scroll_y);
    this.scroll_pos[0] -= this.x_start;
    this.scroll_pos[1] -= this.y_start;

    this.scroll_wait = RC.SCROLL_FRAME;
};

Map.prototype.get_mapcontainer = function()
{
    this.tile_container.children.sort(function(obj1, obj2) { return obj1.position.x + obj1.position.y
                                                             - obj2.position.x + obj2.position.y; });
    return this.tile_container;
};

Map.prototype.get_entitycontainer = function()
{
    this.entity_container.children.sort(function(obj1, obj2) { return obj1.position.x + obj1.position.y
                                                               - obj2.position.x + obj2.position.y; });
    return this.entity_container;
};

Map.prototype.is_animating = function()
{
    if (this.scroll_wait > 0 // somewhat scroll_wait will be 0 while scrolling XXX FIXME
        || this.tile_container.position.x != 0 ||  this.tile_container.position.y != 0)
    { return true; }
    return false;
};

Map.prototype.update_fov = function(level_)
{
    var avatar = level_.get_avatar();
    this.update_avatar_pos_(avatar.get_x(), avatar.get_y());

    if (this.scroll_wait > 0)
    {
        var scroll_step_x = this.scroll_pos[0] / RC.SCROLL_FRAME;
        var scroll_step_y = this.scroll_pos[1] / RC.SCROLL_FRAME;
        this.tile_container.position.x += scroll_step_x;
        this.tile_container.position.y += scroll_step_y;

        this.entity_container.position.x += scroll_step_x;
        this.entity_container.position.y += scroll_step_y;

        avatar.sprite.position.x -= scroll_step_x;
        avatar.sprite.position.y -= scroll_step_y;

        --this.scroll_wait;
        return;
    }
    else
    {
        this.tile_container.position.x = 0;
        this.tile_container.position.y = 0;
        this.entity_container.position.x = 0;
        this.entity_container.position.y = 0;
    }

    // show only visible tiles and walls
    var terrain = level_.get_terrain();
    var stain = level_.get_stain();
    for (var n in this.tile_container.children)
    {
        var spr = this.tile_container.children[n];
        var dat = terrain.get_tile(spr.tile_pos_x + this.avatar_x - this.avatar_offset_x,
                                   spr.tile_pos_y + this.avatar_y - this.avatar_offset_y);
        spr.texture = dat.texture;

        if (dat.is_visible()) { spr.tint = 0xFFFFFF; }
        else
        {
            if (dat.is_known()) { spr.tint = 0x778888; }
            else { spr.tint = 0x000000; }
        }
    }

    // show only visible entity
    this.entity_container.removeChildren();

    var entity = level_.get_visible_entity();
    for (var v_ent in entity)
    {
        var ent = entity[v_ent];
        this.entity_container.addChild(ent.get_sprite());
        var screen_pos = this.iso_to_screen(ent.get_x() - this.avatar_x + this.avatar_offset_x,
                                            ent.get_y() - this.avatar_y + this.avatar_offset_y);
        ent.get_sprite().position.x = screen_pos[0];
        ent.get_sprite().position.y = screen_pos[1];
    }
};

// wall updating (not using now)
Map.prototype.update_dpy = function(wall_texture_)
{
/*
    this.terrain.dpy_clear();
    // clear entities
    for (var i in this.entity_container.children)
    {
        var entity_spr = this.entity_container.children[i];
        this.wall_pool.free(entity_spr);
    }
    this.entity_container.removeChildren();

    // update tiles
    for (var n in this.tile_container.children)
    {
        var tile_spr = this.tile_container.children[n];
        var t = this.terrain.get_tile(tile_spr.tile_pos_x + this.x_,
                                      tile_spr.tile_pos_y + this.y_);
        tile_spr.setTexture(t.texture);

        // wall check
        if (t.get_wall_dir() != RC.TERRAIN_WALL_DIR.NOTHING)
        {
            for (var j = 0; j < 4; ++j)
            {
                if (1 << j == t.get_wall_dir()) // NORTH:1, SOUTH:2, EAST:4, WEST:8
                {
                    var wall_spr = this.wall_pool.alloc();
                    wall_spr.init(wall_texture_, 1 << j,
                                  tile_spr.position.x, tile_spr.position.y);
                    this.entity_container.addChild(wall_spr);
                }
            }
            tile_spr.tint = 0xFF0000;
        }
        else { tile_spr.tint = 0xFFFFFF; }
    }
*/
    return;
};

// http://www.vrarchitect.net/anu/cg/Circle/printNotes.en.html
Map.prototype.gen_dpys = function(center_x_, center_y_, radius_) {
    var x = center_x_;
    var y = center_y_;
    var r = radius_;
    var r2 = r * r;
    var tile_tex = new PIXI.Texture.fromImage("img/null_tile.png");

    // check block pos
    this.tile_container.addChild(this.gen_dpy_sprite(tile_tex, x, y + r));
    this.tile_container.addChild(this.gen_dpy_sprite(tile_tex, x, y - r));
    this.tile_container.addChild(this.gen_dpy_sprite(tile_tex, x + r, y));
    this.tile_container.addChild(this.gen_dpy_sprite(tile_tex, x - r, y));

    var pos_x = 1;
    var pos_y = parseInt(Math.sqrt(r2 - 1) + 0.5);
    while (pos_x < pos_y)
    {
        this.tile_container.addChild(this.gen_dpy_sprite(tile_tex, x + pos_x, y + pos_y));
        this.tile_container.addChild(this.gen_dpy_sprite(tile_tex, x + pos_x, y - pos_y));
        this.tile_container.addChild(this.gen_dpy_sprite(tile_tex, x - pos_x, y + pos_y));
        this.tile_container.addChild(this.gen_dpy_sprite(tile_tex, x - pos_x, y - pos_y));
        this.tile_container.addChild(this.gen_dpy_sprite(tile_tex, x + pos_y, y + pos_x));
        this.tile_container.addChild(this.gen_dpy_sprite(tile_tex, x + pos_y, y - pos_x));
        this.tile_container.addChild(this.gen_dpy_sprite(tile_tex, x - pos_y, y + pos_x));
        this.tile_container.addChild(this.gen_dpy_sprite(tile_tex, x - pos_y, y - pos_x));
        pos_x += 1;
        pos_y = parseInt(Math.sqrt(r2 - pos_x * pos_x) + 0.5);
    }

    if (pos_x == pos_y)
    {
        this.tile_container.addChild(this.gen_dpy_sprite(tile_tex, x + pos_x, y + pos_y));
        this.tile_container.addChild(this.gen_dpy_sprite(tile_tex, x + pos_x, y - pos_y));
        this.tile_container.addChild(this.gen_dpy_sprite(tile_tex, x - pos_x, y + pos_y));
        this.tile_container.addChild(this.gen_dpy_sprite(tile_tex, x - pos_x, y - pos_y));
    }

    for (var n in this.dpy_ids)
    {
        var xl = [Number(n), this.dpy_ids[n]];

        xl[1].sort(function(a_, b_) { return a_ - b_; });
        for (var i = 0, counter = xl[1][0], synced = true; i < xl[1].length; ++i, ++counter)
        {
            if (xl[1][i] == counter) { continue; }

            if (synced)
            {
                synced = false;
                for (var j = counter; j < xl[1][i]; ++j) // fill
                { this.tile_container.addChild(this.gen_dpy_sprite(tile_tex, j, xl[0])); }
            }
        }
        xl[1].sort(function(a_, b_) { return a_ - b_; });
    }

    this.tile_container.children.sort(function(obj1_, obj2_) { return obj1_.tile_pos_x - obj2_.tile_pos_x; });
    this.tile_container.children.sort(function(obj1_, obj2_) { return obj1_.tile_pos_y - obj2_.tile_pos_y; });
    return this.tile_container;
};

Map.prototype.gen_dpy_sprite = function(tile_tex_, x_, y_) {
    if (this.dpy_ids[y_]) { this.dpy_ids[y_].push(x_); }
    else { this.dpy_ids[y_] = [x_]; }

    var screen_pos = this.iso_to_screen(x_, y_);
    var tile_sprite = new TileSprite(tile_tex_, x_, y_);
    tile_sprite.init(screen_pos[0], screen_pos[1]);

    return tile_sprite;
};

Map.prototype.iso_to_screen = function(x_, y_)
{
    return [(((x_ * this.tile_width) - (y_ * this.tile_width)) / 2) + this.x_start,
            (((x_ * this.tile_height) + (y_ * this.tile_height)) / 2) + this.y_start];
};
