import React, { Component } from 'react'
import './Annotation.css'
import isMouseHovering from '../utils/isMouseHovering'

class Annotation extends Component {
  render () {
    const { props } = this
    const {
      children, alt,
      isHoveringOver, hoverRef,
      ...imgProps
    } = props

    const className = props.className
      ? `Annotation__img ${props.className}`
      : `Annotation__img`

    return (
      <div
        className='Annotation'
        ref={hoverRef}
      >
        <img
          className={className}
          alt={alt}
          {...imgProps}
        />
        {props.children({ isHoveringOver })}
      </div>
    )
  }
}

export default isMouseHovering(Annotation)
