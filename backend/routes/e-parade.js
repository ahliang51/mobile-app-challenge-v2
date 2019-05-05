'use strict'
// Import
let express = require('express')
let router = express.Router()
let async = require('async')
let ObjectId = require('mongodb').ObjectId
let db

// Writing for sign up
router.post('/retrieve-parade-state', (req, res, next) => {
  db = req.db
  async.waterfall([retrieveRecord, retrievePersonnel], (error, result) => {
    if (error) {
      res.json(error)
    } else {
      res.json(result)
    }
  })

  function retrieveRecord(callback) {
    db.collection('e-application-record').find({
      startDate: {
        $gte: new Date(req.body.date).toISOString()
      }
    }).toArray().then(result => {
      callback(null, result)
    })
  }

  function retrievePersonnel(result, callback) {
    let tempArray = []
    async.eachSeries(result, (record, callback) => {
      db.collection('users').findOne({
        _id: ObjectId(record.applicantId)
      }).then(userInfo => {
        record.name = userInfo.rank + ' ' + userInfo.firstName
        tempArray.push(record)
        callback()
      })
    }, (error) => {
      if (error) {
        callback(error)
      } else {
        callback(null, tempArray)
      }
    })
  }

  // db.collection('users').save(req.body).then(result => {
  //   res.json({
  //     success: true
  //   })
  // })
})

module.exports = router
