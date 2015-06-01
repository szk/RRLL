function Button()
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

Button.prototype.get_label = function() { return this.label; };
Button.prototype.get_color = function() { return this.color; };
Button.prototype.get_outline = function() { return this.outline; };
Button.prototype.get_x = function() { return this.x; };
Button.prototype.get_y = function() { return this.y; };
Button.prototype.get_width = function() { return this.width; };
Button.prototype.get_height = function() { return this.height; };
Button.prototype.get_command = function() { return this.command; };
Button.prototype.get_texture = function() { return this.texture; };

Button.prototype.init = function(label_, command_, x_, y_, width_, height_, texture_)
{
    this.label = label_;
    this.command = command_; /// XXX
    this.x = x_;
    this.y = y_;
    this.width = width_;
    this.height = height_;

    this.texture = texture_;
};

Button.prototype.set_appearance = function()
{
};

