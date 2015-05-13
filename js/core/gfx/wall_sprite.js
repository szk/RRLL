function WallSprite() {
    this.skew_m = new PIXI.Matrix(1.0, 1.0, 1.0, 1.0, 0, 0);
    this.skew_m.rotate(Math.PI / 4.0);

    // make skewing matrix of floor
    this.m = new PIXI.Matrix(this.skew_m.a, this.skew_m.b, this.skew_m.c, this.skew_m.d,
                             this.skew_m.tx, this.skew_m.ty);

    this.set_facing(RC.TERRAIN_WALL_DIR.SOUTH);
    PIXI.Sprite.apply(this, arguments);
};

WallSprite.prototype = Object.create(PIXI.Sprite.prototype);
WallSprite.prototype.constructor = WallSprite;

WallSprite.prototype.init = function(texture_, dir_, tile_x_, tile_y_)
{
    this.texture = texture_;
    // this.position.x = tile_x_;
    // this.position.y = tile_y_;
    this.set_facing(texture_, dir_, tile_x_, tile_y_);
};

WallSprite.prototype.set_facing = function(texture_, dir_, tile_x_, tile_y_)
{
    this.m.a = this.skew_m.a; this.m.b = this.skew_m.b; this.m.c = this.skew_m.c; this.m.d = this.skew_m.d;
    this.m.tx = this.skew_m.tx; this.m.ty = this.skew_m.ty;

    switch (dir_)
    {
    case RC.TERRAIN_WALL_DIR.NORTH: // top right
        this.m.scale(2.0, 1.0);
        this.m.rotate(300 * Math.PI / 180.0);
        this.m.scale(-1.0, 1.0);
        this.position.x = tile_x_ + (RC.TILE_SCREEN_WIDTH / 2);
        this.position.y = tile_y_ - (RC.TILE_SCREEN_HEIGHT / 2);
        break;
    case RC.TERRAIN_WALL_DIR.SOUTH: // bottom left
        this.m.scale(1.0, 2.0);
        this.m.rotate(333 * Math.PI / 180);
        this.position.x = tile_x_ - (RC.TILE_SCREEN_WIDTH / 2);
        this.position.y = tile_y_ - (RC.TILE_SCREEN_HEIGHT / 2);
        break;
    case RC.TERRAIN_WALL_DIR.EAST:  // bottom right
        this.m.scale(2.0, 1.0);
        this.m.rotate(300 * Math.PI / 180);
        this.position.x = tile_x_;
        this.position.y = tile_y_;
        break;
    case RC.TERRAIN_WALL_DIR.WEST: // bottom left
        this.m.scale(1.0, 2.0);
        this.m.rotate(333 * Math.PI / 180.0);
        this.m.scale(-1.0, 1.0);
        this.position.x = tile_x_;
        this.position.y = tile_y_ - (RC.TILE_SCREEN_HEIGHT);
        break;
    }
};

/// override
WallSprite.prototype.updateTransform = function() {
    // TODO OPTIMIZE THIS!! with dirty
    if(this.rotation !== this.rotationCache)
    {
	this.rotationCache = this.rotation;
	this._sr = Math.sin(this.rotation);
	this._cr = Math.cos(this.rotation);
    }

    // var localTransform = this.localTransform//.toArray();
    var parentTransform = this.parent.worldTransform;//.toArray();
    var worldTransform = this.worldTransform;//.toArray();

    var px = this.pivot.x;
    var py = this.pivot.y;

    var a00 = this.m.a, a01 = this.m.b, a10 = this.m.c, a11 = this.m.d,
	a02 = this.position.x - a00 * px - py * a01,
	a12 = this.position.y - a11 * py - px * a10,
	b00 = parentTransform.a, b01 = parentTransform.b,
	b10 = parentTransform.c, b11 = parentTransform.d;

    worldTransform.a = b00 * a00 + b01 * a10;
    worldTransform.b = b00 * a01 + b01 * a11;
    worldTransform.tx = b00 * a02 + b01 * a12 + parentTransform.tx;

    worldTransform.c = b10 * a00 + b11 * a10;
    worldTransform.d = b10 * a01 + b11 * a11;
    worldTransform.ty = b10 * a02 + b11 * a12 + parentTransform.ty;

    this.worldAlpha = this.alpha * this.parent.worldAlpha;
};

