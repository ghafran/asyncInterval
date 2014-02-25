
module.exports = function(work, interval, timeout) {

    var _self = {
        work: work,
        interval: interval,
        timeout: timeout,
        timer: null,
        timeouttimer: null,
        timeoutfn: null
    };
    
    _self.run = function() {
        
        _self.timer = setTimeout(_self.work, _self.interval, _self.done);
        
        if(_self.timeout !== null && _self.timeout !== undefined){
            _self.timeouttimer = setTimeout(_self.timedOut, _self.timeout);
        }
    };
    
    _self.done = function() {

        _self.run();
    };

    _self.clear = function() {
        
        clearTimeout(_self.timer);
        _self.timer = null;
        clearTimeout(_self.timeouttimer);
        _self.timeouttimer = null;
    };
    
    _self.timedOut = function() {
        
        _self.clear();
        
        if(_self.timeoutfn !== null && _self.timeoutfn !== undefined){
            if (typeof(_self.timeoutfn) === 'function') {
                _self.timeoutfn();
            }
        }
        
        _self.work(_self.done);
    };
    
    _self.onTimeout = function(callback){
        _self.timeoutfn = callback;
    };
    
    _self.run();
    return _self;
};