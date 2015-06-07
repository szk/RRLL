function Asset(base_texture_img_) {
    this.load_base_completed = false;
    this.load_variable_completed = false;

    // Load base texture
    this.texture_array = new Array(16385);
    this.gen_texture(base_texture_img_);

    this.id_pool = new IdPool();
    this.id_bst = new buckets.BSTree(function(l_, r_)
                                     { if (l_.get_id() < r_.get_id()) { return -1; }
                                       else if (l_.get_id() === r_.get_id()) { return 0; }
                                       return 1; });
    // base
    this.appearance_template = {};

    // variable
    this.terrain = {};
    this.level = {};
    this.avatar_template = {};
    this.actor_template = {};
    this.item_template = {};

    // XXX dirty
    var load_base_interval = setInterval(poll_base_readying.bind(this), 200);
    function poll_base_readying()
    {
        if (!this.load_base_completed) { return; }
        clearInterval(load_base_interval);

        // go next step
        var load_variable_interval = setInterval(poll_variable_readying.bind(this), 200);
        function poll_variable_readying()
        {
            if (!this.load_variable_completed) { return; }
            clearInterval(load_variable_interval);
        }
    }
}

Asset.prototype.is_load_base_completed = function()
{
    return this.load_base_completed;
};

Asset.prototype.is_load_variable_completed = function()
{
    return this.load_variable_completed;
};

Asset.prototype.get_texture = function(id_)
{
    return this.texture_array[id_];
};

Asset.prototype.find_level = function(name_) { return this.level[name_]; };
Asset.prototype.find_terrain = function(name_) { return this.terrain[name_]; };
Asset.prototype.find_avatar_ = function(name_) { return this.avatar_template[name_]; };
Asset.prototype.find_actor_ = function(name_) { return this.actor_template[name_]; };
Asset.prototype.find_item_ = function(name_) { return this.item_template[name_]; };

Asset.prototype.init = function(level_url_)
{
    // load external data
    var loader = PIXI.loader;
    loader.reset();
    this.load_base("data/humanoid.json", level_url_, loader, this.build_base);

    return true;
};

Asset.prototype.load_base = function(base_json_url_, var_json_url_, loader_, builder_) {
    // create a new loader
    loader_.add('base_json', base_json_url_).load(on_base_loaded.bind(this));
    loader_.once('complete', next_assets.bind(this));

    var o = this;

    // refer http://pixijs.github.io/examples/index.html
    function on_base_loaded(loader_, res_)
    {
        // XXX dirty
        if (res_.base_json.isJson) { builder_.apply(o, [res_.base_json]); }
        else { builder_.apply(o, [JSON.parse(res_.base_json.data)]); }
        this.load_base_completed = true;
    };

    function next_assets()
    {
        console.log('next_assets');
        this.load_variable(var_json_url_, loader_, this.build_variable);
    }

    return;
};

Asset.prototype.load_variable = function(variables_json_url_, loader_, builder_)
{
    // create a new loader
    loader_.add('var_json', variables_json_url_).load(on_var_loaded.bind(this));
    loader_.once('complete', on_variable_loaded.bind(this));

    var o = this;
    //begin load
    function on_var_loaded(loader_, res_)
                {
                    // XXX dirty
                    if (res_.var_json.isJson) { builder_.apply(o, [res_.var_json.data]); }
                    else { builder_.apply(o, [JSON.parse(res_.var_json.data)]); }
                };

    function on_variable_loaded(e_)
    { this.load_variable_completed = true; }
};

Asset.prototype.build_base = function(src_)
{
    var spine = new PIXI.spine.Spine(src_.spineData);
    // set current skin
    spine.skeleton.setSlotsToSetupPose();

    // set the position
    spine.position.x = window.innerWidth/2;
    spine.position.y = window.innerHeight;

    // play animation
    spine.state.setAnimationByName(0, "walk", true);
    // spine.skeleton.data.skins.attachments
    // for (i = 0; i < spine.getChildIndex(); ++i) {}

    this.appearance_template['humanoid'] = new Humanoid(spine);
};

Asset.prototype.build_variable = function(src_)
{
    if (!src_) { return false; }
    // item
    this.gen_item(src_.item);
    // terrain
    this.gen_terrain(src_.terrain);
    // actor
    this.gen_actor(src_.actor);
    // avatar
    this.gen_avatar(src_.avatar);
    // level
    this.gen_level(src_.level);

    // make ui and keybind


    return true;
};

Asset.prototype.free = function(entry_)
{
    console.log('freeing' + entry_.get_id());
    this.id_pool.free_id(entry_.get_id());
    // entry_.get_sprite().renderable = false;
};

Asset.prototype.gen_texture = function(image_)
{
    var atras_image = PIXI.BaseTexture.fromImage(image_);
    for (var i = 0; i < 256; ++i)
    {
        this.texture_array[i] = new PIXI.Texture(atras_image,
                                                 new PIXI.Rectangle(i % 128 * 16, i / 128 * 16,
                                                                    16, 16));
    }
};

