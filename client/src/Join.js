import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {GetRooms, JoinRoom} from './services';

function Join(props) {

  const [data, setData] = useState(null)
  useEffect(() => {
    async function getRooms(){
      const res = (await GetRooms())
    setData(res.data)
    console.log('rooms',res.data);
    }
    getRooms()
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
        <Row>
        {data.map(room =>
          <Col className="col-6">
              <div onClick={() => joinRoom(room._id)} className='room'>{room.name}</div>
          </Col>
        )}
        </Row>
      )
    }
  }

  async function joinRoom(objectID) {
    await JoinRoom({objectID: objectID})
    props.history.push('/auth/room')
  }

}

export default Join
