import { getCoordPercentage } from '../utils/offsetCoordinates';

const square = n => Math.pow(n, 2)

export const TYPE = 'OVAL'

export function intersects({ x, y }, geometry) {
  const rx = geometry.width / 2
  const ry = geometry.height / 2
  const h = geometry.x + rx
  const k = geometry.y + ry

  const value = square(x - h) / square(rx) + square(y - k) / square(ry)

  return value <= 1
}

export function area(geometry) {
  const rx = geometry.width / 2
  const ry = geometry.height / 2

  return Math.PI * rx * ry
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
  return annotation
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
