import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  border: dashed 2px black;
  display: block;
  width: 0px;
  box-shadow: 0px 0px 1px 1px white inset;
  transition: box-shadow 0.21s ease-in-out;
`

function Line(props) {
  const { geometry } = props.annotation
  if (!geometry) return null

  return (
    <Container
      className={props.className}
      style={{
        position: 'absolute',
        left: `${geometry.x}%`,
        top: `${geometry.y}%`,
        height: `${geometry.hypotenuse}px`,
        '-webkit-transform': `rotate(${-geometry.angle}deg)`,
        '-webkit-transform-origin': '0 0',
        '-moz-transform': `rotate(${-geometry.angle}deg)`,
        '-moz-transform-origin': '0 0',
        '-o-transform': `rotate(${-geometry.angle}deg)`,
        '-o-transform-origin': '0 0',
        '-ms-transform': `rotate(${-geometry.angle}deg)`,
        '-ms-transform-origin': '0 0',
        transform: `rotate(${-geometry.angle}deg) `,
        boxShadow: props.active && '0 0 1px 1px yellow inset',
        ...props.style
      }}
    />
  )
}

Line.defaultProps = {
  className: '',
  style: {}
}

export default Line
