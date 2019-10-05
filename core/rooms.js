const mongo = require('./mongo')

async function addRoom(payload) {
  await mongo.collection('rooms').insertOne({
    name: payload.name,
    desc: payload.desc,
    members: [payload.user],
  })
}

exports.addRoom = addRoom

async function delRoom(id) {
  await mongo.collection('rooms').deleteOne()
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
