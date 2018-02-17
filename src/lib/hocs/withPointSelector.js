import React, { PureComponent as Component } from 'react'
import T from 'prop-types'

const getCoordPercentage = (e) => ({
  x: e.nativeEvent.offsetX / e.currentTarget.offsetWidth * 100,
  y: e.nativeEvent.offsetY / e.currentTarget.offsetHeight * 100
})

const MARGIN = 5

export const TYPE = 'POINT'

export function intersects ({ x, y }, geometry) {
  if (x < geometry.x - MARGIN) return false
  if (y < geometry.y - MARGIN) return false
  if (x > geometry.x + MARGIN) return false
  if (y > geometry.y + MARGIN) return false

  return true
}

export function area (geometry) {
  return MARGIN * MARGIN
}

const withPointSelector = (key = 'selector') => DecoratedComponent => {
  class WithPointSelector extends Component {
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

      if (!annotation.geometry) {
        annotation.setGeometry({
          ...annotation.geometry,
          ...getCoordPercentage(e),
          width: 0,
          height: 0,
          type: TYPE
        })
        annotation.setShowEditor(true)
      }
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

withPointSelector.TYPE = TYPE
withPointSelector.intersects = intersects
withPointSelector.area = area

export default withPointSelector
