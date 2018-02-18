import React from 'react'
import styles from './index.css'

function Content (props) {
  const { geometry } = props.annotation
  if (!geometry) return null

  return (
    <div
      style={{
        position: 'absolute',
        left: `${geometry.x}%`,
        top: `${geometry.y + geometry.height}%`,
        ...props.style
      }}
      className={`Content ${styles.container}`}
      geometry={geometry}
    >
      {props.annotation.data && props.annotation.data.text}
    </div>
  )
}

Content.defaultProps = {
  style: {},
  className: ''
}

export default Content
