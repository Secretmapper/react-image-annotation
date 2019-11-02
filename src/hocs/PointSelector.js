import { getCoordPercentage } from '../utils/offsetCoordinates';
const MARGIN = 6

const marginToPercentage = (container) => ({
  marginX: MARGIN / container.width * 100,
  marginY: MARGIN / container.height * 100
})

export const TYPE = 'POINT'

export function intersects ({ x, y }, geometry, container) {
  const { marginX, marginY } = marginToPercentage(container)

  if (x < geometry.x - marginX) return false
  if (y < geometry.y - marginY) return false
  if (x > geometry.x + marginX) return false
  if (y > geometry.y + marginY) return false

  return true
}

export function area (geometry, container) {
  const { marginX, marginY } = marginToPercentage(container)

  return marginX * marginY
}

export const methods = {
  onClick (annotation, e) {
    if (!annotation.geometry) {
      return {
        ...annotation,
        selection: {
          ...annotation.selection,
          showEditor: true,
          mode: 'EDITING'
        },
        geometry: {
          ...annotation.geometry,
          ...getCoordPercentage(e),
          width: 0,
          height: 0,
          type: TYPE,
        }
      }
    } else{
      return {}
    }
  }
}

export default {
  TYPE,
  intersects,
  area,
  methods
}
