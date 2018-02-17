import React, { Component } from 'react'
import T from 'prop-types'
import styles from './Annotation.css'
import compose from '../utils/compose'
import isMouseHovering from '../utils/isMouseHovering'
import withRelativeMousePos from '../utils/withRelativeMousePos'

import Editor from './Editor'
import FancyRectangle from './FancyRectangle'
import Rectangle from './Rectangle'
import Content from './Content'

export default compose(
  isMouseHovering(),
  withRelativeMousePos()
)(class Annotation extends Component {
  static propTypes = {
    innerRef: T.func,
    onMouseUp: T.func,
    onMouseDown: T.func,
    onMouseMove: T.func,
    onClick: T.func,

    value: T.shape({
      geometry: T.object,
      data: T.object
    }),

    showSelector: T.bool,
    renderSelector: T.func,
    showEditor: T.bool,
    renderEditor: T.func,

    renderHighlight: T.func.isRequired,
    renderContent: T.func.isRequired
  }

  static defaultProps = {
    innerRef: () => {},
    onMouseUp: () => {},
    onMouseDown: () => {},
    onMouseMove: () => {},
    onClick: () => {},
    renderSelector: ({ annotation }) => (
      <FancyRectangle
        geometry={annotation.geometry}
      />
    ),
    renderEditor: ({ annotation, onChange, onSubmit }) => (
      <Editor
        data={annotation.data}
        geometry={annotation.geometry}

        onChange={onChange}
        onSubmit={onSubmit}
      />
    ),
    renderHighlight: ({ key, annotation, active }) => (
      <Rectangle
        key={key}
        geometry={annotation.geometry}
        active={active}
      />
    ),
    renderContent: ({ key, annotation }) => (
      <Content
        key={key}
        geometry={annotation.geometry}
        data={annotation.data}
      />
    )
  }

  setInnerRef = (el) => {
    this.container = el
    this.props.relativeMousePos.innerRef(el)
    this.props.innerRef(el)
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
    this.props.onMouseMove(e)
    this.props.relativeMousePos.onMouseMove(e)
  }

  onSubmit = () => {
    this.props.onSubmit(this.props.value)
  }

  render () {
    const { props } = this
    const {
      isMouseHovering,

      renderHighlight,
      renderContent,
      renderSelector,
      renderEditor
    } = props

    const topAnnotationAtMouse = this.getTopAnnotationAt(
      this.props.relativeMousePos.x,
      this.props.relativeMousePos.y
    )

    const className = props.className
      ? `${styles.img} ${props.className}`
      : styles.img

    return (
      <div
        className={styles.container}
        style={props.style}
        ref={isMouseHovering.innerRef}
      >
        <img
          className={className}
          style={props.style}
          alt={props.alt}
          src={props.src}
          draggable={false}
          ref={this.setInnerRef}
        />
        <div
          className={styles.items}
        >
          {props.showSelector && (
            renderSelector({
              annotation: props.value
            })
          )}
          {props.annotations.map(annotation => (
            renderHighlight({
              key: annotation.data.id,
              annotation,
              active: topAnnotationAtMouse === annotation
            })
          ))}
          {props.annotations.map(annotation => (
            topAnnotationAtMouse === annotation && (
              renderContent({
                key: 'content',
                annotation: annotation
              })
            )
          ))}
        </div>
        <div
          onClick={props.onClick}
          onMouseUp={props.onMouseUp}
          onMouseDown={props.onMouseDown}
          onMouseMove={this.onTargetMouseMove}
          className={styles.target}
        />
        {props.showEditor && (
          renderEditor({
            annotation: props.value,
            onChange: props.onChange,
            onSubmit: this.onSubmit
          })
        )}
      </div>
    )
  }
})
