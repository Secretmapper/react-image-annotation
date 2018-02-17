import React, { Component } from 'react'
import Annotation, { compose, withAnnotationEditor } from '../lib'
import {
  withPointSelector,
  withRectangleSelector,
  withOvalSelector
} from '../lib/selectors'

import Root from './components/Root'
import Button from './components/Button'

import img from './img.jpeg'

export default compose (
  withAnnotationEditor(),
  withRectangleSelector(withRectangleSelector.TYPE),
  withPointSelector(withPointSelector.TYPE),
  withOvalSelector(withOvalSelector.TYPE)
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
            text: 'Annotate!',
            id: 1
          }
      },
      {
        geometry:
          {
            type: 'OVAL',
            x: 53,
            y: 33,
            width : 17.5,
            height: 28
          },
          data: {
            text: 'Supports custom shapes too!',
            id: 2
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

    this.props.annotation.clear()
  }

  onChangeType = (e) => {
    this.props.annotation.clear()
    this.setState({
      type: e.currentTarget.innerHTML
    })
  }

  render () {
    const { props } = this

    const annotation = props.annotation.store
    const { selection } = annotation

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
        <Button
          onClick={this.onChangeType}
          active={withOvalSelector.TYPE === this.state.type}
        >
          {withOvalSelector.TYPE}
        </Button>

        <Annotation
          src={img}
          alt='Two pebbles anthropomorphized holding hands'

          annotations={this.state.annotations}

          type={this.state.type}
          value={{
            geometry: annotation.geometry,
            data: annotation.data
          }}
          onMouseMove={props[this.state.type].onMouseMove}
          onClick={props[this.state.type].onClick}
          onChange={data => {
            props.annotation.change({
              ...annotation,
              data
            })
          }}
          onSubmit={this.onSubmit}

          showSelector={!!annotation.geometry}
          showEditor={selection && selection.mode === 'EDITING'}
        />
      </Root>
    )
  }
})
