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
  const { orderItems, product } = req.body

  const createdOrder = await Order.create({ orderItems, amount: 0 })

  // eslint-disable-next-line no-underscore-dangle

  const order = await Order.findById(createdOrder._id)
  const getProduct = await Product.findById(product._id)

  await order.addProduct(getProduct)
  await order.calculateAmount()

  res.send(order)
})

module.exports = router
