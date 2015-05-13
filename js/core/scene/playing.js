function Playing() {
    Scene.apply(this, arguments);
}

Playing.prototype = Object.create(Scene.prototype);
Playing.prototype.constructor = Playing;

Playing.prototype.init = function(asset_) {
};

Playing.prototype.update = function() {
    ;
};
