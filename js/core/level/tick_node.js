function TickNode(tick_) {
    this.tick = tick_;
    this.entities = [];
}

TickNode.prototype.init = function(tick_) {
    this.tick = tick_;
    this.entities = [];
};

TickNode.prototype.get_tick = function() {
    return this.tick;
};

TickNode.prototype.get_entities = function() {
    return this.entities;
};

TickNode.prototype.add_entity = function(entity_) {
    this.entities.push(entity_);
};

TickNode.prototype.remove_entity = function(entity_) {
};

TickNode.prototype.clear = function() {
    this.entities.clear();
};
