[![Build Status](https://secure.travis-ci.org/socialradar/asyncinterval.png)](http://travis-ci.org/socialradar/asyncinterval)

asyncInterval
=============

Async aware setInterval. Run functions at an interval without overlapping previous calls.

There is also a timeout option to continue the interval incase an async task is stuck.

## Installation

    $ npm install hold

## Usage

code example:

```js
var interval = asyncInterval(function(done){
    
    // don't worry, we only enter here one call at a time.
    doSomething(function(err){
    
        // after we finish our async function, let asyncInterval know
        // this will tell asyncInterval to schedule the next interval
        done();
    });
}, 5, 10);

// optional timeout
interval.on('timeout', function(){
    // log timeout here...
});
```

## parameters

* `function`: the function to call when interval does work, this function will be given `done` argument.
* `interval`: in milliseconds, the internal frequency
* `timeout`: in milliseconds, if specified, will stop waiting `done` to be called and start next interval

