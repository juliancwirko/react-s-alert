var jsdom = require('jsdom');

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;
// shim for requestAnimationFrame
global.window.requestAnimationFrame = function (fn) {
    return fn;
};

propagateToGlobal(window);

function propagateToGlobal (window) {
    var key;
    for (key in window) {
        if (!window.hasOwnProperty(key)) continue;
        if (key in global) continue;
        global[key] = window[key]
    }
}

require('babel-core/register');
require('babel-polyfill');

process.on('unhandledRejection', function (error) {
    console.error('Unhandled Promise Rejection:');
    console.error(error && error.stack || error);
});