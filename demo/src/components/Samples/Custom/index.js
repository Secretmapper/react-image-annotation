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

const Box = ({ children, geometry, style }) => (
  <div
    style={{
      ...style,
      position: 'absolute',
      left: `${geometry.x}%`,
      top: `${geometry.y}%`,
      height: `${geometry.height}%`,
      width: `${geometry.width}%`,
    }}
  >
    {children}
  </div>
)

function renderSelector ({ annotation, active }) {
  const { geometry } = annotation
  if (!geometry) return null

  return (
    <Box
      geometry={geometry}
      style={{
        background: 'rgba(255, 255, 255, 0.5)',
        border: 'solid 1px red'
      }}
    >
      Custom Selector
    </Box>
  )
}

function renderHighlight ({ annotation, active }) {
  const { geometry } = annotation
  if (!geometry) return null

  return (
    <Box
      key={annotation.data.id}
      geometry={geometry}
      style={{
        border: 'solid 1px black',
        boxShadow: active
          && '0 0 20px 20px rgba(255, 255, 255, 0.3) inset'
      }}
    >
      Custom Highlight
    </Box>
  )
}

function renderContent ({ annotation }) {
  const { geometry } = annotation
  return (
    <div
      key={annotation.data.id}
      style={{
        background: 'black',
        color: 'white',
        padding: 10,
        position: 'absolute',
        fontSize: 12,
        left: `${geometry.x}%`,
        top: `${geometry.y + geometry.height}%`
      }}
    >
      <div>Custom Content</div>
      {annotation.data && annotation.data.text}
    </div>
  )
}

function renderEditor (props) {
  const { geometry } = props.annotation
  if (!geometry) return null

  return (
    <div
      style={{
        background: 'white',
        borderRadius: 3,
        position: 'absolute',
        left: `${geometry.x}%`,
        top: `${geometry.y + geometry.height}%`,
      }}
    >
      <div>Custom Editor</div>
      <input
        onChange={e => props.onChange({
          ...props.annotation,
          data: {
            ...props.annotation.data,
            text: e.target.value
          }
        })}
      />
      <button onClick={props.onSubmit}>Comment</button>
    </div>
  )
}

function renderOverlay () {
  return (
    <div
      style={{
        background: 'rgba(0, 0, 0, 0.3)',
        color: 'white',
        padding: 5,
        pointerEvents: 'none',
        position: 'absolute',
        top: 5,
        left: 5
      }}
    >
      Custom Overlay
    </div>
  )
}

export default class Custom extends Component {
  state = {
    annotations: [mocks.annotations[0]],
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
        <Annotation
          src={img}
          alt='Two pebbles anthropomorphized holding hands'

          annotations={this.state.annotations}

          type={this.state.type}
          value={this.state.annotation}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          renderSelector={renderSelector}
          renderEditor={renderEditor}
          renderHighlight={renderHighlight}
          renderContent={renderContent}
          renderOverlay={renderOverlay}
        />
      </div>
    )
  }
}
