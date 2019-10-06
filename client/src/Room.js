import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { GetRoom, LeaveRoom, Stream } from './services'
function Room(props) {

  const [data, setData] = useState(null)

  useEffect(() => {
    getData()
    console.log("video: ", document.getElementById("video_stream"))
    console.log("stream: ", window._stream);
    document.getElementById("video_stream").srcObject = window._stream;
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
<<<<<<< HEAD
    <video id="video_stream" style={{width: "92vw"}} autoPlay={true} muted={true}/>
      <div className='box-link'>Start Session</div>
    <div className='box-link' onClick={() => leaveRoom()}>Leave</div>
=======
    <div className='box-link'>Start Session</div>
    <div className='box-link cancel' onClick={() => leaveRoom()}>Leave</div>
>>>>>>> 6763868b367ce17c0cfc75c9bba7de8b3ebf8d54
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