// WallSprite.prototype = {
//     updateTransform: function(args_) {
//         // TODO OPTIMIZE THIS!! with dirty
//         if(this.rotation !== this.rotationCache)
//         {
// 	    this.rotationCache = this.rotation;
// 	    this._sr =  Math.sin(this.rotation);
// 	    this._cr =  Math.cos(this.rotation);
//         }

//         // var localTransform = this.localTransform//.toArray();
//         var parentTransform = this.parent.worldTransform;//.toArray();
//         var worldTransform = this.worldTransform;//.toArray();

//         var px = this.pivot.x;
//         var py = this.pivot.y;

//         var a00 = this.m.a, a01 = this.m.b, a10 = this.m.c, a11 = this.m.d,
// 	    a02 = this.position.x - a00 * px - py * a01,
// 	    a12 = this.position.y - a11 * py - px * a10,
// 	    b00 = parentTransform.a, b01 = parentTransform.b,
// 	    b10 = parentTransform.c, b11 = parentTransform.d;

//         worldTransform.a = b00 * a00 + b01 * a10;
//         worldTransform.b = b00 * a01 + b01 * a11;
//         worldTransform.tx = b00 * a02 + b01 * a12 + parentTransform.tx;

//         worldTransform.c = b10 * a00 + b11 * a10;
//         worldTransform.d = b10 * a01 + b11 * a11;
//         worldTransform.ty = b10 * a02 + b11 * a12 + parentTransform.ty;

//         this.worldAlpha = this.alpha * this.parent.worldAlpha;
//     }
// }

// Map.prototype.skew = function() {
//     var m = new PIXI.Matrix(1.0, 1.0, 1.0, 1.0, 0, 0);
//     m.rotate(Math.PI / 4.0);
//     m.scale(2.0, 1.0);

//     this.root_sprite.updateTransform = function()
//     {
// 	// var localTransform = this.localTransform//.toArray();
// 	var parentTransform = this.parent.worldTransform;//.toArray();
// 	var worldTransform = this.worldTransform;//.toArray();

// 	var px = this.pivot.x;
// 	var py = this.pivot.y;

//         var a00 = m.a, a01 = m.b, a10 = m.c, a11 = m.d,
// 	    a02 = this.position.x - a00 * px - py * a01,
// 	    a12 = this.position.y - a11 * py - px * a10,
// 	    b00 = parentTransform.a, b01 = parentTransform.b,
// 	    b10 = parentTransform.c, b11 = parentTransform.d;

// 	worldTransform.a = b00 * a00 + b01 * a10;
// 	worldTransform.b = b00 * a01 + b01 * a11;
// 	worldTransform.tx = b00 * a02 + b01 * a12 + parentTransform.tx;

// 	worldTransform.c = b10 * a00 + b11 * a10;
// 	worldTransform.d = b10 * a01 + b11 * a11;
// 	worldTransform.ty = b10 * a02 + b11 * a12 + parentTransform.ty;

// 	this.worldAlpha = this.alpha * this.parent.worldAlpha;
//     };
// }

// Map.prototype.skew_bak = function() {
//     var m = this.iso_m;

//     this.root_sprite.updateTransform = function()
//     {
// 	// TODO OPTIMIZE THIS!! with dirty
// 	if(this.rotation !== this.rotationCache)
// 	{
// 	    this.rotationCache = this.rotation;
// 	    this._sr =  Math.sin(this.rotation);
// 	    this._cr =  Math.cos(this.rotation);
// 	}

// 	// var localTransform = this.localTransform//.toArray();
// 	var parentTransform = this.parent.worldTransform;//.toArray();
// 	var worldTransform = this.worldTransform;//.toArray();

