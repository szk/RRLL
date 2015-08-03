class MenuScene extends Scene {
    constructor(stat_) {
        super(stat_);

        this.dompanel = null;
        this.asset = null;
    }

    init(asset_, ui_, x_, y_, tags_, cmds_) {
        this.asset = asset_;
        this.ui = ui_;
        this.dompanel = this.asset.gen_dom(this.ui.command_queue, asset_.get_texture(1), x_, y_,
                                           [tags_, cmds_]);
        this.initialized = true;
        return true;
    }

    activate() {
        this.ui.add_sprite(this.dompanel.get_sprite());
        //    var dom = this.dompanel.get_sprite().domElement.contentWindow;
        this.ui.set_keybinding([
            {"keys": "esc", "this": this, "on_keydown" : function() { this.ui.command_queue.add([RC.CMD_ACTOR_ACT.CHANGE_SCENE, RC.NEXT_SCENE.RETURN]); }}
        ]);
    }

    deactivate() {
        this.ui.remove_sprite(this.dompanel.get_sprite());
            //         this.dompanel.terminate();
            //         this.asset.free(this.dompanel);
    }

    update(ui_) {
        var cmd = ui_.get_command_queue().peek();
        ui_.clear_command_queue();
        if (!cmd && !cmd[0] && !cmd[1]) { return RC.NEXT_SCENE.CONTINUE; }

        if (cmd[0] == RC.CMD_ACTOR_ACT.CHANGE_SCENE)
        {
            ui_.clear_command_queue();
            switch (cmd[1])
            {
            case RC.NEXT_SCENE.RETURN:
                console.log('cancel clicked'); return RC.NEXT_SCENE.RETURN;
            case RC.NEXT_SCENE.ACCEPT:
                console.log('ok clicked'); return RC.NEXT_SCENE.RETURN;
            }
            console.log('clicked: ' + cmd[1]);
            return cmd[1];
        }
        else if (cmd[0] == RC.CMD_ACTOR_ACT.TALK) { this.stat.add(cmd[1]); }

        return RC.NEXT_SCENE.CONTINUE;
    }
}
