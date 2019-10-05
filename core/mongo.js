const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://forrest:forrest123@cluster0-1kteo.mongodb.net/admin'

let db

async function init() {
  if(!db) await connect()
}

exports.init = init

async function connect() {
  db = await MongoClient.connect(url)
}

function getDB() {
  return db.db("cluster0")
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
