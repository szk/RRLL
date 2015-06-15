class IdPool {
    constructor() {
        this.using = new buckets.Set();
        this.freed = new buckets.Set();
        this.max_id = 0;
    }

    init() {
        this.reset();
    }

    reset() {
        this.using.clear();
        this.freed.clear();
        this.max_id = 0;
    }

    get_id() {
        if (this.freed.isEmpty())
        {
            this.using.add(++this.max_id);
            return this.max_id;
        }

        var reusing_id = this.freed.toArray()[this.freed.size() - 1];
        this.freed.remove(reusing_id);
        this.using.add(reusing_id);
        return reusing_id;
    }

    free_id(id_) {
        this.freed.add(id_);
        this.using.remove(id_);
    }
}
