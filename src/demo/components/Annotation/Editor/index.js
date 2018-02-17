import React from 'react'
import styled, { keyframes } from 'styled-components'

const appear = keyframes`
  from {
    opacity: 0;
    transform: scale(0);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const Container = styled.div`
  background: white;
  border-radius: 2px;
  box-shadow:
    0px 1px 5px 0px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 3px 1px -2px rgba(0, 0, 0, 0.12);
  margin-top: 16px;
  transform-origin: top left;

  animation: ${appear} 0.31s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
`

const Editor = styled.div`
  padding: 8px 16px;
  textarea {
    border: 0;
    font-size: 14px;
    margin: 6px 0;
    min-height: 60px;
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
  margin: 0;
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
  <Container
    style={{
      position: 'absolute',
      left: `${props.geometry.x}%`,
      top: `${props.geometry.y + props.geometry.height}%`
    }}
  >
    <Editor>
      <textarea
        placeholder='Write comment'
        onChange={e => props.onChange({
          text: e.target.value
        })}
        value={props.data.text}
      >
      </textarea>
    </Editor>
    <Button onClick={props.onSubmit}>
      Comment
    </Button>
  </Container>
)
