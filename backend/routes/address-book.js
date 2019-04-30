'use strict'
// Import
let express = require('express')
let router = express.Router()
let db

router.get('/test', (req, res, next) => {
  db = req.db
  db.collection('camps').find({}).toArray((error, result) => {
    if (error) console.log(error)
    console.log(result)
  })
})

module.exports = router