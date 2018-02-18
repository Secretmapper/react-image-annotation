import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled from 'styled-components'

import NavBar from './components/NavBar'
import Root from './components/Root'
import Home from './components/Home'

const Main = styled.main`
  margin: 0 16px;
  margin-top: 51px;
`

export default () => (
  <Router>
    <Root>
      <NavBar
        title='react-image-annotation'
      />
      <Main>
        <Route
          exact
          path='/'
          component={Home}
        />
      </Main>
    </Root>
  </Router>
)
