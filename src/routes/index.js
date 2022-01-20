/* eslint-disable func-names */
const express = require('express')
const User = require('../models/User')
const Order = require('../models/Order')
const Product = require('../models/Product')

const furkan = new User('furkan', 25)
const veganBurger = new Product('vegan burger', 'food', 'veggie', 40)

const order1 = new Order()
order1.addProduct(veganBurger, 2)

furkan.addOrder(order1)

const router = express.Router()

/* GET home page. */
// eslint-disable-next-line no-unused-vars
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' }) // this index indicates pug file index
})

// eslint-disable-next-line no-unused-vars
router.get('/profile', (req, res, next) => {
  res.render('profile', { user: furkan })
})

module.exports = router
