function EntitySprite() {
    PIXI.Sprite.apply(this, arguments);
    this.sprite = PIXI.Sprite.prototype;
};

EntitySprite.prototype = Object.create(PIXI.Sprite.prototype);
EntitySprite.prototype.constructor = EntitySprite;

EntitySprite.prototype.init = function(texture_, dir_, tile_x_, tile_y_)
{
};
