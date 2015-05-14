function UISprite(global_command_)
{
    this.global_command = global_command_;
    this.sprite = null;
};

UISprite.prototype.init_as_menu = function(x_, y_, texture_)
{
    this.sprite = new PIXI.Sprite(texture_);
    this.x = x_;
    this.y = y_;

    this.sprite.position.x = this.x;
    this.sprite.position.y = this.y;
};

UISprite.prototype.init_as_button = function(label_, command_, x_, y_, width_, height_,
                                             texture_)
{
    console.log(arguments);
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
};

UISprite.prototype.get_sprite = function() {
    return this.sprite;
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