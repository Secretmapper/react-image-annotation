const inside = require('point-in-polygon');
import { polygon } from 'polygon-tools';

import { getHorizontallyCentralPoint, getVerticallyLowestPoint } from '../utils/pointsUtils'

const getCoordPercentage = (e) => ({
  x: e.nativeEvent.offsetX / e.currentTarget.offsetWidth * 100,
  y: e.nativeEvent.offsetY / e.currentTarget.offsetHeight * 100
})

export const TYPE = 'POLYGON'

export function intersects ({ x, y }, geometry) {
  if (!geometry || !geometry.points || geometry.points.length < 3) return false;

  const pointsAsArrays = geometry.points.map(point => [point.x, point.y]);

  return inside([x, y], pointsAsArrays);
}

export function area (geometry) {
  if (!geometry || !geometry.points || geometry.points.length < 3) return 0;

  return polygon.area(geometry.points);
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

  onMouseUp (annotation, e) {
    const coordOfClick = getCoordPercentage(e);

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
