(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'react-dom', '../SAlertContent', './s-alert-store', './s-alert-tools'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('react-dom'), require('../SAlertContent'), require('./s-alert-store'), require('./s-alert-tools'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactDom, global.SAlertContent, global.sAlertStore, global.sAlertTools);
        global.sAlertDataPrep = mod.exports;
    }
})(this, function (exports, _react, _reactDom, _SAlertContent, _sAlertStore, _sAlertTools) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _SAlertContent2 = _interopRequireDefault(_SAlertContent);

    var _sAlertStore2 = _interopRequireDefault(_sAlertStore);

    var _sAlertTools2 = _interopRequireDefault(_sAlertTools);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    var getAlertData = function getAlertData(sAlertPosition, parentComponent) {
        var positionTop = 0;
        var positionBottom = 0;
        var padding = 0;
        var alerts = {};
        var style = void 0;
        var docElement = void 0;
        var sAlertBoxHeight = void 0;
        var positionTypeTop = void 0;
        var positionTypeBottom = void 0;
        var checkFirst = function checkFirst(type, objId) {
            var collectionOfType = sAlertCollection.filter(function (obj) {
                return obj.position === type || sAlertGlobalConfig.position === type;
            });
            return collectionOfType && collectionOfType[0].id === objId;
        };
        var positionFunc = function positionFunc(position, positionType, alert, docElement, sAlertBoxHeight, reactComponent) {
            padding = aStack.spacing || parseInt(getComputedStyle(_reactDom2.default.findDOMNode(reactComponent))[positionType]);
            if (checkFirst(aPosition, alert.id) && aOffset) {
                position = 0;
                position = position + parseInt(aOffset);
            }
            if (checkFirst(aPosition, alert.id) && aStack.spacing) {
                position = position;
            } else {
                position = position + parseInt(padding);
            }
            style = positionType + ': ' + position + 'px;';
            position = position + sAlertBoxHeight;
            return position;
        };

        var sAlertGlobalConfig = _sAlertTools2.default.getGlobalConfig();
        var aStack = void 0;
        var aContentTemplate = void 0;
        var aOffset = void 0;
        var aMessage = void 0;
        var aHtml = void 0;
        var aCustomFields = void 0;
        var aPosition = void 0;
        var preserveContext = void 0;

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

        return sAlertCollection.map(function (alert) {
            aStack = sAlertGlobalConfig.stack;
            aContentTemplate = sAlertGlobalConfig.contentTemplate;
            aOffset = _sAlertTools2.default.returnFirstDefined(alert.offset, sAlertGlobalConfig.offset);
            aMessage = _sAlertTools2.default.returnFirstDefined(alert.message, sAlertGlobalConfig.message);
            aHtml = _sAlertTools2.default.returnFirstDefined(alert.html, sAlertGlobalConfig.html);
            aCustomFields = _sAlertTools2.default.returnFirstDefined(alert.customFields, sAlertGlobalConfig.customFields);
            aPosition = _sAlertTools2.default.returnFirstDefined(alert.position, sAlertGlobalConfig.position);
            preserveContext = _sAlertTools2.default.returnFirstDefined(alert.preserveContext, sAlertGlobalConfig.preserveContext);
            positionTypeTop = aPosition && /top/g.test(aPosition);
            positionTypeBottom = aPosition && /bottom/g.test(aPosition);

            if (aStack) {
                // checking alert box height - needed to calculate position
                docElement = document.createElement('div');
                docElement.classList.add('s-alert-box-height');

                // mock element, needed for positions calculations
                var reactElement = _react2.default.createElement(_SAlertContent2.default, {
                    key: _sAlertTools2.default.randomId(),
                    id: _sAlertTools2.default.randomId(),
                    condition: alert.condition,
                    message: aMessage,
                    position: aPosition,
                    effect: alert.effect,
                    boxPosition: alert.boxPosition,
                    beep: false,
                    timeout: 'none',
                    html: aHtml,
                    contentTemplate: aContentTemplate,
                    customFields: aCustomFields
                });

                var reactComponent = void 0;

                if (preserveContext) {
                    reactComponent = _reactDom2.default.unstable_renderSubtreeIntoContainer(parentComponent, reactElement, docElement);
                } else {
                    reactComponent = _reactDom2.default.render(reactElement, docElement);
                }

                document.body.appendChild(docElement);
                sAlertBoxHeight = parseInt(getComputedStyle(_reactDom2.default.findDOMNode(reactComponent))['height']);
                if (positionTypeTop) {
                    positionTop = positionFunc(positionTop, 'top', alert, docElement, sAlertBoxHeight, reactComponent);
                }
                if (positionTypeBottom) {
                    positionBottom = positionFunc(positionBottom, 'bottom', alert, docElement, sAlertBoxHeight, reactComponent);
                }
                var sAlertComputedStyle = getComputedStyle(_reactDom2.default.findDOMNode(reactComponent));
                if (sAlertPosition === 'left') {
                    style = style + 'left: ' + (aStack.spacing || parseInt(sAlertComputedStyle.left)) + 'px;';
                }
                if (sAlertPosition === 'right') {
                    style = style + 'right: ' + (aStack.spacing || parseInt(sAlertComputedStyle.right)) + 'px;';
                }
                alerts = _extends({}, alert, { boxPosition: style });
                _reactDom2.default.unmountComponentAtNode(docElement);
                docElement.parentNode.removeChild(docElement);
            } else if (aOffset && positionTypeTop) {
                alerts = _extends({}, alert, { boxPosition: 'top: ' + parseInt(aOffset) + 'px;' });
            } else if (aOffset && positionTypeBottom) {
                alerts = _extends({}, alert, { boxPosition: 'bottom: ' + parseInt(aOffset) + 'px;' });
            } else {
                alerts = alert;
            }
            return alerts;
        });
    };

    exports.default = getAlertData;
});