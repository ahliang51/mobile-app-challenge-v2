'use strict'
// Import
let express = require('express')
let router = express.Router()
let db

router.get('/camps', (req, res, next) => {
  db = req.db
  db.collection('camps').find({}).toArray((error, result) => {
    if (error) console.log(error)
    res.json(result)
  })
})

module.exports = router