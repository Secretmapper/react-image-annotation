'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactLineto = require('react-lineto');

var _reactLineto2 = _interopRequireDefault(_reactLineto);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _reactRnd = require('react-rnd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function edgesFromPoints(points) {
  if (!points || points.length < 3) return [];

  var edges = [];
  for (var i = 0; i < points.length; ++i) {
    if (i + 1 === points.length) {
      edges.push(Math.hypot(points[0].x - points[i].x, points[0].y - points[i].y));
    } else {
      edges.push(Math.hypot(points[i + 1].x - points[i].x, points[i + 1].y - points[i].y));
    }
  }

  return edges;
}

function Polygon(props) {
  var onChange = props.onChange,
      onSubmit = props.onSubmit,
      annotation = props.annotation,
      color = props.color;
  var geometry = annotation.geometry,
      data = annotation.data,
      selection = annotation.selection;

  if (!geometry || !geometry.points || geometry.points.length === 0) return null;

  return _react2.default.createElement(
    'div',
    {
      className: 'linesContainer ' + props.className,
      style: _extends({
        width: '100%',
        position: 'absolute',
        height: '100%'
      }, props.style) },
    geometry.points.length >= 3 && geometry.points.map(function (item, i) {
      // Iterate over points to create the edge lines
      var prevItem = void 0;
      if (i === 0) {
        // First point (links from last to first)
        prevItem = geometry.points[geometry.points.length - 1];
      } else {
        prevItem = geometry.points[i - 1];
      }
      return (
        // Note that each LineTo element must have a unique key (unique relative to the connected points)
        _react2.default.createElement(_reactLineto2.default, {
          key: i + '_' + item.x + '_' + item.y + '_' + prevItem.x + '_' + prevItem.y,
          delay: 0,
          from: 'linesContainer',
          fromAnchor: item.x + '% ' + item.y + '%',
          to: 'linesContainer',
          toAnchor: prevItem.x + '% ' + prevItem.y + '%',
          borderColor: color,
          borderStyle: 'dashed',
          borderWidth: 3,
          className: !props.active ? 'Polygon-LineTo' : 'Polygon-LineToActive'
        })
      );
    }),
    geometry.points.map(function (item, i) {
      // Iterate over points to points
      return (
        // Note that each LineTo element must have a unique key (unique relative to the point)

        _react2.default.createElement(_reactRnd.Rnd, {
          key: i + '_' + item.x + '_' + item.y,
          style: {
            border: 'solid 3px ' + color,
            borderRadius: '50%',
            boxSizing: 'border-box',
            boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(0, 0, 0, 0.2), 0 5px 4px rgba(0, 0, 0, 0.4)',
            zIndex: 10,
            position: 'absolute',
            transform: 'translate3d(-50%, -50%, 0)'
          },
          size: {
            width: 5,
            height: 5
          },
          enableResizing: false,
          onDragStop: function onDragStop(e, d, k) {
            if (!selection && (item.x !== d.x || item.y !== d.y)) {
              var p = annotation.geometry ? Object.assign([], annotation.geometry.points) : [];
              annotation.geometry.points[i].x = d.x * annotation.geometry.points[i].x / annotation.geometry.points[i].xPx;
              annotation.geometry.points[i].y = d.y * annotation.geometry.points[i].y / annotation.geometry.points[i].yPx;
              annotation.geometry.points[i].xPx = d.x;
              annotation.geometry.points[i].yPx = d.y;

              annotation.geometry.x = p.sort(function (a, b) {
                return a.x < b.x ? -1 : 1;
              })[0].x;

              annotation.geometry.y = p.sort(function (a, b) {
                return a.y < b.y ? -1 : 1;
              })[0].y;

              annotation.geometry.width = p.sort(function (a, b) {
                return a.x > b.x ? -1 : 1;
              })[0].x - annotation.geometry.x;

              annotation.geometry.height = p.sort(function (a, b) {
                return a.y > b.y ? -1 : 1;
              })[0].y - annotation.geometry.y;
              onChange(annotation);
              onSubmit();
            }
          },
          position: {
            x: item.xPx,
            y: item.yPx
          }
        })
      );
    })
  );
}

Polygon.defaultProps = {
  className: '',
  style: {}
};

exports.default = Polygon;
module.exports = exports['default'];