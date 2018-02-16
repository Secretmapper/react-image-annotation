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

      Selector={Rect}
      Editor={Editor}
    />
  </Root>
)

export default App
