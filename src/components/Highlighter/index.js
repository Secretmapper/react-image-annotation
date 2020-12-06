import React from 'react'


function Highlighter(props) {
  const { geometry } = props.annotation
  if (!geometry) return null

  return (
    <svg height="100%" width="100%" viewBox={`0 0 ${geometry.size.width} ${geometry.size.height}`} className={props.className} style={{ position: 'absolute' }}>
      <polyline fill="none" stroke={'#ffe000a6'} strokeWidth={'24px'}
        points={geometry.points.map((e) => `${e.x},${e.y}`).join(' ')} />
    </svg>
  )
}

Highlighter.defaultProps = {
  className: '',
  style: {}
}

export default Highlighter
