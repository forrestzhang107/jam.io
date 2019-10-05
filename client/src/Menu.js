import React, {useEffect, useState} from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Logout, InRoom } from './services'
import "./App.css";
function Menu() {

  // JSX
  const [roomJoined, setRoomJoined] = useState(false);
  useEffect(() => {
    async function check(){
      if(await InRoom()){
        setRoomJoined(true)
      }
    }
    check()
  },[])

  return (
    <Container>
    <h2 className='logo'>Jam.io</h2>
    <Link to='/auth/create' className='box-link'>Create Room</Link>
    {roomJoined ? (<Link to='/auth/room' className='box-link'>Rejoin Room</Link>) : (<Link to='/auth/join' className='box-link'>Join Room</Link>)}
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
