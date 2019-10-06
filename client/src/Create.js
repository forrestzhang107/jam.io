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
      <div className='button-wrapper'>
      <button type="submit" className={(name ? '' : 'disabled')}>Create</button>
      </div>
    </form>
    <Link to='/auth/menu' className='box-link cancel'>Cancel</Link>
    </Container>
  )

  async function createRoom() {
    await CreateRoom({
      name: name,
      desc: desc,
    })

    // setTimeout(()=>{
       props.history.push('/auth/room');
    // }, 5000)
  }

}

export default Create
