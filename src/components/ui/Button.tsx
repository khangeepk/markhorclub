import React from 'react'

export default function Button({ children, className = '', ...props }: any){
  return (
    <button className={"inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gold text-white font-medium " + className} {...props}>
      {children}
    </button>
  )
}
