import React, { Component } from 'react'
import Annotation from '../../../../../src'
import {
  PointSelector,
  RectangleSelector,
  LineSelector,
  DrawingSelector,
  PolygonSelector,
  OvalSelector
} from '../../../../../src/selectors'

import Button from '../../Button'

import mocks from '../../../mocks'
import img from '../../../img.jpeg'

export default class Multiple extends Component {
  state = {
    type: DrawingSelector.TYPE,
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
        color: 'red',
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
      <div style={{ height: 400, overflow: 'auto' }}>
        <Button
          onClick={this.onChangeType}
          active={LineSelector.TYPE === this.state.type}>
          {LineSelector.TYPE}
        </Button>
        <Button
          onClick={this.onChangeType}
          active={PolygonSelector.TYPE === this.state.type}>
          {PolygonSelector.TYPE}
        </Button>
        <Button
          onClick={this.onChangeType}
          active={DrawingSelector.TYPE === this.state.type}>
          {DrawingSelector.TYPE}
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
          color="green"
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
