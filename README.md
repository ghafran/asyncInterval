[![Build Status](https://api.travis-ci.org/ghafran/asyncInterval.png)](http://travis-ci.org/ghafran/asyncinterval)
[![NSP Status](https://nodesecurity.io/orgs/ghafran/projects/4288cb5f-f55d-4175-82d2-a740c99c977c/badge)](https://nodesecurity.io/orgs/ghafran/projects/4288cb5f-f55d-4175-82d2-a740c99c977c)

asyncInterval
=============

Async aware setInterval. Run functions at an interval without overlapping previous calls.

There is also a timeout option to continue the interval incase an async task is stuck.

## Installation

    $ npm install asyncinterval

## Usage

code example:

```js
var asyncInterval = require('asyncinterval');
// exported constructor is available as asyncInterval.AsyncInterval

var interval = asyncInterval(function(done){

    // don't worry, we only enter here one call at a time.
    doSomething(function(err){

        // after we finish our async function, let asyncInterval know
        // this will tell asyncInterval to schedule the next interval
        done();
    });
}, 5, 10);

// optional timeout
interval.onTimeout(function(){
    // log timeout here
});
```

## parameters

* `function`: the function to call when interval does work, this function will be given `done` argument.
* `interval`: in milliseconds, the internal frequency
* `timeout`: in milliseconds, if specified, will stop waiting `done` to be called and start next interval
