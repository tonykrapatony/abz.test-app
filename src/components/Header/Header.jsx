import React from 'react'
import Banner from './Banner/Banner'
import Navbar from './Navbar/Navbar'

export default function Header() {
  return (
    <header className='header'>
        <Navbar></Navbar>
        <Banner></Banner>
    </header>
  )
}
