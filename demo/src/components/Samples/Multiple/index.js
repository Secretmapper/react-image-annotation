import React, { Component } from 'react'
import Annotation from '../../../../../src'
import {
  PointSelector,
  RectangleSelector,
  LineSelector,
  OvalSelector
} from '../../../../../src/selectors'

import Button from '../../Button'

import mocks from '../../../mocks'
import img from '../../../img.jpeg'

export default class Multiple extends Component {
  state = {
    type: LineSelector.TYPE,
    annotations: mocks.annotations,
    annotation: {}
  }

  onChange = annotation => {
    this.setState({ annotation })
  }

  onSubmit = annotation => {
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

  onChangeType = e => {
    this.setState({
      annotation: {},
      type: e.currentTarget.innerHTML
    })
  }

  render() {
    return (
      <div>
        <Button
          onClick={this.onChangeType}
          active={LineSelector.TYPE === this.state.type}>
          {LineSelector.TYPE}
        </Button>
        <Button
          onClick={this.onChangeType}
          active={RectangleSelector.TYPE === this.state.type}>
          {RectangleSelector.TYPE}
        </Button>
        <Button
          onClick={this.onChangeType}
          active={PointSelector.TYPE === this.state.type}>
          {PointSelector.TYPE}
        </Button>
        <Button
          onClick={this.onChangeType}
          active={OvalSelector.TYPE === this.state.type}>
          {OvalSelector.TYPE}
        </Button>

        <Annotation
          src={img}
          style={{ width: 300, height: 300 }}
          alt="Two pebbles anthropomorphized holding hands"
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
