'use strict';

function ensurize(promiseCallback) {
    var promise = null;
    return function () {
        var that = this,
            args = arguments;
        if (!promise) {
            promise = new Promise(function (resolve, reject) {
                promiseCallback.apply(that, args).then(resolve, reject);
            });
        }
        return promise;
    };
}

module.exports = ensurize;
