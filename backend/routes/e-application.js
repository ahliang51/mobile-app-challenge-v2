'use strict'
// Import
let express = require('express')
let router = express.Router()
let ObjectId = require('mongodb').ObjectId
let async = require('async')
let db

// Writing for sign up
router.post('/retrieve-personnel', (req, res, next) => {
  db = req.db

  async.waterfall([retrieveUserInfo, retrieveCommanders], (error, commanders) => {
    if (error) {
      res.json(error)
    }
    else {
      res.json(commanders)
    }
  })

  function retrieveUserInfo(callback) {
    db.collection('users').findOne({
      _id: ObjectId(req.body.userId)
    }).then(result => {
      callback(null, {
        unit: result.unit,
        company: result.company
      })
    })
  }

  function retrieveCommanders(userInfo, callback) {
    db.collection('users').find({
      unit: userInfo.unit,
      company: userInfo.company,
      appointment: req.body.appointment
    }).toArray().then(result => {
      callback(null, result)
    })
  }
})

router.post('/retrieve-off-balance', (req, res, next) => {
  db = req.db
  db.collection('users').findOne({
    _id: ObjectId(req.body.userId)
  }).then(result => {
    res.json(result)
  })
})

module.exports = router