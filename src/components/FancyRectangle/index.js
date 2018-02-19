import React from 'react'
import styled from 'styled-components'

const Box = styled.div`
  background: rgba(0, 0, 0, 0.2);
  position: absolute;
`

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`

function FancyRectangle (props) {
  const { geometry } = props.annotation

  if (!geometry) return null

  return (
    <Container
      className={props.className}
      style={props.style}
    >
      <Box
        style={{
          height: `${geometry.y}%`,
          width: '100%'
        }}
      />
      <Box
        style={{
          top: `${geometry.y}%`,
          height: `${geometry.height}%`,
          width: `${geometry.x}%`
        }}
      />
      <Box
        style={{
          top: `${geometry.y}%`,
          left: `${geometry.x + geometry.width}%`,
          height: `${geometry.height}%`,
          width: `${100 - (geometry.x + geometry.width)}%`
        }}
      />
      <Box
        style={{
          top: `${geometry.y + geometry.height}%`,
          height: `${100 - (geometry.y + geometry.height)}%`,
          width: '100%'
        }}
      />
    </Container>
  )
}

FancyRectangle.defaultProps = {
  className: '',
  style: {}
}

export default FancyRectangle
