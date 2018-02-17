import React from 'react'
import styles from './index.css'

function Box (props) {
  return (
    <div className={styles.box} style={props.style} />
  )
}

function FancyRectangle (props) {
  const { geometry } = props

  const scaleX = 100 - geometry.width - geometry.x
  const translateX = (geometry.x + geometry.width) * 100 / scaleX

  const scaleY = 100 - geometry.height - geometry.y
  const translateY = (geometry.y + geometry.height) * 100 / scaleY


  return (
    <div className={`${props.className} ${styles.container}`} style={props.style}>
      <Box
        style={{
          transform: `scaleX(100) scaleY(${geometry.y}) translate3d(0, 0, 0)`
        }}
      />
      <Box
        style={{
          transform: `
            scaleX(${geometry.x})
            scaleY(${geometry.height})
            translate3d(0, ${geometry.y / geometry.height * 100}%, 0)
          `
        }}
      />
      <Box
        style={{
          transform: `
            scaleX(${scaleX})
            scaleY(${geometry.height})
            translate3d(${translateX}%, ${geometry.y / geometry.height * 100}%, 0)
          `
        }}
      />
      <Box
        style={{
          transform: `
            scaleX(100)
            scaleY(${scaleY})
            translate3d(0, ${translateY}%, 0)
          `
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
