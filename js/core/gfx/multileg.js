/// http://www.html5gamedevs.com/topic/7546-pixi-dragonbones/
function Multileg(spine_) {
    this.spine = spine_;
    console.log('multileg created');
};

// http://esotericsoftware.com/forum/viewtopic.php?f=3&t=1322
Multileg.prototype.flip_x = function() {
    this.spine.skeleton.flipX = true;
};

// appearance of bones
Multileg.prototype.set_head = function(texture_) {
    this.spine.skeleton.slots[0].sprites['torso'].setTexture(texture_);
};

Multileg.prototype.set_torso = function(texture_) {
    this.spine.skeleton.slots[1].sprites['head'].setTexture(texture_);
};

Multileg.prototype.set_rightarm = function(texture_) {
    this.spine.skeleton.slots[2].sprites['right-arm'].setTexture(texture_);
};

Multileg.prototype.set_leftarm = function(texture_) {
    this.spine.skeleton.slots[3].sprites['left-arm'].setTexture(texture_);
};

Multileg.prototype.set_rightleg = function(texture_) {
    this.spine.skeleton.slots[4].sprites['right-leg'].setTexture(texture_);
};

Multileg.prototype.set_leftleg = function(texture_) {
    this.spine.skeleton.slots[5].sprites['left-leg'].setTexture(texture_);
};

// equips on the head
Multileg.prototype.set_hatted = function() {
};

// equips on the body
Multileg.prototype.set_weared = function() {
};

// equips on hands
Multileg.prototype.set_rightgrabbed = function() {
};

Multileg.prototype.set_leftgrabbed = function() {
};

// equips on legs
Multileg.prototype.set_rightshod = function() {
};

Multileg.prototype.set_leftshod = function() {
};
