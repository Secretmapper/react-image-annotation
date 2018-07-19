const square = n => Math.pow(n, 2)

const getCoordPercentage = (e) => ({
  x: e.nativeEvent.offsetX / e.currentTarget.offsetWidth * 100,
  y: e.nativeEvent.offsetY / e.currentTarget.offsetHeight * 100
})

export const TYPE = 'OVAL'

export function intersects ({ x, y }, geometry) {
  const rx = geometry.width / 2
  const ry = geometry.height / 2
  const h = geometry.x + rx
  const k = geometry.y + ry

  const value = square(x - h) / square(rx) + square(y - k) / square(ry)

  return value <= 1
}

export function area (geometry) {
  const rx = geometry.width / 2
  const ry = geometry.height / 2

  return Math.PI * rx * ry
}

export const methods = {
  onMouseDown (annotation, e) {
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
  },

  onMouseUp (annotation, e) {
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
  },

  onMouseMove (annotation, e) {
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
}

export default {
  TYPE,
  intersects,
  area,
  methods
}
