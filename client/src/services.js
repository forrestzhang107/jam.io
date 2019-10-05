const axios = require('axios')

export function Authenticate(payload) {
  return axios.post('/login', payload)
}

export function Logout() {
  return axios.post('/logout')
}

export function CreateRoom(payload) {
  return axios.post('/api/create-room', payload)
}

export function GetRoom(payload) {
  return axios.get('/api/get-room')
}
