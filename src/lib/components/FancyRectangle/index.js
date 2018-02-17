import React from 'react'
import styles from './index.css'

function Box (props) {
  return (
    <div className={styles.box} style={props.style} />
  )
}

function FancyRectangle (props) {
  const { geometry } = props

  if (!geometry) return null

  return (
    <div
      className={`${props.className} ${styles.container}`}
      style={props.style}
    >
      <Box
        style={{
          height: `${geometry.y}%`,
          width: '100%'
        }}
      />
      <Box
        style={{
          top: `${geometry.y}%`,
          height: `${geometry.height}%`,
          width: `${geometry.x}%`
        }}
      />
      <Box
        style={{
          top: `${geometry.y}%`,
          left: `${geometry.x + geometry.width}%`,
          height: `${geometry.height}%`,
          width: `${100 - (geometry.x + geometry.width)}%`
        }}
      />
      <Box
        style={{
          top: `${geometry.y + geometry.height}%`,
          height: `${100 - (geometry.y + geometry.height)}%`,
          width: '100%'
        }}
      />
    </div>
  )
}

FancyRectangle.defaultProps = {
  className: '',
  style: {}
}

export default FancyRectangle
