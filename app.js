require('dotenv').config()

const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


const apis = require('./src/api_es/api')

mongoose.set('useUnifiedTopology', true)
mongoose.set('useNewUrlParser', true)
mongoose.connect(process.env.mongoose_URI,{ autoIndex: false })
.then(() => console.log('DB connected'))
.catch((err) => console.error('err', err))

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({
  extended: true,
}))
app.use(bodyParser.json())

app.use('/api', apis)

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    message: err.message,
  })
})

module.exports = app