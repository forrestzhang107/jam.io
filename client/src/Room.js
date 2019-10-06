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

  return (
    <Container>
    <h3 className='title'>{data ? data.name : ''}</h3>
    {renderData()}
    <video id="video_stream" style={{width: "92vw"}} autoPlay={true} muted={true}/>
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
        <Row className='mb-16'>
        <div>Performers:</div>
        {data.members.map(user =>
          <Col className='member col-6'>
          {user}
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
