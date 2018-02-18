import React, { Component } from 'react'
import styled from 'styled-components'
import Root from '../Root'
import Simple from '../Samples/Simple'
import Multiple from '../Samples/Multiple'

import SyntaxHighlighter from 'react-syntax-highlighter/prism-light'
import prism from 'react-syntax-highlighter/styles/prism/prism'

import simple from './simple.txt'

const Title = styled.h1`
  font-size: 36px;
  text-align: center;
  margin-top: 80px;
`

const Subtitle = styled.p`
  font-size: 20px;
  text-align: center;
`

export default class App extends Component {
  render () {
    return (
      <Root>
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
        <Multiple />
      </Root>
    )
  }
}
