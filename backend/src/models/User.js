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
  addresses: String,
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      autopopulate: true,
    },
  ],
  likesProduct: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      autopopulate: { maxDepth: 1 },
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
    this.likesProduct.push(product)
    product.likedBy.push(this)

    await product.save()
    await this.save()
  }
}

userSchema.loadClass(User)
userSchema.plugin(autopopulate)

module.exports = mongoose.model('User', userSchema)

// if (this.email === undefined) this.email = ''
// if (this.password === undefined) this.password = ''
