describe('Level', function() {
    beforeEach(function() {
        this.level = new Level(0, 0, 0, null);
        this.terrain = new Terrain(0, 0, null);
    });

    afterEach(function() { ;
    });

    // placeholder
    it('initialization', function() {
        this.level.set_avatar(new Avatar());
        expect(this.level.init(this.terrain)).toBeTruthy();
    });

    it('load', function() { ;
    });

    it('update', function() { ;
    });
});
