/* eslint-disable no-plusplus */
const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const orderSchema = new mongoose.Schema({
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        autopopulate: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
})
class Order {
  async addProduct(product, quantity = 1) {
    // TODO: No need to use some. Refactor the code.
    if (this.orderItems.some(orderItem => orderItem.product.id == product.id)) {
      this.orderItems.find(orderItem => orderItem.product.id == product.id).quantity += quantity
      return
    }

    this.orderItems.push({ product, quantity })
    await this.save()
  }

  get totalAmount() {
    let getTotalAmount = 0
    for (let i = 0; i < this.orderItems.length; i++) {
      getTotalAmount += this.orderItems[i].amount
    }
    return getTotalAmount
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
