import React, { PureComponent as Component } from 'react'
import T from 'prop-types'

const withRectangleSelector = (key = 'selector', annotationKey = 'annotation') => DecoratedComponent => {
  class WithRectangleSelector extends Component {
    static propTypes = {
      annotation: T.shape({
        getContainerHeightRatio: T.func.isRequired,
        getContainerWidthRatio: T.func.isRequired,

        isSelecting: T.bool.isRequired,
        selection: T.object,
        setSelection: T.func.isRequired,

        geometry: T.object,
        setGeometry: T.func.isRequired
      }).isRequired
    }

    onClick = e => {
      const { props } = this
      const { annotation } = props

      if (!annotation.selection) {
        annotation.setSelection({
          mode: 'SELECTING',
          anchorX: annotation.getContainerWidthRatio(e.nativeEvent.offsetX),
          anchorY: annotation.getContainerHeightRatio(e.nativeEvent.offsetY)
        })
      } else {
        switch (annotation.selection.mode) {
          case 'SELECTING':
            annotation.setSelection({
              ...props.selection,
              mode: 'EDITING'
            })
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
        const newX = annotation.getContainerWidthRatio(e.nativeEvent.offsetX)
        const newY = annotation.getContainerHeightRatio(e.nativeEvent.offsetY)
        const width = newX - anchorX
        const height = newY - anchorY

        annotation.setGeometry({
          ...annotation.geometry,
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

export default withRectangleSelector
