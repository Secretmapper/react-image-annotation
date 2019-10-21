'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _reactRnd = require('react-rnd');

var _reactLineto = require('react-lineto');

var _reactLineto2 = _interopRequireDefault(_reactLineto);

var _index = require('../Point/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Line(props) {
  var onChange = props.onChange,
      onSubmit = props.onSubmit,
      annotation = props.annotation;
  var geometry = annotation.geometry,
      data = annotation.data,
      _annotation$color = annotation.color,
      color = _annotation$color === undefined ? 'white' : _annotation$color,
      selection = annotation.selection;


  if (!geometry) return null;
  return _react2.default.createElement(
    'div',
    {
      className: 'linesContainer ' + props.className,
      style: _extends({
        width: '100%',

        position: 'absolute',
        height: '100%'
      }, props.style) },
    _react2.default.createElement(_reactRnd.Rnd, {
      key: geometry.xPx + '_' + geometry.yPx,
      style: {
        border: 'solid 2px ' + color,
        borderRadius: '50%',
        boxSizing: 'border-box',
        pointerEvents: 'auto',
        zIndex: 10,
        boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(0, 0, 0, 0.2), 0 5px 4px rgba(0, 0, 0, 0.4)',

        position: 'absolute',
        transform: 'translate3d(-50%, -50%, 0)'
      },
      size: {
        width: 10,
        height: 10
      },
      enableResizing: false,
      onDragStop: function onDragStop(e, d, k) {
        if (geometry.xPx !== d.x || geometry.yPx !== d.y) {
          geometry.x = d.x * geometry.x / geometry.xPx;
          geometry.y = d.y * geometry.y / geometry.yPx;
          geometry.xPx = d.x;
          geometry.yPx = d.y;
          onChange(annotation);
          onSubmit();
        }
      },
      position: {
        x: geometry.xPx - 5,
        y: geometry.yPx - 5
      }
    }),
    _react2.default.createElement(_reactLineto2.default, {
      key: geometry.x + '_' + geometry.y + '_' + geometry.x2 + '_' + geometry.y2,
      from: 'linesContainer',
      fromAnchor: geometry.x + '% ' + geometry.y + '%',
      to: 'linesContainer',
      toAnchor: geometry.x2 + '% ' + geometry.y2 + '%',
      borderColor: 'black',
      borderStyle: 'dashed',
      borderWidth: 2
    }),
    !selection && _react2.default.createElement(_reactRnd.Rnd, {
      key: geometry.x2Px + '_' + geometry.y2Px,
      style: {
        border: 'solid 2px ' + color,
        borderRadius: '50%',
        boxSizing: 'border-box',
        pointerEvents: 'auto',
        zIndex: 10,
        boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(0, 0, 0, 0.2), 0 5px 4px rgba(0, 0, 0, 0.4)',

        position: 'absolute',
        transform: 'translate3d(-50%, -50%, 0)'
      },
      size: {
        width: 10,
        height: 10
      },
      enableResizing: false,
      onDragStop: function onDragStop(e, d, k) {
        if (geometry.x2Px !== d.x || geometry.y2Px !== d.y) {
          geometry.x2 = d.x * geometry.x2 / geometry.x2Px;
          geometry.y2 = d.y * geometry.y2 / geometry.y2Px;
          geometry.x2Px = d.x;
          geometry.y2Px = d.y;
          onChange(annotation);
          onSubmit();
        }
      },
      position: {
        x: geometry.x2Px - 5,
        y: geometry.y2Px - 5
      }
    })
  );
}

Line.defaultProps = {
  className: '',
  style: {}
};

exports.default = Line;
module.exports = exports['default'];