'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _reactRnd = require('react-rnd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Oval(props) {
  var _extends2;

  var onChange = props.onChange,
      onSubmit = props.onSubmit,
      annotation = props.annotation,
      color = props.color;
  var geometry = annotation.geometry,
      data = annotation.data,
      selection = annotation.selection;

  if (!geometry) return null;

  return _react2.default.createElement(_reactRnd.Rnd, {
    className: props.className,
    style: _extends((_extends2 = {
      border: 'dashed 2px ' + color,
      borderRadius: '100%',
      boxShadow: '0px 0px 1px 1px ' + color + ' inset',
      boxSizing: 'border-box',
      transition: 'box-shadow 0.21s ease-in-out',
      position: 'absolute',
      zIndex: 10
    }, _extends2['boxShadow'] = props.active && '0 0 1px 1px ' + color + ' inset', _extends2), props.style),
    size: {
      height: geometry.height + '%',
      width: geometry.width + '%'
    },
    disableDragging: true,
    enableResizing: !selection ? { bottom: true, top: true, left: true, right: true } : false,
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