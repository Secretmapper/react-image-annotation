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
  renderSelector: ({ annotation }) => {
    switch (annotation.geometry.type) {
      case withRectangleSelector.TYPE:
        return (
          <FancyRectangle
            geometry={annotation.geometry}
          />
        )
      case withPointSelector.TYPE:
        return (
          <Point
            geometry={annotation.geometry}
          />
        )
      case withOvalSelector.TYPE:
        return (
          <Oval
            geometry={annotation.geometry}
          />
        )
      default:
        return null
    }
  },
  renderEditor: ({ annotation, onChange, onSubmit }) => (
    <Editor
      data={annotation.data}
      geometry={annotation.geometry}

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
            geometry={annotation.geometry}
            active={active}
          />
        )
      case withPointSelector.TYPE:
        return (
          <Point
            key={key}
            geometry={annotation.geometry}
            active={active}
          />
        )
      case withOvalSelector.TYPE:
        return (
          <Oval
            key={key}
            geometry={annotation.geometry}
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
      geometry={annotation.geometry}
      data={annotation.data}
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
