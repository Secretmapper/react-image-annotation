import React, { Component } from 'react'
import Annotation from '../../../../lib'
import {
  withPointSelector,
  withRectangleSelector,
  withOvalSelector
} from '../../../../lib/selectors'

import Button from '../../Button'

import mocks from '../../../mocks'
import img from '../../../img.jpeg'

export default class Multiple extends Component {
  state = {
    type: withRectangleSelector.TYPE,
    annotations: mocks.annotations,
    annotation: {}
  }

  onChange = (annotation) => {
    this.setState({ annotation })
  }

  onSubmit = (annotation) => {
    const { geometry, data } = annotation

    this.setState({
      annotation: {},
      annotations: this.state.annotations.concat({
        geometry,
        data: {
          ...data,
          id: Math.random()
        }
      })
    })
  }

  onChangeType = (e) => {
    this.setState({
      annotation: {},
      type: e.currentTarget.innerHTML
    })
  }

  render () {
    return (
      <div>
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
          value={this.state.annotation}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
      </div>
    )
  }
}
