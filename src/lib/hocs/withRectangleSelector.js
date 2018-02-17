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

const withRectangleSelector = (key = 'selector', annotationKey = 'annotation') => DecoratedComponent => {
  class WithRectangleSelector extends Component {
    static propTypes = {
      annotation: T.shape({
        selection: T.object,
        setSelection: T.func.isRequired,

        showEditor: T.bool.isRequired,
        setShowEditor: T.func.isRequired,

        geometry: T.object,
        setGeometry: T.func.isRequired
      }).isRequired
    }

    onClick = e => {
      const { props } = this
      const { annotation } = props

      if (!annotation.selection) {
        const { x: anchorX, y: anchorY } = getCoordPercentage(e)

        annotation.setSelection({
          mode: 'SELECTING',
          anchorX,
          anchorY
        })
      } else {
        switch (annotation.selection.mode) {
          case 'SELECTING':
            annotation.setSelection({
              ...props.selection,
              mode: 'EDITING'
            })
            annotation.setShowEditor(true)
            break
          case 'EDITING':
            break
          default:
            break
        }
      }
    }

    onMouseMove = e => {
      const { props } = this
      const { annotation } = props

      if (annotation.selection && annotation.selection.mode === 'SELECTING') {
        const { anchorX, anchorY } = annotation.selection
        const { x: newX, y: newY } = getCoordPercentage(e)
        const width = newX - anchorX
        const height = newY - anchorY

        annotation.setGeometry({
          ...annotation.geometry,
          type: TYPE,
          x: width > 0 ? anchorX : newX,
          y: height > 0 ? anchorY : newY,
          width: Math.abs(width),
          height: Math.abs(height)
        })
      }
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
