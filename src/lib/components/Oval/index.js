import React from 'react'
import styles from './index.css'

function Oval (props) {
  if (!props.geometry) return null

  return (
    <div
      className={`${styles.container} ${props.className}`}
      style={{
        position: 'absolute',
        left: `${props.geometry.x}%`,
        top: `${props.geometry.y}%`,
        height: `${props.geometry.height}%`,
        width: `${props.geometry.width}%`,
        boxShadow: props.active && '0 0 1px 1px yellow inset',
        ...props.style
      }}
    />
  )
}

Oval.defaultProps = {
  className: '',
  style: {}
}

export default Oval
