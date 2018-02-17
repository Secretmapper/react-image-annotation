import React from 'react'
import './index.css'

function Content (props) {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${props.geometry.x}%`,
        top: `${props.geometry.y + props.geometry.height}%`,
        ...props.style
      }}
      className={`Content ${props.className}`}
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
