import React from 'react'
import styles from './index.css'

function Content (props) {
  if (!props.geometry) return null

  return (
    <div
      style={{
        position: 'absolute',
        left: `${props.geometry.x}%`,
        top: `${props.geometry.y + props.geometry.height}%`,
        ...props.style
      }}
      className={`Content ${styles.container}`}
      geometry={props.geometry}
    >
      {props.data.text}
    </div>
  )
}

Content.defaultProps = {
  style: {},
  className: ''
}

export default Content
