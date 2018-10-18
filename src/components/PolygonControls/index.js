import React from 'react'
import styled, { keyframes } from 'styled-components'
import { getHorizontallyCentralPoint, getVerticallyLowestPoint } from '../../utils/pointsUtils'

const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
`

const Container = styled.div`
  background: white;
  border-radius: 2px;
  box-shadow:
    0px 1px 5px 0px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 3px 1px -2px rgba(0, 0, 0, 0.12);
  margin-top: 16px;
  transform-origin: top left;

  animation: ${fadeInScale} 0.31s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
  margin-left: -50%;
  margin-right: 50%
`

function PolygonControls (props) {
  const { geometry } = props.annotation
  if (!geometry || !geometry.points || geometry.points.length === 0) return null

  return (
    <div
      style={{
        position: 'absolute',
        left: `${getHorizontallyCentralPoint(geometry.points)}%`,
        top: `${getVerticallyLowestPoint(geometry.points)}%`,
        ...props.style
      }}
    >
      <Container
        className={props.className}
      >
        <button onClick={props.onSelectionClear}>Clear</button>
        <button onClick={props.onSelectionComplete}>Done</button>
      </Container>
    </div>
  )
}

PolygonControls.defaultProps = {
  className: '',
  style: {}
}

export default PolygonControls
