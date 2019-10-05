const mongo = require('./mongo')
const rooms = require('./rooms')

async function run() {
  await rooms.leaveRoom('forrestzhang')
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
