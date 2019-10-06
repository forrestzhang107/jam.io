const express = require('express')
const router = express.Router()
const rooms = require('../core/rooms')
const s3 = require('../core/s3')
router.get('/ping', (req, res) => {
  res.send('pong')
})

module.exports = router

router.post('/create-room', async (req, res) => {
  if (req.user) {
    await rooms.addRoom({
      ...req.body,
      user: req.user
    })
  }
  res.end()
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
router.get('/get-file-lists', async (req, res) => {
  const lists = await s3.getFileLists()
  if (lists) res.send(lists)
  else res.send(false)
})

router.post('/leave-room', async (req, res)=> {
  await rooms.leaveRoom(req.user)
  res.end()
})

router.post('/join-room', async (req, res) => {
  if (req.user) {
    await rooms.joinRoom({
      ...req.body,
      user: req.user
    })
  }
  res.end()
})

router.post('/update-room-channel', async (req, res) => {
  await rooms.updateRoomChannel(req.user, req.body.channelID)
  res.end()
})
