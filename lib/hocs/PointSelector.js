'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.intersects = intersects;
exports.area = area;
var MARGIN = 6;

var getCoordPercentage = function getCoordPercentage(e) {
  return {
    x: e.nativeEvent.offsetX / e.currentTarget.offsetWidth * 100,
    y: e.nativeEvent.offsetY / e.currentTarget.offsetHeight * 100
  };
};

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
        geometry: _extends({}, annotation.geometry, getCoordPercentage(e), {
          width: 0,
          height: 0,
          type: TYPE
        })
      });
    } else {
      return {};
    }
  }
};

exports.default = {
  TYPE: TYPE,
  intersects: intersects,
  area: area,
  methods: methods
};