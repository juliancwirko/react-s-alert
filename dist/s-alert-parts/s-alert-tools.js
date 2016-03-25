'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var actualGlobalConfig = void 0;

var sAlertTools = {
    randomId: function randomId() {
        return Math.random().toString(36).split('.')[1];
    },
    returnFirstDefined: function returnFirstDefined() {
        var value = void 0;
        var i = void 0;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        for (i = 0; i < args.length; i++) {
            if (typeof args[i] !== 'undefined') {
                value = args[i];
                break;
            }
        }
        return value;
    },
    styleToObj: function styleToObj(input) {
        var result = {},
            i = void 0,
            entry = void 0,
            attributes = input && input.split(';').filter(Boolean);

        for (i = 0; i < attributes.length; i++) {
            entry = attributes[i].split(':');
            result[entry.splice(0, 1)[0].trim()] = entry.join(':').trim();
        }
        return result;
    },
    setGlobalConfig: function setGlobalConfig(config) {
        if ((typeof config === 'undefined' ? 'undefined' : (0, _typeof3.default)(config)) === 'object') {
            actualGlobalConfig = config;
        }
    },
    getGlobalConfig: function getGlobalConfig() {
        return actualGlobalConfig;
    }
};

exports.default = sAlertTools;