/// http://www.html5gamedevs.com/topic/7546-pixi-dragonbones/
function Noleg(spine_) {
    this.spine = spine_;
    console.log('noleg');
};

// http://esotericsoftware.com/forum/viewtopic.php?f=3&t=1322
Noleg.prototype.flip_x = function() {
    this.spine.skeleton.flipX = true;
};

// appearance of bones
Noleg.prototype.set_head = function(texture_) {
    this.spine.skeleton.slots[0].sprites['torso'].setTexture(texture_);
};

Noleg.prototype.set_torso = function(texture_) {
    this.spine.skeleton.slots[1].sprites['head'].setTexture(texture_);
};

Noleg.prototype.set_rightarm = function(texture_) {
    this.spine.skeleton.slots[2].sprites['right-arm'].setTexture(texture_);
};

Noleg.prototype.set_leftarm = function(texture_) {
    this.spine.skeleton.slots[3].sprites['left-arm'].setTexture(texture_);
};

Noleg.prototype.set_rightleg = function(texture_) {
    this.spine.skeleton.slots[4].sprites['right-leg'].setTexture(texture_);
};

Noleg.prototype.set_leftleg = function(texture_) {
    this.spine.skeleton.slots[5].sprites['left-leg'].setTexture(texture_);
};

// equips on the head
Noleg.prototype.set_hatted = function() {
};

// equips on the body
Noleg.prototype.set_weared = function() {
};

// equips on hands
Noleg.prototype.set_rightgrabbed = function() {
};

Noleg.prototype.set_leftgrabbed = function() {
};

// equips on legs
Noleg.prototype.set_rightshod = function() {
};

Noleg.prototype.set_leftshod = function() {
};
