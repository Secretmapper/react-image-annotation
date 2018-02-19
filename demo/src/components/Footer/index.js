import React from 'react'
import styled from 'styled-components'

const Footer = styled.div`
  color: #666;
  padding: 16px;
  padding-bottom: 32px;
  text-align: center;
  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      color: #222;
    }
  }
`

export default () => (
  <Footer>
    <p>
      {'Made with <3 by '}
      <a href='//arianv.com'>@secretmapper</a>
    </p>
  <p>
    Released under the MIT License
  </p>
  </Footer>
)
