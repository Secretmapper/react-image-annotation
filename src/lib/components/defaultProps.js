import React from 'react'

import styles from './Annotation.css'

import Point from './Point'
import Editor from './Editor'
import FancyRectangle from './FancyRectangle'
import Rectangle from './Rectangle'
import Oval from './Oval'
import Content from './Content'
import Overlay from './Overlay'

import withRectangleSelector from '../hocs/withRectangleSelector'
import withPointSelector from '../hocs/withPointSelector'
import withOvalSelector from '../hocs/withOvalSelector'

export default {
  innerRef: () => {},
  type: withRectangleSelector.TYPE,
  selectors: [
    withRectangleSelector,
    withPointSelector,
    withOvalSelector
  ],
  disableSelector: false,
  disableEditor: false,
  disableOverlay: false,
  renderSelector: ({ annotation }) => {
    switch (annotation.geometry.type) {
      case withRectangleSelector.TYPE:
        return (
          <FancyRectangle
            annotation={annotation}
          />
        )
      case withPointSelector.TYPE:
        return (
          <Point
            annotation={annotation}
          />
        )
      case withOvalSelector.TYPE:
        return (
          <Oval
            annotation={annotation}
          />
        )
      default:
        return null
    }
  },
  renderEditor: ({ annotation, onChange, onSubmit }) => (
    <Editor
      annotation={annotation}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  ),
  renderHighlight: ({ key, annotation, active }) => {
    switch (annotation.geometry.type) {
      case withRectangleSelector.TYPE:
        return (
          <Rectangle
            key={key}
            annotation={annotation}
            active={active}
          />
        )
      case withPointSelector.TYPE:
        return (
          <Point
            key={key}
            annotation={annotation}
            active={active}
          />
        )
      case withOvalSelector.TYPE:
        return (
          <Oval
            key={key}
            annotation={annotation}
            active={active}
          />
        )
      default:
        return null
    }
  },
  renderContent: ({ key, annotation }) => (
    <Content
      key={key}
      annotation={annotation}
    />
  ),
  renderOverlay: ({ type, annotation }) => {
    switch (type) {
      case withRectangleSelector.TYPE:
        return (
          <Overlay className={styles.overlay}>
            Click and Drag to Annotate
          </Overlay>
        )
      case withPointSelector.TYPE:
        return (
          <Overlay className={styles.overlay}>
            Click to Annotate
          </Overlay>
        )
      default:
        return null
    }
  }
}
