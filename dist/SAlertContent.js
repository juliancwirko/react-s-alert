'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _sAlertTools = require('./s-alert-parts/s-alert-tools');

var _sAlertTools2 = _interopRequireDefault(_sAlertTools);

var _sAlertStore = require('./s-alert-parts/s-alert-store');

var _sAlertStore2 = _interopRequireDefault(_sAlertStore);

var _SAlertContentTmpl = require('./SAlertContentTmpl');

var _SAlertContentTmpl2 = _interopRequireDefault(_SAlertContentTmpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SAlertContent = function (_React$Component) {
    (0, _inherits3.default)(SAlertContent, _React$Component);

    function SAlertContent(props) {
        (0, _classCallCheck3.default)(this, SAlertContent);
        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(SAlertContent).call(this, props));
    }

    (0, _createClass3.default)(SAlertContent, [{
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
            if (beep && _lodash2.default.isString(beep)) {
                this.alertAudio = new Audio(beep);
                this.alertAudio.load();
                this.alertAudio.play();
            }
            if (beep && _lodash2.default.isObject(beep) && condition === 'info') {
                this.alertAudio = new Audio(beep.info);
                this.alertAudio.load();
                this.alertAudio.play();
            }
            if (beep && _lodash2.default.isObject(beep) && condition === 'error') {
                this.alertAudio = new Audio(beep.error);
                this.alertAudio.load();
                this.alertAudio.play();
            }
            if (beep && _lodash2.default.isObject(beep) && condition === 'success') {
                this.alertAudio = new Audio(beep.success);
                this.alertAudio.load();
                this.alertAudio.play();
            }
            if (beep && _lodash2.default.isObject(beep) && condition === 'warning') {
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

            return _react2.default.createElement(contentTemplate, { classNames: classNames, id: id, styles: styles, message: message, handleClose: handleClose, customFields: customFields });
        }
    }]);
    return SAlertContent;
}(_react2.default.Component);

SAlertContent.propTypes = {
    condition: _react2.default.PropTypes.string.isRequired,
    message: _react2.default.PropTypes.string.isRequired,
    position: _react2.default.PropTypes.string.isRequired,
    boxPosition: _react2.default.PropTypes.string,
    id: _react2.default.PropTypes.string.isRequired,
    effect: _react2.default.PropTypes.string,
    beep: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.object, _react2.default.PropTypes.bool]),
    timeout: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.oneOf(['none']), _react2.default.PropTypes.number]),
    html: _react2.default.PropTypes.bool,
    onClose: _react2.default.PropTypes.func,
    onShow: _react2.default.PropTypes.func,
    customFields: _react2.default.PropTypes.object,
    contentTemplate: _react2.default.PropTypes.func
};

exports.default = SAlertContent;