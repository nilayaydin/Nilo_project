const express = require('express')

const router = express.Router()
const Order = require('../models/order')
const User = require('../models/user')

router.get('/', async (req, res) => {
  const orders = await Order.find()

  res.send(orders)
})

// router.post('/', async (req, res) => {
//   const { orderItems } = req.body
//   const userId = await User.findById(req.params.userId)

//   // eslint-disable-next-line no-underscore-dangle
//   // const userId = req.user._id
//   const createdOrder = new Order({ userId, orderItems })

//   await createdOrder.calculateAmount()

//   res.send(createdOrder)
// })

module.exports = router
