'use strict'
// Import
let express = require('express')
let router = express.Router()
let async = require('async')
let config = require('../config/config')

router.get('/contact-us', (req, res, next) => {
 let bigCommerce = req.bigCommerce;
 bigCommerce.get('/pages').then(pages => {
  for (let page of pages) {
   if (page.name.includes("Contact")) {
    console.log(page)
    res.json({
     responseStatus: false,
     page: page
    })
   }
  }
 }).catch(err => {
  console.log(err)
  if (err) {
   res.json({
    responseStatus: false,
    error: "No Such Page"
   })
  }
 })
})

router.get('/currency', (req, res, next) => {
 let bigCommerce = req.bigCommerce;
})

router.get('/sizing', (req, res, next) => {
 let bigCommerce = req.bigCommerce;
 bigCommerce.get('/pages').then(pages => {
  console.log(pages)
  for (let page of pages) {
   if (page.name.includes("Sizing")) {
    console.log(page)
    res.json({
     responseStatus: false,
     page: page
    })
   }
  }
 }).catch(err => {
  console.log(err)
  if (err) {
   res.json({
    responseStatus: false,
    error: "No Such Page"
   })
  }
 })
})

router.get('/banner', (req, res, next) => {
 let bigCommerce = req.bigCommerce;
 bigCommerce.get('/banners')
  .then(data => res.json(data));
});

module.exports = router