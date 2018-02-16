import styled from 'styled-components'

export default styled.div.attrs({
  style: props => ({
    position: 'absolute',
    left: `${props.geometry.x}%`,
    top: `${props.geometry.y}%`,
    height: `${props.geometry.height}%`,
    width: `${props.geometry.width}%`
  })
})`
  border: dashed 2px black;
  box-shadow: 0px 0px 1px 1px white inset;
  transition: box-shadow 0.21s ease-in-out;

  ${props => props.active && `
    box-shadow: 0px 0px 1px 1px yellow inset;
  `}
`
