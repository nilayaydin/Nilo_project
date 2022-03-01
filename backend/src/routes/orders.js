const express = require('express')

const router = express.Router()
const Order = require('../models/order')
const User = require('../models/user')
const Product = require('../models/product')

router.get('/', async (req, res) => {
  const orders = await Order.find({}) // change the line 10th to this
  // const orders = await Order.find({})

  res.send(orders)
})

router.post('/', async (req, res) => {
  const { orderItems } = req.body

  console.log('looking for orderItems', orderItems)

  const userId = req.user._id
  console.log('trying to find userId', userId)

  const createdOrder = await Order.create({ orderItems, userId, amount: 0 })

  // eslint-disable-next-line no-underscore-dangle

  const order = await Order.findById(createdOrder._id)

  await order.calculateAmount()
  await req.user.addOrder(order)

  res.send(order)
})

module.exports = router
