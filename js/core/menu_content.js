var MENU = MENU || {};

MENU.MAIN = {
    tag: '<div style="width: 256px;" class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" id="cancel"><span aria-hidden="true" id="cancel">&times;</span></button><h4 class="modal-title">Main menu</h4></div><div class="modal-body"><div class="container-fluid"><div class="row"><button type="button" class="btn btn-default col-xs-offset-2 col-xs-8" id="restart">Restart</button></div><br/><div class="row"><button type="button" class="btn btn-default col-xs-offset-2 col-xs-8" id="sandbox">Sandbox</button></div><br/><div class="row"><button type="button" class="btn btn-default col-xs-offset-2 col-xs-8" id="setting">Setting</button></div><br/><div class="row"><button type="button" class="btn btn-default col-xs-offset-2 col-xs-8" id="about">About</button></div><br/><div class="row"><button type="button" class="btn btn-default col-xs-offset-2 col-xs-8" id="close">Close</button></div><br/></div></div></div></div>',
    command: [['restart', [RC.CMD_SYS.RESTART_SCENE, RC.CMD_MENU_TYPE.CANCEL]],
              ['sandbox', [RC.CMD_SYS.NEXT_SCENE, RC.CMD_MENU_TYPE.CANCEL]],
              ['setting', [RC.CMD_ACTOR_ACT.MENU, RC.CMD_MENU_TYPE.SETTING]],
              ['about', [RC.CMD_ACTOR_ACT.MENU, RC.CMD_MENU_TYPE.ABOUT]],
              ['cancel', [RC.CMD_ACTOR_ACT.MENU, RC.CMD_MENU_TYPE.CANCEL]],
              ['close', [RC.CMD_ACTOR_ACT.MENU, RC.CMD_MENU_TYPE.CANCEL]],
              ['ok', [RC.CMD_ACTOR_ACT.MENU, RC.CMD_MENU_TYPE.OK]]]
};

MENU.SETTING = {
    tag: '<div style="width: 768px;" class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close" id="cancel"><span aria-hidden="true" id="cancel">&times;</span></button><h4 class="modal-title">Setting</h4></div><div class="modal-body"><p>One fine body&hellip;</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal" id="close">Close</button><button type="button" class="btn btn-primary" id="ok">Save changes</button></div></div></div>',
    command: [['cancel', [RC.CMD_ACTOR_ACT.MENU, RC.CMD_MENU_TYPE.CANCEL]],
              ['close', [RC.CMD_ACTOR_ACT.MENU, RC.CMD_MENU_TYPE.CANCEL]],
              ['ok', [RC.CMD_ACTOR_ACT.MENU, RC.CMD_MENU_TYPE.OK]]]
};

MENU.ABOUT = {
    tag: '<div style="width: 768px;" class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close" id="cancel"><span aria-hidden="true" id="cancel">&times;</span></button><h4 class="modal-title">About</h4></div><div class="modal-body"><p>One fine body&hellip;</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal" id="close">Close</button><button type="button" class="btn btn-primary" id="ok">Save changes</button></div></div></div>',
    command: [['cancel', [RC.CMD_ACTOR_ACT.MENU, RC.CMD_MENU_TYPE.CANCEL]],
              ['close', [RC.CMD_ACTOR_ACT.MENU, RC.CMD_MENU_TYPE.CANCEL]],
              ['ok', [RC.CMD_ACTOR_ACT.MENU, RC.CMD_MENU_TYPE.OK]]]
};
