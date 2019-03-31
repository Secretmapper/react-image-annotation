'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isMouseOverElement = function isMouseOverElement(_ref) {
  var elem = _ref.elem,
      e = _ref.e;
  var pageY = e.pageY,
      pageX = e.pageX;

  var _elem$getBoundingClie = elem.getBoundingClientRect(),
      left = _elem$getBoundingClie.left,
      right = _elem$getBoundingClie.right,
      bottom = _elem$getBoundingClie.bottom,
      top = _elem$getBoundingClie.top;

  return pageX > left && pageX < right && pageY > top && pageY < bottom;
};

var isMouseHovering = function isMouseHovering() {
  var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'isMouseHovering';
  return function (DecoratedComponent) {
    var IsMouseHovering = function (_Component) {
      _inherits(IsMouseHovering, _Component);

      function IsMouseHovering() {
        _classCallCheck(this, IsMouseHovering);

        var _this = _possibleConstructorReturn(this, _Component.call(this));

        _this.onMouseMove = function (e) {
          var elem = _this.el;

          _this.setState({
            isHoveringOver: isMouseOverElement({ elem: elem, e: e })
          });
        };

        _this.state = {
          isHoveringOver: false
        };
        return _this;
      }

      IsMouseHovering.prototype.componentDidMount = function componentDidMount() {
        document.addEventListener('mousemove', this.onMouseMove);
      };

      IsMouseHovering.prototype.componentWillUnmount = function componentWillUnmount() {
        document.removeEventListener('mousemove', this.onMouseMove);
      };

      IsMouseHovering.prototype.render = function render() {
        var _this2 = this,
            _hocProps;

        var hocProps = (_hocProps = {}, _hocProps[key] = {
          innerRef: function innerRef(el) {
            return _this2.el = el;
          },
          isHoveringOver: this.state.isHoveringOver
        }, _hocProps);

        return _react2.default.createElement(DecoratedComponent, _extends({}, this.props, hocProps));
      };

      return IsMouseHovering;
    }(_react.PureComponent);

    IsMouseHovering.displayName = 'IsMouseHovering(' + DecoratedComponent.displayName + ')';

    return IsMouseHovering;
  };
};

exports.default = isMouseHovering;
module.exports = exports['default'];