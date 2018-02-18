import React from 'react'
import styles from './index.css'

function Point (props) {
  const { geometry } = props.annotation
  if (!geometry) return null

  return (
    <div
      style={{
        position: 'absolute',
        top: `${geometry.y}%`,
        left: `${geometry.x}%`,
        transform: 'translate3d(-50%, -50%, 0)'
      }}
      className={styles.container}
    />
  )
}


export default Point
