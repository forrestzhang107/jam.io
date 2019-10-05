const mongo = require('./mongo')

mongo.init().then(() => {
  const db = mongo.getDB()
  console.log(db)
})
