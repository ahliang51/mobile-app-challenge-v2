'use strict'
// Import
let express = require('express')
let router = express.Router()
let ObjectId = require('mongodb').ObjectId
let async = require('async')
let db

router.post('/check-bibo-status', (req, res, next) => {
  db = req.db
  db.collection('bibo-record').find({
    userId: req.body.userId
  }, {
    sort: {
      bookInDateTime: -1
    }
  }).toArray().then(result => {
    // Just need the latest record
    res.json(result[0])
  })
})

router.post('/book-in', (req, res, next) => {
  db = req.db
  console.log(req.body)
  db.collection('bibo-record').insertOne({
    userId: req.body.userId,
    bookInDateTime: new Date()
  }).then(result => {
    res.json({
      success: true
    })
  })
})

router.post('/book-out', (req, res, next) => {
  db = req.db

  async.waterfall([retrievePreviousRecord, retrieveCollection], (error, result) => {
    if (error) {
      res.json({
        success: false
      })
    } else {
      res.json({
        success: true
      })
    }
  })

  function retrievePreviousRecord (callback) {
    db.collection('bibo-record').find({
      userId: req.body.userId
    }, {
      sort: {
        bookInDateTime: -1
      }
    }).toArray().then(result => {
      // Just need the latest record
      callback(null, result[0])
    })
  }

  function retrieveCollection (record, callback) {
    db.collection('bibo-record').updateOne({
      _id: ObjectId(record._id)
    }, {
      $set: { bookOutDateTime: new Date() }
    }).then(result => {
      callback(null, result)
    })
  }
})

module.exports = router
