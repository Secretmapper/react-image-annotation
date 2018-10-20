/*
 * This util file contains functions for getting different kinds of horizontal/vertical
 * points given an array of points (e.g.: [{x: 4, y: 87}, {x: 99, y:7}, ...]).
 */

/*
 * This function returns the horizontally central x-value (number return type), defined
 * as the mean of the smallest and largest x-values.
 */
export function getHorizontallyCentralPoint(points) {
  const leftMostHorizontalPoint = points.reduce((prev, curr) => (curr.x < prev.x ? curr : prev)).x
  const rightMostHorizontalPoint = points.reduce((prev, curr) => (curr.x > prev.x ? curr : prev)).x

  return leftMostHorizontalPoint + Math.round((rightMostHorizontalPoint - leftMostHorizontalPoint) / 2)
}

/*
 * This function returns the vertically lowest y-value (number return type), defined
 * as the largest y-value.
 */
export function getVerticallyLowestPoint(points) {
  return points.reduce((prev, curr) => (curr.y > prev.y ? curr : prev)).y
}