// 	var px = this.pivot.x;
// 	var py = this.pivot.y;

//         // var a00 = this._cr * this.scale.x,
//         //     // a01 = -this._sr * this.scale.y,
//         //     // a10 = this._sr * this.scale.x,

//         //     //////////////////////////////////////
//         //     a11 = this._cr * this.scale.y,
// 	//     a02 = this.position.x - a00 * px - py * a01,
// 	//     a12 = this.position.y - a11 * py - px * a10,
// 	//     b00 = parentTransform.a, b01 = parentTransform.b,
// 	//     b10 = parentTransform.c, b11 = parentTransform.d;

//         //     a01 = Math.tan(local_factor.x) * this.scale.y,
//         //     a10 = Math.tan(local_factor.y),

//         // var a00 = m.a,
//         //     a01 = m.b, // y of right side
//         //     a10 = m.c, // x of left side of x
//         //     a11 = m.d, // y of left side
// 	//     a02 = m.tx, // x translate
// 	//     a12 = m.ty, // y translate
// 	//     b00 = parentTransform.a, b01 = parentTransform.b,
// 	// b10 = parentTransform.c, b11 = parentTransform.d;

//         var a00 = 0.7071067811865476,
//             a01 = 0.35355339059327373, // y of right side
//             a10 = -0.7071067811865475, // x of left side of x
//             a11 = 0.3535533905932738, // y of left side
// 	    a02 = m.tx, // x translate
// 	    a12 = m.ty, // y translate
// 	    b00 = parentTransform.a, b01 = parentTransform.b,
// 	    b10 = parentTransform.c, b11 = parentTransform.d;


// 	worldTransform.a = b00 * a00 + b01 * a10;
// 	worldTransform.b = b00 * a01 + b01 * a11;
// 	worldTransform.tx = b00 * a02 + b01 * a12 + parentTransform.tx;

// 	worldTransform.c = b10 * a00 + b11 * a10;
// 	worldTransform.d = b10 * a01 + b11 * a11;
// 	worldTransform.ty = b10 * a02 + b11 * a12 + parentTransform.ty;

// 	this.worldAlpha = this.alpha * this.parent.worldAlpha;
//     };
// }

// Map.prototype.skew_tile = function(sprite_) {
//     var m = new PIXI.Matrix(1.0, 1.0, 1.0, 1.0, 0, 0);
//     m.rotate(Math.PI / 4.0);
//     m.scale(2.0, 1.0);

//     sprite_.updateTransform = function()
//     {
// 	// TODO OPTIMIZE THIS!! with dirty
// 	if(this.rotation !== this.rotationCache)
// 	{
// 	    this.rotationCache = this.rotation;
// 	    this._sr =  Math.sin(this.rotation);
// 	    this._cr =  Math.cos(this.rotation);
// 	}

// 	// var localTransform = this.localTransform//.toArray();
// 	var parentTransform = this.parent.worldTransform;//.toArray();
// 	var worldTransform = this.worldTransform;//.toArray();

// 	var px = this.pivot.x;
// 	var py = this.pivot.y;

//         var a00 = m.a, a01 = m.b, a10 = m.c, a11 = m.d,
// 	    a02 = this.position.x - a00 * px - py * a01,
// 	    a12 = this.position.y - a11 * py - px * a10,
// 	    b00 = parentTransform.a, b01 = parentTransform.b,
// 	    b10 = parentTransform.c, b11 = parentTransform.d;

// 	worldTransform.a = b00 * a00 + b01 * a10;
// 	worldTransform.b = b00 * a01 + b01 * a11;
// 	worldTransform.tx = b00 * a02 + b01 * a12 + parentTransform.tx;

// 	worldTransform.c = b10 * a00 + b11 * a10;
// 	worldTransform.d = b10 * a01 + b11 * a11;
// 	worldTransform.ty = b10 * a02 + b11 * a12 + parentTransform.ty;

// 	this.worldAlpha = this.alpha * this.parent.worldAlpha;
//     };
// }
