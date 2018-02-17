import React from 'react'
import styles from './index.css'

function Point (props) {
  return (
    <div
      style={{
        position: 'absolute',
        top: `${props.geometry.y}%`,
        left: `${props.geometry.x}%`,
        transform: 'translate3d(-50%, -50%, 0)'
      }}
      className={styles.container}
    />
  )
}


export default Point
