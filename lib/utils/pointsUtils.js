"use strict";

exports.__esModule = true;
exports.getHorizontallyCentralPoint = getHorizontallyCentralPoint;
exports.getVerticallyLowestPoint = getVerticallyLowestPoint;
/*
 * This util file contains functions for getting different kinds of horizontal/vertical
 * points given an array of points (e.g.: [{x: 4, y: 87}, {x: 99, y:7}, ...]).
 */

/*
 * This function returns the horizontally central x-value (number return type), defined
 * as the mean of the smallest and largest x-values.
 */
function getHorizontallyCentralPoint(points) {
  var leftMostHorizontalPoint = points.reduce(function (prev, curr) {
    return curr.x < prev.x ? curr : prev;
  }).x;
  var rightMostHorizontalPoint = points.reduce(function (prev, curr) {
    return curr.x > prev.x ? curr : prev;
  }).x;

  return leftMostHorizontalPoint + Math.round((rightMostHorizontalPoint - leftMostHorizontalPoint) / 2);
}

/*
 * This function returns the vertically lowest y-value (number return type), defined
 * as the largest y-value.
 */
function getVerticallyLowestPoint(points) {
  return points.reduce(function (prev, curr) {
    return curr.y > prev.y ? curr : prev;
  }).y;
}