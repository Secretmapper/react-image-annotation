import React from 'react'
import { Rnd as Resizable } from 'react-rnd'

function Point(props) {
  const { geometry, data, color = 'white' } = props.annotation
  if (!geometry) return null

  return (
    <Resizable
      style={{
        border: 'solid 2px ' + color,
        borderRadius: '50%',
        boxSizing: 'border-box',
        pointerEvents: 'auto',
        zIndex: 1000,
        boxShadow:
          '0 0 0 1px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(0, 0, 0, 0.2), 0 5px 4px rgba(0, 0, 0, 0.4)',

        position: 'absolute',
        transform: 'translate3d(-50%, -50%, 0)'
      }}
      size={{
        width: 16,
        height: 16
      }}
      enableResizing={false}
      onDragStop={(e, d, k) => {
        if (
          props.annotation.geometry.xPx !== d.x ||
          props.annotation.geometry.yPx !== d.y
        ) {
          props.annotation.geometry.x =
            (d.x * props.annotation.geometry.x) / props.annotation.geometry.xPx
          props.annotation.geometry.y =
            (d.y * props.annotation.geometry.y) / props.annotation.geometry.yPx
          props.annotation.geometry.xPx = d.x
          props.annotation.geometry.yPx = d.y
          props.onChange(props.annotation)
          props.onSubmit()
        }
      }}
      position={{
        x: geometry.xPx,
        y: geometry.yPx
      }}
    />
  )
}

export default Point
