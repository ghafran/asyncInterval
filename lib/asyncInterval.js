var events = require('events');

module.exports = function(work, interval, timeout) {

    var _asyncInterval = {
        work: work,
        interval: interval,
        timeout: timeout,
        timer: null,
        timeouttimer: null
    };
    
    _asyncInterval.done = function() {

        _asyncInterval.run();
    };

    _asyncInterval.clear = function() {
        
        clearTimeout(_asyncInterval.timer);
        _asyncInterval.timer = null;
        clearTimeout(_asyncInterval.timeouttimer);
        _asyncInterval.timeouttimer = null;
    };
    
    _asyncInterval.timedOut = function() {
        
        _asyncInterval.clear();
        _asyncInterval.emit('timeout');
        _asyncInterval.work(_asyncInterval.done);
    };
    
    _asyncInterval.run = function() {
        
        _asyncInterval.timer = setTimeout(_asyncInterval.work, _asyncInterval.interval, _asyncInterval.done);
        
        if(_asyncInterval.timeout !== null && _asyncInterval.timeout !== undefined){
            _asyncInterval.timeouttimer = setTimeout(_asyncInterval.timedOut, _asyncInterval.timeout);
        }
    };
    
    events.EventEmitter.call(_asyncInterval);
    
    _asyncInterval.run();
    return _asyncInterval;
};