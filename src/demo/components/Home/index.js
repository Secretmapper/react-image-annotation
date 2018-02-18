import React, { Component } from 'react'
import styled from 'styled-components'
import Simple from '../Samples/Simple'

import SyntaxHighlighter from 'react-syntax-highlighter/prism-light'
import prism from 'react-syntax-highlighter/styles/prism/prism'

import simple from './simple.txt'

const Title = styled.h1`
  font-size: 36px;
  text-align: center;
`

const Subtitle = styled.p`
  font-size: 20px;
  text-align: center;
`

const Container = styled.main`
  margin: 0 auto;
  padding: 64px 0;
  max-width: 700px;
`

export default class App extends Component {
  render () {
    return (
      <Container>
        <Title>React Image Annotation</Title>
        <Subtitle>
          An infinitely customizable image annotation library built on React
        </Subtitle>
        <h2>Install</h2>
        <SyntaxHighlighter language='jsx' style={prism}>
          npm install --save react-image-annotation
        </SyntaxHighlighter>
        <h2>Demo</h2>
        <Simple />
        <SyntaxHighlighter language='jsx' style={prism}>
          {simple}
        </SyntaxHighlighter>  
      </Container>
    )
  }
}
