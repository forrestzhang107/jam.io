const ObjectID = require('mongodb').ObjectID
const util = require('./utility')
const mongo = require('./mongo')

async function addRoom(payload) {
  await mongo.collection('rooms').insertOne({
    name: payload.name,
    desc: payload.desc,
    members: [payload.user],
  })
}

exports.addRoom = addRoom

async function delRoom(objectID) {
  await mongo.collection('rooms').deleteOne({
    '_id': ObjectID(objectID)
  })
}

async function getRoom(user) {
  const rooms = await getRooms()
  for (const room of rooms) if (room.members.includes(user)) return room
  return null
}

exports.getRoom = getRoom

async function getRooms() {
  return await mongo.collection('rooms').find({}).toArray()
}

exports.getRooms = getRooms

async function leaveRoom(user) {
  const room = await getRoom(user)
  const members = room.members
  util.removeItem(members, user)
  if (members.length == 0) await delRoom(room._id)
  else await updateRoom(room._id, {members: members})
}

exports.leaveRoom = leaveRoom

async function updateRoom(objectID, payload) {
  await mongo.collection('rooms').updateOne({
    _id: ObjectID(objectID)
  }, {$set: {...payload}})
}

async function getRoomFromID(objectID) {
  return await mongo.collection('rooms').findOne({_id: ObjectID(objectID)})
}

async function joinRoom(payload) {
  const room = await getRoomFromID(payload.objectID)
  const members = room.members
  members.push(payload.user)
  await updateRoom(room._id, {members: members})
}

exports.joinRoom = joinRoom
