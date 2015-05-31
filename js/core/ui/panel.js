function Panel() {
    this.global_command = null;
    this.texture = null;
    this.x = this.y = 0;
    this.items = [];

    this.mid = null;
}

Panel.prototype.init = function(id_, command_, texture_, x_, y_) {
    this.global_command = command_;
    this.texture = texture_;
    this.url = null;
    this.x = x_;
    this.y = y_;
    this.id = id_;

    return this.id;
};

Panel.prototype.init_html = function(id_, command_, url_, x_, y_) {
    this.global_command = command_;
    this.texture = null;
    this.url = url_;
    this.x = x_;
    this.y = y_;
    this.id = id_;

    return this.id;
};

Panel.prototype.add_item = function(button_) {
    this.items.push(button_);
};

Panel.prototype.get_global_command = function() { return this.global_command; };
Panel.prototype.get_texture = function() { return this.texture; };
Panel.prototype.get_x = function() { return this.x; };
Panel.prototype.get_y = function() { return this.y; };
Panel.prototype.get_url = function() { return this.url; };
