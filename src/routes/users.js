/* eslint-disable no-console */
const express = require('express')

const router = express.Router()

const Order = require('../models/Order')
const User = require('../models/User')
const Product = require('../models/Product')
// const OrderItem = require('../models/OrderItem')

const neyzen = new User('neyzen', 30)
const burger = new Product('Vegan burger', 'food', 'veggie', 20)
const veganPizza = new Product('pizza', 'food', 'aysebrand', 30)
const order1 = new Order()

// order1.addProduct(burgerOrder)
order1.addProduct(burger, 2)
order1.addProduct(veganPizza)

// console.log(order1.calculateAmount())

// console.log(order1.orderItems)

neyzen.likeProduct(veganPizza)

// console.log(neyzen)
// console.log(burgerOrder)

neyzen.likeProduct(burger)
// console.log(neyzen)

// console.log(order1.item.length)

const users = [neyzen]
/* GET users listing. */
router.get('/', (req, res) => {
  let result = users

  if (req.query.name) {
    result = users.filter(user => user.name == req.query.name)
  }

  res.send(result)
})

router.get('/:userId', (req, res) => {
  const user = users[req.params.userId]

  if (user) res.render('user', { user })
  else res.sendStatus(404)
})

module.exports = router
