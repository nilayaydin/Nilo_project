const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      autopopulate: true,
    },
  ],
  addresses: String,

  likesProduct: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      autopopulate: true,
    },
  ],
})
class User {
  async addOrder(order) {
    this.orders.push(order)
    await this.save()
  }

  async createAddress(address) {
    this.addresses.push(address)
    await this.save()
  }

  async likeProduct(product) {
    this.likesProduct.push(product.name)
    product.likedBy.push(this.name)

    await this.save()
    await product.save()
  }
}

userSchema.loadClass(User)
userSchema.plugin(autopopulate)

module.exports = mongoose.model('User', userSchema)

// if (this.email === undefined) this.email = ''
// if (this.password === undefined) this.password = ''
