import React from 'react'
import styled from 'styled-components'
import { Rnd as Resizable } from 'react-rnd'

const Container = styled.div`
  border: dashed 2px black;
  border-radius: 100%;
  box-shadow: 0px 0px 1px 1px white inset;
  box-sizing: border-box;
  transition: box-shadow 0.21s ease-in-out;
`

function Oval(props) {
  const { onChange, onSubmit, annotation } = props
  const { geometry, data, color = 'white', selection } = annotation
  if (!geometry) return null

  return (
    <Resizable
      className={props.className}
      style={{
        border: 'dashed 2px ' + color,
        borderRadius: '100%',
        boxShadow: '0px 0px 1px 1px white inset',
        boxSizing: 'border-box',
        transition: 'box-shadow 0.21s ease-in-out',
        position: 'absolute',

        zIndex: 10,

        boxShadow: props.active && '0 0 1px 1px yellow inset',
        ...props.style
      }}
      size={{
        height: `${geometry.height}%`,
        width: `${geometry.width}%`
      }}
      onDragStop={(e, d, k) => {
        if (
          !selection &&
          (props.annotation.geometry.xPx !== d.x ||
            props.annotation.geometry.yPx !== d.y)
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
      enableResizing={
        !selection
          ? { bottom: true, top: true, left: true, right: true }
          : false
      }
      onResizeStop={(e, direction, ref, d) => {
        if (!selection) {
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
        }
      }}
      position={{
        x: geometry.xPx,
        y: geometry.yPx
      }}
    />
  )
}

Oval.defaultProps = {
  className: '',
  style: {}
}

export default Oval
