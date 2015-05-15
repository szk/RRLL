function Asset(image_atlas_url_) {
    this.load_base_completed = false;
    this.load_variable_completed = false;

    // Load image from image atras
    this.texture_array = new Array(16385);
    this.gen_texture(image_atlas_url_);

    this.eid_pool = new IdPool();

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
    this.load_base(["data/humanoid.json"], this.actor_template);
    this.load_variable(level_url_, this.actor_template, this.build_default);

    return true;
};

Asset.prototype.load_base = function(assets_json_url_, template_) {
    return;
/*
    // create a new loader
    var loader = new PIXI.AssetLoader(assets_json_url_);
    // use callback
    loader.onComplete = on_base_loaded;
    //begin load
    loader.load();

    // this.base_load_completed = false;
    function on_base_loaded()
    {
        var spine = new PIXI.Spine("data/humanoid.json");

        // set current skin
        spine.skeleton.setSlotsToSetupPose();

        // set the position
        spine.position.x = window.innerWidth/2;
        spine.position.y = window.innerHeight;

        spine.scale.x = spine.scale.y = window.innerHeight / 400;

        // play animation
        spine.state.setAnimationByName(0, "walk", true);
        // spine.skeleton.data.skins.attachments
        // for (i = 0; i < spine.getChildIndex(); ++i) {}

        template_['Humanoid'] = new Humanoid(spine);
        // template_['Humanoid'].set_head(global_texture);
        // stage_.addChild(template_['Humanoid'].spine);
        load_base_completed = true;
    }
*/
};

Asset.prototype.load_variable = function(variables_json_url_, template_, builder_)
{
    // create a new loader
    var loader = PIXI.loader;
    loader.reset();
    loader.add('json', variables_json_url_);
    loader.once('complete', on_variable_loaded.bind(this));

    var o = this;
    //begin load
    loader.load(function (loader_, res_)
                {
                    // XXX dirty
                    if (res_.json.isJson) { builder_.apply(o, [res_.json.data]); }
                    else { builder_.apply(o, [JSON.parse(res_.json.data)]); }
                });

    function on_variable_loaded(e_)
    {
        this.load_variable_completed = true;
        this.load_base_completed = true; // TEMPORARY
    }
};

Asset.prototype.build_default = function(src_)
{
    if (!src_) { return false; }
    // item
    this.gen_item(src_.item);
    // terrain
    this.gen_terrain(src_.terrain);
    // avatar
    this.gen_avatar(src_.avatar);
    // actor
    this.gen_actor(src_.actor);
    // level
    this.gen_level(src_.level);

    // make ui and keybind


    return true;
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
        this.avatar_template[type_name] = new Avatar();
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
        this.actor_template[type_name] = new Actor();
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
                var newavatar = clone(this.find_avatar_(avatar_type));
                newavatar.init(this.eid_pool.get_id(), avatar_type,
                               new PIXI.Sprite(this.get_texture(131)),
                               parseInt(entry_[i].avatar[avatar_type][avtr].x),
                               parseInt(entry_[i].avatar[avatar_type][avtr].y));
                level.set_avatar(newavatar);
            }
        }
        for (var actor_type in entry_[i].actor)
        {
            for (var actr in entry_[i].actor[actor_type])
            {
                var newactor = clone(this.find_actor_(actor_type));
                newactor.init(this.eid_pool.get_id(), actor_type,
                              new PIXI.Sprite(this.get_texture(128)),
                              parseInt(entry_[i].actor[actor_type][actr].x),
                              parseInt(entry_[i].actor[actor_type][actr].y), 3);
                level.add_actor(newactor);
            }
        }
        for (var item_type in entry_[i].item)
        {
            for (var itm in entry_[i].item[item_type])
            {
                var newitem = clone(this.find_item_(item_type));
                newitem.init(this.eid_pool.get_id(), item_type,
                             new PIXI.Sprite(this.get_texture(130)),
                             parseInt(entry_[i].item[item_type][itm].x),
                             parseInt(entry_[i].item[item_type][itm].y));
                level.add_item(newitem);
            }
        }

    }
    return this.level.length;
};
