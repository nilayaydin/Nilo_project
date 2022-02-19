const express = require('express')

const router = express.Router()
const Product = require('../models/product')

router.get('/', async (req, res) => {
  const query = {}
  if (req.query.name) {
    query.name = req.query.name
  }

  if (req.query.category) {
    query.category = req.query.category
  }

  if (req.query.brand) {
    query.brand = req.query.brand
  }

  if (req.query.price) {
    query.price = req.query.price
  }

  res.send(await Product.find(query))
})

router.post('/', async (req, res) => {
  const createProduct = await Product.create(req.body)

  // eslint-disable-next-line no-console
  console.log('hadi bakalim', createProduct)

  res.send(createProduct)
})

// product/productId/likes this is an endpoint
// const product = product.getbyId(req.body.productID)
// await req.user.likeProduct(product)

module.exports = router
