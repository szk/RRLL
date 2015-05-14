function MenuItem()
{
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;

    this.texture = null;

    this.label = null;
    this.color = 0x000000;
    this.outline = 0x00000;

    this.command = null;
}

MenuItem.prototype.get_label = function() { return this.label; };
MenuItem.prototype.get_color = function() { return this.color; };
MenuItem.prototype.get_outline = function() { return this.outline; };
MenuItem.prototype.get_x = function() { return this.x; };
MenuItem.prototype.get_y = function() { return this.y; };
MenuItem.prototype.get_width = function() { return this.width; };
MenuItem.prototype.get_height = function() { return this.height; };
MenuItem.prototype.get_command = function() { return this.command; };
MenuItem.prototype.get_texture = function() { return this.texture; };

MenuItem.prototype.init = function(label_, command_, x_, y_, width_, height_, texture_)
{
    this.label = label_;
    this.command = command_; /// XXX
    this.x = x_;
    this.y = y_;
    this.width = width_;
    this.height = height_;

    this.texture = texture_;
};

MenuItem.prototype.set_appearance = function()
{
};

