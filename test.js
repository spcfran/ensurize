var test = require('tape');
var ensurize = require('./');



test('ensurize', function (t) {
    t.plan(3);

    t.assert(typeof (ensurize) !== undefined, "ensurize exists");

    var increment = function (c) {
        c.value++;
        return Promise.resolve(c);
    };

    increment({ value: 0 })
        .then(increment)
        .then(counter =>
            t.equal(counter.value, 2, "normal function runs multiple times")
        );

    var ensureIncremented = ensurize(increment);

    ensureIncremented({ value: 0 })
        .then(ensureIncremented)
        .then(counter =>
            t.equal(counter.value, 1, "ensurized function runs once")
        );
})