import React, { Component } from 'react'
import './Annotation.css'
import compose from '../utils/compose'
import isMouseHovering from '../utils/isMouseHovering'
import drawingRectangle from '../hocs/DrawingRectangle'

export default compose(
  isMouseHovering(),
  drawingRectangle(),
)(class Annotation extends Component {
  render () {
    const { props } = this
    const {
      children, alt,
      isMouseHovering,
      drawingRectangle,

      ...imgProps
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
          alt={alt}
          draggable={false}
          ref={drawingRectangle.innerRef}
          {...imgProps}
        />
        {props.children({
          isSelecting: drawingRectangle.isSelecting,
          geometry: drawingRectangle.geometry,
          isHoveringOver: isMouseHovering.isHoveringOver
        })}
        <div
          onClick={drawingRectangle.onClick}
          onMouseMove={drawingRectangle.onMouseMove}
          className='Annotation__target'
        />
      </div>
    )
  }
})
