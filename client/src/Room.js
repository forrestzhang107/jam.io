import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { GetRoom, LeaveRoom, UpdateRoomChannel } from './services'
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
    <div onClick={() => startSession()} className='box-link'>Start Session</div>
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

  function getSessionURL(channelID) {
    return 'https://5g-hackathon.s3-us-west-1.amazonaws.com/session.html#' + channelID
  }

  async function startSession() {
    let channelID = data.channelID
    if (!channelID) {
      channelID = 'channel' + parseInt(Math.random() * 100)
      console.log('new channelID: ' + channelID)
      await UpdateRoomChannel(channelID)
      window.location.href = getSessionURL(channelID)
    }
    else {
      console.log('using existing channelID: ' + channelID)
      window.location.href = getSessionURL(channelID)
    }
  }

  async function getData() {
    setData((await GetRoom()).data)
  }

  async function leaveRoom() {
    await LeaveRoom()
    props.history.push('/auth/menu');
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}

export default Room
