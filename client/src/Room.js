import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { GetRoom, LeaveRoom } from './services'
function Room(props) {

  const [data, setData] = useState(null)

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    setInterval(async() => {
      getData()
    }, 1000)
  }, [])

  return (
    <Container>
    <h3 className='title'>{data ? data.name : ''}</h3>
    {renderData()}
    <div className='box-link'>Start Session</div>
    <div className='box-link' onClick={() => leaveRoom()}>Leave</div>
    </Container>
  )

  function renderData() {
    if (data) {
      return (
        <div>
        <div className='mb-16'>
        {data.desc}
        </div>
        <div>Performers:</div>
        <Row className='mb-16'>
        {data.members.map(user =>
          <Col key={user} className='col-6'>
          <div className='member'>{user}</div>
          </Col>
        )}
        </Row>
        </div>
      )
    }
  }

  async function getData() {
    setData((await GetRoom()).data)
  }
  async function leaveRoom() {
    await LeaveRoom()
    props.history.push('/auth/menu');
  }
}

export default Room
