const mongo = require('./mongo')
const rooms = require('./rooms')

async function run() {
  const x = await rooms.getRooms()
  console.log(x)
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
