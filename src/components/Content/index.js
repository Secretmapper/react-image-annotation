import React from 'react'
import styled from 'styled-components'
import { getHorizontallyCentralPoint, getVerticallyLowestPoint } from '../../utils/pointsUtils'
import { PolygonSelector } from '../../selectors'

const Container = styled.div`
  background: white;
  border-radius: 2px;
  box-shadow:
    0px 1px 5px 0px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 3px 1px -2px rgba(0, 0, 0, 0.12);
  padding: 8px 16px;
  margin-top: 8px;
  margin-left: -50%;
  margin-right: 50%
`

function Content (props) {
  const { geometry } = props.annotation
  if (!geometry) return null

  return (
    <div
      style={{
        position: 'absolute',
        left: ((geometry.type === PolygonSelector.TYPE) ? `${getHorizontallyCentralPoint(geometry.points)}%` : `${geometry.x}%`),
        top: ((geometry.type === PolygonSelector.TYPE) ? `${getVerticallyLowestPoint(geometry.points)}%` : `${geometry.y + geometry.height}%`),
        ...props.style
      }}
      className={props.className}
      geometry={geometry}
    >
      <Container>
        {props.annotation.data && props.annotation.data.text}
      </Container>
    </div>
  )
}

Content.defaultProps = {
  style: {},
  className: ''
}

export default Content
