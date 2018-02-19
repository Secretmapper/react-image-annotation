import React, { Component } from 'react'
import styled from 'styled-components'
import Simple from '../Samples/Simple'
import Highlight from '../Highlight'
import GithubStarLink from '../GithubStarLink'
import { ButtonLink } from '../Button'

import simple from './simple.txt'

const Hero = styled.div`
  text-align: center;
`

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

const GithubButton = styled.div`
  margin-bottom: 16px;
`

export default class App extends Component {
  render () {
    return (
      <Container>
        <Hero>
          <Title>React Image Annotation</Title>
          <Subtitle>
            An infinitely customizable image annotation library built on React
          </Subtitle>
          <GithubButton>
            <GithubStarLink />
          </GithubButton>
          <ButtonLink to='/docs'>
            More Examples
          </ButtonLink>
        </Hero>
        <h2>Install</h2>
        <Highlight>
          npm install --save react-image-annotation
        </Highlight>
        <h2>Demo</h2>
        <Simple />
        <Highlight>
          {simple}
        </Highlight>  
      </Container>
    )
  }
}
