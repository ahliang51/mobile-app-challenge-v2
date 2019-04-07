'use strict'
// Import
let express = require('express')
let router = express.Router()
let async = require('async')
let config = require('../config/config')
let isAuthenticated = require('../global/global-function')
let request = require('request')

router.post('/retrieve-orders', isAuthenticated, (req, res, next) => {
  let bigCommerce = req.bigCommerce;

  async.waterfall([
    retrieveOrders,
    retrieveProductInfo,
  ], (err, result) => {
    if (err) {
      res.json({
        responseStatus: false,
        error: err
      })
    } else {
      res.json(result)
    }
  });

  function retrieveOrders(callback) {
    //Retrieve CustomerId from middleware
    bigCommerce.get('/orders?include=images&customer_id=' + req.customerId)
      .then(data => {
        callback(null, data);
      })
      .catch(err => {
        if (err) {
          console.log(err)
          callback(err);
        }
      })
  };

  function retrieveProductInfo(orders, callback) {
    async.each(orders, (order, asyncCallback) => {
      console.log(order)

      bigCommerce.get(order.products.resource + "?include=images").then(info => {
        order.products = info
        asyncCallback()
      })
    }, (err) => {
      // console.log(orders)
      if (err) {
        callback(err)
      } else {
        callback(null, orders)
      }
    })

    // for (let order of orders) {
    //   bigCommerce.get(order.products.resource).then(info => {
    //     order.products = info
    //   })
    // }

  }

})

router.post('/retrieve-customer-info', isAuthenticated, (req, res, next) => {
  let bigCommerce = req.bigCommerce;

  async.waterfall([
    retrieveCustomerInfo,
    retrieveShippingInfo,
  ], (err, result) => {
    if (err) {
      res.json({
        responseStatus: false,
        error: err
      })
    } else {
      res.json(result)
    }
  });

  function retrieveCustomerInfo(callback) {
    bigCommerce.get('/customers/' + req.customerId)
      .then(info => {
        callback(null, info)
      })
      .catch(err => {
        if (err) {
          callback(err)
        }
      })
  }

  function retrieveShippingInfo(customerInfo, callback) {
    bigCommerce.get(customerInfo.addresses.resource)
      .then(shippingInfo => {
        customerInfo.addresses = shippingInfo
        callback(null, customerInfo)
      })
      .catch(err => {
        if (err) {
          callback(err)
        }
      })
  }


})

router.post('/teste', (req, res, next) => {
  let bigCommerce = req.bigCommerce;
  bigCommerce.get('/customers/87/addresses')
    .then(data => {
      console.log(data)
      res.json(data)
    })
})

router.get('/retrieve-order', (req, res, next) => {
  let bigCommerce = req.bigCommerce;
  bigCommerce.get('/orders/145/products?include=image')
    .then(data => {
      res.json(data)
    })
})

router.get('/test', (req, res, next) => {
  // let bigCommerce = req.bigCommerce;
  // bigCommerce.get('/storefront/orders/145')
  //   .then(data => {
  //     res.json(data)
  //   })
  console.log(config.storeUrl + "/api/storefront/orders/145")
  request({
    headers: {
      'store_hash': config.store_hash,
      'x-auth-token': config.bigCommerceAccessToken,
      'x-auth-client': config.bigCommerceClientId
    },
    uri: config.storeUrl + "/api/storefront/orders/128"
  }, (error, response, body) => {
    console.log(error)
    console.log(body)
    res.json(response)
  })
})



module.exports = router




// 'use strict';
// //Import
// let express = require('express'),
//     router = express.Router(),
//     bodyParser = require('body-parser'),
//     async = require('async'),
//     config = require('../config/config'),
//     mysql = require('mysql'),
//     _ = require('underscore'),
//     db, jwt, bigCommerce, bigCommerceV3;




// router.post('/retrieve-user-info', (req, res, next) => {
//     //Retrieve JWT
//     jwt = req.jwt;
//     console.log(req.body)

//     //Retrieve bigCommerce Connection
//     bigCommerce = req.bigCommerce;
//     async.waterfall([
//         verifyToken,
//         retrieveUserInfo,
//     ], function (err, result) {
//         if (err) {
//             res.json({
//                 success: false,
//                 error: err
//             })
//         } else {
//             res.json({
//                 success: true,
//                 result: result
//             })
//         }
//     });

//     function verifyToken(callback) {
//         jwt.verify(req.body.jwt, config.jwtSecret, function (err, decoded) {
//             if (err) {
//                 callback(err);
//             } else {
//                 callback(null, decoded);
//             }
//         });
//     };

//     function retrieveUserInfo(result, callback) {
//         console.log(result)
//         bigCommerce.get('/customers/' + result.customerEcommerceId)
//             .then(data => {
//                 callback(null, data)
//             })
//     }
// });

// router.post('/top-up', (req, res, next) => {
//     console.log(req.body)

//     //Initialise Connection
//     let connection = mysql.createConnection({
//         host: config.mySqlHost,
//         user: config.mySqlUser,
//         password: config.mySqlPassword,
//         database: config.mySqlDatabase,
//         port: config.mySqlPort
//     });

