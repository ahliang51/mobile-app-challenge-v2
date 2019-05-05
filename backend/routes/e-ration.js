'use strict'
// Import
let express = require('express')
let router = express.Router()
let db

// Writing for sign up
router.post('/submit-ration', (req, res, next) => {
  db = req.db
  db.collection('rations').save(req.body).then(result => {
    res.json({
      success: true
    })
  })
})

router.post('/check-ration-submitted', (req, res, next) => {
  db = req.db
  db.collection('rations').findOne({
    userId: req.body.userId,
    weekNumber: req.body.weekNumber
  }).then(result => {
    if (result) {
      res.json({
        success: true
      })
    } else {
      res.json({
        success: false
      })
    }
  })
})

module.exports = router
