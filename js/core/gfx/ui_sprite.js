function UISprite() {
};

UISprite.prototype = Object.create(PIXI.Sprite.prototype);
UISprite.prototype.constructor = UISprite;

UISprite.prototype.init = function(label_, command_, x_, y_)
{
    var item_x = this.x + x_,
        item_y = this.y + y_;

    this.testmenu = new PIXI.Graphics();
    this.testmenu.beginFill(0xFF0000, 1);
    this.testmenu.drawRect(item_x, item_y, 50, 50);

    this.testmenu.hitArea = new PIXI.Rectangle(item_x, item_y, 50, 50);
    this.testmenu.interactive = true;

    this.testmenu.touchstart = this.testmenu.mousedown = (function()
    { this.global_command.add(command_); }).bind(this);

    var textobj = new PIXI.Text(label_, {font:'bold 13pt Arial', fill:'white'});
    textobj.position.x = item_x;
    textobj.position.y = item_y;
    this.testmenu.addChild(textobj);

    this.container.addChild(this.testmenu);
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