import React, { Component } from 'react'
import styled from 'styled-components'
import Highlight from '../Highlight'
import Multi from '../Samples/Multiple'
import Linked from '../Samples/Linked'
import multicode from '../Samples/Multiple/index.txt'
import linked from '../Samples/Linked/index.txt'

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
        <h1>Controlled Active Annotations</h1>
        <Linked />
        <p>Hover over the text items above and notice how it triggers the active status of their respective annotations</p>
        <Highlight>
          {linked}
        </Highlight>
      </Container>
    )
  }
}
