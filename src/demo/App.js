import React from 'react'
import Annotation, { compose, withAnnotationEditor } from '../lib'
import { withRectangleSelector } from '../lib/selectors'

import Root from './components/Root'
import { Content, Editor, Rect, Point } from './components/Annotation'

import img from './img.jpeg'

const annotations = [
  { pos: { type: 'point', left: 5, top: 50 }, data: { id: 0 } }
]

export default compose (
  withAnnotationEditor(),
  withRectangleSelector()
)(function App (props) {
  return (
    <Root>
      <h1>React Annotation</h1>
      <Annotation
        containerRef={props.annotation.containerRef}
        annotation={props.annotation}
        selectorHandlers={props.selector}
        src={img}
        alt='Two pebbles anthropomorphized holding hands'

        Selector={Rect}
        Editor={Editor}
      />
    </Root>
  )
})
