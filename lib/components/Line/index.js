'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteralLoose(['\n  border: dashed 2px black;\n  display: block;\n  width: 0px;\n  box-shadow: 0px 0px 1px 1px white inset;\n  transition: box-shadow 0.21s ease-in-out;\n'], ['\n  border: dashed 2px black;\n  display: block;\n  width: 0px;\n  box-shadow: 0px 0px 1px 1px white inset;\n  transition: box-shadow 0.21s ease-in-out;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

var Container = _styledComponents2.default.div(_templateObject);

function Line(props) {
  var geometry = props.annotation.geometry;

  if (!geometry) return null;

  return _react2.default.createElement(Container, {
    className: props.className,
    style: _extends({
      position: 'absolute',
      left: geometry.x + '%',
      top: geometry.y + '%',
      height: geometry.hypotenuse + 'px',
      '-webkit-transform': 'rotate(' + -geometry.angle + 'deg)',
      '-webkit-transform-origin': '0 0',
      '-moz-transform': 'rotate(' + -geometry.angle + 'deg)',
      '-moz-transform-origin': '0 0',
      '-o-transform': 'rotate(' + -geometry.angle + 'deg)',
      '-o-transform-origin': '0 0',
      '-ms-transform': 'rotate(' + -geometry.angle + 'deg)',
      '-ms-transform-origin': '0 0',
      transform: 'rotate(' + -geometry.angle + 'deg) ',
      boxShadow: props.active && '0 0 1px 1px yellow inset'
    }, props.style)
  });
}

Line.defaultProps = {
  className: '',
  style: {}
};

exports.default = Line;
module.exports = exports['default'];