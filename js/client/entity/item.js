class Item extends Entity {
    constructor() {
        super();
    }

    init(eid_, type_, sprite_, x_, y_, flag_)
    {
        super.init(eid_, type_, sprite_, x_, y_, flag_);
        super.next_tick = 15;
    }

    action(current_tick_) {
        ;
    }
}
