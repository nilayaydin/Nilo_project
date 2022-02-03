/* eslint-disable no-console */
const express = require('express')

const router = express.Router()

// const Order = require('../models/order')
const User = require('../models/user')
const Product = require('../models/product')
const Order = require('../models/order')

/* GET users listing. */

// router.get('/', (req, res) => {
//   let result = users
//   if (req.query.name) {
//     result = users.filter(user => user.name == req.query.name)
//   }

//   res.send(result)
// }) You would search the users by the name

router.get('/', async (req, res) => {
  const query = {}
  if (req.query.name) {
    query.name = req.query.name
  }

  if (req.query.age) {
    query.age = req.query.age
  }

  res.send(await User.find(query))
})

router.get('/initialize', async (req, res) => {
  const neyzen = new User({ name: 'Neyzen', age: 30, email: 'neyzen@coyotiv.com' })
  await neyzen.setPassword('test')

  const funda = new User({ name: 'Funda', age: 25, email: 'funda@coyotiv.com' })
  await funda.setPassword('test')

  const serkan = new User({ name: 'Serkan', age: 23, email: 'serkan@coyotiv.com' })
  await serkan.setPassword('test')

  neyzen.addresses = 'Fikirtepe'
  funda.addresses = 'Bostanli'
  serkan.addresses = 'Bulgaristan'

  const burger = await Product.create({ name: 'Vegan burger', category: 'food', brand: 'veggie', price: 20 })
  const veganPizza = await Product.create({ name: 'pizza', category: 'food', brand: 'aysebrand', price: 30 })
  const pinkShirt = await Product.create({ name: 'Pink Shirt', category: 'clothing', brand: 'zara', price: 100 })

  const burgerOrder = await Order.create({ orderItems: [], quantity: [], amount: 0 })
  const order1 = await Order.create({ orderItems: [], quantity: [], amount: 0 })
  const order2 = await Order.create({ orderItems: [], quantity: [], amount: 0 })

  await order1.addProduct(veganPizza, 5)
  await order1.addProduct(pinkShirt, 3)
  await burgerOrder.addProduct(burger, 2)
  await order2.addProduct(pinkShirt, 8)

  await order1.calculateAmount()
  await burgerOrder.calculateAmount()
  await order2.calculateAmount()
  console.log(burgerOrder)
  console.log(order1)
  console.log(order2)

  await neyzen.addOrder(burgerOrder)
  await funda.addOrder(order1)
  await serkan.addOrder(order2)

  //

  // const finalBurgerOrder = await Order.create({ orderItems: burgerOrder })

  // await finalBurgerOrder.addProduct(burgerOrder)

  // await neyzen.addOrder(burgerOrder) // Burda product ekliyorsun ama order eklemen lazim!!!!
  // await serkan.addOrder(veganPizza)
  // await funda.addOrder(pinkShirt)

  await funda.likeProduct(burger)
  await neyzen.likeProduct(veganPizza)
  await serkan.likeProduct(pinkShirt)

  await neyzen.save()
  await funda.save()
  await serkan.save()

  res.sendStatus(200)
})

router.get('/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId)

  if (user) res.send(user)
  else res.sendStatus(404)
})

/* POST create a user */
// router.post('/', async (req, res) => {
//   const createdUser = await User.create(req.body)
//   res.send(createdUser)
// })
// The code below does the same thing but it is more secure. You can add address or any other properties in the instance but you can't in the second one.

router.post('/', async (req, res) => {
  const userToCreate = {
    name: req.body.name,
    age: req.body.age,
  }

  const createdUser = await User.create(userToCreate)
  res.send(createdUser)
})

router.post('/:userId/likes', async (req, res) => {
  const user = await User.findById(req.params.userId)
  const product = await Product.findById(req.body.productId)

  await user.likeProduct(product)
  res.sendStatus(200)
})

// router.get('/:userId', (req, res) => {
//   res.send(users[req.params.userId])

//   // const user = users[req.params.userId]
//   // if (user) res.render('user', { user })
//   // else res.sendStatus(404)
// })

/* UPDATE users listing. */

// router.patch('/:userId', async (req, res) => {
//   const user = await User.findByNameAndUpdate(req.params.name, { name: req.body.name })
//   res.send(user)
// })

/* ADD new users */

// router.post('/', async (req, res) => {
//   const { name, age } = req.body

//   if (!name || !age) {
//     res
//       .send({
//         message: 'Missing fields.',
//       })
//       .status(400)
//     return
//   }

//   // const user = await User.create({
//   //   name,
//   //   age,
//   // })
//   const newUser = new User(name, age)
//   users.push(newUser)

//   res.send(newUser)
// })

/* DELETE users */

// router.delete('/:id', async (req, res) => {
//   await User.findByIdAndDelete(req.params.id)

//   res.sendStatus(200)
// })

module.exports = router
