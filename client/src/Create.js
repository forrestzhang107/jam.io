import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { CreateRoom } from './services'

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
    <button type="submit" className='box-link'>Create</button>
    </form>
    <Link to='/auth/menu' className='box-link'>Cancel</Link>
    </Container>
  )

  async function createRoom() {
    const roomID = await CreateRoom({
      name: name,
      desc: desc,
    })
    // props.history.push('/room?id=' + roomID)
  }

}

export default Create
