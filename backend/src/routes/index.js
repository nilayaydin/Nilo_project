/* eslint-disable func-names */
const express = require('express')
const User = require('../models/user')
// eslint-disable-next-line no-unused-vars
const Order = require('../models/order')
// eslint-disable-next-line no-unused-vars
const Product = require('../models/product')

// const init = async () => {
//   try {
//     const furkan = await User.create({ name: 'furkan', age: 25 })
//     const veganBurger = await Product.create({ name: 'vegan burger', category: 'food', brand: 'veggie', price: 40 })

//     const order1 = await Order.create({})
//     await order1.addProduct(veganBurger, 2)

//     await furkan.addOrder(order1)
//   } catch (e) {
//     console.log('error!', e)
//   }
// }
// init()

const router = express.Router()

/* GET home page. */
// eslint-disable-next-line no-unused-vars
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' }) // this index indicates pug file index
})

// eslint-disable-next-line no-unused-vars
router.get('/profile/:userId', async (req, res, next) => {
  const user = await User.findById(req.params.userId)

  res.render('profile', { user })
})

// router.get('/:userId', (req, res) => {
//  res.send(users[req.params.userId])

//   // const user = users[req.params.userId]
//   // if (user) res.render('user', { user })
//   // else res.sendStatus(404)
// })

module.exports = router
