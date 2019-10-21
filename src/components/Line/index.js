import React from 'react'
import styled from 'styled-components'
import { Rnd as Resizable } from 'react-rnd'
import LineTo from 'react-lineto'
import Point from '../Point/index'
function Line(props) {
  const { onChange, onSubmit, annotation } = props
  const { geometry, data, color = 'white', selection } = annotation
  console.log(annotation)
  if (!geometry) return null
  return (
    <div
      className={'linesContainer'}
      style={{
        width: '100%',

        position: 'absolute',
        height: '100%',
        ...props.style
      }}>
      <Resizable
        key={geometry.xPx + '_' + geometry.yPx}
        style={{
          border: 'solid 2px ' + color,
          borderRadius: '50%',
          boxSizing: 'border-box',
          pointerEvents: 'auto',
          zIndex: 10,
          boxShadow:
            '0 0 0 1px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(0, 0, 0, 0.2), 0 5px 4px rgba(0, 0, 0, 0.4)',

          position: 'absolute',
          transform: 'translate3d(-50%, -50%, 0)'
        }}
        size={{
          width: 10,
          height: 10
        }}
        enableResizing={false}
        onDragStop={(e, d, k) => {
          if (geometry.xPx !== d.x || geometry.yPx !== d.y) {
            geometry.x = (d.x * geometry.x) / geometry.xPx
            geometry.y = (d.y * geometry.y) / geometry.yPx
            geometry.xPx = d.x
            geometry.yPx = d.y
            onChange(annotation)
            onSubmit()
          }
        }}
        position={{
          x: geometry.xPx - 5,
          y: geometry.yPx - 5
        }}
      />

      <LineTo
        key={
          geometry.x + '_' + geometry.y + '_' + geometry.x2 + '_' + geometry.y2
        }
        from="linesContainer"
        fromAnchor={geometry.x + '% ' + geometry.y + '%'}
        to="linesContainer"
        toAnchor={geometry.x2 + '% ' + geometry.y2 + '%'}
        borderColor={'black'}
        borderStyle={'dashed'}
        borderWidth={2}
      />
      {!selection && (
        <Resizable
          key={geometry.x2Px + '_' + geometry.y2Px}
          style={{
            border: 'solid 2px ' + color,
            borderRadius: '50%',
            boxSizing: 'border-box',
            pointerEvents: 'auto',
            zIndex: 10,
            boxShadow:
              '0 0 0 1px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(0, 0, 0, 0.2), 0 5px 4px rgba(0, 0, 0, 0.4)',

            position: 'absolute',
            transform: 'translate3d(-50%, -50%, 0)'
          }}
          size={{
            width: 10,
            height: 10
          }}
          enableResizing={false}
          onDragStop={(e, d, k) => {
            if (geometry.x2Px !== d.x || geometry.y2Px !== d.y) {
              geometry.x2 = (d.x * geometry.x2) / geometry.x2Px
              geometry.y2 = (d.y * geometry.y2) / geometry.y2Px
              geometry.x2Px = d.x
              geometry.y2Px = d.y
              onChange(annotation)
              onSubmit()
            }
          }}
          position={{
            x: geometry.x2Px - 5,
            y: geometry.y2Px - 5
          }}
        />
      )}
    </div>
  )
}

Line.defaultProps = {
  className: '',
  style: {}
}

export default Line
