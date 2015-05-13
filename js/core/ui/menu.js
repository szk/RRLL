function Menu() {
    this.container = null;
    this.global_command = null;
    this.x = this.y = 0;
    this.items = [];
}

Menu.prototype.init = function(container_, command_, x_, y_) {
    this.container = container_;
    this.global_command = command_;

    this.x = x_;
    this.y = y_;
};

Menu.prototype.add_item = function(menu_item_) {
    this.items.push(menu_item_);
};

Menu.prototype.get_global_command = function() { return this.global_command; };

Menu.prototype.add_testbutton = function(label_, command_, x_, y_) {
    var item_x = this.x + x_,
        item_y = this.y + y_;

    this.testmenu = new PIXI.Graphics();
    this.testmenu.beginFill(0xFF0000, 1);
    this.testmenu.drawRect(item_x, item_y, 50, 50);

    this.testmenu.hitArea = new PIXI.Rectangle(item_x, item_y, 50, 50);
    this.testmenu.interactive = true;

    this.testmenu.touchstart = this.testmenu.mousedown = (function()
    { console.log(command_); this.global_command.add(command_); }).bind(this);

    var textobj = new PIXI.Text(label_, {font:'bold 13pt Arial', fill:'white'});
    textobj.position.x = item_x;
    textobj.position.y = item_y;
    this.testmenu.addChild(textobj);

    this.container.addChild(this.testmenu);
};
