import React from 'react'
import './Annotation.css'

const Annotation = (props) => {
  const { children, alt, ...imgProps } = props
  const className = props.className
    ? `Annotation__img ${props.className}`
    : `Annotation__img`

  return (
    <div className='Annotation'>
      <img
        className={className}
        alt={alt}
        {...imgProps}
      />
      {props.children}
    </div>
  )
}

export default Annotation
