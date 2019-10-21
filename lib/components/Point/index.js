'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRnd = require('react-rnd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Point(props) {
  var _props$annotation = props.annotation,
      geometry = _props$annotation.geometry,
      data = _props$annotation.data,
      _props$annotation$col = _props$annotation.color,
      color = _props$annotation$col === undefined ? 'white' : _props$annotation$col;

  if (!geometry) return null;

  return _react2.default.createElement(_reactRnd.Rnd, {
    style: {
      border: 'solid 2px ' + color,
      borderRadius: '50%',
      boxSizing: 'border-box',
      pointerEvents: 'auto',
      zIndex: 1000,
      boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(0, 0, 0, 0.2), 0 5px 4px rgba(0, 0, 0, 0.4)',

      position: 'absolute',
      transform: 'translate3d(-50%, -50%, 0)'
    },
    size: {
      width: 16,
      height: 16
    },
    enableResizing: false,
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
    position: {
      x: geometry.xPx - 8,
      y: geometry.yPx - 8
    }
  });
}

exports.default = Point;
module.exports = exports['default'];