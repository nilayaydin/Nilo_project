/* eslint-disable no-underscore-dangle */
const request = require('supertest')
const app = require('../src/app')

describe('Users endpoints', () => {
  it('get request to /users should list users', async () => {
    const getUsers = (await request(app).get('/users')).body
    const usersExist = getUsers.length > 0
    // console.log(getUsers)
    expect(usersExist).toBe(true)
  })

  it('post request to /users should create users', async () => {
    const userToCreate = {
      name: 'Nilay',
      age: 24,
      addresses: 'Kadikoy',
    }
    const createdUser = (await request(app).post('/users').send(userToCreate)).body
    expect(createdUser.name).toBe(userToCreate.name)
    expect(createdUser.age).toBe(userToCreate.age)
    expect(createdUser.addresses).toBe(userToCreate.addresses)
  })

  it('user should be able to like a product', async () => {
    // create a user
    const newUser = (
      await request(app).post('/users').send({
        name: 'Nejdet',
        age: 60,
        addresses: 'Darica',
      })
    ).body
    // create a product
    const newProduct = (
      await request(app).post('/products').send({
        name: 'burger',
        category: 'food',
        brand: 'veggie',
        price: 30,
      })
    ).body
    // like the product with that user
    // eslint-disable-next-line no-console
    console.log('deneme', newUser._id, newProduct)
    const finalResult = await request(app).post(`/users/${newUser._id}/likes`).send({ productId: newProduct._id })

    const finalResultExist = finalResult.length > 0

    expect(finalResultExist).toBe(true)
  })
})
