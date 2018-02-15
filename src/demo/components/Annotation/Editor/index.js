import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background: white;
  border-radius: 2px;
  box-shadow:
    0px 1px 5px 0px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 3px 1px -2px rgba(0, 0, 0, 0.12);
  margin-top: 16px;
  overflow: hidden;
`

const Editor = styled.div`
  padding: 8px 16px;
  textarea {
    border: 0;
    font-size: 14px;
    margin: 6px 0;
    outline: 0;
  }
`

const Button = styled.button`
  background: #24B3C8;
  border: 0;
  color: white;
  cursor: pointer;
  font-family: Montserrat;
  font-size: 13px;
  font-weight: 700;
  outline: 0;
  padding: 8px 16px;
  text-shadow: 0 1px 0 rgba(0,0,0,0.1);
  text-transform: uppercase;
  width: 100%;

  transition: background 0.21s ease-in-out;

  &:focus, &:hover {
    background: #176572;
  }
`

export default (props) => (
  <Container style={props.style}>
    <Editor>
      <textarea placeholder='Write comment'>
      </textarea>
    </Editor>
    <Button>
      Comment
    </Button>
  </Container>
)
