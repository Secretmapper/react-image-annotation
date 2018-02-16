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
  transform-origin: top left;
  height: 1%;
  width: 1%;
`

const Top = Box.extend.attrs({
  style: ({ geometry }) => ({
    transform: `scaleX(100) scaleY(${geometry.y}) translate3d(0, 0, 0)`
  })
})``

const Left = Box.extend.attrs({
  style: ({ geometry }) => ({
    transform: `
      scaleX(${geometry.x})
      scaleY(${geometry.height})
      translate3d(0, ${geometry.y / geometry.height * 100}%, 0)
    `
  })
})``

const Right = Box.extend.attrs({
  style: ({ geometry }) => {
    const scaleX = 100 - geometry.width - geometry.x
    // const translateX = 0
    const translateX = (geometry.x + geometry.width) * 100 / scaleX

    return {
      transform: `
        scaleX(${scaleX})
        scaleY(${geometry.height})
        translate3d(${translateX}%, ${geometry.y / geometry.height * 100}%, 0)
      `
    }
  }
})``

const Bottom = Box.extend.attrs({
  style: ({ geometry }) => {
    const scaleY = 100 - geometry.height - geometry.y
    const translateY = (geometry.y + geometry.height) * 100 / scaleY

    return {
      transform: `
        scaleX(100)
        scaleY(${scaleY})
        translate3d(0, ${translateY}%, 0)
      `
    }
  }
})``

export default (props) => (
  <Container>
    <Top geometry={props.geometry} />
    <Left geometry={props.geometry} />
    <Right geometry={props.geometry} />
    <Bottom geometry={props.geometry} />
  </Container>
)
