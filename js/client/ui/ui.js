class UI {
    constructor() {
        this.listener = new window.keypress.Listener();
        this.uicontainer = null;
        this.asset = null;
        this.command_queue = new buckets.Queue();
    }

    init(asset_, container_)
    {
        this.asset = asset_;
        this.uicontainer = container_;

        return true;
    }

    add_sprite(sprite_)
    {
        this.uicontainer.addChild(sprite_);
    }

    remove_sprite(sprite_)
    {
        this.uicontainer.removeChild(sprite_);
    }

    is_command_queued() { return !(this.command_queue.isEmpty()); }
    get_command_queue() { return this.command_queue; }
    clear_command_queue() { this.command_queue.clear(); }

    set_keybinding(key_array_) {
        this.listener.reset();
        this.listener.register_many(key_array_);
    }
}
