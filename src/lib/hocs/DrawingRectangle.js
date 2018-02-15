import React, { PureComponent as Component } from 'react'

const getPercentage = (value, container) => (
  (value / container) * 100
)

const drawingRectangle = (key = 'drawingRectangle') => DecoratedComponent => {
  class DrawingRectangle extends Component {
    state = {
      isSelecting: false,
      selection: {},
      geometry: {}
    }

    onClick = e => {
      this.setState({
        isSelecting: true,
        selection: {
          anchorX: getPercentage(e.nativeEvent.offsetX, this.img.width),
          anchorY: getPercentage(e.nativeEvent.offsetY, this.img.height)
        }
      })
    }

    onMouseMove = e => {
      const { isSelecting, selection, geometry } = this.state

      const { anchorX, anchorY } = selection
      const newX = getPercentage(e.nativeEvent.offsetX, this.img.width)
      const newY = getPercentage(e.nativeEvent.offsetY, this.img.height)
      const width = newX - anchorX
      const height = newY - anchorY

      this.setState({
        geometry: isSelecting
          ? {
            ...geometry,
            x: width > 0 ? anchorX : newX,
            y: height > 0 ? anchorY : newY,
            width: Math.abs(width),
            height: Math.abs(height)
          }
          : geometry
      })
    }

    render () {
      const hocProps = {
        [key]: {
          innerRef: img => this.img = img,
          onClick: this.onClick,
          onMouseMove: this.onMouseMove,
          isSelecting: this.state.isSelecting,
          geometry: this.state.geometry
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

  DrawingRectangle.displayName = `DrawingRectangle(${DecoratedComponent.displayName})`

  return DrawingRectangle
}

export default drawingRectangle
