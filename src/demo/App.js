import React, { Component } from 'react'
import Root from './components/Root'
import Simple from './components/Samples/Simple'
import Multiple from './components/Samples/Multiple'

export default class App extends Component {
  render () {
    return (
      <Root>
        <h1>React Annotation</h1>
        <Simple />
        <Multiple />
      </Root>
    )
  }
}
