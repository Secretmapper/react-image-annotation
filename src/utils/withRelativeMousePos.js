import React, { PureComponent as Component } from 'react'
import { getOffsetCoordPercentage } from './offsetCoordinates';

const withRelativeMousePos = (key = 'relativeMousePos') => DecoratedComponent => {
  class WithRelativeMousePos extends Component {
    state = { x: null, y: null }

    innerRef = el => {
      this.container = el
    }

    onMouseMove = (e) => {
      const xystate = getOffsetCoordPercentage(e, this.container);
      this.setState(xystate);
    }
    onTouchMove = (e) => {
      if (e.targetTouches.length === 1) {
        const touch = e.targetTouches[0]

        const offsetX = touch.pageX - this.container.offsetParent.offsetLeft
        const offsetY = touch.pageY - this.container.offsetParent.offsetTop

        this.setState({
          x: (offsetX / this.container.width) * 100,
          y: (offsetY / this.container.height) * 100
        })
      }
    }

    onMouseLeave = (e) => {
      this.setState({ x: null, y: null })
    }
    onTouchLeave = (e) => {
      this.setState({ x: null, y: null })
    }

    render () {
      const hocProps = {
        [key]: {
          innerRef: this.innerRef,
          onMouseMove: this.onMouseMove,
          onMouseLeave: this.onMouseLeave,
          onTouchMove: this.onTouchMove,
          onTouchLeave: this.onTouchLeave,
          x: this.state.x,
          y: this.state.y
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

  WithRelativeMousePos.displayName = `withRelativeMousePos(${DecoratedComponent.displayName})`

  return WithRelativeMousePos
}

export default withRelativeMousePos
