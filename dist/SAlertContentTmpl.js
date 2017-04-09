(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'prop-types'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('prop-types'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.propTypes);
        global.SAlertContentTmpl = mod.exports;
    }
})(this, function (exports, _react, _propTypes) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _propTypes2 = _interopRequireDefault(_propTypes);

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

    var SAlertContentTmpl = function (_React$Component) {
        _inherits(SAlertContentTmpl, _React$Component);

        function SAlertContentTmpl(props) {
            _classCallCheck(this, SAlertContentTmpl);

            return _possibleConstructorReturn(this, (SAlertContentTmpl.__proto__ || Object.getPrototypeOf(SAlertContentTmpl)).call(this, props));
        }

        _createClass(SAlertContentTmpl, [{
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
        id: _propTypes2.default.string.isRequired,
        classNames: _propTypes2.default.string.isRequired,
        styles: _propTypes2.default.object.isRequired,
        message: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]).isRequired,
        handleClose: _propTypes2.default.func.isRequired,
        customFields: _propTypes2.default.object
    };

    exports.default = SAlertContentTmpl;
});