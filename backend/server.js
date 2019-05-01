'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
let db

// Initialisation
let app = express()
// Connection URL
const url = 'mongodb://mobile-api:Shengliang51@ds135305.mlab.com:35305/rsaf-mobile-app-challenge'
// Database Name
const dbName = 'rsaf-mobile-app-challenge'
// Create a new MongoClient
const client = new MongoClient(url, {
  useNewUrlParser: true
})

client.connect(function (err, client) {
  assert.strictEqual(null, err)
  console.log('Connected successfully to server')
  db = client.db(dbName)
})

// Specifies the port number
let port = process.env.PORT || 3000
// Body Parser Middleware
app.use(bodyParser.json())
app.use(function (req, res, next) {
  req.db = db
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// // Import Routes
let addressBook = require('./routes/address-book')
let auth = require('./routes/auth')
let eApplication = require('./routes/e-application')
// Routes
app.use('/address-book', addressBook)
app.use('/auth', auth)
app.use('/e-application', eApplication)

// Start the server only the connection to database is successful
app.listen(port, () => {
  console.log('Server started on port' + port)
})