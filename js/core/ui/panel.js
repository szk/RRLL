class Panel {
    constructor() {
        this.global_command = null;
        this.texture = null;
        this.x = this.y = 0;
        this.items = [];

        this.mid = null;
    }

    init(id_, command_, texture_, x_, y_) {
        this.global_command = command_;
        this.texture = texture_;
        this.url = null;
        this.x = x_;
        this.y = y_;
        this.id = id_;

        return this.id;
    }

    init_html(id_, command_, url_, x_, y_) {
        this.global_command = command_;
        this.texture = null;
        this.url = url_;
        this.x = x_;
        this.y = y_;
        this.id = id_;

        return this.id;
    }

    add_item(button_) {
        this.items.push(button_);
    }

    get_global_command() { return this.global_command; }
    get_texture() { return this.texture; }
    get_x() { return this.x; }
    get_y() { return this.y; }
    get_url() { return this.url; }
}
