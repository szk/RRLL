// type.js
var RC = RC || {};
RC.SCENE_MODE = {
    LOADING:0,
    INTRO:1, // including title
    PLAYING:2,
    GAMEOVER:3,
    RANKING:4
};
RC.ENTITY_TYPE = {
    ROOT:0, // for asset
    HUMANOID:1, MULTILEG:2, NOLEG:3, // for actor
    EQUIPMENT:4, ITEM:5, // for item
    WALL:6, STRUCTURE:7 // for terrain
};

RC.TILE_SCREEN_WIDTH = 45.0;
RC.TILE_SCREEN_HEIGHT = 22.5;

RC.TERRAIN_WIDTH = 50;
RC.TERRAIN_HEIGHT = 50;
RC.TERRAIN_WALL_DIR = {
    NOTHING:0,
    NORTH:1,
    SOUTH:2,
    EAST:4,
    WEST:8
};

RC.TEXTURE_CATEGORY = {
    HEAD:0,
    TORSO:1,
    ARM:2,
    LEG:3,
    PART:4,
    BODY:5,
    WEAPON:6,
    ARMOR:7,
    CONSUMABLE:8,
    TOOL:9
};

RC.NEXT_SCENE = {
    CONTINUE: 0,
    MAINMENU: 1,
    SETTINGMENU: 2,
    ABOUTMENU: 3,
    GAMEOVER: 4,
    INTRO: 5,
    LOADING: 6,
    PLAYING: 7,
    RANKING: 8,
    RETURN: 9
};

RC.CMD_SYS = {
    NEXT_SCENE: 0,
    POP_SCENE: 1,
    RESTART_SCENE: 2
};

RC.CMD_MENU_TYPE = {
    MAIN: 1,
    SETTING: 2,
    ABOUT: 3,
    INVENTRY: 4,
    CANCEL: 5,
    OK: 6
};

/// bitmask test (not using)
RC.CMD_TYPE = {
    ACTOR:    0x10000000,
    CLIENT:   0x20000000,
    NETWORK:  0x40000000,
    RESERVED: 0x80000000
};

RC.CMD_ACTOR_ACT = {
    WAIT: 0,
    MOVE: 1,
    USE: 2,
    PICKUP: 3,
    TALK: 4,
    MENU: 5,
    AUTOMATION: 6,
    CHANGE_SCENE: 7
};

RC.CMD_ACTOR_AUTOMATION = {
    STATUS: 0,
    EXPLORING: 1
};

RC.CMD_ACTOR_DIR = {
    UP: 0,
    DOWN: 1,
    RIGHT: 2,
    LEFT: 3,
    UPRIGHT: 4,
    UPLEFT: 5,
    DOWNRIGHT: 6,
    DOWNLEFT: 7
};

RC.UI_SPRITE_TYPE = {
    MENU: 0,
    DOM: 1,
    BUTTON: 2,
    UNDEFINED: 9
};

//
RC.MAX_TICK = Number.MAX_SAFE_INTEGER;
RC.MIN_TICK = 0;

// 
RC.SCREEN_WIDTH = 1024;
RC.SCREEN_HEIGHT = 600;

// for gfx.js
RC.SCROLL_FRAME = 5;
RC.MAP_RADIUS = 17;

//
RC.BG = 0x888888;
