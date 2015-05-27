function UISprite(id_, global_command_)
{
    this.global_command = global_command_;
    this.sprite = null;
    this.id = id_;
    this.ui_sprite_type = RC.UI_SPRITE_TYPE.UNDEFINED;
    this.children = [];
};

UISprite.prototype.init_as_menu = function(x_, y_, texture_)
{
    this.sprite = new PIXI.Sprite(texture_);
    this.x = x_;
    this.y = y_;

    this.sprite.position.x = this.x;
    this.sprite.position.y = this.y;

    this.ui_sprite_type = RC.UI_SPRITE_TYPE.MENU;
};

UISprite.prototype.init_as_html = function(x_, y_, url_)
{
    this.sprite = new PIXI.DOM.Sprite('<iframe>', { src: url_ });
    this.sprite.position.x = x_;
    this.sprite.position.y = y_;
    this.ui_sprite_type = RC.UI_SPRITE_TYPE.HTML;
};

UISprite.prototype.init_as_button = function(label_, command_, x_, y_, width_, height_,
                                             texture_)
{
    this.sprite = new PIXI.Sprite(texture_);
    this.x = x_;
    this.y = y_;
    this.command = command_;

    this.sprite.position.x = this.x;
    this.sprite.position.y = this.y;

    this.sprite.width = width_;
    this.sprite.height = height_;

    this.sprite.interactive = true;
    this.sprite.buttonMode = true;

    this.sprite.touchstart = this.sprite.mousedown = (function()
    { this.global_command.add(command_); }).bind(this);

    var textobj = new PIXI.Text(label_, {font:'bold 13pt Arial', fill:'white'});
    this.sprite.addChild(textobj);

    this.ui_sprite_type = RC.UI_SPRITE_TYPE.BUTTON;
};

UISprite.prototype.add = function(child_) {
    this.sprite.addChild(child_.get_sprite());
    this.children.push(child_);
};

UISprite.prototype.get_sprite = function() {
    return this.sprite;
};

UISprite.prototype.get_id = function() {
    return this.id;
};

UISprite.prototype.get_type = function() {
    return this.ui_sprite_type;
};

UISprite.prototype.terminate = function() {
    // for (var i in this.children)
    // {
    //     this.children[i].terminate();
    // }

    switch (this.ui_sprite_type)
    {
    case RC.UI_SPRITE_TYPE.MENU:
        // this.sprite.destroy();
        // this.sprite = null;
        break;
    case RC.UI_SPRITE_TYPE.HTML:
        this.sprite.destroy();
        this.sprite = null;
        break;
    case RC.UI_SPRITE_TYPE.BUTTON:
        // this.sprite.parent.removeChild(this.sprite);
        // this.sprite.destroy();
        // this.sprite = null;
        break;
    }
};

/*
 var input = new PIXI.DOM.Sprite( '<input type="text" placeholder="enter message" />',
 { x: 10, y: 10 } );
 input.tint = 0x444444;
 this.root.addChild(input);
 var iframe = new PIXI.DOM.Sprite( '<iframe>', { src: "http://www.pixijs.com" } );
 iframe.position.x = 100; iframe.position.y = 100;
 iframe.tint = 0x444444;
 this.root.addChild(iframe);

 input.destroy(); input = null; iframe.destroy(); iframe = null;
 */



