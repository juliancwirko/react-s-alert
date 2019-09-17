(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'react-dom', 'prop-types', './s-alert-parts/s-alert-tools', './s-alert-parts/s-alert-store', './SAlertContentTmpl'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('react-dom'), require('prop-types'), require('./s-alert-parts/s-alert-tools'), require('./s-alert-parts/s-alert-store'), require('./SAlertContentTmpl'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactDom, global.propTypes, global.sAlertTools, global.sAlertStore, global.SAlertContentTmpl);
        global.SAlertContent = mod.exports;
    }
})(this, function (exports, _react, _reactDom, _propTypes, _sAlertTools, _sAlertStore, _SAlertContentTmpl) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _propTypes2 = _interopRequireDefault(_propTypes);

    var _sAlertTools2 = _interopRequireDefault(_sAlertTools);

    var _sAlertStore2 = _interopRequireDefault(_sAlertStore);

    var _SAlertContentTmpl2 = _interopRequireDefault(_SAlertContentTmpl);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

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

    var SAlertContent = function (_React$Component) {
        _inherits(SAlertContent, _React$Component);

        function SAlertContent(props) {
            _classCallCheck(this, SAlertContent);

            return _possibleConstructorReturn(this, (SAlertContent.__proto__ || Object.getPrototypeOf(SAlertContent)).call(this, props));
        }

        _createClass(SAlertContent, [{
            key: 'handleCloseAlert',
            value: function handleCloseAlert() {
                var closingTimeout = void 0;
                var alertId = this.props.id;
                var currentAlertElem = _reactDom2.default.findDOMNode(this);
                var animationClose = function animationClose() {
                    currentAlertElem.style.display = 'none';
                    _sAlertStore2.default.dispatch({ type: 'REMOVE', data: { id: alertId } });
                    clearTimeout(closingTimeout);
                };
                if (document.hidden || document.webkitHidden || !currentAlertElem.classList.contains('s-alert-is-effect')) {
                    _sAlertStore2.default.dispatch({ type: 'REMOVE', data: { id: alertId } });
                } else {
                    currentAlertElem.classList.remove('s-alert-show');
                    closingTimeout = setTimeout(function () {
                        currentAlertElem.classList.add('s-alert-hide');
                    }, 100);
                    currentAlertElem.removeEventListener('webkitAnimationEnd', animationClose, false);
                    currentAlertElem.removeEventListener('animationend', animationClose, false);
                    currentAlertElem.addEventListener('webkitAnimationEnd', animationClose, false);
                    currentAlertElem.addEventListener('animationend', animationClose, false);
                }
                // stop audio when closing
                this.alertAudio && this.alertAudio.load();
            }
        }, {
            key: 'componentWillMount',
            value: function componentWillMount() {
                var beep = this.props.beep;
                var condition = this.props.condition;
                if (beep && typeof beep === 'string') {
                    this.alertAudio = new Audio(beep);
                    this.alertAudio.load();
                    this.alertAudio.play();
                }
                if (beep && (typeof beep === 'undefined' ? 'undefined' : _typeof(beep)) === 'object' && condition === 'info') {
                    this.alertAudio = new Audio(beep.info);
                    this.alertAudio.load();
                    this.alertAudio.play();
                }
                if (beep && (typeof beep === 'undefined' ? 'undefined' : _typeof(beep)) === 'object' && condition === 'error') {
                    this.alertAudio = new Audio(beep.error);
                    this.alertAudio.load();
                    this.alertAudio.play();
                }
                if (beep && (typeof beep === 'undefined' ? 'undefined' : _typeof(beep)) === 'object' && condition === 'success') {
                    this.alertAudio = new Audio(beep.success);
                    this.alertAudio.load();
                    this.alertAudio.play();
                }
                if (beep && (typeof beep === 'undefined' ? 'undefined' : _typeof(beep)) === 'object' && condition === 'warning') {
                    this.alertAudio = new Audio(beep.warning);
                    this.alertAudio.load();
                    this.alertAudio.play();
                }
            }
        }, {
            key: 'componentDidMount',
            value: function componentDidMount() {
                var _this2 = this;

                if (typeof this.props.timeout === 'number') {
                    this.closeTimer = setTimeout(function () {
                        _this2.handleCloseAlert();
                    }, this.props.timeout);
                }
                if (this.props.onShow) {
                    this.props.onShow();
                }
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                if (this.closeTimer) {
                    clearTimeout(this.closeTimer);
                }
                if (this.props.onClose) {
                    this.props.onClose();
                }
            }
        }, {
            key: 'render',
            value: function render() {
                var classNames = 's-alert-box s-alert-' + this.props.condition + ' s-alert-' + this.props.position + ' ' + (this.props.effect ? 's-alert-is-effect s-alert-effect-' + this.props.effect : '') + ' s-alert-show';
                var message = this.props.html ? _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: this.props.message } }) : this.props.message;
                var styles = this.props.boxPosition ? _sAlertTools2.default.styleToObj(this.props.boxPosition) : {};
                var id = this.props.id;
                var handleClose = this.handleCloseAlert.bind(this);
                var contentTemplate = this.props.contentTemplate || _SAlertContentTmpl2.default;
                var customFields = this.props.customFields || {};
                var condition = this.props.condition;

                return _react2.default.createElement(contentTemplate, { classNames: classNames, id: id, styles: styles, message: message, handleClose: handleClose, customFields: customFields, condition: condition });
            }
        }]);

        return SAlertContent;
    }(_react2.default.Component);

    SAlertContent.propTypes = {
        condition: _propTypes2.default.string.isRequired,
        message: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
        position: _propTypes2.default.string.isRequired,
        boxPosition: _propTypes2.default.string,
        id: _propTypes2.default.string.isRequired,
        effect: _propTypes2.default.string,
        beep: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object, _propTypes2.default.bool]),
        timeout: _propTypes2.default.oneOfType([_propTypes2.default.oneOf(['none']), _propTypes2.default.number]),
        html: _propTypes2.default.bool,
        onClose: _propTypes2.default.func,
        onShow: _propTypes2.default.func,
        customFields: _propTypes2.default.object,
        contentTemplate: _propTypes2.default.func
    };

    exports.default = SAlertContent;
});