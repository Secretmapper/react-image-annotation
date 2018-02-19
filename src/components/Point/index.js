import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  border: solid 3px white;
  border-radius: 50%;
  box-sizing: border-box;
  box-shadow:
    0 0 0 1px rgba(0,0,0,0.3),
    0 0 0 2px rgba(0,0,0,0.2),
    0 5px 4px rgba(0,0,0,0.4);
  height: 16px;
  position: absolute;
  transform: translate3d(-50%, -50%, 0);
  width: 16px;
` 

function Point (props) {
  const { geometry } = props.annotation
  if (!geometry) return null

  return (
    <Container
      style={{
        top: `${geometry.y}%`,
        left: `${geometry.x}%`
      }}
    />
  )
}


export default Point
