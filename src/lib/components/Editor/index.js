import React from 'react'
import styles from './index.css'

function Editor (props) {
  if (!props.geometry) return null

  return (
    <div
      className={`${styles.container} ${props.className}`}
      style={{
        position: 'absolute',
        left: `${props.geometry.x}%`,
        top: `${props.geometry.y + props.geometry.height}%`,
        ...props.style
      }}
    >
      <div className={styles.editor}>
        <textarea
          placeholder='Write comment'
          onChange={e => props.onChange({
            ...props.geometry,
            ...props.selection,
            data: {
              ...props.data,
              text: e.target.value
            }
          })}
          value={props.data.text}
        >
        </textarea>
      </div>
      <button
        className={styles.button}
        onClick={props.onSubmit}
      >
        Comment
      </button>
    </div>
  )
}

Editor.defaultProps = {
  className: '',
  style: {}
}

export default Editor
