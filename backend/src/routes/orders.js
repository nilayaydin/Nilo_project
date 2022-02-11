const express = require('express')

const router = express.Router()
const Order = require('../models/Order')

router.get('/', async (req, res) => {
  const orders = await Order.find()

  res.send(orders)
})

router.post('/', async (req, res) => {
  const createdOrder = await Order.create(req.body)
  res.send(createdOrder)
})

module.exports = router
