class Overlay {
    constructor() {
    this.brush = new PIXI.Graphics();

    this.ui_container = new PIXI.Container;
    this.fx_container = new PIXI.Container;
    }

    init(){
        this.brush.lineStyle(92, RC.BG, 1);
        this.brush.drawEllipse(512, 330, 540, 270);
        this.fx_container.addChild(this.brush);
    }

    get_uicontainer() {
        return this.ui_container;
    }

    get_fxcontainer() {
        return this.fx_container;
    }
}
