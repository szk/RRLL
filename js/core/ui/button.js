class Button {
    constructor()
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

    get_label() { return this.label; }
    get_color() { return this.color; }
    get_outline() { return this.outline; }
    get_x() { return this.x; }
    get_y() { return this.y; }
    get_width() { return this.width; }
    get_height() { return this.height; }
    get_command() { return this.command; }
    get_texture() { return this.texture; }

    init(label_, command_, x_, y_, width_, height_, texture_)
    {
        this.label = label_;
        this.command = command_; /// XXX
        this.x = x_;
        this.y = y_;
        this.width = width_;
        this.height = height_;

        this.texture = texture_;
    }

    set_appearance()
    {
    }
}
