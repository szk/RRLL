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
    HUMANOID:1, LEGGED:2, CRAWLER:3, FLYING:4, // for actor
    EQUIPMENT:5, ITEM:6, // for item
    WALL:7, STRUCTURE:8 // for terrain
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
    CONFIG: 1,
    GAMEOVER: 2,
    INTRO: 3,
    LOADING: 4,
    PLAYING: 5,
    RANKING: 6,
    INFO: 7,
    RETURN: 8
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
    RESERVED2: 7
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

RC.CMD_MENU_TYPE = {
    CONFIG: 0,
    INFO: 1,
    INVENTRY: 1
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
