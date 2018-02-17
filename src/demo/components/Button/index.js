import styled from 'styled-components'

export default styled.button`
  background: #24B3C8;
  border: 0;
  color: white;
  cursor: pointer;
  font-family: Montserrat;
  font-size: 13px;
  font-weight: 700;
  outline: 0;
  margin: 4px;
  padding: 8px 16px;
  text-shadow: 0 1px 0 rgba(0,0,0,0.1);
  text-transform: uppercase;

  transition: background 0.21s ease-in-out;

  &:focus, &:hover {
    background: #176572;
  }

  ${props => props.active && `
    background: #176572;
  `}
`
