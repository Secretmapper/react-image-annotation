import { getCoordPercentage } from '../utils/offsetCoordinates';

export const TYPE = 'RECTANGLE'

export function intersects({ x, y }, geometry) {
  if (x < geometry.x) return false
  if (y < geometry.y) return false
  if (x > geometry.x + geometry.width) return false
  if (y > geometry.y + geometry.height) return false

  return true
}

export function area(geometry) {
  return geometry.height * geometry.width
}

export const methods = {
  onTouchStart(annotation, e) {
    return pointerDown(annotation, e)
  },
  onTouchEnd(annotation, e) {
    return pointerUp(annotation, e)
  },
  onTouchMove(annotation, e) {
    return pointerMove(annotation, e)
  },
  onMouseDown(annotation, e) {
    return pointerDown(annotation, e)
  },
  onMouseUp(annotation, e) {
    return pointerUp(annotation, e)
  },
  onMouseMove(annotation, e) {
    return pointerMove(annotation, e)
  }
}

function pointerDown(annotation, e) {
  if (!annotation.selection) {
    const { x: anchorX, y: anchorY } = getCoordPercentage(e)
    return {
      ...annotation,
      selection: {
        ...annotation.selection,
        mode: 'SELECTING',
        anchorX,
        anchorY
      }
    }
  } else {
    return {}
  }
}

function pointerUp(annotation, e) {
  if (annotation.selection) {
    const { selection, geometry } = annotation
    if (!geometry) {
      return {}
    }
    switch (annotation.selection.mode) {
      case 'SELECTING':
        return {
          ...annotation,
          selection: {
            ...annotation.selection,
            showEditor: true,
            mode: 'EDITING'
          }
        }
      default:
        break
    }
  }
  return annotation
}

function pointerMove(annotation, e) {
  if (annotation.selection && annotation.selection.mode === 'SELECTING') {
    const { anchorX, anchorY } = annotation.selection
    const { x: newX, y: newY } = getCoordPercentage(e)
    const width = newX - anchorX
    const height = newY - anchorY

    return {
      ...annotation,
      geometry: {
        ...annotation.geometry,
        type: TYPE,
        x: width > 0 ? anchorX : newX,
        y: height > 0 ? anchorY : newY,
        width: Math.abs(width),
        height: Math.abs(height)
      }
    }
  }
  return annotation
}

export default {
  TYPE,
  intersects,
  area,
  methods
}
