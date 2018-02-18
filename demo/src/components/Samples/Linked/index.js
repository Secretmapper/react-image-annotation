import React, { Component } from 'react'
import styled from 'styled-components'
import Annotation from '../../../../../src'

import Root from '../../Root'
import img from '../../../img.jpeg'

const Comments = styled.div`
  border: 1px solid black;
  max-height: 80px;
  overflow: auto;
`

const Comment = styled.div`
  padding: 8px;

  &:nth-child(even) {
    background: rgba(0, 0, 0, .05);
  }
  &:hover {
    background: #ececec;
  }
`

export default class Linked extends Component {
  state = {
    activeAnnotations: [],
    annotations: [
      {
        data: {text: 'Hello!', id: 0.5986265691759928},
        geometry: {type: 'RECTANGLE', x: 25.571428571428573, y: 33, width: 21.142857142857142, height: 34}
      },
      {
        data: {text: 'Hi!', id: 0.5986265691759929},
        geometry: {type: 'RECTANGLE', x: 50.571428571428573, y: 33, width: 21.142857142857142, height: 34}
      }
    ],
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

  onMouseOver = (id) => e => {
    this.setState({
      activeAnnotations: [
        ...this.state.activeAnnotations,
        id
      ]
    })
  }

  onMouseOut = (id) => e => {
    const index = this.state.activeAnnotations.indexOf(id)

    this.setState({
      activeAnnotations: [
        ...this.state.activeAnnotations.slice(0, index),
        ...this.state.activeAnnotations.slice(index + 1)
      ]
    })
  }

  activeAnnotationComparator = (a, b) => {
    return a.data.id === b
  }

  render () {
    return (
      <Root>
        <Annotation
          src={img}
          alt='Two pebbles anthropomorphized holding hands'

          activeAnnotationComparator={this.activeAnnotationComparator}
          activeAnnotations={this.state.activeAnnotations}
          annotations={this.state.annotations}

          type={this.state.type}
          value={this.state.annotation}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
        <h4>Annotations</h4>
        <Comments>
          {this.state.annotations.map(annotation => (
            <Comment
              onMouseOver={this.onMouseOver(annotation.data.id)}
              onMouseOut={this.onMouseOut(annotation.data.id)}
              key={annotation.data.id}
            >
              {annotation.data.text}
            </Comment>
          ))}
        </Comments>
      </Root>
    )
  }
}
