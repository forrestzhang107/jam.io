import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Authenticate } from './services'

function Login() {

  // local state
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // JSX

  useEffect(() => {
    setErrorMessage('')
  }, [user, pass])

  return (
    <Container>
    <h2 className='login-logo'>Jam.io</h2>
    {renderErrorMessage()}
    <form onSubmit={evt => evt.preventDefault()}>
      <div className='login-form'>
      <label className='fluid'>
        Username: <br/>
        <input className='fluid' type="text"
        value={user}
        onChange={evt => setUser(evt.target.value)} />
      </label><br/>
      <label className='fluid'>
        Password: <br/>
        <input className='fluid' type="password"
        value={pass}
        onChange={evt => setPass(evt.target.value)} />
      </label><br/>
      </div>
    <div onClick={() => login()}>
    <div className='button-wrapper'>
    <button type='submit'>Login</button>
    </div>
    </div>
    </form>
    </Container>
  )

  function renderErrorMessage() {
    if(errorMessage) return <p className='center mb-16'>{errorMessage}</p>
  }

  // Helpers

  async function login() {
    try {
      await Authenticate({'username' : user, 'password' : pass})
      window.location.href = '/auth/menu'
    }
    catch (e) {
      setErrorMessage('Invalid username/password combination.')
    }
  }

}

export default Login
