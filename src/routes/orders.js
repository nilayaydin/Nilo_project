const express = require('express')

const router = express.Router()
const Order = require('../models/Order')

router.get('/', async (req, res) => {
  const orders = await Order.find()

  res.send(orders)
})

module.exports = router
