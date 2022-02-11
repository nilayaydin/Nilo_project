/* eslint-disable no-console */
const mongoose = require('mongoose')

const username = process.env.MONGODB_USERNAME
const password = process.env.MONGODB_PASSWORD
const dbName = process.env.MONGODB_DATABASE
// const host = process.env.MONGODB_HOST
// const port = process.env.MONGODB_PORT
let connectionString = process.env.MONGODB_CONNECTION_STRING
// const remote = process.env.MONGODB_REMOTE

console.log('Ay umarim gozukur', connectionString)

if (!connectionString) {
  connectionString = `mongodb+srv://${username}:${password}@veganzimu.tztio.mongodb.net/${dbName}?retryWrites=true&w=majority`
}

mongoose.set('debug', true)

mongoose
  // connect(`mongodb+srv://${username}:${password}@veganzimu.tztio.mongodb.net/${dbName}?retryWrites=true&w=majority`
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => console.log('connection established'))
  .catch(console.log)

module.exports = mongoose.connection
