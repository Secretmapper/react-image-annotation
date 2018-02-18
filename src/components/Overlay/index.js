import React from 'react'
import styles from './index.css'

function Overlay (props) {
  return (
    <div
      className={`${styles.container} ${props.className}`}
      style={props.style}
    >
      {props.children}
    </div>
  )
}

Overlay.defaultProps = {
  className: ''
}

export default Overlay
