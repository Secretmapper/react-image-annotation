import React from 'react'

import Point from './Point'
import Editor from './Editor'
import PolygonControls from './PolygonControls';
import FancyRectangle from './FancyRectangle'
import Rectangle from './Rectangle'
import Oval from './Oval'
import Polygon from './Polygon'
import Content from './Content'
import Overlay from './Overlay'

import {
  RectangleSelector,
  PointSelector,
  OvalSelector,
  PolygonSelector
} from '../selectors'

export default {
  innerRef: () => {},
  onChange: () => {},
  onSubmit: () => {},
  type: RectangleSelector.TYPE,
  selectors: [
    RectangleSelector,
    PointSelector,
    OvalSelector,
    PolygonSelector
  ],
  disableAnnotation: false,
  disableSelector: false,
  disableEditor: false,
  disableOverlay: false,
  activeAnnotationComparator: (a, b) => a === b,
  renderSelector: ({ annotation }) => {
    switch (annotation.geometry.type) {
      case RectangleSelector.TYPE:
        return (
          <FancyRectangle
            annotation={annotation}
          />
        )
      case PointSelector.TYPE:
        return (
          <Point
            annotation={annotation}
          />
        )
      case OvalSelector.TYPE:
        return (
          <Oval
            annotation={annotation}
          />
        )
      case PolygonSelector.TYPE:
        return (
          <Polygon
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
  renderPolygonControls: ({ annotation, onSelectionComplete, onSelectionClear }) => (
    <PolygonControls
      annotation={annotation}
      onSelectionComplete={onSelectionComplete}
      onSelectionClear={onSelectionClear}
    />
  ),
  renderHighlight: ({ key, annotation, active }) => {
    switch (annotation.geometry.type) {
      case RectangleSelector.TYPE:
        return (
          <Rectangle
            key={key}
            annotation={annotation}
            active={active}
          />
        )
      case PointSelector.TYPE:
        return (
          <Point
            key={key}
            annotation={annotation}
            active={active}
          />
        )
      case OvalSelector.TYPE:
        return (
          <Oval
            key={key}
            annotation={annotation}
            active={active}
          />
        )
      case PolygonSelector.TYPE:
        return (
          <Polygon
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
      case PointSelector.TYPE:
        return (
          <Overlay>
            Click to Annotate
          </Overlay>
        )
      default:
        return (
          <Overlay>
            Click and Drag to Annotate
          </Overlay>
        )
    }
  }
}
