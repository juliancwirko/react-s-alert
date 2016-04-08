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

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SAlertContent = require('./SAlertContent');

var _SAlertContent2 = _interopRequireDefault(_SAlertContent);

var _sAlertStore = require('./s-alert-parts/s-alert-store');

var _sAlertStore2 = _interopRequireDefault(_sAlertStore);

var _sAlertTools = require('./s-alert-parts/s-alert-tools');

var _sAlertTools2 = _interopRequireDefault(_sAlertTools);

var _sAlertDataPrep = require('./s-alert-parts/s-alert-data-prep');

var _sAlertDataPrep2 = _interopRequireDefault(_sAlertDataPrep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var insertFunc = function insertFunc(msg, data, condition) {
    var id = _sAlertTools2.default.randomId();
    _sAlertStore2.default.dispatch({
        type: 'INSERT',
        data: (0, _assign2.default)({ position: 'top-right' }, data, {
            id: id,
            condition: condition,
            message: msg
        })
    });
    return id;
};

var SAlert = function (_React$Component) {
    (0, _inherits3.default)(SAlert, _React$Component);

    function SAlert(props) {
        (0, _classCallCheck3.default)(this, SAlert);

        var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(SAlert).call(this, props));

        _this.state = {
            dataRight: [],
            dataLeft: [],
            dataTop: [],
            dataBottom: []
        };
        return _this;
    }

    (0, _createClass3.default)(SAlert, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var storeStateLeft = void 0;
            var storeStateRight = void 0;
            var storeStateTop = void 0;
            var storeStateBottom = void 0;

            var addToStoreRight = function addToStoreRight() {
                var length = void 0;
                storeStateRight = (0, _sAlertDataPrep2.default)('right') || [];
                length = storeStateRight.length;
                if (_this2.props.stack && _this2.props.stack.limit && length > _this2.props.stack.limit) {
                    var id = storeStateRight[0].id;
                    _sAlertStore2.default.dispatch({ type: 'REMOVE', data: { id: id } });
                    storeStateRight = (0, _sAlertDataPrep2.default)('right') || [];
                }
                _this2.setState({ dataRight: storeStateRight });
            };
            this.unsubStoreRight = _sAlertStore2.default.subscribe(addToStoreRight);

            var addToStoreLeft = function addToStoreLeft() {
                var length = void 0;
                storeStateLeft = (0, _sAlertDataPrep2.default)('left') || [];
                length = storeStateLeft.length;
                if (_this2.props.stack && _this2.props.stack.limit && length > _this2.props.stack.limit) {
                    var id = storeStateLeft[0].id;
                    _sAlertStore2.default.dispatch({ type: 'REMOVE', data: { id: id } });
                    storeStateLeft = (0, _sAlertDataPrep2.default)('left') || [];
                }
                _this2.setState({ dataLeft: storeStateLeft });
            };
            this.unsubStoreLeft = _sAlertStore2.default.subscribe(addToStoreLeft);

            var addToStoreTop = function addToStoreTop() {
                var length = void 0;
                storeStateTop = (0, _sAlertDataPrep2.default)('full-top') || [];
                length = storeStateTop.length;
                if (_this2.props.stack && _this2.props.stack.limit && length > _this2.props.stack.limit) {
                    var id = storeStateTop[0].id;
                    _sAlertStore2.default.dispatch({ type: 'REMOVE', data: { id: id } });
                    storeStateTop = (0, _sAlertDataPrep2.default)('full-top') || [];
                }
                _this2.setState({ dataTop: storeStateTop });
            };
            this.unsubStoreTop = _sAlertStore2.default.subscribe(addToStoreTop);

            var addToStoreBottom = function addToStoreBottom() {
                var length = void 0;
                storeStateBottom = (0, _sAlertDataPrep2.default)('full-bottom') || [];
                length = storeStateBottom.length;
                if (_this2.props.stack && _this2.props.stack.limit && length > _this2.props.stack.limit) {
                    var id = storeStateBottom[0].id;
                    _sAlertStore2.default.dispatch({ type: 'REMOVE', data: { id: id } });
                    storeStateBottom = (0, _sAlertDataPrep2.default)('full-bottom') || [];
                }
                _this2.setState({ dataBottom: storeStateBottom });
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
                position: this.props.position
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
    message: _react2.default.PropTypes.string,
    position: _react2.default.PropTypes.string,
    offset: _react2.default.PropTypes.number,
    stack: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.bool, _react2.default.PropTypes.object]),
    effect: _react2.default.PropTypes.string,
    beep: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.object, _react2.default.PropTypes.bool]),
    timeout: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.oneOf(['none']), _react2.default.PropTypes.number]),
    html: _react2.default.PropTypes.bool,
    onClose: _react2.default.PropTypes.func,
    onShow: _react2.default.PropTypes.func,
    customFields: _react2.default.PropTypes.object,
    contentTemplate: _react2.default.PropTypes.func
};

exports.default = SAlert;