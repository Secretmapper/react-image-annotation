import React from 'react'
import styles from './index.css'

function Editor (props) {
  const { geometry } = props.annotation
  if (!geometry) return null

  return (
    <div
      className={`${styles.container} ${props.className}`}
      style={{
        position: 'absolute',
        left: `${geometry.x}%`,
        top: `${geometry.y + geometry.height}%`,
        ...props.style
      }}
    >
      <div className={styles.editor}>
        <textarea
          placeholder='Write comment'
          onChange={e => props.onChange({
            ...props.annotation,
            data: {
              ...props.data,
              text: e.target.value
            }
          })}
          value={props.annotation.data.text}
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
