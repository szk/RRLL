describe('Scene', function() {
    beforeEach(function() {
        this.scene = new Scene();
        this.asset = new Asset('js/test/image.png');
    });

    afterEach(function() { ;
    });

    // placeholder
    it('initialization', function() {
        expect(this.asset.init('js/test/level.json')).toBe(true);

        var self = this;
        this.poll_interval = window.setInterval(function() {
            if (!self.asset.is_load_base_completed() || !self.asset.is_load_variable_completed()) { return; }
            // load completed and go
            window.clearInterval(self.poll_interval);
            // init
            expect(self.scene.init(self.asset)).toBe(true);
        },
                                                200);
    });
});
