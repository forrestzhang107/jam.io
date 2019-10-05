import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { Authenticate } from './services'
import "./App.css";
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
    <h2 className='logo'>Jam.io</h2>
    {renderErrorMessage()}
    <form onSubmit={evt => {evt.preventDefault(); login()}}>
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
    <button type="submit" className='box-link'>Login</button>
    </form>
    </Container>
  )

  function renderErrorMessage() {
    if(errorMessage) return <p className='mb-16'>{errorMessage}</p>
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
