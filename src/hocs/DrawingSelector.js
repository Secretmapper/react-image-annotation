import { getCoordPercentage, getRealCoordinates } from '../utils/offsetCoordinates';

const MARGIN = 6

const marginToPercentage = (container) => ({
  marginX: MARGIN / container.width * 100,
  marginY: MARGIN / container.height * 100
})


export const TYPE = 'DRAWING';

export function intersects({ x, y }, geometry, container) {
  if (geometry.points.some(e => {
    if (x * geometry.size.width / 100 < e.x - MARGIN) return false
    if (y * geometry.size.height / 100 < e.y - MARGIN) return false
    if (x * geometry.size.width / 100 > e.x + MARGIN) return false
    if (y * geometry.size.height / 100 > e.y + MARGIN) return false
    return true
  })) {
    return true
  }



  return false
}

export function area(geometry, container) {
  const { marginX, marginY } = marginToPercentage(container)

  return MARGIN * MARGIN
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
    const { x, y, width, height } = getRealCoordinates(e)
    return {
      ...annotation,
      geometry: {
        points: [{ x, y }],
        size: { width, height }
      },
      selection: {
        ...annotation.selection,
        mode: 'SELECTING',

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
        const lastPoint = getCoordPercentage(e);
        return {
          ...annotation,
          geometry: {
            ...annotation.geometry,
            x: lastPoint.x,
            y: lastPoint.y,
            height: 0
          },
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
    const { x, y } = getRealCoordinates(e)
    return {
      ...annotation,
      geometry: {
        ...annotation.geometry,
        type: TYPE,
        points: [...(annotation.geometry.points || []), { x, y }]
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
