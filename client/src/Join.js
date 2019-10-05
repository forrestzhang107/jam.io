import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Join(props) {

  const [data, setData] = useState(null)

  useEffect(() => {
    // const data = await GetRooms()
    // setData(data)
  }, [])

  return (
    <Container>
    <h3 className='title'>Join Room</h3>
    {renderRooms()}
    <Link to='/auth/menu' className='box-link'>Cancel</Link>
    </Container>
  )

  function renderRooms() {
    if (data) {
      if (data.length === 0) return <div className='center mb-16'>No rooms to display.</div>
      else return (
        data.map(room => {
          // render one room
        })
      )
    }
  }

}

export default Join
