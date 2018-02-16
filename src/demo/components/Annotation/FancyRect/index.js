import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`

const Box = styled.div`
  background: rgba(0, 0, 0, 0.2);
  position: absolute;
`

const Top = Box.extend.attrs({
  style: ({ geometry }) => ({
    height: `${geometry.y}%`,
    width: '100%'
  })
})``

const Left = Box.extend.attrs({
  style: ({ geometry }) => ({
    top: `${geometry.y}%`,
    height: `${geometry.height}%`,
    width: `${geometry.x}%`
  })
})``

const Right = Box.extend.attrs({
  style: ({ geometry }) => ({
    top: `${geometry.y}%`,
    left: `${geometry.x + geometry.width}%`,
    height: `${geometry.height}%`,
    width: `${100 - (geometry.x + geometry.width)}%`
  })
})``

const Bottom = Box.extend.attrs({
  style: ({ geometry }) => ({
    top: `${geometry.y + geometry.height}%`,
    height: `${100 - (geometry.y + geometry.height)}%`,
    width: '100%'
  })
})``

export default (props) => (
  <Container>
    <Top geometry={props.geometry} />
    <Left geometry={props.geometry} />
    <Right geometry={props.geometry} />
    <Bottom geometry={props.geometry} />
  </Container>
)
