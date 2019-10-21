'use strict';

exports.__esModule = true;
exports.methods = exports.TYPE = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.intersects = intersects;
exports.area = area;

var _offsetCoordinates = require('../utils/offsetCoordinates');

var TYPE = exports.TYPE = 'LINE';

function intersects(_ref, geometry) {
	var x = _ref.x,
	    y = _ref.y;

	if (x < geometry.x) return false;
	if (y < geometry.y) return false;
	if (x > geometry.x + geometry.width) return false;
	if (y > geometry.y + geometry.height) return false;

	return false;
}

function area(geometry) {
	return geometry.height * geometry.width;
}

var methods = exports.methods = {
	onMouseDown: function onMouseDown(annotation, e) {
		if (!annotation.selection) {
			var _getCoordPercentage = (0, _offsetCoordinates.getCoordPercentage)(e),
			    anchorX = _getCoordPercentage.x,
			    anchorY = _getCoordPercentage.y;

			return _extends({}, annotation, {
				selection: _extends({}, annotation.selection, {
					mode: 'SELECTING',
					anchorX: anchorX,
					anchorXpX: e.nativeEvent.offsetX,
					anchorYpX: e.nativeEvent.offsetY,
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
			    anchorXpX = _annotation$selection2.anchorXpX,
			    anchorYpX = _annotation$selection2.anchorYpX;

			var _getCoordPercentage2 = (0, _offsetCoordinates.getCoordPercentage)(e),
			    newX = _getCoordPercentage2.x,
			    newY = _getCoordPercentage2.y;

			var newXpX = e.nativeEvent.offsetX;
			var newYpX = e.nativeEvent.offsetY;
			var widthPx = newXpX - anchorXpX;
			var heightPx = newYpX - anchorYpX;
			var width = newX - anchorX;
			var height = newY - anchorY;
			var angle = Math.atan(widthPx / heightPx) * 180 / Math.PI;
			if (heightPx < 0) {
				angle += 180;
			} else if (heightPx > 0 && widthPx < 0) {
				angle += 360;
			}
			var hypotenuse = Math.hypot(heightPx, widthPx);

			return _extends({}, annotation, {
				geometry: _extends({}, annotation.geometry, {
					type: TYPE,
					x: anchorX,
					xPx: anchorXpX,
					yPx: anchorYpX,
					y: anchorY,
					x2: newX,
					y2: newY,
					x2Px: newXpX,
					y2Px: newYpX,
					angle: angle,
					hypotenuse: hypotenuse,
					widthPx: Math.abs(widthPx),
					heightPx: Math.abs(heightPx),
					width: Math.abs(width),
					height: Math.abs(height)
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