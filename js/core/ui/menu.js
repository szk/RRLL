function Menu() {
    this.global_command = null;
    this.texture = null;
    this.x = this.y = 0;
    this.items = [];
}

Menu.prototype.init = function(command_, texture_, x_, y_) {
    this.global_command = command_;
    this.texture = texture_;
    this.x = x_;
    this.y = y_;
};

Menu.prototype.add_item = function(menu_item_) {
    this.items.push(menu_item_);
};

Menu.prototype.get_global_command = function() { return this.global_command; };
Menu.prototype.get_texture = function() { return this.texture; };
Menu.prototype.get_x = function() { return this.x; };
Menu.prototype.get_y = function() { return this.y; };
