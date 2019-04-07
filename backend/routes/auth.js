'use strict'
// Import
let express = require('express')
let router = express.Router()
let async = require('async')
let config = require('../config/config')
// db, jwt, bigCommerce, bigCommerceV3;

// Writing for sign up
router.post('/sign-up', (req, res, next) => {
  let bigCommerce = req.bigCommerce
  let jwt = req.jwt;

  async.waterfall([
    checkEmailExist,
    createUser,
    generateToken
  ], function (err, result) {
    if (err) {
      res.json({
        responseStatus: false,
        error: err
      })
    } else {
      res.json({
        responseStatus: true,
        token: result
      })
    }
  });

  function checkEmailExist(callback) {
    bigCommerce.get('/customers?email=' + req.body.email)
      .then(customerInfo => {
        if (customerInfo) {
          callback("Email exist already")
        } else {
          callback(null, "")
        }
      })
      .catch(err => {
        callback(err)
      })
  }

  function createUser(result, callback) {
    bigCommerce.post('/customers', {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        phone: req.body.phoneNumber,
        _authentication: {
          password: req.body.password,
          password_confirmation: req.body.confirmPassword
        }
      }).then(customerInfo => {
        console.log(customerInfo)
        callback(null, customerInfo)
      })
      .catch(err => {
        if (err)
          callback(err)
      })
  }

  function generateToken(customerInfo, callback) {
    jwt.sign({
      customerId: customerInfo.id
    }, config.jwtSecret, function (err, token) {
      if (err) {
        callback(err)
      } else {
        callback(null, token)
      }
    })
  }
})

router.post('/login', (req, res, next) => {
  let bigCommerce = req.bigCommerce
  let jwt = req.jwt

  async.waterfall([
    checkEmailExist,
    checkPassword,
    generateToken
  ], function (err, result) {
    if (err) {
      res.json({
        responseStatus: false,
        error: err
      })
    } else {
      res.json({
        responseStatus: true,
        token: result
      })
    }
  })

  function checkEmailExist(callback) {
    bigCommerce.get('/customers?email=' + req.body.email)
      .then(customerInfo => {
        if (customerInfo) {
          console.log(customerInfo)
          callback(null, customerInfo)
        } else {
          callback("There are no such email!")
        }
      })
      .catch(err => {
        console.log(err)
        callback(err)
      })
  }

  function checkPassword(customerInfo, callback) {
    bigCommerce.post('/customers/' + customerInfo[0].id + "/validate", {
        "password": req.body.password
      })
      .then(result => {
        if (result.success) {
          callback(null, customerInfo)
        } else {
          callback("Password is wrong")
        }
        console.log(result)
      })
  }

  function generateToken(customerInfo, callback) {
    console.log(customerInfo)
    jwt.sign({
      customerId: customerInfo[0].id
    }, config.jwtSecret, function (err, token) {
      if (err) {
        callback(err)
      } else {
        callback(null, token)
      }
    })
  }
})

router.post('/authenticated', (req, res, next) => {
  let jwt = req.jwt
  jwt.verify(req.body.token, config.jwtSecret, function (err, decoded) {
    console.log(err)
    if (err) {
      return false
    }
  });
})
// // 1) Query MongoDB for such facebookID
// router.post('/check-user-exist', (req, res, next) => {

//     //Retrieve Database Connection
//     db = req.db;

//     db.collection('users').findOne({
//         facebookId: req.body.facebookId
//     }).then(result => {
//         if (result) {
//             res.json({
//                 userExist: true,
//                 userId: result.customerEcommerceId
//             })
//         } else {
//             res.json({
//                 userExist: false
//             })
//         }
//     })

//     // //Retrieve bigCommerce Connection
//     // bigCommerce = req.bigCommerce;

//     // let email = req.body.email ? req.body.email : "sample@sample.com";
//     // let phoneNumber = req.body.phoneNumber;

//     // console.log(phoneNumber);

//     // async.waterfall([
//     //     checkEmail,
//     //     checkPhoneNumber
//     // ], function (err, result) {
//     //     if (err) {
//     //         res.json({
//     //             userExist: true
//     //         })
//     //     } else {
//     //         if (typeof (result) === "boolean") {
//     //             res.json({
//     //                 userExist: result
//     //             })
//     //         } else {
//     //             res.json({
//     //                 userExist: true,
//     //                 userId: result
//     //             })
//     //         }