//     async.waterfall([
//         connectDatabase,
//         topUp,
//         updateStoreCredit,
//         insertAccessLog
//     ], function (err, result) {
//         if (err) {
//             res.json({
//                 success: false,
//                 error: err
//             })
//         } else {
//             res.json({
//                 success: true,
//                 result: result
//             })
//         }
//     });

//     function connectDatabase(callback) {

//         connection.connect(error => {
//             if (error) {
//                 console.error('error connecting: ' + error.stack);
//                 callback(error)
//             } else {
//                 callback(null, connection)
//             }
//         });
//     }

//     function topUp(connection, callback) {
//         connection.query(`CALL PRO_TOPUP_TRANSACTION(?,?,?)`, [req.body.userInfo.phoneNumber, req.body.userInfo.accessCode, req.body.userInfo.pinNumber], (err, result, fields) => {
//             JSON.stringify(result)
//             let status = JSON.parse(JSON.stringify(result[0][0])).STATUS;
//             let amount = JSON.parse(JSON.stringify(result[0][0])).AMOUNT;
//             console.log(status);
//             if (status == 'GOT THE VOUCHER.') {
//                 callback(null, amount)
//             } else {
//                 callback(status)
//             }
//             // callback(null, status)
//         });
//     }

//     function updateStoreCredit(amount, callback) {

//         console.log(amount)
//         //Retrieve bigCommerce Connection
//         bigCommerce = req.bigCommerce;

//         bigCommerce.get('/customers/' + req.body.userInfo.customerEcommerceId)
//             .then(result => {
//                 bigCommerce.put('/customers/' + req.body.userInfo.customerEcommerceId, {
//                         store_credit: parseFloat(result.store_credit) + parseFloat(amount)
//                     })
//                     .then(updatedResult => {
//                         callback(null, "Successfully top up of $" + amount)
//                     })
//             })
//     }

//     function insertAccessLog(message, callback) {
//         connection.query(`CALL WEB_ACCESS_LOG(?,?,?)`, ["Admin", req.body.userInfo.ipAddress, message + " from " + req.body.userInfo.customerEcommerceId],
//             (err, result, fields) => {
//                 callback(message)
//             })
//     }
// })


// router.post('/order-history', (req, res, next) => {
//     //Retrieve bigCommerce Connection
//     bigCommerce = req.bigCommerce;

//     async.waterfall([
//         retrieveOrders,
//         retrieveProductInformation
//     ], function (err, result) {
//         if (err) {
//             res.json({
//                 success: false,
//                 message: err
//             })
//         } else {
//             res.json({
//                 success: true,
//                 result: result
//             })
//         }
//     });

//     function retrieveOrders(callback) {
//         bigCommerce.get('/orders?customer_id=' + req.body.customerEcommerceId).then(data => {
//             callback(null, data)
//         })
//     }


//     function retrieveProductInformation(result, callback) {
//         // console.log(result)
//         let orderInfo = result;
//         let callbackArray = [];
//         let productInfoArray = [];
//         let resultArray = [];

//         async.each(orderInfo,
//             function retrieveInfo(order, callback) {
//                 bigCommerce.get(order.products.resource)
//                     .then(data => {
//                         data.date_created = order.date_created;
//                         data.total = order.subtotal_inc_tax;
//                         callbackArray.push(data)
//                         callback()
//                     });
//             }, err => {

//                 // assuming openFiles is an array of file names
//                 async.each(callbackArray, function (orderArray, callback) {
//                     async.each(orderArray, function (order, callback) {
//                         bigCommerce.get('/products/' + order.product_id + '?include=@summary')
//                             .then(product => {
//                                 let temp = {
//                                     order_id: order.order_id,
//                                     name: order.name,
//                                     quantity: order.quantity,
//                                     date_created: orderArray.date_created,
//                                     total: orderArray.total,
//                                     imageUrl: product.primary_image.standard_url,
//                                     price: product.calculated_price
//                                 }
//                                 productInfoArray.push(temp)
//                                 callback();
//                             })
//                     }, function (err) {
//                         callback();
//                     });
//                 }, function (err) {
//                     if (productInfoArray.length > 0) {
//                         //Group by Order Id
//                         result = _.groupBy(productInfoArray, 'order_id');
//                     }
//                     console.log(result)
//                     callback(null, result)
//                 });
//                 // for (let orderArray of callbackArray) {
//                 //     for (let order of orderArray) {
//                 //         let temp = {
//                 //             order_id: order.order_id,
//                 //             name: order.name,
//                 //             quantity: order.quantity,
//                 //             date_created: orderArray.date_created,
//                 //             total: orderArray.total
//                 //         }
//                 //         productInfoArray.push(temp)
//                 //     }
//                 // }
//                 // if (productInfoArray.length > 0) {
//                 //     //Group by Order Id
//                 //     result = _.groupBy(productInfoArray, 'order_id');
//                 // }
//                 // callback(null, result)
//             });
//     }


// });
// module.exports = router;