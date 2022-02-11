/* eslint-disable no-plusplus */
const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const orderSchema = new mongoose.Schema({
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      autopopulate: { maxDepth: 1 },
    },
  ],
  quantity: [],
  amount: 0,
})
class Order {
  async addProduct(product, quantity = 1) {
    // TODO: No need to use some. Refactor the code.
    // eslint-disable-next-line no-console
    console.log(product)
    if (this.orderItems.some(orderItem => orderItem.id == product.id)) {
      this.orderItems.find(orderItem => orderItem.id == product.id).quantity += quantity
      return
    }

    this.orderItems.push(product)
    this.quantity.push(quantity)
    await this.save()
  }

  async calculateAmount() {
    for (let i = 0; i < this.orderItems.length; i += 1) {
      this.amount += this.orderItems[i].price * this.quantity[i]
    }
    await this.save()
  }

  // async calculateAmount() {
  //   // eslint-disable-next-line no-const-assign
  //   for (let i = 0; i < this.orderItems.length; i++) {
  //     this.amount += this.orderItems[i].amount
  //   }
  //   return this.amount
  // }

  // addProduct(productId, quantity) {
  //   const firstOrderItem = new Orderitem(this.orderId, productId, quantity)
  //   this.item.push(firstOrderItem)
  // }
}

orderSchema.loadClass(Order)
orderSchema.plugin(autopopulate)

module.exports = mongoose.model('Order', orderSchema)
