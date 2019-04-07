'use strict'
// Import
let express = require('express')
let router = express.Router()
let config = require('../config/config')
let bigCommerce
let bigCommerceV3

router.get('/retrieve-all-products', (req, res, next) => {
  bigCommerceV3 = req.bigCommerceV3
  bigCommerceV3.get('/catalog/products?include=images')
    .then(productArray => {
      res.json({
        responseStatus: true,
        result: productArray
      })
    })
    .catch(err => {
      res.json({
        responseStatus: false,
        error: err
      })
    })
})

router.post('/product-detail', (req, res, next) => {
  bigCommerceV3 = req.bigCommerceV3
  // console.log(req.body.productId)
  bigCommerceV3.get('/catalog/products/' + req.body.productId + '?include=images,variants')
    .then(productDetail => {
      res.json({
        responseStatus: true,
        result: productDetail
      })
    })
    .catch(err => {
      res.json({
        responseStatus: false,
        error: err
      })
    })
})

router.get('/promo-categories', (req, res, next) => {
  let productCategoriesArray = [];
  bigCommerce = req.bigCommerce;
  bigCommerce.get('/categories')
    .then(data => {
      for (let temp of data) {
        if (temp.search_keywords.length > 0) {
          productCategoriesArray.push(temp)
        }
        temp.image_file = config.storeImagePath + temp.image_file;
      }
      res.json(productCategoriesArray)
    })
    .catch(err => {
      res.json({
        responseStatus: false,
        error: err
      })
    })
});

router.get('/product-categories', (req, res, next) => {
  let productCategoriesArray = [];
  bigCommerce = req.bigCommerce;
  bigCommerce.get('/categories')
    .then(data => {
      for (let temp of data) {
        if (temp.search_keywords.length == 0) {
          productCategoriesArray.push(temp)
          temp.image_file = config.storeImagePath + temp.image_file;
        }
      }
      res.json(productCategoriesArray)
    })
    .catch(err => {
      res.json({
        responseStatus: false,
        error: err
      })
    })
});

router.post('/filter-product-by-categories', (req, res, next) => {
  bigCommerceV3 = req.bigCommerceV3;
  // console.log(req.body.categoryId)
  bigCommerceV3.get('/catalog/products?include=images&categories:in=' + req.body.categoryId)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json({
        responseStatus: false,
        error: err
      })
    })
});



router.post('/test', (req, res, next) => {
  bigCommerceV3 = req.bigCommerceV3
  bigCommerceV3.get('/catalog/products/143?include=images,variants')
    .then(productDetail => {
      res.json({
        responseStatus: true,
        result: productDetail
      })
    })
    .catch(err => {
      res.json({
        responseStatus: false,
        error: err
      })
    })
})

module.exports = router