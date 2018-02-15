import React from 'react'
import Annotation from '../lib'
import Root from './components/Root'
import { Container, Content, Rect, Point } from './components/Annotation'

import img from './img.jpeg'

const annotations = [
  { pos: { type: 'point', left: 5, top: 50 }, data: { id: 0 } }
]

const App = () => (
  <Root>
    <h1>React Annotation</h1>
    <Annotation
      src={img}
      alt='Two pebbles anthropomorphized holding hands'
    >
      {props => (
        <Rect
          style={{
            position: 'absolute',
            left: `${props.geometry.x}%`,
            top: `${props.geometry.y}%`,
            height: `${props.geometry.height}%`,
            width: `${props.geometry.width}%`
          }}
        />
      )}
    </Annotation>
  </Root>
)

export default App
// <Content>I'm Pebble 1</Content>
