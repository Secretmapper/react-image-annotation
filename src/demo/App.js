import React, { Component } from 'react'
import Annotation, { compose, withAnnotationEditor } from '../lib'
import { withRectangleSelector } from '../lib/selectors'

import Root from './components/Root'

import img from './img.jpeg'

export default compose (
  withAnnotationEditor(),
  withRectangleSelector()
)(class App extends Component {
  state = {
    annotations: [
      {
        geometry:
          {
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

  render () {
    const { props } = this

    return (
      <Root>
        <h1>React Annotation</h1>
        <Annotation
          src={img}
          alt='Two pebbles anthropomorphized holding hands'

          annotations={this.state.annotations}

          value={{
            geometry: props.annotation.geometry,
            data: props.annotation.data
          }}
          onMouseMove={props.selector.onMouseMove}
          onClick={props.selector.onClick}
          onChange={props.annotation.setData}
          onSubmit={this.onSubmit}

          showSelector={!!props.annotation.geometry}
          showEditor={!!props.annotation.showEditor}
        />
      </Root>
    )
  }
})
