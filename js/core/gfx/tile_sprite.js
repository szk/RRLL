function TileSprite(texture_, tile_x_, tile_y_) {
    this.sprite = PIXI.Sprite.prototype;

    this.tile_pos_x = tile_x_;
    this.tile_pos_y = tile_y_;

    // make skewing matrix of floor
    this.m = new PIXI.Matrix(1.0, 1.0, 1.0, 1.0, 0, 0);
    this.m.rotate(Math.PI / 4.0);
    this.m.scale(2.0, 1.0);

    // for pseudo class
    PIXI.Sprite.apply(this, arguments);
    this.tilesprite = PIXI.Sprite.prototype;
};

TileSprite.prototype = Object.create(PIXI.Sprite.prototype);
TileSprite.prototype.constructor = TileSprite;

TileSprite.prototype.init = function(x_, y_) {
    this.position.x = x_;
    this.position.y = y_;
};

/// override
/// how to iso: http://www.html5gamedevs.com/topic/4745-transform-sprite-like-a-trapezoid-trapezium/
TileSprite.prototype.updateTransform = function() {
    // TODO OPTIMIZE THIS!! with dirty
    if(this.rotation !== this.rotationCache)
    {
	this.rotationCache = this.rotation;
	this._sr =  Math.sin(this.rotation);
	this._cr =  Math.cos(this.rotation);
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

// TileSprite.prototype = {
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
