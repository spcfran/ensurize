# ensurize
Ensurize pattern as described in http://www.franr.com/2015/12/optimizing-javascript-promises-avoiding-redundant-requests/

## Install

```bash
$ npm install ensurize
```

## Usage

```js
var ensurize = require('ensurize');

//Function that has some side effect and returns a promise
var increment = function (c) {
    c.value++;
    return Promise.resolve(c);
};

// Side effect runs twice as expected
increment({ value: 0 })
    .then(increment)
    .then(counter => console.log(counter));
// => { value: 2 }

// Wrap original function
var ensureIncremented = ensurize(increment);
// Side effect only happens once
ensureIncremented({ value: 0 })
    .then(ensureIncremented)
    .then(counter => console.log(counter));
// => { value: 1 }
```