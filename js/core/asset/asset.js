function Asset(image_atlas_url_) {
    this.load_base_completed = false;
    this.load_variable_completed = false;

    // Load image from image atras
    this.texture_array = new Array(16385);
    this.gen_texture(image_atlas_url_);

    this.id_pool = new IdPool();
    this.id_bst = new buckets.BSTree(function(l_, r_)
                                     { if (l_.get_id() < r_.get_id()) { return -1; }
                                       else if (l_.get_id() === r_.get_id()) { return 0; }
                                       return 1; });

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

Asset.prototype.free = function(entry_)
{
    console.log('freeing' + entry_.get_id());
    entry_.get_sprite().renderable = false;

//     entry_.get_id();
//     this.id_pool.free_id(id_);
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

// basically, generate by inside of scene
Asset.prototype.gen_menu = function(cmd_queue_, texture_, x_, y_, item_array_)
{
    var menu_sprite = new UISprite(this.id_pool.get_id(), cmd_queue_);
    this.id_bst.add(menu_sprite);

    if (this.is_url(item_array_[0]))
    {
        menu_sprite.init_as_html(x_, y_, item_array_[0]);
        return menu_sprite;
    }
    else
    { menu_sprite.init_as_menu(x_, y_, this.get_texture(texture_)); }

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
        menu_sprite.get_sprite().addChild(item_sprite.get_sprite());
    }
    return menu_sprite;
};

Asset.prototype.is_url = function(url_)
{
    if (url_.match == undefined) { return false; }
    return url_.match( /^https?:\/\// );
    /*
    var div, elm;
    div = document.getElementById( "info" );
    elm = document.createElement( "a" );
    elm.setAttribute( "href", url_);
    if( elm.protocol.match( /^https?:$/ ) || elm.protocol === ":" || elm.protocol === "" ){
        elm.appendChild(document.createTextNode(url_));
        div.appendChild(elm);
    }
    */
};


/*
SpriteBuilder.prototype.dom = function(resource_) {
    var input = new PIXI.DOM.Sprite( '<input type="text" placeholder="enter message" />',
                                     { x: 10, y: 10 } );
    this.ui_container.addChild(input);

    var button = new PIXI.DOM.Sprite( '<button style="font-size: 150%; color: red;" onclick="console.log(this);">oohoho</button>',
                                     { x: 100, y: 40 } );
    this.ui_container.addChild(button);

    console.log(input.domElement);
    console.log(input.domElement);// check 'value'

    var iframe = new PIXI.DOM.Sprite( '<iframe>', { src: "http://www.pixijs.com" } );
    iframe.position.x = 100; iframe.position.y = 100;
    this.ui_container.addChild(iframe);

//     input.destroy(); input = null; iframe.destroy(); iframe = null;
};
*/



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
                newavatar.init(this.id_pool.get_id(), avatar_type,
                               new PIXI.Sprite(this.get_texture(131)),
                               parseInt(entry_[i].avatar[avatar_type][avtr].x),
                               parseInt(entry_[i].avatar[avatar_type][avtr].y));
                level.set_avatar(newavatar);
                this.id_bst.add(newavatar);
            }
        }
        for (var actor_type in entry_[i].actor)
        {
            for (var actr in entry_[i].actor[actor_type])
            {
                var newactor = clone(this.find_actor_(actor_type));
                newactor.init(this.id_pool.get_id(), actor_type,
                              new PIXI.Sprite(this.get_texture(128)),
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
