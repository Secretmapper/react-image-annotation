import React, { Component } from 'react'
import styled from 'styled-components'
import Highlight from '../Highlight'
import Multi from '../Samples/Multiple'
import EditDelete from '../Samples/EditDelete'
import Threaded from '../Samples/Threaded'
import Linked from '../Samples/Linked'
import Custom from '../Samples/Custom'
import multicode from '../Samples/Multiple/index.txt'
import linked from '../Samples/Linked/index.txt'

const Container = styled.main`
  margin: 0 auto;
  padding-top: 16px;
  padding-bottom: 64px;
  max-width: 700px;
`

const SourceLink = styled.a`
  display: block;
  margin-top: 8px;
  font-size: 18px;
  text-align: center;
  text-decoration: none;
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
        <h1>Custom Renderers/Components/Styles</h1>
        <Custom />
        <SourceLink target='_blank' href='https://github.com/Secretmapper/react-image-annotation/blob/master/demo/src/components/Samples/Custom/index.js'>
          View source
        </SourceLink>
        <h1>Threaded Comments (Custom Content Overlay)</h1>
        <Threaded />
        <SourceLink target='_blank' href='https://github.com/Secretmapper/react-image-annotation/blob/master/demo/src/components/Samples/Threaded/index.js'>
          View source
        </SourceLink>
        <h1>Edit or Delete Annotations</h1>
        <EditDelete />
      </Container>
    )
  }
}
