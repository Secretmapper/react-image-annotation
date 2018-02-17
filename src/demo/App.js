import React, { Component } from 'react'
import Annotation, { compose, withAnnotationEditor } from '../lib'
import {
  withPointSelector,
  withRectangleSelector
} from '../lib/selectors'

import Root from './components/Root'
import Button from './components/Button'

import img from './img.jpeg'

export default compose (
  withAnnotationEditor(),
  withRectangleSelector(withRectangleSelector.TYPE),
  withPointSelector(withPointSelector.TYPE),
)(class App extends Component {
  state = {
    type: withRectangleSelector.TYPE,
    annotations: [
      {
        geometry:
          {
            type: withRectangleSelector.TYPE,
            x: 25,
            y: 31,
            width: 21,
            height: 35
          },
          data: {
            text: 'Red',
            id: 1
          }
      }
    ]
  }

  onSubmit = (annotation) => {
    const { geometry, data } = annotation

    this.setState({
      annotations: this.state.annotations.concat({
        geometry,
        data: {
          ...data,
          id: Math.random()
        }
      })
    })

    this.props.annotation.clearState()
  }

  onChangeType = (e) => {
    this.props.annotation.clearState()
    this.setState({
      type: e.currentTarget.innerHTML
    })
  }

  render () {
    const { props } = this

    return (
      <Root>
        <h1>React Annotation</h1>
        <Button
          onClick={this.onChangeType}
          active={withRectangleSelector.TYPE === this.state.type}
        >
          {withRectangleSelector.TYPE}
        </Button>
        <Button
          onClick={this.onChangeType}
          active={withPointSelector.TYPE === this.state.type}
        >
          {withPointSelector.TYPE}
        </Button>

        <Annotation
          src={img}
          alt='Two pebbles anthropomorphized holding hands'

          annotations={this.state.annotations}

          type={this.state.type}
          value={{
            geometry: props.annotation.geometry,
            data: props.annotation.data
          }}
          onMouseMove={props[this.state.type].onMouseMove}
          onClick={props[this.state.type].onClick}
          onChange={props.annotation.setData}
          onSubmit={this.onSubmit}

          showSelector={!!props.annotation.geometry}
          showEditor={!!props.annotation.showEditor}
        />
      </Root>
    )
  }
})
