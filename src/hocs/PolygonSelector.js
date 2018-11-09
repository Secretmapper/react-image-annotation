var PolygonLookup = require('polygon-lookup')
import { polygon } from 'polygon-tools'

import { getHorizontallyCentralPoint, getVerticallyLowestPoint } from '../utils/pointsUtils'

const getCoordPercentage = (e) => ({
  x: e.nativeEvent.offsetX / e.currentTarget.offsetWidth * 100,
  y: e.nativeEvent.offsetY / e.currentTarget.offsetHeight * 100
})

export const TYPE = 'POLYGON'

/* 
 * This function checks if the argument pointToCheck exists on the line created between pointA and pointB.
 * All point arguments are represented as two element arrays (e.g.: [10, 15]).
 */
function isPointOnLine (pointA, pointB, pointToCheck) {
  return (Math.hypot(pointToCheck[0]-pointA[0], pointToCheck[1]-pointA[1])
         + Math.hypot(pointB[0]-pointToCheck[0], pointB[1]-pointToCheck[1])
         === Math.hypot(pointB[0]-pointA[0], pointB[1]-pointA[1]))
}

/* 
 * This function checks if the point [x, y] exists on the edge of the polygon created by points polygonPoints.
 * The argument polygonPoints is an array of objects (e.g.: [{x: 10, y: 15}, ...]).
 */
function isPointOnPolygonEdge ({ x, y }, polygonPoints) {
  if (!polygonPoints || polygonPoints.length < 3 || !x || !y) { return false }

  for (let i = 0; i < polygonPoints.length - 1; ++i) {
    if (i === 0) { // First point
      if (isPointOnLine(polygonPoints[0], polygonPoints[polygonPoints.length - 1], [x, y])) {
        return true
      }
    } else {
      if (isPointOnLine(polygonPoints[i], polygonPoints[i + 1], [x, y])) {
        return true
      }
    }
  }
  return false
}

export function intersects ({ x, y }, geometry) {
  if (!geometry || !geometry.points || geometry.points.length < 3) return false

  // Switch to point array format (e.g.: [{x: 10, y: 15}, ...] -> [[10, 15], ...])
  const pointsAsArrays = geometry.points.map(point => [point.x, point.y])

  // Setup GeoJSON json format
  const featureCollection = {
    type: 'FeatureCollection',
    features: [{
      geometry: {
        type: 'Polygon',
        coordinates: [ pointsAsArrays ]
      }
    }]
  }

  // Determine if point is inside polygon
  const lookup = new PolygonLookup(featureCollection)
  const poly = lookup.search(x, y)

  // Return whether the point is inside the polygon (poly equals undefined if not) or if the
  // point is on the edge (isPointOnPolygonEdge function call)
  return (poly !== undefined || isPointOnPolygonEdge({x, y}, pointsAsArrays))
}

export function area (geometry) {
  if (!geometry || !geometry.points || geometry.points.length < 3) return 0

  return polygon.area(geometry.points.map(point => [point.x, point.y]))
}

export const methods = {
  onSelectionComplete (annotation) {
    return {
      ...annotation,
      selection: {
        ...annotation.selection,
        showEditor: true,
        mode: 'EDITING'
      }
    }
  },

  onSelectionClear (annotation) {
    return {
      ...annotation,
      geometry: {
        ...annotation.geometry,
        points: []
      }
    }
  },

  onSelectionUndo (annotation) {
    return {
      ...annotation,
      geometry: {
        ...annotation.geometry,
        points: annotation.geometry.points.slice(0, -1)
      }
    }
  },

  onClick (annotation, e) {
    const coordOfClick = getCoordPercentage(e)

    return {
      ...annotation,
      geometry: {
        ...annotation.geometry,
        type: TYPE,
        points: (!annotation.geometry ? [coordOfClick] : [
          ...annotation.geometry.points,
          coordOfClick
        ])
      },
      selection: {
        ...annotation.selection,
        mode: 'SELECTING'
      }
    }
  }
}

export default {
  TYPE,
  intersects,
  area,
  methods
}
