import React from 'react'
import styled, { keyframes } from 'styled-components'

const Inner = styled.div`
  padding: 8px 16px;
  color: #363636!important;
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

function RadioButtonEditor (props) {
  const zoomBetweenZeroAndOne = Math.abs(((props.imageZoomAmount - 1) / 4) - 1);

  const fontSize = ((1 / 5) + (zoomBetweenZeroAndOne * (4 / 5)));

  return (
    <React.Fragment>
      <Inner style={{fontSize: (fontSize + 'rem'), padding: ((((1 / 5) * 8) + ((4 / 5) * 8 * zoomBetweenZeroAndOne)) + 'px ' + (((1 / 5) * 16) + ((4 / 5) * 16 * zoomBetweenZeroAndOne)) + 'px')}}>
        <div><h6 style={{margin: '0px 0px', textAlign: 'center', fontSize: (fontSize + 'rem')}}> - Coffee Age - </h6></div>
        <div>
          <label><input type="radio"
            name="age" 
            value={'young'} 
            checked={props.ageValue === 'young'} 
            onChange={props.onChangeAge}
          /> Young</label>
        </div>
        <div>
          <label><input type="radio"
            name="age" 
            value={'mature'} 
            checked={props.ageValue === 'mature'} 
            onChange={props.onChangeAge}
          /> Mature</label>
        </div>

        <div><h6 style={{margin: '0px 0px', textAlign: 'center', fontSize: (fontSize + 'rem')}}> - Renovation Type - </h6></div>
        <div>
          <label><input type="radio"
            name="renovationType" 
            value={'esqueletomento'} 
            checked={props.renovationTypeValue === 'esqueletomento'} 
            onChange={props.onChangeRenovationType}
          /> Esquele.</label>
        </div>
        <div>
          <label><input type="radio"
            name="renovationType" 
            value={'recepa'} 
            checked={props.renovationTypeValue === 'recepa'}  
            onChange={props.onChangeRenovationType}
          /> Recepa</label>
        </div>
      </Inner>
      {(props.ageValue && props.ageValue.length > 0 && props.renovationTypeValue && props.renovationTypeValue.length > 0) &&
        <Button
          onClick={props.onSubmit}
          style={{fontSize: (fontSize + 'rem'), padding: ((((1 / 5) * 8) + ((4 / 5) * 8 * zoomBetweenZeroAndOne)) + 'px ' + (((1 / 5) * 16) + ((4 / 5) * 16 * zoomBetweenZeroAndOne)) + 'px')}}
        >
          Submit
        </Button>
      }
    </React.Fragment>
  )
}

export default RadioButtonEditor
