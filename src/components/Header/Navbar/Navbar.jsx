import React from 'react'
import Buttons from './Buttons'
import Logo from './Logo'

export default function Navbar() {
  return (
    <div className="navbar-container">
        <nav className='navbar'>
        <Logo></Logo>
        <Buttons></Buttons>
    </nav>
    </div>
  )
}
