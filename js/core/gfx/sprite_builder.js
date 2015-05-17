function SpriteBuilder() {
    this.map_container = null;
    this.entity_container = null;
    this.fx_container = null;
    this.ui_container = null;
}

SpriteBuilder.prototype.init = function(map_container_, entity_container_,
                                        fx_container_, ui_container_) {
    this.asset = this.asset_;
    this.map_container = map_container_;
    this.entity_container = entity_container_;
    this.fx_container = fx_container_;
    this.ui_container = ui_container_;
};

SpriteBuilder.prototype.entity = function() {
};

SpriteBuilder.prototype.tile = function() {
};

SpriteBuilder.prototype.ui = function(res_) {
    return;
    for (var i in res_)
    {
        var menu_res = res_[i];
        var menu_sprite = new UISprite(this.id_pool.get_id(), menu_res.get_global_command());
        menu_sprite.init_as_menu(menu_res.get_x(), menu_res.get_y(), menu_res.get_texture());

        this.ui_container.addChild(menu_sprite.get_sprite());

        for (var j in menu_res.items)
        {
            var item = menu_res.items[j];
            var item_sprite = new UISprite(this.id_pool.get_id(), menu_res.get_global_command());
            item_sprite.init_as_button(item.get_label(), item.get_command(),
                                       item.get_x(), item.get_y(),
                                       item.get_width(), item.get_height(), item.get_texture());
            var sprite = menu_sprite.get_sprite();
            sprite.addChild(item_sprite.get_sprite());
        }
    }
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
