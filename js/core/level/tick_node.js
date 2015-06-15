class TickNode {
    constructor(tick_) {
        this.tick = tick_;
        this.entities = [];
    }

    init(tick_) {
        this.tick = tick_;
        this.entities = [];
    }

    get_tick() {
        return this.tick;
    }

    get_entities() {
        return this.entities;
    }

    add_entity(entity_) {
        this.entities.push(entity_);
    }

    remove_entity(entity_) {
    }

    clear() {
        this.entities.clear();
    }
}
