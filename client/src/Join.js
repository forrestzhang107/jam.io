import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {GetRooms} from './services';

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
          <Col className="room col-6">
              <div>{room.name}</div>
              <div>{room.desc}</div>
          </Col>
        )}
        </Row>
      )
    }
  }

}

export default Join
