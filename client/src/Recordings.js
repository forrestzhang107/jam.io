import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {GetFile} from './services';

function Recordings(props) {

  const [data, setData] = useState(null)

  useEffect(() => {
    async function getFiles() {
    const data = await GetFile()
    console.log(data);
    setData(data)
    }
    getFiles();
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
        data.map(recording => 
          console.log(recording)
        )
      )
    }
  }

}

export default Recordings
