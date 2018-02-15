import React from 'react'
import Annotation from '../lib'
import Root from './components/Root'
import { Content, Point } from './components/Annotation'

import img from './img.jpeg'

const annotations = [
  { pos: { type: 'point', left: 5, top: 50 }, data: { id: 0 } }
]

const renderAnnotations = (annotation) => (
  <aside
    key={annotation.data.id}
    style={{
      position: 'absolute',
      left: `${annotation.pos.left}%`,
      top: `${annotation.pos.top}%`
    }}
  >
    <Point />
    <Content>I'm Pebble 1</Content>
  </aside>
)

const App = () => (
  <Root>
    <h1>React Annotation</h1>
    <Annotation
      src={img}
      alt='Two pebbles anthropomorphized holding hands'
    >
      {annotations.map(renderAnnotations)}
    </Annotation>
  </Root>
)

export default App
