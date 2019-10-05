const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://forrest:forrest123@ds137283.mlab.com:37283/options"

let db
const tag = 'lambda'

async function init() {
  if(!db) await connect()
}

exports.init = init

async function connect() {
  db = await MongoClient.connect(url)
}

function getDB() {
  return db.db("options")
}

exports.getDB = getDB

function collection(coll) {
  return getDB().collection(coll)
}

exports.collection = collection

function close() {
  return db.close()
}

exports.close = close
