/// http://www.html5gamedevs.com/topic/7546-pixi-dragonbones/
function Humanoid(spine_) {
    this.spine = spine_;
    console.log('humanoid');
};

Humanoid.prototype.get_spine = function() {
    return this.spine;
};


// http://esotericsoftware.com/forum/viewtopic.php?f=3&t=1322
Humanoid.prototype.flip_x = function() {
    this.spine.skeleton.flipX = true;
};

// appearance of bones
Humanoid.prototype.set_torso = function(texture_) {
    this.spine.skeleton.slots[0].sprites['torso'].texture = texture_;
};

Humanoid.prototype.set_head = function(texture_) {
    this.spine.skeleton.slots[1].sprites['head'].texture = texture_;
};

Humanoid.prototype.set_rightarm = function(texture_) {
    this.spine.skeleton.slots[2].sprites['right-arm'].texture = texture_;
};

Humanoid.prototype.set_leftarm = function(texture_) {
    this.spine.skeleton.slots[3].sprites['left-arm'].texture = texture_;
};

Humanoid.prototype.set_rightleg = function(texture_) {
    this.spine.skeleton.slots[4].sprites['right-leg'].texture = texture_;
};

Humanoid.prototype.set_leftleg = function(texture_) {
    this.spine.skeleton.slots[5].sprites['left-leg'].texture = texture_;
};

// equips on the head
Humanoid.prototype.set_hatted = function() {
};

// equips on the body
Humanoid.prototype.set_weared = function() {
};

// equips on hands
Humanoid.prototype.set_rightgrabbed = function() {
};

Humanoid.prototype.set_leftgrabbed = function() {
};

// equips on legs
Humanoid.prototype.set_rightshod = function() {
};

Humanoid.prototype.set_leftshod = function() {
};
