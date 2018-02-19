import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Header = styled.header`
  background-color: #fcfcfc;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  width: 100%;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
`

const Items = styled.div`
  margin: 0 auto;
  max-width: 720px;
  display: table;
`

const Item = styled.div`
  display: table-cell;
  padding: 16px 0;
  ${props => props.grow && `
    width: 100%;
  `}

  a {
    color: black;
    text-decoration: none;
    padding: 16px;

    transition:
      background 0.1s ease,
      color 0.21s ease;
    &:hover {
      background: #dadada;
      color: white;
    }
  }
`

const Title = styled(Link)`
  margin-right: 16px;
`

export default (props) => (
  <Header>
    <Items>
      <Item grow>
        <Title to='/'>
          {props.title}
        </Title>
        <Link to='/docs'>Docs</Link>
      </Item>
      <Item>
        <a href='//github.com/Secretmapper/react-image-annotation' target='__blank'>
          Github
        </a>
      </Item>
    </Items>
  </Header>
)
