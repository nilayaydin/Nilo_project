const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const orderItemSchema = new mongoose.Schema({
  product: String,
  quantity: Number,
})
class OrderItem {
  get amount() {
    return this.quantity * this.product.price
  }
}

orderItemSchema.loadClass(OrderItem)
orderItemSchema.plugin(autopopulate)

module.exports = mongoose.model('OrderItem', orderItemSchema)
