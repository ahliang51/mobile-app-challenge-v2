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
    } else {
      res.json(commanders)
    }
  })

  function retrieveUserInfo (callback) {
    db.collection('users').findOne({
      _id: ObjectId(req.body.userId)
    }).then(result => {
      callback(null, {
        unit: result.unit,
        company: result.company
      })
    })
  }

  function retrieveCommanders (userInfo, callback) {
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

router.post('/update-off-balance', (req, res, next) => {
  db = req.db
  db.collection('users').updateOne({ _id: ObjectId(req.body.userId) }, {
    $inc: {
      offBalance: parseFloat(req.body.numberOfOff)
    }
  }).then(result => {
    res.json({
      success: true
    })
  })
})

router.post('/apply-off', (req, res, next) => {
  db = req.db
  async.series([insertPendingOff, updateOffBalance], (error, results) => {
    if (error) {
      res.json(error)
    } else {
      res.json({
        success: true
      })
    }
  })

  function insertPendingOff (callback) {
    req.body.approvalStatus = false
    console.log(req.body)
    db.collection('e-application-record').insertOne(req.body).then(result => {
      // callback(null, '')
    })
  }

  function updateOffBalance (callback) {
    db.collection('users').updateOne({ _id: ObjectId(req.body.applicantId) }, {
      $inc: {
        offBalance: -(parseFloat(req.body.numberOfDays)),
        pendingOffBalance: parseFloat(req.body.numberOfDays)
      }
    }).then(result => {
      callback(null, '')
    })
  }
})

router.post('/retrieve-pending-off', (req, res, next) => {
  db = req.db

  async.waterfall([retrievePersonnel, retrievePersonnelInformation], (error, result) => {
    if (error) {
      res.json(error)
    } else {
      res.json(result)
    }
  })

  function retrievePersonnel (callback) {
    db.collection('e-application-record').find({
      approvingCommander: req.body.userId,
      approvalStatus: false
    }).toArray().then(result => {
      callback(null, result)
    })
  }

  function retrievePersonnelInformation (personnelArray, callback) {
    async.each(personnelArray, (personnel, callback) => {
      db.collection('users').findOne({ _id: ObjectId(personnel.applicantId) }).then(info => {
        personnel.name = info.rank + ' ' + info.firstName
        callback()
      })
    }, (error) => {
      if (error) {
        callback(error)
      } else {
        callback(personnelArray)
      }
    })
  }
})

router.post('/approve-off', (req, res, next) => {
  db = req.db
  async.waterfall([approveOff, updatePending], (error, result) => {
    if (error) {
      res.json(error)
    } else {
      res.json({
        success: true
      })
    }
  })

  function approveOff (callback) {
    db.collection('e-application-record').updateOne({ _id: ObjectId(req.body.document._id) }, {
      $set: {
        approvalStatus: true
      }
    })
      .then(result => {
        callback(null, result)
      })
  }

  function updatePending (result, callback) {
    db.collection('users').updateOne({ _id: ObjectId(req.body.document.applicantId) }, {
      $inc: {
        pendingOffBalance: -(parseFloat(req.body.document.numberOfDays))
      }
    })
      .then(result => {
        callback(null, result)
      })
  }
})

module.exports = router
