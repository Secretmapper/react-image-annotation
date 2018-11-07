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

  transition: background 0.21s ease-in-out;

  &:focus, &:hover {
    background: #eeeeee;
  }
`

function DropdownEditor (props) {
  return (
    <React.Fragment>
      <Inner>
        <select defaultValue={props.value} onChange={props.onChange}>
          <option value="na">- classify -</option>
          <option>Young Coffee</option>
          <option>Mature Coffee</option>
        </select>
        {/*<textarea
          placeholder='Write description'
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          onChange={props.onChange}
          value={props.value}
        >
        </textarea>*/}
      </Inner>
      {(props.value && props.value.length > 0 && props.value !== 'na') &&
        <Button
          onClick={props.onSubmit}
        >
          Submit
        </Button>
      }
    </React.Fragment>
  )
}

export default DropdownEditor
