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
      T.shape({
        TYPE: T.string,
        intersects: T.func.isRequired,
        area: T.func.isRequired,
        methods: T.object.isRequired
      })
    ).isRequired,

    value: T.shape({
      selection: T.object,
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

  getSelectorByType = (type) => {
    return this.props.selectors.find(s => s.TYPE === type)
  }

  getTopAnnotationAt = (x, y) => {
    const { annotations } = this.props
    const { container, getSelectorByType } = this

    const intersections = annotations
      .map(annotation => {
        const { geometry } = annotation
        const selector = getSelectorByType(geometry.type)

        return selector.intersects({ x, y }, geometry, container)
          ? annotation
          : false
      })
      .filter(a => !!a)
      .sort((a, b) => {
        const aSelector = getSelectorByType(a.geometry.type)
        const bSelector = getSelectorByType(b.geometry.type)

        return aSelector.area(a.geometry, container) - bSelector.area(b.geometry, container)
      })

    return intersections[0]
  }

  onTargetMouseMove = (e) => {
    this.props.relativeMousePos.onMouseMove(e)
    this.onMouseMove(e)
  }

  onMouseUp = (e) => this.callSelectorMethod('onMouseUp', e)
  onMouseDown = (e) => this.callSelectorMethod('onMouseDown', e)
  onMouseMove = (e) => this.callSelectorMethod('onMouseMove', e)
  onClick = (e) => this.callSelectorMethod('onClick', e)

  onSubmit = () => {
    this.props.onSubmit(this.props.value)
  }

  callSelectorMethod = (methodName, e) => {
    if (!!this.props[methodName]) {
      this.props[methodName](e)
    } else {
      const selector = this.getSelectorByType(this.props.type)
      if (selector && selector.methods[methodName]) {
        this.props.onChange(
          selector.methods[methodName](this.props.value, e)
        )
      }
    }
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
          onClick={this.onClick}
          onMouseUp={this.onMouseUp}
          onMouseDown={this.onMouseDown}
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
