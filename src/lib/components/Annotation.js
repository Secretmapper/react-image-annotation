import React, { Component } from 'react'
import T from 'prop-types'
import styles from './Annotation.css'
import compose from '../utils/compose'
import isMouseHovering from '../utils/isMouseHovering'
import withRelativeMousePos from '../utils/withRelativeMousePos'

import withRectangleSelector from '../hocs/withRectangleSelector'
import withPointSelector from '../hocs/withPointSelector'
import withOvalSelector from '../hocs/withOvalSelector'
import defaultRenders from './defaultRenders'

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

    type: T.string,
    selectors: T.arrayOf(
      function (arr, key, componentName, location, propFullName) {
        const selector = arr[key]
        if (typeof selector.TYPE !== 'string') {
          return new Error(
            `Invalid prop '${propFullName}.TYPE' supplied to ${componentName}, expected string. Validation failed.`
          )
        }
        if (typeof selector.intersects !== 'function') {
          return new Error(
            `Invalid prop '${propFullName}.intersects' supplied to ${componentName}, expected function. Validation failed.`
          )
        }
        if (typeof selector.area !== 'function') {
          return new Error(
            `Invalid prop '${propFullName}.area' supplied to ${componentName}, expected function. Validation failed.`
          )
        }
      }
    ),

    value: T.shape({
      geometry: T.shape({
        type: T.string.isRequired
      }),
      data: T.object.isRequired
    }),

    showSelector: T.bool,
    renderSelector: T.func,
    showEditor: T.bool,
    renderEditor: T.func,

    renderHighlight: T.func.isRequired,
    renderContent: T.func.isRequired,

    disableOverlay: T.bool,
    renderOverlay: T.func.isRequired
  }

  static defaultProps = {
    innerRef: () => {},
    onMouseUp: () => {},
    onMouseDown: () => {},
    onMouseMove: () => {},
    onClick: () => {},
    type: withRectangleSelector.TYPE,
    selectors: [
      withRectangleSelector,
      withPointSelector,
      withOvalSelector
    ],
    ...defaultRenders
  }

  setInnerRef = (el) => {
    this.container = el
    this.props.relativeMousePos.innerRef(el)
    this.props.innerRef(el)
  }

  getTopAnnotationAt = (x, y) => {
    const { annotations, selectors } = this.props
    const { container } = this

    const intersections = annotations
      .map(annotation => {
        const { geometry } = annotation
        const selector = selectors.find(s => s.TYPE === geometry.type)

        return selector.intersects({ x, y }, geometry, container)
          ? annotation
          : false
      })
      .filter(a => !!a)
      .sort((a, b) => {
        const aSelector = selectors.find(s => s.TYPE === a.geometry.type)
        const bSelector = selectors.find(s => s.TYPE === b.geometry.type)

        return aSelector.area(a.geometry, container) - bSelector.area(b.geometry, container)
      })

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
      renderEditor,
      renderOverlay
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
          {props.showSelector && (
            renderSelector({
              annotation: props.value
            })
          )}
        </div>
        {!props.disableOverlay && (
          renderOverlay({
            type: props.type,
            annotation: props.value
          })
        )}
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
