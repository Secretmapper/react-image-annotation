'use strict';

exports.__esModule = true;
exports.methods = exports.TYPE = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.intersects = intersects;
exports.area = area;

var _offsetCoordinates = require('../utils/offsetCoordinates');

var MARGIN = 6;

var marginToPercentage = function marginToPercentage(container) {
  return {
    marginX: MARGIN / container.width * 100,
    marginY: MARGIN / container.height * 100
  };
};

var TYPE = exports.TYPE = 'POINT';

function intersects(_ref, geometry, container) {
  var x = _ref.x,
      y = _ref.y;

  var _marginToPercentage = marginToPercentage(container),
      marginX = _marginToPercentage.marginX,
      marginY = _marginToPercentage.marginY;

  if (x < geometry.x - marginX) return false;
  if (y < geometry.y - marginY) return false;
  if (x > geometry.x + marginX) return false;
  if (y > geometry.y + marginY) return false;

  return true;
}

function area(geometry, container) {
  var _marginToPercentage2 = marginToPercentage(container),
      marginX = _marginToPercentage2.marginX,
      marginY = _marginToPercentage2.marginY;

  return marginX * marginY;
}

var methods = exports.methods = {
  onClick: function onClick(annotation, e) {
    if (!annotation.geometry) {
      return _extends({}, annotation, {
        selection: _extends({}, annotation.selection, {
          showEditor: true,
          mode: 'EDITING'
        }),
        geometry: _extends({
          id: Math.random()
        }, annotation.geometry, (0, _offsetCoordinates.getCoordPercentage)(e), {
          width: 0,
          height: 0,
          type: TYPE
        })
      });
    } else {
      return {};
    }
  },
  onDragStop: function onDragStop(e, d, annotation) {
    console.log('MOVED');
  }
};

exports.default = {
  TYPE: TYPE,
  intersects: intersects,
  area: area,
  methods: methods
};