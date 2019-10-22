'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRnd = require('react-rnd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Rectangle(props) {
  var _props$annotation = props.annotation,
      geometry = _props$annotation.geometry,
      data = _props$annotation.data,
      color = _props$annotation.color;

  if (!geometry) return null;
  return _react2.default.createElement(_reactRnd.Rnd, {
    id: data.id,
    style: {
      border: 'dashed 4px ' + color,
      pointerEvents: 'auto',
      zIndex: 10
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
    },
    size: {
      width: geometry.width + '%',
      height: geometry.height + '%'
    }
  });
}

Rectangle.defaultProps = {
  className: '',
  style: {}
};

exports.default = Rectangle;
module.exports = exports['default'];