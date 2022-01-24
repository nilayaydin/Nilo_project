/* eslint-disable no-console */
const express = require('express')

const router = express.Router()

// onst Order = require('../models/Order')
const User = require('../models/User')
// const Product = require('../models/Product')
// const OrderItem = require('../models/OrderItem')

// const start = Date.now()
// setTimeout(() => {
//   console.log(`I am Suli, and I am going to come back in ${Date.now() - start} milliseconds.`)
// })

// for (let i = 0; i < 1000000000; i++) {
//   Math.random()
// }

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
  const neyzen = await User.create({ name: 'Neyzen', age: 30 })
  const taha = await User.create({ name: 'Taha', age: 24 })
  const nedim = await User.create({ name: 'Nedim', age: 23 })

  neyzen.addresses = 'Fikirtepe'
  taha.addresses = 'Uskudar'
  nedim.addresses = 'Kadikoy'

  console.log(neyzen)
  res.sendStatus(200)
})

router.get('/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId)

  if (user) res.render('user', { user })
  else res.sendStatus(404)
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
