import React from 'react'

export default function Button({children, className, ...props}) {
  return (
    <button {...props} className={className}>
        {children}
    </button>
  )
}
