import React, { PureComponent as Component } from 'react'

const withRelativeMousePos = (key = 'relativeMousePos') => DecoratedComponent => {
  class WithRelativeMousePos extends Component {
    state = { x: null, y: null }

    innerRef = el => {
      this.container = el
    }

    onMouseMove = (e) => {
      this.setState({
        x: (e.nativeEvent.offsetX / this.container.width) * 100,
        y: (e.nativeEvent.offsetY / this.container.height) * 100,
      })
    }

    render () {
      const hocProps = {
        [key]: {
          innerRef: this.innerRef,
          onMouseMove: this.onMouseMove,
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
