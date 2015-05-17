function SpriteBuilder() {
    this.map_container = null;
    this.entity_container = null;
    this.fx_container = null;
    this.ui_container = null;
}

SpriteBuilder.prototype.init = function(map_container_, entity_container_,
                                        fx_container_, ui_container_) {
    this.asset = this.asset_;
    this.map_container = map_container_;
    this.entity_container = entity_container_;
    this.fx_container = fx_container_;
    this.ui_container = ui_container_;
};

SpriteBuilder.prototype.entity = function() {
};

SpriteBuilder.prototype.tile = function() {
};

SpriteBuilder.prototype.ui = function(res_) {
};
