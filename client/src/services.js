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

export function InRoom(){
  return axios.get('/api/in-room');
}

export function LeaveRoom(){
  return axios.post('/api/leave-room');
}

export function GetRooms(){
  return axios.get('/api/get-rooms');
}

export function JoinRoom(payload) {
  return axios.post('/api/join-room', payload)
}
