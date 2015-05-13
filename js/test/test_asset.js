describe('Asset', function() {
    beforeEach(function() {
        this.asset = new Asset('image.png');
    });

    afterEach(function() { ;
    });

    it('initialization', function() {
        expect(this.asset).toBeTruthy();
        expect(this.asset.init('level.json')).toBe(true);
    });
});
