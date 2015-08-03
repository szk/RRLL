class Scene {
    constructor(stat_) {
        this.avatar = null;
        this.level = null;
        this.initialized = false;
        this.panels = [];
        this.ui = null;

        this.stat = stat_;
    }

    init(asset_, ui_) {
        this.initialized = true;
        this.asset = asset_;
        this.ui = ui_;
        return true;
    }

    activate() {
        console.log('activate of base class is called');
    }

    deactivate() {
        console.log('activate of base class is called');
    }

    update(ui_) {
    }

    get_avatar() {
        return this.avatar;
    }

    get_level() {
        return this.level;
    }
}
