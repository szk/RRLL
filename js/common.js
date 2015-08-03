// common.js
var RC = RC || {};

//// Level
RC.ENTITY_TYPE = {
    ROOT:0, // for asset
    HUMANOID:1, MULTILEG:2, NOLEG:3, // for actor
    EQUIPMENT:4, ITEM:5, // for item
    WALL:6, STRUCTURE:7 // for terrain
};

RC.TERRAIN_WIDTH = 50;
RC.TERRAIN_HEIGHT = 50;
RC.TERRAIN_WALL_DIR = {
    NOTHING:0,
    NORTH:1,
    SOUTH:2,
    EAST:4,
    WEST:8
};

//// scene control
RC.NEXT_SCENE = {
    CONTINUE: 0,
    MAINMENU: 1,
    SETTINGMENU: 2,
    ABOUTMENU: 3,
    TALKMENU: 4,
    SANDBOX: 5,
    GAMEOVER: 6,
    INTRO: 7,
    LOADING: 8,
    PLAYING: 9,
    RANKING: 10,
    RETURN: 11,
    ACCEPT: 12
};

//// client commands
RC.CMD_SYS = {
    NEXT_SCENE: 0,
    POP_SCENE: 1,
    RESTART_SCENE: 2
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

// bitmask test (not using)
RC.CMD_TYPE = {
    ACTOR:    0x10000000,
    CLIENT:   0x20000000,
    NETWORK:  0x40000000,
    RESERVED: 0x80000000
};

//// Visual
RC.TILE_SCREEN_WIDTH = 45.0;
RC.TILE_SCREEN_HEIGHT = 22.5;

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

RC.APPEARANCE_TYPE = {
    MONO: 0,
    ANIMATION: 1,
    EMITTER: 2,
    SKELETON: 3,
    UNDEFINED: 4
};

RC.UI_SPRITE_TYPE = {
    MENU: 0,
    DOM: 1,
    BUTTON: 2,
    UNDEFINED: 9
};

//// Network
// server to client
RC.S2C = {
    HEARTBEAT: 0,
    STATE: 1,
    SNAPSHOT: 2,
    SERVER_CMD: 3,
    DOWNLOAD: 4
};
// client to server
RC.C2S = {
    HEARTBEAT: 0,
    MOVE: 1,
    CLIENT_CMD: 2
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
