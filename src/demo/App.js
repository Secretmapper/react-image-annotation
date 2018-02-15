import React from 'react'
import Annotation from '../lib'
import Root from './components/Root'
import { Content, Editor, Rect, Point } from './components/Annotation'

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
      {props => ([
        <Rect
          key='rect'
          style={{
            position: 'absolute',
            left: `${props.geometry.x}%`,
            top: `${props.geometry.y}%`,
            height: `${props.geometry.height}%`,
            width: `${props.geometry.width}%`
          }}
        />,
        <Editor
          key='editor'
          style={{
            opacity: props.isEditing ? 1 : 0,
            transform: `scale(${props.isEditing ? 1 : 0})`,
            position: 'absolute',
            left: `${props.geometry.x}%`,
            top: `${props.geometry.y + props.geometry.height}%`
          }}
        />
      ])}
    </Annotation>
  </Root>
)

export default App
