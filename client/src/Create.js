import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { CreateRoom, CreateRoomStream } from './services'


function Create(props) {

  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')

  return (
    <Container>
    <h3 className='title'>Create Room</h3>
    <form onSubmit={evt => {evt.preventDefault(); createRoom()}}>
      <label className='fluid'>
        Room Name:<br/>
        <input className='fluid' type="text"
        value={name}
        onChange={evt => setName(evt.target.value)} />
      </label><br/>
      <label className='fluid'>
        Description:<br/>
        <textarea className='desc-box fluid' type="text"
        value={desc}
        onChange={evt => setDesc(evt.target.value)} />
      </label><br/>
    <button type="submit" className={'box-link ' + (name ? '' : 'disabled')}>Create</button>
    </form>
    <Link to='/auth/menu' className='box-link'>Cancel</Link>
    </Container>
  )

  async function createRoom() {
    var room_info = await CreateRoomStream();
    await CreateRoom({
      name: name,
      desc: desc,
      room_name: room_info.roomName,
      room_token: room_info.roomToken,
      broadcaster: room_info.broadcaster
    })

    // setTimeout(()=>{
       props.history.push('/auth/room');
    // }, 5000)
  }

}

export default Create
