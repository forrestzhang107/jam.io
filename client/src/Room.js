import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { GetRoom } from './services'

function Room(props) {

  const [data, setData] = useState(null)

  useEffect(() => {
    getData()
  }, [])

  return (
    <Container>
    <h3 className='title'>{data ? data.name : ''}</h3>
    {renderData()}
    <div className='box-link'>Leave</div>
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

}

export default Room
