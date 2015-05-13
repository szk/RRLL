function Overlay() {
    this.brush = new PIXI.Graphics();

    this.ui_container = new PIXI.Container;
    this.fx_container = new PIXI.Container;
}

Overlay.prototype.init = function() {
    this.brush.lineStyle(92, RC.BG, 1);
    this.brush.drawEllipse(512, 330, 540, 270);
    this.fx_container.addChild(this.brush);
};

Overlay.prototype.get_uicontainer = function() {
    return this.ui_container;
};

Overlay.prototype.get_fxcontainer = function() {
    return this.fx_container;
};
