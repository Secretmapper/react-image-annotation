import React, { Component } from 'react'
import './Annotation.css'
import compose from '../utils/compose'
import isMouseHovering from '../utils/isMouseHovering'
import annotationLogic from '../hocs/AnnotationLogic'
import drawingRectangle from '../hocs/DrawingRectangle'

export default compose(
  annotationLogic(),
  isMouseHovering(),
  drawingRectangle()
)(class Annotation extends Component {
  render () {
    const { props } = this
    const {
      isMouseHovering,
      drawingRectangle
    } = props

    const className = props.className
      ? `Annotation__img ${props.className}`
      : `Annotation__img`

    return (
      <div
        className='Annotation'
        style={props.style}
        ref={isMouseHovering.innerRef}
      >
        <img
          className={className}
          style={props.style}
          alt={props.alt}
          src={props.src}
          draggable={false}
          ref={drawingRectangle.innerRef}
        />
        {props.children({
          isEditing: props.isEditing,
          isSelecting: drawingRectangle.isSelecting,
          geometry: drawingRectangle.geometry,
          isHoveringOver: isMouseHovering.isHoveringOver
        })}
        <div
          style={{
            pointerEvents: props.disableSelect && 'none'
          }}
          onClick={drawingRectangle.onClick}
          onMouseMove={drawingRectangle.onMouseMove}
          className='Annotation__target'
        />
      </div>
    )
  }
})
