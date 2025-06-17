"use strict";

class AsyncInterval {
    constructor(work, interval, timeout) {
        if (!(this instanceof AsyncInterval)) {
            return new AsyncInterval(work, interval, timeout);
        }

        if (typeof work !== "function") {
            throw new Error("asyncInterval requires a function");
        }

        if (typeof interval !== "number") {
            throw new Error("asyncInterval requires a number for interval");
        }

        if (timeout !== null && timeout !== undefined && typeof timeout !== "number") {
            throw new Error("asyncInterval requires a number for timeout");
        }

        this.work = work;
        this.interval = interval;
        this.timeout = timeout;
        this.timer = null;
        this.timeouttimer = null;
        this.timeoutfn = null;

        this.run();
        return this;
    }

    run() {
        this.clear();
        this.timer = setTimeout(() => this.work(this.done.bind(this)), this.interval);
        if (this.timeout !== null && this.timeout !== undefined) {
            this.timeouttimer = setTimeout(() => this.timedOut(), this.timeout);
        }
    }

    done() {
        this.run();
    }

    clear() {
        clearTimeout(this.timer);
        this.timer = null;
        clearTimeout(this.timeouttimer);
        this.timeouttimer = null;
    }

    timedOut() {
        this.clear();
        if (typeof this.timeoutfn === "function") {
            this.timeoutfn();
        }
        this.run();
    }

    onTimeout(callback) {
        this.timeoutfn = callback;
    }
}

module.exports = function (work, interval, timeout) {
    return new AsyncInterval(work, interval, timeout);
};

module.exports.AsyncInterval = AsyncInterval;
