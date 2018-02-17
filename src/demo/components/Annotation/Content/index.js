import React from 'react'
import styled from 'styled-components'

const Container = styled.div.attrs({
  style: props => ({
    position: 'absolute',
    left: `${props.geometry.x}%`,
    top: `${props.geometry.y + props.geometry.height}%`
  })
})`
  background: white;
  border-radius: 2px;
  box-shadow:
    0px 1px 5px 0px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 3px 1px -2px rgba(0, 0, 0, 0.12);
  padding: 8px 16px;
  margin-top: 8px;
  margin-left: 8px;
`

export default (props) => (
  <Container geometry={props.geometry}>
    {props.data.text}
  </Container>
)
