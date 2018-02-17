import React, { PureComponent as Component } from 'react'
import T from 'prop-types'

const getCoordPercentage = (e) => ({
  x: e.nativeEvent.offsetX / e.currentTarget.offsetWidth * 100,
  y: e.nativeEvent.offsetY / e.currentTarget.offsetHeight * 100
})

export const TYPE = 'RECTANGLE'

export function intersects ({ x, y }, geometry) {
  if (x < geometry.x) return false
  if (y < geometry.y) return false
  if (x > geometry.x + geometry.width)
    return false
  if (y > geometry.y + geometry.height)
    return false

  return true
}

export function area (geometry) {
  return geometry.height * geometry.width
}

export const methods = {
  onClick (annotation, e) {
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
      switch (annotation.selection.mode) {
        case 'SELECTING':
          return {
            ...annotation,
            selection: {
              ...annotation.selection,
              mode: 'EDITING'
            }
          }
        case 'EDITING':
          break
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

const withRectangleSelector = (key = TYPE, annotationKey = 'annotation') => DecoratedComponent => {
  class WithRectangleSelector extends Component {
    static propTypes = {
      [annotationKey]: T.shape({
        store: T.object.isRequired,
        change: T.func.isRequired,
        clear: T.func.isRequired
      }).isRequired
    }

    onClick = e => {
      const annotation = this.props[annotationKey]

      annotation.change(
        methods.onClick(annotation.store, e)
      )
    }

    onMouseMove = e => {
      const annotation = this.props[annotationKey]

      annotation.change(
        methods.onMouseMove(annotation.store, e)
      )
    }

    render () {
      const hocProps = {
        [key]: {
          onClick: this.onClick,
          onMouseMove: this.onMouseMove
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

  WithRectangleSelector.displayName = `WithRectangleSelector(${DecoratedComponent.displayName})`

  return WithRectangleSelector
}

withRectangleSelector.TYPE = TYPE
withRectangleSelector.intersects = intersects
withRectangleSelector.area = area

export default withRectangleSelector
