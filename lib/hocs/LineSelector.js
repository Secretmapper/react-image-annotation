'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.intersects = intersects;
exports.area = area;
var getCoordPercentage = function getCoordPercentage(e) {
	return {
		x: e.nativeEvent.offsetX / e.currentTarget.offsetWidth * 100,
		y: e.nativeEvent.offsetY / e.currentTarget.offsetHeight * 100
	};
};

var TYPE = exports.TYPE = 'LINE';

function intersects(_ref, geometry) {
	var x = _ref.x,
	    y = _ref.y;

	if (x < geometry.x) return false;
	if (y < geometry.y) return false;
	if (x > geometry.x + geometry.width) return false;
	if (y > geometry.y + geometry.height) return false;

	return true;
}

function area(geometry) {
	return geometry.height * geometry.width;
}

var methods = exports.methods = {
	onMouseDown: function onMouseDown(annotation, e) {
		if (!annotation.selection) {
			var _getCoordPercentage = getCoordPercentage(e),
			    anchorX = _getCoordPercentage.x,
			    anchorY = _getCoordPercentage.y;

			return _extends({}, annotation, {
				selection: _extends({}, annotation.selection, {
					mode: 'SELECTING',
					anchorX: anchorX,
					xPx: e.nativeEvent.offsetX,
					yPx: e.nativeEvent.offsetY,
					anchorY: anchorY
				})
			});
		} else {
			return {};
		}

		return annotation;
	},
	onMouseUp: function onMouseUp(annotation, e) {
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
	},
	onMouseMove: function onMouseMove(annotation, e) {
		if (annotation.selection && annotation.selection.mode === 'SELECTING') {
			var _annotation$selection = annotation.selection,
			    anchorX = _annotation$selection.anchorX,
			    anchorY = _annotation$selection.anchorY;
			var _annotation$selection2 = annotation.selection,
			    xPx = _annotation$selection2.xPx,
			    yPx = _annotation$selection2.yPx;

			var _getCoordPercentage2 = getCoordPercentage(e),
			    newX = _getCoordPercentage2.x,
			    newY = _getCoordPercentage2.y;

			var newXpX = e.nativeEvent.offsetX;
			var newYpX = e.nativeEvent.offsetY;
			var width = newXpX - xPx;
			var height = newYpX - yPx;

			var angle = Math.atan(width / height) * 180 / Math.PI;
			if (height < 0) {
				angle += 180;
			} else if (height > 0 && width < 0) {
				angle += 360;
			}
			var hypotenuse = Math.hypot(height, width);

			return _extends({}, annotation, {
				geometry: _extends({}, annotation.geometry, {
					type: TYPE,
					x: anchorX,
					y: anchorY,
					angle: angle,
					hypotenuse: hypotenuse,
					width: width,
					height: height
				})
			});
		}

		return annotation;
	}
};

exports.default = {
	TYPE: TYPE,
	intersects: intersects,
	area: area,
	methods: methods
};