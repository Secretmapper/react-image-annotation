import React, { Component } from 'react'
import styled from 'styled-components'
import Highlight from '../Highlight'
import Multi from '../Samples/Multiple'
import multicode from '../Samples/Multiple/index.txt'

const Container = styled.main`
  margin: 0 auto;
  padding-top: 16px;
  padding-bottom: 64px;
  max-width: 700px;
`

export default class Docs extends Component {
  render () {
    return (
      <Container>
        <h1>Multiple Type/Shape Support</h1>
        <Multi />
        <Highlight>
          {multicode}
        </Highlight>
      </Container>
    )
  }
}
