import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from '../../Routes'
import './Home.scss'

function Home() {
  return (
    <BrowserRouter>
      <section className='HomeContainer'>
        <Routes />
      </section>
    </BrowserRouter>
  )
}

export default Home
