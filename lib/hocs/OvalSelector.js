'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.intersects = intersects;
exports.area = area;
var square = function square(n) {
  return Math.pow(n, 2);
};

var getCoordPercentage = function getCoordPercentage(e) {
  if (isTouchEvent(e)) {
    if (isValidTouchEvent(e)) {
      return getTouchRelativeCoordinates(e);
    } else {
      return {
        x: null
      };
    }
  } else {
    return getMouseRelativeCoordinates(e);
  }
};

var isTouchEvent = function isTouchEvent(e) {
  return e.nativeEvent.targetTouches !== undefined;
};
var isValidTouchEvent = function isValidTouchEvent(e) {
  return e.nativeEvent.targetTouches.length === 1;
};
var getTouchRelativeCoordinates = function getTouchRelativeCoordinates(e) {
  var touch = e.nativeEvent.targetTouches[0];

  var offsetX = touch.pageX - e.currentTarget.offsetParent.offsetLeft;
  var offsetY = touch.pageY - e.currentTarget.offsetParent.offsetTop;

  return {
    x: offsetX / e.currentTarget.offsetWidth * 100,
    y: offsetY / e.currentTarget.offsetHeight * 100
  };
};
var getMouseRelativeCoordinates = function getMouseRelativeCoordinates(e) {
  return {
    x: e.nativeEvent.offsetX / e.currentTarget.offsetWidth * 100,
    y: e.nativeEvent.offsetY / e.currentTarget.offsetHeight * 100
  };
};

var TYPE = exports.TYPE = 'OVAL';

function intersects(_ref, geometry) {
  var x = _ref.x,
      y = _ref.y;

  var rx = geometry.width / 2;
  var ry = geometry.height / 2;
  var h = geometry.x + rx;
  var k = geometry.y + ry;

  var value = square(x - h) / square(rx) + square(y - k) / square(ry);

  return value <= 1;
}

function area(geometry) {
  var rx = geometry.width / 2;
  var ry = geometry.height / 2;

  return Math.PI * rx * ry;
}

var methods = exports.methods = {
  onTouchStart: function onTouchStart(annotation, e) {
    return pointerDown(annotation, e);
  },
  onTouchEnd: function onTouchEnd(annotation, e) {
    return pointerUp(annotation, e);
  },
  onTouchMove: function onTouchMove(annotation, e) {
    return pointerMove(annotation, e);
  },
  onMouseDown: function onMouseDown(annotation, e) {
    return pointerDown(annotation, e);
  },
  onMouseUp: function onMouseUp(annotation, e) {
    return pointerUp(annotation, e);
  },
  onMouseMove: function onMouseMove(annotation, e) {
    return pointerMove(annotation, e);
  }
};

function pointerDown(annotation, e) {
  if (!annotation.selection) {
    var _getCoordPercentage = getCoordPercentage(e),
        anchorX = _getCoordPercentage.x,
        anchorY = _getCoordPercentage.y;

    return _extends({}, annotation, {
      selection: _extends({}, annotation.selection, {
        mode: 'SELECTING',
        anchorX: anchorX,
        anchorY: anchorY
      })
    });
  } else {
    return {};
  }
  return annotation;
}

function pointerUp(annotation, e) {
  if (annotation.selection) {
    var selection = annotation.selection,
        geometry = annotation.geometry;


    if (!geometry) {
      return {};
    }

    switch (annotation.selection.mode) {
      case 'SELECTING':
        return _extends({}, annotation, {
          selection: _extends({}, annotation.selection, {
            showEditor: true,
            mode: 'EDITING'
          })
        });
      default:
        break;
    }
  }
  return annotation;
}

function pointerMove(annotation, e) {
  if (annotation.selection && annotation.selection.mode === "SELECTING") {
    var _annotation$selection = annotation.selection,
        anchorX = _annotation$selection.anchorX,
        anchorY = _annotation$selection.anchorY;

    var _getCoordPercentage2 = getCoordPercentage(e),
        newX = _getCoordPercentage2.x,
        newY = _getCoordPercentage2.y;

    var width = newX - anchorX;
    var height = newY - anchorY;

    return _extends({}, annotation, {
      geometry: _extends({}, annotation.geometry, {
        type: TYPE,
        x: width > 0 ? anchorX : newX,
        y: height > 0 ? anchorY : newY,
        width: Math.abs(width),
        height: Math.abs(height)
      })
    });
  }
  return annotation;
}

exports.default = {
  TYPE: TYPE,
  intersects: intersects,
  area: area,
  methods: methods
};