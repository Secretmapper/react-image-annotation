import React, { Component } from 'react'
import Annotation from '../../../../../src'
import {
  PointSelector,
  RectangleSelector,
  OvalSelector
} from '../../../../../src/selectors'

import Button from '../../Button'

import mocks from '../../../mocks'
import img from '../../../img.jpeg'

const styles = {
  redBorder: { border: '1px solid red' },
  blueBorder: { border: '1px solid blue'}
}

export default class Multiple extends Component {
  state = {
    type: RectangleSelector.TYPE,
    annotations: mocks.annotations,
    annotation: {},
    style: {}
  }

  onChange = (annotation) => {
    this.setState({ annotation: { ...annotation, style: this.state.style } })
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
        },
        style: this.state.style
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
        <div>
          <h3>Shape: </h3>
          <Button
            onClick={this.onChangeType}
            active={RectangleSelector.TYPE === this.state.type}
          >
            {RectangleSelector.TYPE}
          </Button>
          <Button
            onClick={this.onChangeType}
            active={PointSelector.TYPE === this.state.type}
          >
            {PointSelector.TYPE}
          </Button>
          <Button
            onClick={this.onChangeType}
            active={OvalSelector.TYPE === this.state.type}
          >
            {OvalSelector.TYPE}
          </Button>
        </div>

        <div style={{ flex: 1,  }}>
          <h3>Border: </h3>
          <Button 
            onClick={() => this.setState({ style: {} })}
            active={Object.keys(this.state.style).length === 0}
          >
            Dashed 
          </Button>
          <Button 
            onClick={() => this.setState({ style: styles.redBorder})}
            active={this.state.style === styles.redBorder}
          >
            Red 
          </Button>
          <Button 
            onClick={() => this.setState({ style: styles.blueBorder })}
            active={this.state.style === styles.blueBorder}
          >
            Blue
          </Button>
        </div>

    
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
