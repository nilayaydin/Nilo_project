/* eslint-disable no-console */
const express = require('express')

const router = express.Router()

const Order = require('../models/Order')
const User = require('../models/User')
const Product = require('../models/Product')
// const OrderItem = require('../models/OrderItem')

const neyzen = new User('neyzen', 30)
const burger = new Product('Vegan burger', 'food', 'veggie', 20)
const veganPizza = new Product('pizza', 'food', 'aysebrand', 30)
const order1 = new Order()
const sinem = new User('Sinem', 18)

// order1.addProduct(burgerOrder)
order1.addProduct(burger, 2)
order1.addProduct(veganPizza)

// console.log(order1.calculateAmount())

// console.log(order1.orderItems)

neyzen.likeProduct(veganPizza)

// console.log(neyzen)
// console.log(burgerOrder)

neyzen.likeProduct(burger)
// console.log(neyzen)

// console.log(order1.item.length)

const users = [sinem, neyzen]
// const start = Date.now()
// setTimeout(() => {
//   console.log(`I am Suli, and I am going to come back in ${Date.now() - start} milliseconds.`)
// })

// for (let i = 0; i < 1000000000; i++) {
//   Math.random()
// }

/* GET users listing. */
router.get('/', (req, res) => {
  let result = users
  if (req.query.name) {
    result = users.filter(user => user.name == req.query.name)
  }

  res.send(result)
})

router.get('/:userId', (req, res) => {
  res.send(users[req.params.userId])

  // const user = users[req.params.userId]
  // if (user) res.render('user', { user })
  // else res.sendStatus(404)
})

/* UPDATE users listing. */

router.patch('/:userId', async (req, res) => {
  const user = await User.findByNameAndUpdate(req.params.name, { name: req.body.name })
  res.send(user)
})

/* ADD new users */

router.post('/', async (req, res) => {
  const { name, age } = req.body

  if (!name || !age) {
    res
      .send({
        message: 'Missing fields.',
      })
      .status(400)
    return
  }

  // const user = await User.create({
  //   name,
  //   age,
  // })
  const newUser = new User(name, age)
  users.push(newUser)

  res.send(newUser)
})

/* DELETE users */

router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id)

  res.sendStatus(200)
})

module.exports = router
