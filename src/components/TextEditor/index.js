import React from 'react'
import styled, { keyframes } from 'styled-components'

const Inner = styled.div`
  padding: 8px 16px;

  textarea {
    border: 0;
    font-size: 14px;
    margin: 6px 0;
    min-height: 60px;
    outline: 0;
  }
`

const Button = styled.div`
  background: whitesmoke;
  border: 0;
  box-sizing: border-box;
  color: #363636;
  cursor: pointer;
  font-size: 1rem;
  margin: 0;
  outline: 0;
  padding: 8px 16px;
  text-align: center;
  text-shadow: 0 1px 0 rgba(0,0,0,0.1);
  width: 100%;
  display: inline-block;

  transition: background 0.21s ease-in-out;

  &:focus, &:hover {
    background: #eeeeee;
  }
`

function TextEditor (props) {
  let button = null;

  if (props.isUpdate) {
    const width = (!props.onUpdate != !props.onDelete) ? '100%' : '50%'; // logical XOR
    button = (
    <div>
      {props.onUpdate && <Button onClick={()=>props.onUpdate(props.annotation)} style={{width: width}}>Update</Button>}
      {props.onDelete && <Button onClick={()=>props.onDelete(props.annotation)} style={{width: width}}>Delete</Button>}
    </div>
      );
  } else {
    button = (<Button onClick={props.onSubmit}>Submit</Button>)
  }
  return (
    <React.Fragment>
      <Inner>
        <textarea
          placeholder='Write description'
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          onChange={props.onChange}
          value={props.value}
        >
        </textarea>
      </Inner>
      {props.value && button}
    </React.Fragment>
  )
}

export default TextEditor
