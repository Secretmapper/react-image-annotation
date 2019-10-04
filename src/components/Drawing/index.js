import React from 'react'
import styled from 'styled-components'

const Container = styled.svg`
  display: block;

  width: 100%;
  height: 100%;
  box-shadow: 0px 0px 1px 1px white inset;
`

function Drawing(props) {
  const prepareData = () => {
    if (geometry.coordinates.length > 0) {
      let cords = [
        `M ${geometry.coordinates[0].x} ${geometry.coordinates[0].y}`
      ]
      geometry.coordinates.forEach((i, ind) => {
        if (ind % 2 === 0) {
          cords.push(` L ${i.x} ${i.y}`)
        }
      })

      return cords.join(' ')
    }
  }
  const { geometry } = props.annotation
  if (!geometry) return null

  return (
    <Container
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={props.className}>
      <path d={prepareData()} stroke="black" strokeWidth={1} fill="none" />
    </Container>
  )
}

export default Drawing
