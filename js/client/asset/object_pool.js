class ObjectPool {
    constructor(classname_) {
        this.classname = classname_;
        this.allocated = this.freed = 0;
        this.reset_();
        this.objpool_ = [];
    }

    reset_(allocated_) {
        this.allocated = allocated_ || 0;
        this.freed = 0;
    }

    alloc() {
        var obj;

        if (this.objpool_.length == 0) {
	    // nothing in the free list, so allocate a new object
	    obj = new this.classname();
	    this.allocated++;
        } else {
	    // grab one from the top of the objpool
	    obj = this.objpool_.pop();
	    this.freed--;
        }

        return obj;
    }

    free(obj_) {
        // fix up the free list pointers
        this.objpool_.push(obj_);
        this.freed++;
    }

    collect(classname_) {
        // just forget the list and let the garbage collector reap them
        this.objpool_ = []; // fresh and new

        // but we might have allocated objects that are in use/not in
        // the pool--track them in the metrics:
        var using = this.allocated - this.freed;
        this.reset_(using);
    }
}
