function Level(max_x_, max_y_, aspect_, root_texture_) // XXX use argument for 
{
    this.terrain = null;
    this.stain = []; // fluid, stain, etc. per tile
    this.entity = []; // other objects
    this.carrier = null;

    this.avatar = null;

    this.tick = 0;
    this.tick_bst = new buckets.BSTree(function(l_, r_)
                                       { if (l_.get_tick() < r_.get_tick()) { return -1; }
                                         else if (l_.get_tick() === r_.get_tick()) { return 0; }
                                         return 1; });
    // tile status store
    this.pre_visible_tiles = [];
    // entity store
    this.tile_stat = {};
    this.visible_entity = [];
}

/// los and pov: http://www.emanueleferonato.com/2015/02/03/play-with-light-and-dark-using-ray-casting-and-visibility-polygons/
Level.prototype.init = function(terrain_)
{
    // time system
    this.tick = 0;

    // terrain data
    this.terrain = terrain_;
    this.terrain.init();

    // tile status
    this.update_tile_stat();

    // visibility
    var lightpass_func = (function (tile_x_, tile_y_)
                          { return this.terrain.get_tile(tile_x_, tile_y_).get_wall_dir() == RC.TERRAIN_WALL_DIR.NOTHING;}).bind(this);
    this.visibility = new RecursiveShadowcasting(lightpass_func);
    this.compute_visibility();

    return true;
};

Level.prototype.load = function(chips_)
{
};

Level.prototype.update = function(command_)
{
    // update terrain

    // update stain

    // update entity

    // TODO:
    // if the element's (entity's) 'is_live' is false, store the eid to some 'set'
    // and remove it from 'this.entity' and 'TickNode'.
    // The status which is targeted by an entity will be confirm by entity.action,
    // if the target's 'is_live' is false, release the targeting (watch out to reusing of eid).
    // (how about 'actor.observe' checks is_live then 'actor.action' executes action?)

//     console.log('nexturn: ' + this.tick);

    var now_ticknode = new TickNode(this.tick);
    var found_ticknode = this.tick_bst.search(now_ticknode).element;

    for (var i = 0; found_ticknode.get_entities().length > i; ++i)
    {
        if (found_ticknode.get_entities()[i].get_flag() == 1) // if this is avatar
        {
            this.avatar.cmd(command_.peek()[0], command_.peek()[1]); // block at here
            command_.clear();
        }

        found_ticknode.get_entities()[i].observe(); // for intrrupt (e.g. noise hearing in sleep)
        found_ticknode.get_entities()[i].action(this.tick);
        this.add_entity_tick(found_ticknode.get_entities()[i]);
        this.update_levelstat();
    }
    this.tick_bst.remove(now_ticknode); // remove ticknode by GC

    // update status
    this.update_tile_stat();

    // TODO: update avatar

    // update visibility of tiles and entities
    for (var vt in this.pre_visible_tiles)
    { this.terrain.get_tile.apply(this.terrain, this.pre_visible_tiles[vt]).set_visible(false); }

    this.compute_visibility();

    var nextturn_tick = this.tick_bst.minimum().get_tick();
    if (nextturn_tick == RC.MAX_TICK) { console.log('XXX something wrong'); }
    this.tick = nextturn_tick;
};

Level.prototype.compute_visibility = function()
{
    this.pre_visible_tiles = [];
    this.visible_entity = [];

    this.visibility.compute(this.carrier.get_x(), this.carrier.get_y(), RC.MAP_RADIUS,
                            (function(tile_x_, tile_y_, length_from_center_, is_visible_) {
                                // tiles
                                var t = this.terrain.get_tile(tile_x_, tile_y_);
                                t.set_visible(true);
                                t.set_known(true);
                                this.pre_visible_tiles.push([tile_x_, tile_y_]);
                                // entities
                                this.visible_entity = this.visible_entity.concat(this.get_entity_on_tile(tile_x_, tile_y_));
                            }).bind(this));
};

Level.prototype.get_terrain = function() { return this.terrain; };
Level.prototype.get_stain = function() { return this.stain; };
Level.prototype.get_entity = function() { return this.entity; };
Level.prototype.get_avatar = function() { return this.carrier; };
Level.prototype.get_visible_entity = function() { return this.visible_entity; };

Level.prototype.update_levelstat = function(entity_)
{
};

Level.prototype.update_tile_stat = function()
{
    // TODO:
    // Optimize update method - keep the content of this tile_stat and update it.
    // Make 'set' as store of entities on each tile. Moved entity will find own position from
    // tile_stat by their tile_pos_x and tile_pos_y, additionally 'eid (Entity ID)' from 'set' which
    // is included in tile_stat. Then the entity makes to move new position on tile_stat.
    // If the 'set' will be empty, remove it from tile_stat.

    this.tile_stat = {};

    for (var e in this.entity) // XXX need optimize
    {
        var ent = this.entity[e];
        if (this.tile_stat[ent.get_x()] == undefined)
        {
            this.tile_stat[ent.get_x()] = [];
            this.tile_stat[ent.get_x()][ent.get_y()] = [];
            this.tile_stat[ent.get_x()][ent.get_y()][0] = ent;
        }
        else
        {
            if (this.tile_stat[ent.get_x()][ent.get_y()] == undefined)
            {
                this.tile_stat[ent.get_x()][ent.get_y()] = [];
                this.tile_stat[ent.get_x()][ent.get_y()][0] = ent;
            }
            else
            {
                this.tile_stat[ent.get_x()][ent.get_y()][this.tile_stat[ent.get_x()][ent.get_y()].length] = ent;
            }
        }
    }
};

Level.prototype.add_entity_tick = function(entity_) {
    var next_tick = new TickNode(entity_.get_next_tick());
    if (this.tick_bst.contains(next_tick))
    {
        var existing_node = this.tick_bst.search(next_tick).element;
        existing_node.add_entity(entity_);
        return true;
    }
    next_tick.init(entity_.get_next_tick());
    next_tick.add_entity(entity_);
    this.tick_bst.add(next_tick);

    return false;
};

Level.prototype.get_entity_on_tile = function(tile_x_, tile_y_)
{
    if (this.tile_stat[tile_x_] && this.tile_stat[tile_x_][tile_y_])
    { return this.tile_stat[tile_x_][tile_y_]; }
    return [];
};

Level.prototype.set_avatar = function(avatar_)
{
    this.carrier = avatar_.get_actor();

    this.entity[this.entity.length] = this.carrier;
    this.add_entity_tick(this.carrier);
    this.avatar = avatar_;
};

Level.prototype.add_actor = function(actor_)
{
    this.entity[this.entity.length] = actor_;
    this.add_entity_tick(actor_);
};

Level.prototype.add_item = function(item_)
{
    this.entity[this.entity.length] = item_;
    this.add_entity_tick(item_);
};
