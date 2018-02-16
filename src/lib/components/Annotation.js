import React, { Component } from 'react'
import T from 'prop-types'
import './Annotation.css'
import compose from '../utils/compose'
import isMouseHovering from '../utils/isMouseHovering'
import withRelativeMousePos from '../utils/withRelativeMousePos'

export default compose(
  isMouseHovering(),
  withRelativeMousePos()
)(class Annotation extends Component {
  static propTypes = {
    containerRef: T.func.isRequired,
    onEditorDataChange: T.func.isRequired,
    onEditorSubmit: T.func.isRequired,
    annotation: T.shape({
      showEditor: T.bool,
      selection: T.object,
      geometry: T.object,
      data: T.object
    }).isRequired,
    selectorHandlers: T.shape({
      onClick: T.func,
      onMouseMove: T.func
    }).isRequired
  }

  setContainerRef = (el) => {
    this.container = el
    this.props.relativeMousePos.containerRef(el)
    this.props.containerRef(el)
  }

  getTopAnnotationAt = (x, y) => {
    const { annotations } = this.props

    const intersections = annotations
      .map(annotation => {
        const { geometry } = annotation

        if (x < geometry.x) return false
        if (y < geometry.y) return false
        if (x > geometry.x + geometry.width)
          return false
        if (y > geometry.y + geometry.height)
          return false

        return annotation
      })
      .filter(a => !!a)
      .sort((a, b) => (
        (a.geometry.width * a.geometry.height)
        - (b.geometry.width * b.geometry.height)
      ))

    return intersections[0]
  }

  onTargetMouseMove = (e) => {
    this.props.selectorHandlers.onMouseMove(e)
    this.props.relativeMousePos.onMouseMove(e)
  }

  render () {
    const { props } = this
    const {
      annotation,
      selectorHandlers,
      isMouseHovering,

      Highlight,
      Content,
      Selector,
      Editor
    } = props

    const topAnnotationAtMouse = this.getTopAnnotationAt(
      this.props.relativeMousePos.x,
      this.props.relativeMousePos.y
    )

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
          ref={this.setContainerRef}
        />
        {annotation.geometry && (
          <Selector
            geometry={annotation.geometry}
          />
        )}
        {props.annotations.map(annotation => (
          <Highlight
            key={annotation.data.id}
            geometry={annotation.geometry}
            active={
              topAnnotationAtMouse === annotation
            }
          />
        ))}
        {props.annotations.map(annotation => (
          topAnnotationAtMouse === annotation && (
            <Content
              key='content'
              geometry={annotation.geometry}
              annotation={annotation}
            />
          )
        ))}
        <div
          onClick={selectorHandlers.onClick}
          onMouseMove={this.onTargetMouseMove}
          className='Annotation__target'
        />
        {annotation.showEditor && (
          <Editor
            isHoveringOver={isMouseHovering.isHoveringOver}
            data={annotation.data}
            geometry={annotation.geometry}

            setData={props.onEditorDataChange}
            onSubmit={props.onEditorSubmit}
          />
        )}
      </div>
    )
  }
})
