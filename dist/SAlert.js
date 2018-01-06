(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', './SAlertContent', 'prop-types', './s-alert-parts/s-alert-store', './s-alert-parts/s-alert-tools', './s-alert-parts/s-alert-data-prep'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('./SAlertContent'), require('prop-types'), require('./s-alert-parts/s-alert-store'), require('./s-alert-parts/s-alert-tools'), require('./s-alert-parts/s-alert-data-prep'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.SAlertContent, global.propTypes, global.sAlertStore, global.sAlertTools, global.sAlertDataPrep);
        global.SAlert = mod.exports;
    }
})(this, function (exports, _react, _SAlertContent, _propTypes, _sAlertStore, _sAlertTools, _sAlertDataPrep) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _SAlertContent2 = _interopRequireDefault(_SAlertContent);

    var _propTypes2 = _interopRequireDefault(_propTypes);

    var _sAlertStore2 = _interopRequireDefault(_sAlertStore);

    var _sAlertTools2 = _interopRequireDefault(_sAlertTools);

    var _sAlertDataPrep2 = _interopRequireDefault(_sAlertDataPrep);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
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

    var insertFunc = function insertFunc(msg, data, condition) {
        var id = _sAlertTools2.default.randomId();
        _sAlertStore2.default.dispatch({
            type: 'INSERT',
            data: _extends({}, data, {
                id: id,
                condition: condition,
                message: msg
            })
        });
        return id;
    };

    var SAlert = function (_React$Component) {
        _inherits(SAlert, _React$Component);

        function SAlert(props) {
            _classCallCheck(this, SAlert);

            var _this = _possibleConstructorReturn(this, (SAlert.__proto__ || Object.getPrototypeOf(SAlert)).call(this, props));

            _this.state = {
                dataRight: [],
                dataLeft: [],
                dataTop: [],
                dataBottom: []
            };
            return _this;
        }

        _createClass(SAlert, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                var _this2 = this;

                var storeStateLeft = void 0;
                var storeStateRight = void 0;
                var storeStateTop = void 0;
                var storeStateBottom = void 0;

                var addToStoreRight = function addToStoreRight() {
                    requestAnimationFrame(function () {
                        return requestAnimationFrame(function () {
                            var length = void 0;
                            storeStateRight = (0, _sAlertDataPrep2.default)('right', _this2) || [];
                            length = storeStateRight.length;
                            if (_this2.props.stack && _this2.props.stack.limit && length > _this2.props.stack.limit) {
                                var id = storeStateRight[0].id;
                                _sAlertStore2.default.dispatch({ type: 'REMOVE', data: { id: id } });
                                storeStateRight = (0, _sAlertDataPrep2.default)('right', _this2) || [];
                            }
                            _this2.setState({ dataRight: storeStateRight });
                        });
                    });
                };
                this.unsubStoreRight = _sAlertStore2.default.subscribe(addToStoreRight);

                var addToStoreLeft = function addToStoreLeft() {
                    requestAnimationFrame(function () {
                        return requestAnimationFrame(function () {
                            var length = void 0;
                            storeStateLeft = (0, _sAlertDataPrep2.default)('left', _this2) || [];
                            length = storeStateLeft.length;
                            if (_this2.props.stack && _this2.props.stack.limit && length > _this2.props.stack.limit) {
                                var id = storeStateLeft[0].id;
                                _sAlertStore2.default.dispatch({ type: 'REMOVE', data: { id: id } });
                                storeStateLeft = (0, _sAlertDataPrep2.default)('left', _this2) || [];
                            }
                            _this2.setState({ dataLeft: storeStateLeft });
                        });
                    });
                };
                this.unsubStoreLeft = _sAlertStore2.default.subscribe(addToStoreLeft);

                var addToStoreTop = function addToStoreTop() {
                    requestAnimationFrame(function () {
                        return requestAnimationFrame(function () {
                            var length = void 0;
                            storeStateTop = (0, _sAlertDataPrep2.default)('full-top', _this2) || [];
                            length = storeStateTop.length;
                            if (_this2.props.stack && _this2.props.stack.limit && length > _this2.props.stack.limit) {
                                var id = storeStateTop[0].id;
                                _sAlertStore2.default.dispatch({ type: 'REMOVE', data: { id: id } });
                                storeStateTop = (0, _sAlertDataPrep2.default)('full-top', _this2) || [];
                            }
                            _this2.setState({ dataTop: storeStateTop });
                        });
                    });
                };
                this.unsubStoreTop = _sAlertStore2.default.subscribe(addToStoreTop);

                var addToStoreBottom = function addToStoreBottom() {
                    requestAnimationFrame(function () {
                        return requestAnimationFrame(function () {
                            var length = void 0;
                            storeStateBottom = (0, _sAlertDataPrep2.default)('full-bottom', _this2) || [];
                            length = storeStateBottom.length;
                            if (_this2.props.stack && _this2.props.stack.limit && length > _this2.props.stack.limit) {
                                var id = storeStateBottom[0].id;
                                _sAlertStore2.default.dispatch({ type: 'REMOVE', data: { id: id } });
                                storeStateBottom = (0, _sAlertDataPrep2.default)('full-bottom', _this2) || [];
                            }
                            _this2.setState({ dataBottom: storeStateBottom });
                        });
                    });
                };
                this.unsubStoreBottom = _sAlertStore2.default.subscribe(addToStoreBottom);

                // set up global config from global SAlert props
                // only stuff needed for getAlertData
                var globalConfig = {
                    contentTemplate: this.props.contentTemplate,
                    offset: this.props.offset,
                    message: this.props.message,
                    stack: this.props.stack,
                    html: this.props.html,
                    customFields: this.props.customFields,
                    position: this.props.position || 'top-right',
                    preserveContext: this.props.preserveContext || false
                };
                _sAlertTools2.default.setGlobalConfig(globalConfig);
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                this.unsubStoreTop();
                this.unsubStoreBottom();
                this.unsubStoreLeft();
                this.unsubStoreRight();
            }
        }, {
            key: 'render',
            value: function render() {
                var _this3 = this;

                var mapFunc = function mapFunc(alert, index) {
                    var customKey = 'alert-key-' + alert.id + '-' + alert.position;
                    var id = alert.id;
                    var condition = _sAlertTools2.default.returnFirstDefined(alert.condition, 'info');
                    var message = _sAlertTools2.default.returnFirstDefined(alert.message, _this3.props.message, '');
                    var position = _sAlertTools2.default.returnFirstDefined(alert.position, _this3.props.position, 'top-right');
                    var offset = _sAlertTools2.default.returnFirstDefined(alert.offset, _this3.props.offset, 0);
                    var effect = _sAlertTools2.default.returnFirstDefined(alert.effect, _this3.props.effect);
                    var boxPosition = alert.boxPosition;
                    var beep = _sAlertTools2.default.returnFirstDefined(alert.beep, _this3.props.beep, false);
                    var timeout = _sAlertTools2.default.returnFirstDefined(alert.timeout, _this3.props.timeout, 5000);
                    var html = _sAlertTools2.default.returnFirstDefined(alert.html, _this3.props.html);
                    var onClose = _sAlertTools2.default.returnFirstDefined(alert.onClose, _this3.props.onClose);
                    var onShow = _sAlertTools2.default.returnFirstDefined(alert.onShow, _this3.props.onShow);
                    var customFields = _sAlertTools2.default.returnFirstDefined(alert.customFields, _this3.props.customFields);
                    var contentTemplate = _this3.props.contentTemplate;

                    return _react2.default.createElement(_SAlertContent2.default, {
                        key: customKey,
                        id: id,
                        customFields: customFields,
                        condition: condition,
                        message: message,
                        position: position,
                        effect: effect,
                        boxPosition: boxPosition,
                        beep: beep,
                        timeout: timeout,
                        html: html,
                        onClose: onClose,
                        onShow: onShow,
                        contentTemplate: contentTemplate });
                };
                var sAlertElemsRight = this.state.dataRight.map(mapFunc);
                var sAlertElemsLeft = this.state.dataLeft.map(mapFunc);
                var sAlertElemsTop = this.state.dataTop.map(mapFunc);
                var sAlertElemsBottom = this.state.dataBottom.map(mapFunc);
                return _react2.default.createElement(
                    'div',
                    { className: 's-alert-wrapper' },
                    sAlertElemsRight,
                    sAlertElemsLeft,
                    sAlertElemsTop,
                    sAlertElemsBottom
                );
            }
        }], [{
            key: 'info',
            value: function info(msg, data) {
                return insertFunc(msg, data, 'info');
            }
        }, {
            key: 'error',
            value: function error(msg, data) {
                return insertFunc(msg, data, 'error');
            }
        }, {
            key: 'warning',
            value: function warning(msg, data) {
                return insertFunc(msg, data, 'warning');
            }
        }, {
            key: 'success',
            value: function success(msg, data) {
                return insertFunc(msg, data, 'success');
            }
        }, {
            key: 'close',
            value: function close(id) {
                _sAlertStore2.default.dispatch({ type: 'REMOVE', data: { id: id } });
            }
        }, {
            key: 'closeAll',
            value: function closeAll() {
                _sAlertStore2.default.dispatch({ type: 'REMOVEALL' });
            }
        }]);

        return SAlert;
    }(_react2.default.Component);

    SAlert.propTypes = {
        message: _propTypes2.default.string,
        position: _propTypes2.default.string,
        offset: _propTypes2.default.number,
        stack: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.object]),
        effect: _propTypes2.default.string,
        beep: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object, _propTypes2.default.bool]),
        timeout: _propTypes2.default.oneOfType([_propTypes2.default.oneOf(['none']), _propTypes2.default.number]),
        html: _propTypes2.default.bool,
        preserveContext: _propTypes2.default.bool,
        onClose: _propTypes2.default.func,
        onShow: _propTypes2.default.func,
        customFields: _propTypes2.default.object,
        contentTemplate: _propTypes2.default.func
    };

    exports.default = SAlert;
});