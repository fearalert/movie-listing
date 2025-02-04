import React from 'react'

const Header = () => {
  return (
    <header>
        <img src='/logo.png' alt='logo of the movie app' loading='lazy' className='w-24 h-auto' />
        <img src='/hero.png' alt='hero section image' loading='lazy'/>
        <h1>Find <span className='text-gradient'>Movies</span> You'll Love And Enjoy Without Hassle</h1>
    </header>
  )
}

export default Header