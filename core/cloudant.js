const Cloudant = require('@cloudant/cloudant');

const cloudant = Cloudant({
  account: 'f12be068-3f86-41a8-9b54-a679073f17c8-bluemix',
  password: '325f36ceb8d4c68186725eedd392c0be3ab5e616dfa159b10c0da04e5cbc0126'
})

async function createDB(dbName) {
  await cloudant.db.create(dbName);
}

function getDB(dbName) {
  return cloudant.use(dbName)
}

async function main() {
  const x = await getDB('rooms').find({name: 'my room'})
  console.log(x)
}

main()
