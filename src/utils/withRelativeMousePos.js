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

    onMouseLeave = (e) => {
      this.setState({ x: null, y: null })
    }

    render () {
      const hocProps = {
        [key]: {
          innerRef: this.innerRef,
          onMouseMove: this.onMouseMove,
          onMouseLeave: this.onMouseLeave,
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
