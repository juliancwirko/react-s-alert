'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// custom simple store based on a awesome Redux library https://github.com/rackt/redux

var createSAlertStore = function createSAlertStore(reducer) {
    var state = void 0;
    var listeners = [];
    var getState = function getState() {
        return state;
    };
    var dispatch = function dispatch(action) {
        state = reducer(state, action);
        listeners.forEach(function (listener) {
            return listener();
        });
    };
    var subscribe = function subscribe(listener) {
        listeners.push(listener);
        return function () {
            listeners = listeners.filter(function (l) {
                return l !== listener;
            });
        };
    };
    dispatch({});
    return {
        getState: getState, dispatch: dispatch, subscribe: subscribe
    };
};

var insert = function insert(state, action) {
    return [].concat((0, _toConsumableArray3.default)(state), [action.data]);
};

var remove = function remove(state, action) {
    var elemToRemoveArray = state.slice().filter(function (item) {
        return item.id === action.data.id;
    });
    if (Array.isArray(elemToRemoveArray)) {
        var elemToRemoveIndex = state.indexOf(elemToRemoveArray[0]);
        return [].concat((0, _toConsumableArray3.default)(state.slice(0, elemToRemoveIndex)), (0, _toConsumableArray3.default)(state.slice(elemToRemoveIndex + 1)));
    }
    return state;
};

var alertsReducer = function alertsReducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    var action = arguments[1];

    switch (action.type) {
        case 'INSERT':
            return insert(state, action);
        case 'REMOVE':
            return remove(state, action);
        case 'REMOVEALL':
            return [];
        default:
            return state;
    }
};

var sAlertStore = createSAlertStore(alertsReducer);

exports.default = sAlertStore;