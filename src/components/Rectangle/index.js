import React from 'react'
import { Rnd as Resizable } from 'react-rnd'

function Rectangle(props) {
  const { geometry, data } = props.annotation
  const { color } = props
  if (!geometry) return null
  return (
    <Resizable
      id={data.id}
      style={{
        border: 'dashed 4px ' + color,
        pointerEvents: 'auto',
        zIndex: 10
      }}
      disableDragging={true}
      onResizeStop={(e, direction, ref, d) => {
        var newAnnotation = Object.assign({}, props.annotation)
        if (
          direction === 'top' ||
          direction === 'left' ||
          direction === 'topLeft'
        ) {
          props.annotation.geometry.x =
            ((newAnnotation.geometry.xPx - d.width) *
              props.annotation.geometry.x) /
            props.annotation.geometry.xPx
          props.annotation.geometry.y =
            ((newAnnotation.geometry.yPx - d.height) *
              props.annotation.geometry.y) /
            props.annotation.geometry.yPx
          newAnnotation.geometry.xPx -= d.width
          newAnnotation.geometry.yPx -= d.height
        }
        newAnnotation.geometry.width = parseFloat(ref.style.width)
        newAnnotation.geometry.height = parseFloat(ref.style.height)
        props.onChange(newAnnotation)
        props.onSubmit()
      }}
      position={{
        x: geometry.xPx,
        y: geometry.yPx
      }}
      size={{
        width: `${geometry.width}%`,
        height: `${geometry.height}%`
      }}
    />
  )
}

Rectangle.defaultProps = {
  className: '',
  style: {}
}

export default Rectangle
