class UISprite {
    constructor(id_, global_command_) {
        this.global_command = global_command_;
        this.sprite = null;
        this.id = id_;
        this.ui_sprite_type = RC.UI_SPRITE_TYPE.UNDEFINED;
        this.children = [];
    }

    init_as_panel(x_, y_, texture_)
    {
        this.sprite = new PIXI.Sprite(texture_);
        this.x = x_;
        this.y = y_;

        this.sprite.position.x = this.x;
        this.sprite.position.y = this.y;

        this.ui_sprite_type = RC.UI_SPRITE_TYPE.PANEL;
    }

    init_as_dom(x_, y_, tag_, events_)
    {
        var dom_ev = {
            click: function(e_) {
                var evt = e_ || window.event;
                var tgt = evt.target;// || evt.srcElement; // XXX for IE
                for (var i in events_)
                {
                    if (tgt.id == events_[i][0])
                    {
                        // console.log(tgt.id);
                        // console.log(tgt.value);
                        this.global_command.add(events_[i][1]);
                    }
                }
            }.bind(this)
        };

        this.sprite = new PIXI.DOM.Sprite(tag_, { x: x_, y: y_,
                                                  events: { click: dom_ev.click}});
        this.sprite.position.x = x_;
        this.sprite.position.y = y_;
        this.ui_sprite_type = RC.UI_SPRITE_TYPE.DOM;
    }

    init_as_button(label_, command_, x_, y_, width_, height_,
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
    }

    add(child_) {
        this.sprite.addChild(child_.get_sprite());
        this.children.push(child_);
    }

    get_sprite() {
        return this.sprite;
    }

    get_id() {
        return this.id;
    }

    get_type() {
        return this.ui_sprite_type;
    }

    activate() {
    }

    deactivate() {
        // for (var i in this.children)
        // {
        //     this.children[i].terminate();
        // }

        switch (this.ui_sprite_type)
        {
        case RC.UI_SPRITE_TYPE.PANEL:
            // this.sprite.destroy();
            // this.sprite = null;
            break;
        case RC.UI_SPRITE_TYPE.DOM:
            this.sprite.destroy();
            this.sprite = null;
            break;
        case RC.UI_SPRITE_TYPE.BUTTON:
            // this.sprite.parent.removeChild(this.sprite);
            // this.sprite.destroy();
            // this.sprite = null;
            break;
        }
    }
}
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
