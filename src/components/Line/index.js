import React from 'react'
import styled from 'styled-components'
import { Rnd as Resizable } from 'react-rnd'
import LineTo from 'react-lineto'
import Point from '../Point/index'

function Line(props) {
  const { onChange, onSubmit, annotation, color } = props
  const { geometry, data, selection } = annotation

  if (!geometry) return null
  return (
    <div
      className={`linesContainer annotationWrapper ${props.className}`}
      style={{
        width: '100%',
        position: 'absolute',
        height: '100%',
        ...props.style
      }}>
      <Resizable
        key={geometry.xPx + '_' + geometry.yPx + '_1'}
        className={geometry.xPx + '_' + geometry.yPx + '_1'}
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
            geometry.x1 = (d.x * geometry.x1) / geometry.xPx
            geometry.y1 = (d.y * geometry.y1) / geometry.yPx
            geometry.xPx = d.x
            geometry.yPx = d.y
            geometry.x = geometry.x1 < geometry.x2 ? geometry.x1 : geometry.x2
            geometry.y = geometry.y1 < geometry.y2 ? geometry.y1 : geometry.y2
            geometry.width =
              geometry.x1 < geometry.x2
                ? geometry.x2 - geometry.x1
                : geometry.x1 - geometry.x2
            geometry.height =
              geometry.y1 < geometry.y2
                ? geometry.y2 - geometry.y1
                : geometry.y1 - geometry.y2
            onChange(annotation)
            onSubmit()
          }
        }}
        position={{
          x: geometry.xPx - 5,
          y: geometry.yPx - 5
        }}
      />

      {!selection && (
        <LineTo
          key={
            geometry.x1 +
            '_' +
            geometry.y1 +
            '_' +
            geometry.x2 +
            '_' +
            geometry.y2
          }
          within="annotationWrapper"
          from={geometry.xPx + '_' + geometry.yPx + '_1'}
          to={geometry.x2Px + '_' + geometry.y2Px + '_2'}
          borderColor={color}
          borderStyle={'dashed'}
          borderWidth={4}
          className={!props.active ? 'Polygon-LineTo' : 'Polygon-LineToActive'}
        />
      )}

      <Resizable
        key={geometry.x2Px + '_' + geometry.y2Px + '_2'}
        className={geometry.x2Px + '_' + geometry.y2Px + '_2'}
        style={{
          border: 'solid 2px ' + color,
          borderRadius: '50%',
          boxSizing: 'border-box',
          pointerEvents: !selection ? 'auto' : 'none',
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
            geometry.x = geometry.x1 < geometry.x2 ? geometry.x1 : geometry.x2
            geometry.y = geometry.y1 < geometry.y2 ? geometry.y1 : geometry.y2
            geometry.width =
              geometry.x1 < geometry.x2
                ? geometry.x2 - geometry.x1
                : geometry.x1 - geometry.x2
            geometry.height =
              geometry.y1 < geometry.y2
                ? geometry.y2 - geometry.y1
                : geometry.y1 - geometry.y2
            onChange(annotation)
            onSubmit()
          }
        }}
        position={{
          x: geometry.x2Px - 5,
          y: geometry.y2Px - 5
        }}
      />
    </div>
  )
}

Line.defaultProps = {
  className: '',
  style: {}
}

export default Line
