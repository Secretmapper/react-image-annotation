import React, { Component } from 'react'
import Annotation, { compose, withAnnotationEditor } from '../lib'
import {
  withPointSelector,
  withRectangleSelector,
  withOvalSelector
} from '../lib/selectors'

import Root from './components/Root'
import Button from './components/Button'

import mocks from './mocks'
import img from './img.jpeg'

export default compose (
  withAnnotationEditor()
)(class App extends Component {
  state = {
    type: withRectangleSelector.TYPE,
    annotations: mocks.annotations
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
            selection: annotation.selection,
            geometry: annotation.geometry,
            data: annotation.data
          }}
          onChange={props.annotation.change}
          onSubmit={this.onSubmit}

          showSelector={!!annotation.geometry}
          showEditor={selection && selection.showEditor}
        />
      </Root>
    )
  }
})
