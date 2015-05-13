function SpriteBuilder() {
    this.map_container = null;
    this.entity_container = null;
    this.fx_container = null;
    this.ui_container = null;
}

SpriteBuilder.prototype.init = function(map_container_, entity_container_,
                                        fx_container_, ui_container_) {
    this.map_container = map_container_;
    this.entity_container = entity_container_;
    this.fx_container = fx_container_;
    this.ui_container = ui_container_;
};

SpriteBuilder.prototype.entity = function() {
};

SpriteBuilder.prototype.tile = function() {
};

SpriteBuilder.prototype.ui = function(resource_) {
    for (var i in resource_)
    {
        var menu_res = resource_[i];
        var test_menu = new Menu;
        test_menu.init(this.ui_container, menu_res.get_global_command(), 100, 200);

        console.log(menu_res.items);

        for (var j in menu_res.items)
        {
            var item = menu_res.items[j];
             test_menu.add_testbutton(item.label,
                                      item.command,
                                      item.x,
                                      item.y);
/*
            menu_res[j].label;
            menu_res[j].command;
            menu_res[j].x;
            menu_res[j].y;
            menu_res[j].width;
            menu_res[j].height;

            var item_x = this.x + x_,
                item_y = this.y + y_;

            this.testmenu = new PIXI.Graphics();
            this.testmenu.beginFill(0xFF0000, 1);
            this.testmenu.drawRect(item_x, item_y, 50, 50);

            this.testmenu.hitArea = new PIXI.Rectangle(item_x, item_y, 50, 50);
            this.testmenu.interactive = true;

            this.testmenu.mousedown = (function()
                                       { this.global_command.add(command_); }).bind(this);

            var textobj = new PIXI.Text(label_, {font:'bold 13pt Arial', fill:'white'});
            textobj.position.x = item_x;
            textobj.position.y = item_y;
            this.testmenu.addChild(textobj);

            this.container.addChild(this.testmenu);
*/
        }



        console.log();
    }
};
