import React, { Component } from 'react'
import T from 'prop-types'
import './Annotation.css'
import compose from '../utils/compose'
import isMouseHovering from '../utils/isMouseHovering'

export default compose(
  isMouseHovering(),
)(class Annotation extends Component {
  static propTypes = {
    containerRef: T.func.isRequired,
    annotation: T.shape({
      selection: T.object,
      geometry: T.object,
    }).isRequired,
    selectorHandlers: T.shape({
      onClick: T.func,
      onMouseMove: T.func
    }).isRequired
  }

  render () {
    const { props } = this
    const {
      annotation,
      selectorHandlers,
      isMouseHovering,

      Selector,
      Editor
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
          ref={props.containerRef}
        />
        {annotation.geometry && (
          <Selector
            geometry={annotation.geometry}
          />
        )}
        <div
          style={{
            pointerEvents: props.disableSelect && 'none'
          }}
          onClick={selectorHandlers.onClick}
          onMouseMove={selectorHandlers.onMouseMove}
          className='Annotation__target'
        />
        {annotation.geometry && (
          <Editor
            isEditing
            isSelecting
            isHoveringOver={isMouseHovering.isHoveringOver}
            geometry={annotation.geometry}
            onSubmit={() => {}}
          />
        )}
      </div>
    )
  }
})
