import React, { PureComponent as Component } from 'react'
import T from 'prop-types'

const MARGIN = 6

const getCoordPercentage = (e) => ({
  x: e.nativeEvent.offsetX / e.currentTarget.offsetWidth * 100,
  y: e.nativeEvent.offsetY / e.currentTarget.offsetHeight * 100
})

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
    }
  }
}

export const hoc = (key = 'selector', annotationKey = 'annotation') => DecoratedComponent => {
  class WithPointSelector extends Component {
    static propTypes = {
      [annotationKey]: T.shape({
        store: T.object.isRequired,
        change: T.func.isRequired,
        clear: T.func.isRequired
      }).isRequired
    }

    onClick = (e) => {
      const annotation = this.props[annotationKey]

      annotation.change(
        methods.onClick(annotation.store, e)
      )
    }

    render () {
      const hocProps = {
        [key]: {
          onClick: this.onClick
        }
      }

      return (
        <DecoratedComponent
          {...this.props}
          {...hocProps}
        />
      )
    }
  }

  WithPointSelector.displayName = `WithPointSelector(${DecoratedComponent.displayName})`

  return WithPointSelector
}

export default {
  TYPE,
  intersects,
  area,
  methods,
  hoc
}
