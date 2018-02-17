import React, { PureComponent as Component } from 'react'
import T from 'prop-types'

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

const withOvalSelector = (key = 'selector', annotationKey = 'annotation') => DecoratedComponent => {
  class WithOvalSelector extends Component {
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

  WithOvalSelector.displayName = `WithOvalSelector(${DecoratedComponent.displayName})`

  return WithOvalSelector
}

withOvalSelector.TYPE = TYPE
withOvalSelector.intersects = intersects
withOvalSelector.area = area

export default withOvalSelector
