import React, { Component } from 'react'
import Annotation from '../../../../../src'

import Root from '../../Root'
import img from '../../../img.jpeg'

export default class EditDelete extends Component {
  state = {
    annotations: [],
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
  onUpdate = (annotation) => {
    const {annotations} = this.state;
    let oldIndex = annotations.findIndex((a)=>{
      return a.data.id === annotation.data.id;
    });
    if (oldIndex > -1) {
      annotations[oldIndex] = {
        geometry: {...annotation.geometry},
        data: {
          ...annotation.data,
          id: annotation.data.id
        }
      };
    }
    this.setState({annotation: {}, annotations: annotations });
  }

  onDelete = (annotation) => {
    const {annotations} = this.state;
    let keepAnnotations = annotations.filter((a)=>{
      return a.data.id !== annotation.data.id;
    });
    this.setState({annotation: {}, annotations: keepAnnotations });
  }

  render () {
    return (
      <Root>
        <Annotation
          src={img}
          alt='Two pebbles anthropomorphized holding hands'

          annotations={this.state.annotations}

          type={this.state.type}
          value={this.state.annotation}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          onUpdate={this.onUpdate}
          onDelete={this.onDelete}
        />
      </Root>
    )
  }
}
