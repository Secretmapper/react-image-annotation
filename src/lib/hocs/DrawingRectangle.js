import React, { PureComponent as Component } from 'react'

const getPercentage = (value, container) => (
  (value / container) * 100
)

const initialState = {
  isSelecting: false,
  selection: {},
  geometry: {}
}

const drawingRectangle = (key = 'drawingRectangle') => DecoratedComponent => {
  class DrawingRectangle extends Component {
    state = initialState

    onClick = e => {
      if (this.state.isSelecting) {
        this.props.setSelectionGeometry(this.state.geometry)
        this.setState(initialState)
      } else {
        this.setState({
          isSelecting: true,
          selection: {
            anchorX: getPercentage(e.nativeEvent.offsetX, this.img.width),
            anchorY: getPercentage(e.nativeEvent.offsetY, this.img.height)
          }
        })
      }
    }

    onMouseMove = e => {
      if (this.state.isSelecting) {
        const { selection, geometry } = this.state

        const { anchorX, anchorY } = selection
        const newX = getPercentage(e.nativeEvent.offsetX, this.img.width)
        const newY = getPercentage(e.nativeEvent.offsetY, this.img.height)
        const width = newX - anchorX
        const height = newY - anchorY

        this.setState({
          geometry: {
            ...geometry,
            x: width > 0 ? anchorX : newX,
            y: height > 0 ? anchorY : newY,
            width: Math.abs(width),
            height: Math.abs(height)
          }
        })
      }
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
