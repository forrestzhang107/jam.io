import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {GetRecordings} from './services'

function Recordings(props) {

  const [data, setData] = useState(null)

  useEffect(() => {
    async function getRecordings() {
    const res = await GetRecordings()
    console.log(res.data);
    setData(res.data)
    }
    getRecordings();
  }, [])

  return (
    <Container>
    <h3 className='title'>Recordings</h3>
    {renderRecordings()}
    <Link to='/auth/menu' className='box-link cancel'>Cancel</Link>
    </Container>
  )

  function renderRecordings() {
    if (data) {
      if (data.length === 0) return <div className='center mb-16'>No recordings to display.</div>
      else return (
        <Row>
        {data.map(recording =>
          <Col className="col-6">
              <div onClick={()=> {viewRecording(recording)}} className='room'>{recording}</div>
          </Col>
        )}
        </Row>
      )
    }
  }
  async function viewRecording(recording) {
    props.history.push('/auth/recording?id=' + recording)
  }
}

export default Recordings
