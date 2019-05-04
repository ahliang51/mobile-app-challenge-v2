'use strict'
// Import
let express = require('express')
let router = express.Router()
let db

// Writing for sign up
router.post('/sign-up', (req, res, next) => {
  db = req.db
  db.collection('users').save(req.body).then(result => {
    res.json({
      success: true
    })
  })
})

router.post('/login', (req, res, next) => {
  db = req.db
  db.collection('users').findOne({
    userName: req.body.username
  }).then(result => {
    if (result.password === req.body.password) {
      res.json({
        success: true,
        userId: result._id,
        appointment: result.appointment
      })
    } else {
      res.json({
        sucess: false,
        error: 'Incorrect credentials'
      })
    }
  })
})

module.exports = router