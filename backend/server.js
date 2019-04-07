'use strict'
let express = require('express')
let bodyParser = require('body-parser')
let BigCommerce = require('node-bigcommerce')
let config = require('./config/config')
let cors = require('cors')
let jwt = require('jsonwebtoken')
let db

// Initialisation
let app = express()
let bigCommerce = new BigCommerce({
  logLevel: config.bigCommerceLogLevel,
  clientId: config.bigCommerceClientId,
  accessToken: config.bigCommerceAccessToken,
  responseType: config.bigCommerceResponseType,
  storeHash: config.bigCommerceStoreHash
})

let bigCommerceV3 = new BigCommerce({
  logLevel: config.bigCommerceLogLevel,
  clientId: config.bigCommerceClientId,
  accessToken: config.bigCommerceAccessToken,
  responseType: config.bigCommerceResponseType,
  storeHash: config.bigCommerceStoreHash,
  apiVersion: 'v3'
})

// Import Routes
let auth = require('./routes/auth')
let product = require('./routes/product')
let profile = require('./routes/profile')
let cart = require('./routes/cart')
let store = require('./routes/store')


// Specifies the port number
let port = process.env.PORT || 3000

// Body Parser Middleware
app.use(bodyParser.json())

// CORS
app.use(cors())

app.use(function (req, res, next) {
  req.db = db
  req.bigCommerce = bigCommerce
  req.bigCommerceV3 = bigCommerceV3
  req.jwt = jwt
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// Routes
app.use('/auth', auth)
app.use('/product', product)
app.use('/profile', profile)
app.use('/cart', cart)
app.use('/store', store)

// Start the server only the connection to database is successful
app.listen(port, () => {
  console.log('Server started on port' + port)
})