const express = require('express')

const router = express.Router()
const Order = require('../models/order')
const User = require('../models/user')
// const Product = require('../models/product')

router.get('/', async (req, res) => {
  const orders = await Order.find({}) // change the line 10th to this
  // const orders = await Order.find({})

  res.send(orders)
})

// eslint-disable-next-line consistent-return
router.post('/', async (req, res) => {
  const { orderItems, userId } = req.body

  if (!userId) {
    return res.send(403)
  }

  // eslint-disable-next-line no-console
  console.log('looking for orderItems', orderItems)

  // const userId = req.user._id
  // eslint-disable-next-line no-console
  console.log('trying to find userId', userId)

  const createdOrder = await Order.create({ orderItems, userId, amount: 0 })

  // eslint-disable-next-line no-underscore-dangle

  // eslint-disable-next-line no-underscore-dangle
  const order = await Order.findById(createdOrder._id)
  const user = await User.findById(userId)

  await order.calculateAmount()
  // await req.user.addOrder(order)
  await user.addOrder(order)

  res.send(order)
})

module.exports = router
