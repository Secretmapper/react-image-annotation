'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteralLoose(['\n  border: dashed 2px black;\n  border-radius: 100%;\n  box-shadow: 0px 0px 1px 1px white inset;\n  box-sizing: border-box;\n  transition: box-shadow 0.21s ease-in-out;\n'], ['\n  border: dashed 2px black;\n  border-radius: 100%;\n  box-shadow: 0px 0px 1px 1px white inset;\n  box-sizing: border-box;\n  transition: box-shadow 0.21s ease-in-out;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _reactRnd = require('react-rnd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

var Container = _styledComponents2.default.div(_templateObject);

function Oval(props) {
  var _extends2;

  var onChange = props.onChange,
      onSubmit = props.onSubmit,
      annotation = props.annotation;
  var geometry = annotation.geometry,
      data = annotation.data,
      _annotation$color = annotation.color,
      color = _annotation$color === undefined ? 'white' : _annotation$color,
      selection = annotation.selection;

  if (!geometry) return null;

  return _react2.default.createElement(_reactRnd.Rnd, {
    className: props.className,
    style: _extends((_extends2 = {
      border: 'dashed 2px ' + color,
      borderRadius: '100%',
      boxShadow: '0px 0px 1px 1px white inset',
      boxSizing: 'border-box',
      transition: 'box-shadow 0.21s ease-in-out',
      position: 'absolute',

      zIndex: 10

    }, _extends2['boxShadow'] = props.active && '0 0 1px 1px yellow inset', _extends2), props.style),
    size: {
      height: geometry.height + '%',
      width: geometry.width + '%'
    },
    onDragStop: function onDragStop(e, d, k) {
      if (props.annotation.geometry.xPx !== d.x || props.annotation.geometry.yPx !== d.y) {
        props.annotation.geometry.x = d.x * props.annotation.geometry.x / props.annotation.geometry.xPx;
        props.annotation.geometry.y = d.y * props.annotation.geometry.y / props.annotation.geometry.yPx;
        props.annotation.geometry.xPx = d.x;
        props.annotation.geometry.yPx = d.y;
        props.onChange(props.annotation);
        props.onSubmit();
      }
    },
    onResizeStop: function onResizeStop(e, direction, ref, d) {
      var newAnnotation = Object.assign({}, props.annotation);
      if (direction === 'top' || direction === 'left' || direction === 'topLeft') {
        props.annotation.geometry.x = (newAnnotation.geometry.xPx - d.width) * props.annotation.geometry.x / props.annotation.geometry.xPx;
        props.annotation.geometry.y = (newAnnotation.geometry.yPx - d.height) * props.annotation.geometry.y / props.annotation.geometry.yPx;
        newAnnotation.geometry.xPx -= d.width;
        newAnnotation.geometry.yPx -= d.height;
      }
      newAnnotation.geometry.width = parseFloat(ref.style.width);
      newAnnotation.geometry.height = parseFloat(ref.style.height);
      props.onChange(newAnnotation);
      props.onSubmit();
    },
    position: {
      x: geometry.xPx,
      y: geometry.yPx
    }
  });
}

Oval.defaultProps = {
  className: '',
  style: {}
};

exports.default = Oval;
module.exports = exports['default'];