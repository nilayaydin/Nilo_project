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
  await User.remove({})
  await Order.remove({})
  await Product.remove({})

  const neyzen = await User.create({ name: 'Neyzen', age: 30, email: 'neyzen@coyotiv.com' })
  await neyzen.setPassword('test')

  const funda = await User.create({ name: 'Funda', age: 25, email: 'funda@coyotiv.com' })
  await funda.setPassword('test')

  const serkan = await User.create({ name: 'Serkan', age: 23, email: 'serkan@coyotiv.com' })
  await serkan.setPassword('test')

  neyzen.addAddress('Fikirtepe')
  funda.addAddress('Bostanli')
  serkan.addAddress('Bulgaristan')

  console.log('we are here')

  const burger = await Product.create({ name: 'Vegan burger', category: 'food', brand: 'veggie', price: 20 })
  const veganPizza = await Product.create({ name: 'pizza', category: 'food', brand: 'aysebrand', price: 30 })
  const pinkShirt = await Product.create({ name: 'Pink Shirt', category: 'clothing', brand: 'zara', price: 100 })

  console.log('neyzeni ariyorum', neyzen)
  console.log('serkani ariyorum', funda)

  const burgerOrder = await Order.create({
    orderItems: [{ item: burger, quantity: 5 }],
    userId: neyzen._id,
    amount: 0,
  })
  // const order1 = await Order.create({
  //   orderItems: [{ item: pinkShirt, quantity: 10 }],
  //   userId: funda,
  //   amount: 0,
  // })

  // const order2 = await Order.create({
  //   // eslint-disable-next-line no-underscore-dangle
  //   orderItems: [{ item: veganPizza, quantity: 2 }],
  //   userId: serkan,
  //   amount: 0,
  // })

  // await order1.addProduct(veganPizza, 5)
  // await burgerOrder.addProduct(pinkShirt, 2)
  // await order2.addProduct(burger, 8)

  // await order1.calculateAmount()
  await burgerOrder.calculateAmount()
  // await order2.calculateAmount()

  await neyzen.addOrder(burgerOrder) // look at the mongoose post create so that I don't have to remember every user that order has.
  // await funda.addOrder(order1)
  // await serkan.addOrder(order2)

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

// router.get('/:likes', async (req, res) => {
//   const user = await User.findById(req.params.userId)
//   const product = await Product.findById(req.params.productId)

//   await user.likeProduct(product)
//   res.sendStatus(200)
// })

router.get('/:userId/addresses', async (req, res) => {
  const user = await User.findById(req.params.userId)
  console.log('hi stephen', req.params.userId)

  const { addresses } = user // - this is const addresses = user.addresses but mongoose prefers this structure.
  // const addresses = await user.getAddresses() // I created a method in user.js for this function
  res.send(addresses)
})

// router.get('/:orders', async (req, res) => {
//   const user = await User.findById(req.params.userId)
//   const order = await Order.findById(req.params.orderId)

//   await user.addOrder(order)
//   res.sendStatus(200)
// })

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

// router.post('/:userId/addresses', async (req, res) => {
//   const user = await User.findById(req.params.userId)

//   await user.addAddress(req.user.addresses) // - Bunu sor
//   res.sendStatus(200)
// })

// router.post('/:orders', async (req, res) => {
//   const user = await User.findById(req.params.userId)
//   const order = await Order.findById(req.params.orderId)

//   await user.addOrder(order)
//   res.sendStatus(200)
// })

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
