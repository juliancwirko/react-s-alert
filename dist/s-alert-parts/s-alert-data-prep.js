(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './s-alert-store', './s-alert-tools'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./s-alert-store'), require('./s-alert-tools'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.sAlertStore, global.sAlertTools);
        global.sAlertDataPrep = mod.exports;
    }
})(this, function (exports, _sAlertStore, _sAlertTools) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _sAlertStore2 = _interopRequireDefault(_sAlertStore);

    var _sAlertTools2 = _interopRequireDefault(_sAlertTools);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var getAlertData = function getAlertData(sAlertPosition) {
        var sAlertGlobalConfig = _sAlertTools2.default.getGlobalConfig();

        var query = {};
        if (sAlertPosition === 'left') {
            query = function query(item) {
                return item.position === 'top-left' || item.position === 'bottom-left' || !item.position && (sAlertGlobalConfig.position === 'top-left' || sAlertGlobalConfig.position === 'bottom-left');
            };
        }
        if (sAlertPosition === 'right') {
            query = function query(item) {
                return item.position === 'top-right' || item.position === 'bottom-right' || !item.position && (sAlertGlobalConfig.position === 'top-right' || sAlertGlobalConfig.position === 'bottom-right');
            };
        }
        if (sAlertPosition === 'full-top') {
            query = function query(item) {
                return item.position === 'top' || !item.position && sAlertGlobalConfig.position === 'top';
            };
        }
        if (sAlertPosition === 'full-bottom') {
            query = function query(item) {
                return item.position === 'bottom' || !item.position && sAlertGlobalConfig.position === 'bottom';
            };
        }

        var currentState = _sAlertStore2.default.getState();
        var sAlertCollection = currentState.slice().filter(query);

        return sAlertCollection;
    };

    exports.default = getAlertData;
});