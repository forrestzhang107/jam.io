import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {GetStreamLink} from './services'
import qs from 'qs'


function Recording(props) {

  const [streamLink, setStreamLink] = useState(null)

  useEffect(() => {
    async function getStreamLink() {
    const obj = qs.parse(props.location.search);
    const filename = obj['?id']
    const streamLink = 'd1xzn1tutffqqs.cloudfront.net/' + filename
    // const data = await GetStreamLink(obj['?id'])
    console.log(streamLink);
    setStreamLink(streamLink)
    }
    getStreamLink();
  }, [props.location.search])

  return (
    <Container>
    <h3 className='title'>Recording</h3>
    {renderRecording()}
    <Link to='/auth/menu' className='box-link cancel'>Back</Link>
    </Container>
  )

  function renderRecording() {
    if (streamLink) {
     return (
        <Row>
            <iframe className="video-center" src={"https://www.youtube.com/embed/qFIlGLnjn7g"} frameBorder="0"></iframe>
        </Row>
      )
    }
  }
}

export default Recording
