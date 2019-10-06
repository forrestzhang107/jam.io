const mongo = require('./mongo')
const rooms = require('./rooms')

async function run() {
  // await rooms.leaveRoom('forrestzhang')
  await rooms.updateRoomChannel('forrestzhang', 'channel75')
}

mongo.init().then(async () => {
  try {
    await run()
  }
  catch(e) {
    console.log(e)
  }
  mongo.close()
})
