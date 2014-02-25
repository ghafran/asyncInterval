
module.exports = function(work, interval, timeout) {

    var _asyncInterval = {
        work: work,
        interval: interval,
        timeout: timeout,
        timer: null,
        timeouttimer: null,
        timeoutfn: null
    };
    
    _asyncInterval.run = function() {
        
        _asyncInterval.timer = setTimeout(_asyncInterval.work, _asyncInterval.interval, _asyncInterval.done);
        
        if(_asyncInterval.timeout !== null && _asyncInterval.timeout !== undefined){
            _asyncInterval.timeouttimer = setTimeout(_asyncInterval.timedOut, _asyncInterval.timeout);
        }
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
        
        if(_asyncInterval.timeoutfn !== null && _asyncInterval.timeoutfn !== undefined){
            if (typeof(_asyncInterval.timeoutfn) === 'function') {
                _asyncInterval.timeoutfn();
            }
        }
        
        _asyncInterval.work(_asyncInterval.done);
    };
    
    _asyncInterval.onTimeout = function(callback){
        _asyncInterval.timeoutfn = callback;
    };
    
    _asyncInterval.run();
    return _asyncInterval;
};