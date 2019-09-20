'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var withRelativeMousePos = function withRelativeMousePos() {
  var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'relativeMousePos';
  return function (DecoratedComponent) {
    var WithRelativeMousePos = function (_Component) {
      _inherits(WithRelativeMousePos, _Component);

      function WithRelativeMousePos() {
        var _temp, _this, _ret;

        _classCallCheck(this, WithRelativeMousePos);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = { x: null, y: null }, _this.innerRef = function (el) {
          _this.container = el;
        }, _this.onMouseMove = function (e) {
          _this.setState({
            x: e.nativeEvent.offsetX / _this.container.width * 100,
            y: e.nativeEvent.offsetY / _this.container.height * 100
          });
        }, _this.onMouseLeave = function (e) {
          _this.setState({ x: null, y: null });
        }, _temp), _possibleConstructorReturn(_this, _ret);
      }

      WithRelativeMousePos.prototype.render = function render() {
        var _hocProps;

        var hocProps = (_hocProps = {}, _hocProps[key] = {
          innerRef: this.innerRef,
          onMouseMove: this.onMouseMove,
          onMouseLeave: this.onMouseLeave,
          x: this.state.x,
          y: this.state.y
        }, _hocProps);

        return _react2.default.createElement(DecoratedComponent, _extends({}, this.props, hocProps));
      };

      return WithRelativeMousePos;
    }(_react.PureComponent);

    WithRelativeMousePos.displayName = 'withRelativeMousePos(' + DecoratedComponent.displayName + ')';

    return WithRelativeMousePos;
  };
};

exports.default = withRelativeMousePos;
module.exports = exports['default'];