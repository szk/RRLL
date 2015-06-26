class RankingScene extends Scene {
    constructor() {
        super();
        this.panels = [];
    }

    init(asset_, ui_) {
        return true;
    }

    activate()
    {
    }

    deactivate()
    {
    }

    update(ui_) {
        return RC.NEXT_SCENE.CONTINUE;
    }
}
