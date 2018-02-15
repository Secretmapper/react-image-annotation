import React from 'react'
import Annotation from '../lib'
import Root from './components/Root'
import { Container, Content, Point } from './components/Annotation'

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
      {props => annotations.map(annotation => (
        <Container
          key={annotation.data.id}
          style={{
            opacity: props.isHoveringOver ? 1 : 0,
            position: 'absolute',
            left: `${annotation.pos.left}%`,
            top: `${annotation.pos.top}%`
          }}
        >
          <Point />
          <Content>I'm Pebble 1</Content>
        </Container>
      ))}
    </Annotation>
  </Root>
)

export default App
