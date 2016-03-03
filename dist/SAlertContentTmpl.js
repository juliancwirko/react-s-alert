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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SAlertContentTmpl = function (_React$Component) {
    (0, _inherits3.default)(SAlertContentTmpl, _React$Component);

    function SAlertContentTmpl(props) {
        (0, _classCallCheck3.default)(this, SAlertContentTmpl);
        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(SAlertContentTmpl).call(this, props));
    }

    (0, _createClass3.default)(SAlertContentTmpl, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: this.props.classNames, id: this.props.id, style: this.props.styles },
                _react2.default.createElement(
                    'div',
                    { className: 's-alert-box-inner' },
                    this.props.message
                ),
                _react2.default.createElement('span', { className: 's-alert-close', onClick: this.props.handleClose })
            );
        }
    }]);
    return SAlertContentTmpl;
}(_react2.default.Component);

SAlertContentTmpl.propTypes = {
    id: _react2.default.PropTypes.string.isRequired,
    classNames: _react2.default.PropTypes.string.isRequired,
    styles: _react2.default.PropTypes.object.isRequired,
    message: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.object]).isRequired,
    handleClose: _react2.default.PropTypes.func.isRequired,
    customFields: _react2.default.PropTypes.object
};

exports.default = SAlertContentTmpl;