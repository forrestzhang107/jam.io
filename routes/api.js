const express = require('express')
const router = express.Router()
const rooms = require('../core/rooms')

router.get('/ping', (req, res) => {
  res.send('pong')
})

module.exports = router

router.post('/create-room', async (req, res) => {
  await rooms.addRoom({
    ...req.body,
    user: req.user
  })
})

router.get('/get-room', async (req, res) => {
  const room = await rooms.getRoom(req.user)
  res.send(room)
})

router.get('/get-rooms', async (req, res) => {
  const data = await rooms.getRooms()
  res.send(data)
})

router.get('/in-room', async (req, res) => {
  const room = await rooms.getRoom(req.user)
  if (room) res.send(true)
  else res.send(false)
})