//     //     }
//     // });

//     // function checkEmail(callback) {
//     //     bigCommerce.get('/customers?email=' + email)
//     //         .then(data => {
//     //             if (data) {
//     //                 console.log(data)
//     //                 // There is such email
//     //                 callback(null, data[0].id)
//     //                 // res.json({
//     //                 //     userId: data[0].id,
//     //                 //     userExist: true
//     //                 // })
//     //             }
//     //             // There is no such email
//     //             else {
//     //                 callback(null, false)
//     //                 // res.json({
//     //                 //     userExist: false
//     //                 // })
//     //             }
//     //         })

//     // }

//     // function checkPhoneNumber(result, callback) {
//     //     bigCommerce.get('/customers?phone=' + phoneNumber)
//     //         .then(data => {
//     //             if (data) {
//     //                 // There is such number
//     //                 callback(null, data[0].id)
//     //             }
//     //             // There is no such email
//     //             else {
//     //                 callback(null, false)
//     //                 // res.json({
//     //                 //     userExist: false
//     //                 // })
//     //             }
//     //         })

//     // }

// });

// router.post('/update-user-mobile', (req, res, next) => {

//     //Retrieve Database Connection
//     db = req.db;

//     //Retrieve JWT
//     jwt = req.jwt;

//     //Retrieve bigCommerce Connection
//     bigCommerce = req.bigCommerce;

//     async.waterfall([
//         checkPhoneNumberExist,
//         updateEcommerce,
//         updateMongo,
//         generateToken
//     ], function (err, result) {
//         console.log(err)
//         console.log(result)
//         if (err) {
//             res.json({
//                 success: false,
//                 message: "Phone number has been registered with another facebook id. Please use the correct phone number"
//             })
//         } else {
//             res.json({
//                 success: true,
//                 token: result
//             })
//         }
//     });

//     function checkPhoneNumberExist(callback) {
//         db.collection('users').findOne({
//             phoneNumber: req.body.phoneNumber
//         }).then(result => {
//             console.log(req.body)
//             console.log("check " + JSON.stringify(result))
//             //Number Exist
//             if (result) {
//                 if (result.customerEcommerceId == req.body.userId) {
//                     callback(null, result)
//                 } else {
//                     callback("Phone number has been registered")
//                 }
//                 // if (result.customerEcommerceId == req.body.userId && req.body.phoneNumber == result.phoneNumber) {
//                 //     callback(null, result)
//                 // } else {
//                 //     callback("Phone number has been registered")
//                 // }
//             }
//             // Number does not exist
//             else {
//                 callback(null, result)
//             }
//         })
//     }

//     function updateEcommerce(result, callback) {
//         console.log(req.body.userId)
//         bigCommerce.put('/customers/' + req.body.userId, {
//                 phone: req.body.phoneNumber
//             })
//             .then(result => {
//                 callback(null, result)
//             })
//         // .catch(err => console.log(err), callback(true))
//     }

//     function updateMongo(result, callback) {
//         db.collection('users').update({
//                 customerEcommerceId: req.body.userId
//             }, {
//                 $set: {
//                     phoneNumber: req.body.phoneNumber
//                 }
//             })
//             .then(result => {
//                 callback(null, result)
//             })
//         // .catch(err => console.log(err), callback(true))
//     }

//     function generateToken(result, callback) {
//         jwt.sign({
//             customerEcommerceId: req.body.userId
//         }, config.jwtSecret, {
//             expiresIn: '7d'
//         }, function (err, token) {
//             if (err)
//                 callback(true)
//             else
//                 callback(null, token)
//         })
//     }
// })

// router.post('/test', (req, res, next) => {

//     bigCommerce = req.bigCommerce;

//     bigCommerce.post('/customers', {
//         first_name: "req.body.name",
//         last_name: " ",
//         notes: "accessCode",
//         email: "asd@asd.com",
//         phone: "req.body.phoneNumber"
//     }).then(data => {
//         // console.log(data)

//         bigCommerce.post(data.addresses.resource, {
//             first_name: "asd",
//             last_name: " ",
//             phone: " ",
//             street_1: " ",
//             city: " ",
//             state: " ",
//             zip: ' ',
//             country: "Singapore"
//         }).then(result => {
//             console.log(result)
//             res.json(result)
//         })
//         // res.json(data)

//     })
// });

module.exports = router