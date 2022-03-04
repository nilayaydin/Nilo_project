const express = require('express')

const router = express.Router()
const Order = require('../models/order')

router.get('/', async (req, res) => {
  const orders = await Order.find() // change the line 10th to this
  // const orders = await Order.find({})

  res.send(orders)
})

router.get('/:orderId', async (req, res) => {
  const order = await Order.findById(req.params.orderId)

  if (order) res.send(order)
  else res.sendStatus(404)
})

// eslint-disable-next-line consistent-return
router.post('/', async (req, res) => {
  const { orderItems } = req.body

  if (!req.user) {
    return res.send(403)
  }

  // eslint-disable-next-line no-console
  console.log('looking for orderItems', orderItems)

  // eslint-disable-next-line no-underscore-dangle
  const userId = req.user._id

  // eslint-disable-next-line no-console
  console.log('trying to find userId', userId)

  const createdOrder = await Order.create({ orderItems, userId, amount: 0 })

  // eslint-disable-next-line no-underscore-dangle
  const order = await Order.findById(createdOrder._id)
  // const user = await User.findById(userId)

  await order.calculateAmount()
  await req.user.addOrder(order)
  //  await user.addOrder(order)

  res.send(order)
})

module.exports = router
