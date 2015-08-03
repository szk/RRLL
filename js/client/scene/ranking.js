class RankingScene extends Scene {
    constructor() {
        super();
        this.panels = [];
    }

    init(asset_, ui_) {
        return true;
    }

    activate(ui_)
    {
    }

    deactivate()
    {
    }

    update(ui_) {
        return RC.NEXT_SCENE.CONTINUE;
    }
}
