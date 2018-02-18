import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter/prism-light'
import prism from 'react-syntax-highlighter/styles/prism/prism'

export default (props) => (
  <SyntaxHighlighter language='jsx' style={prism}>
    {props.children}
  </SyntaxHighlighter>  
)
