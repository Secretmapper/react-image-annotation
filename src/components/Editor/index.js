import React from 'react'
import styled, { keyframes } from 'styled-components'
import TextEditor from '../TextEditor'
import RadioButtonEditor from '../RadioButtonEditor'
import { getHorizontallyCentralPoint, getVerticallyLowestPoint } from '../../utils/pointsUtils'
import { PolygonSelector } from '../../selectors'

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

function Editor (props) {
  const { geometry } = props.annotation
  if (!geometry) return null

  return (
    <div
      className={props.className}
      style={{
        position: 'absolute',
        left: ((geometry.type === PolygonSelector.TYPE) ? `${getHorizontallyCentralPoint(geometry.points)}%` : `${geometry.x}%`),
        top: ((geometry.type === PolygonSelector.TYPE) ? `${getVerticallyLowestPoint(geometry.points)}%` : `${geometry.y + geometry.height}%`),
        zIndex: 999,
        ...props.style
      }}
    >
      <Container>
        {(geometry.type === PolygonSelector.TYPE) &&
          <RadioButtonEditor
            onChangeAge={e => props.onChange({
              ...props.annotation,
              data: {
                ...props.annotation.data,
                age: e.target.value
              }
            })}
            onChangeRenovationType={e => props.onChange({
              ...props.annotation,
              data: {
                ...props.annotation.data,
                renovationType: e.target.value
              }
            })}
            onSubmit={props.onSubmit}
            ageValue={props.annotation.data && props.annotation.data.age}
            renovationTypeValue={props.annotation.data && props.annotation.data.renovationType}
            imageZoomAmount={props.imageZoomAmount}
          />
        }
        {(geometry.type !== PolygonSelector.TYPE) &&
          <TextEditor
            onChange={e => props.onChange({
              ...props.annotation,
              data: {
                ...props.annotation.data,
                text: e.target.value
              }
            })}
            onSubmit={props.onSubmit}
            value={props.annotation.data && props.annotation.data.text}
          />
        }
      </Container>
    </div>
  )
}

Editor.defaultProps = {
  className: '',
  style: {}
}

export default Editor
