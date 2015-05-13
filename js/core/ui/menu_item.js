function MenuItem()
{
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;

    this.label = null;
    this.color = 0x000000;
    this.outline = 0x00000;

    this.command = null;
}

MenuItem.prototype.get_label = function() { return this.label; };
MenuItem.prototype.get_color = function() { return this.label; };
MenuItem.prototype.get_outline = function() { return this.label; };
MenuItem.prototype.get_x = function() { return this.label; };
MenuItem.prototype.get_y = function() { return this.label; };
MenuItem.prototype.get_width = function() { return this.label; };
MenuItem.prototype.get_height = function() { return this.label; };
MenuItem.prototype.get_command = function() { return this.command; };

MenuItem.prototype.init = function(label_, command_, x_, y_, width_, height_)
{
    this.label = label_;
    this.command = command_; /// XXX
    this.x = x_;
    this.y = y_;
    this.width = width_;
    this.height = height_;
};

MenuItem.prototype.set_appearance = function()
{
};

