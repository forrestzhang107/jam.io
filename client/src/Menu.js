import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Logout } from './services'

function Menu() {

  // JSX

  return (
    <Container>
    <h2 className='logo'>Jam.io</h2>
    <Link to='/auth/create' className='box-link'>Create Room</Link>
    <Link to='/auth/join' className='box-link'>Join Room</Link>
    <Link to='/auth/recordings' className='box-link'>Recordings</Link>
    <div onClick={() => logout()} className='box-link'>Logout</div>
    </Container>
  )

  async function logout() {
    await Logout()
    window.location.href = '/'
  }

}

export default Menu