Asset.prototype.gen_panel = function(cmd_queue_, texture_, x_, y_, item_array_)
{
    var panel_sprite = new UISprite(this.id_pool.get_id(), cmd_queue_);
    this.id_bst.add(panel_sprite);
    panel_sprite.init_as_panel(x_, y_, this.get_texture(texture_));
    for (var i in item_array_)
    {
        var item_sprite = new UISprite(this.id_pool.get_id(), cmd_queue_);

        item_sprite.init_as_button(item_array_[i][0], // label
                                   item_array_[i][1], // command
                                   item_array_[i][2], // x
                                   item_array_[i][3], // y
                                   item_array_[i][4], // width
                                   item_array_[i][5], // height
                                   item_array_[i][6]); // texture
        panel_sprite.add(item_sprite);
    }
    return panel_sprite;
};

Asset.prototype.gen_dom = function(cmd_queue_, texture_, x_, y_, item_array_)
{
    var dom_sprite = new UISprite(this.id_pool.get_id(), cmd_queue_);
    this.id_bst.add(dom_sprite);
    dom_sprite.init_as_dom(x_, y_, item_array_[0], item_array_[1]);
    return dom_sprite;
};

// need validation
Asset.prototype.gen_item = function(entry_)
{
    if (!entry_) { return 0; }

    for (var i = 0; i < entry_.length; ++i)
    {
        var type_name = null;
        for (var key in entry_[i]) { type_name = key; }
        this.item_template[type_name] = new Item(type_name, new PIXI.Sprite(this.get_texture(128)),
                                                 0, 0);

    }
    return 1;
};

Asset.prototype.gen_terrain = function(entry_)
{
    if (!entry_) { return 0; }

    for (var i = 0; i < entry_.length; ++i)
    {
        this.terrain[entry_[i].name] = new Terrain(51, 51,
                                                   this.get_texture(parseInt(entry_[i].blank_texture_id)));
        this.terrain[entry_[i].name].load(entry_[i].chip,
                                          this.get_texture(parseInt(entry_[i].fg_texture_id)),
                                          this.get_texture(parseInt(entry_[i].bg_texture_id)));
    }
    return this.terrain.length;
};

Asset.prototype.gen_avatar = function(entry_)
{
    if (!entry_) { return 0; }

    for (var i = 0; i < entry_.length; ++i)
    {
        var type_name = null;
        for (var key in entry_[i]) { type_name = key; }
        var new_avatar = new Avatar();

        new_avatar.init(clone(this.find_actor_([entry_[i][type_name]['actor']])));
        this.avatar_template[type_name] = new_avatar;
//         console.log('actor: ' + this.actor_template[entry_[i][type_name]['actor']]);
    }
    return this.avatar_template.length;
};

Asset.prototype.gen_actor = function(entry_)
{
    if (!entry_) { return 0; }

    for (var i = 0; i < entry_.length; ++i)
    {
        var type_name = null;
        for (var key in entry_[i]) { type_name = key; }
        var new_actor = new Actor();

        new_actor.create(type_name,
                         entry_[i][type_name]['appearance'],
                         entry_[i][type_name]['health'],
                         entry_[i][type_name]['energy']);
        this.actor_template[type_name] = new_actor;
    }
    return this.actor_template.length;
};


Asset.prototype.gen_level = function(entry_)
{
    if (!entry_) { return 0; }

    for (var i = 0; i < entry_.length; ++i)
    {
        var level = new Level(parseInt(entry_[i].width), parseInt(entry_[i].height),
                              this.get_texture(parseInt(entry_[i].texture_id)));
        this.level[entry_[i].name] = level;

        for (var avatar_type in entry_[i].avatar)
        {
            for (var avtr in entry_[i].avatar[avatar_type])
            {
                var base_avatar = clone(this.find_avatar_(avatar_type));
                var newavatar = base_avatar.get_actor();
                var newsp = this.appearance_template['humanoid'].get_spine();
                this.appearance_template['humanoid'].set_head(this.get_texture(131));

                // avatar and actors should have these (own) clones.
                console.log(newsp.state);
                console.log(newsp.slotContainers);

                newavatar.init(this.id_pool.get_id(), avatar_type,
                               newsp, // new PIXI.Sprite(this.get_texture(131)),
                               parseInt(entry_[i].avatar[avatar_type][avtr].x),
                               parseInt(entry_[i].avatar[avatar_type][avtr].y));
                newavatar.set_next_tick(0);
                newavatar.set_flag(1);
                level.set_avatar(base_avatar);
                this.id_bst.add(newavatar);
            }
        }
        for (var actor_type in entry_[i].actor)
        {
            for (var actr in entry_[i].actor[actor_type])
            {
                var newactor = clone(this.find_actor_(actor_type));
                var news = this.appearance_template['humanoid'].get_spine();
                newactor.init(this.id_pool.get_id(), actor_type,
                              news,
//                               new PIXI.Sprite(this.get_texture(128)),
                              parseInt(entry_[i].actor[actor_type][actr].x),
                              parseInt(entry_[i].actor[actor_type][actr].y), 3);
                level.add_actor(newactor);
                this.id_bst.add(newactor);
            }
        }
        for (var item_type in entry_[i].item)
        {
            for (var itm in entry_[i].item[item_type])
            {
                var newitem = clone(this.find_item_(item_type));
                newitem.init(this.id_pool.get_id(), item_type,
                             new PIXI.Sprite(this.get_texture(130)),
                             parseInt(entry_[i].item[item_type][itm].x),
                             parseInt(entry_[i].item[item_type][itm].y));
                level.add_item(newitem);
                this.id_bst.add(newitem);
            }
        }

    }
    return this.level.length;
};
