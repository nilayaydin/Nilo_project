/* eslint-disable no-plusplus */
const OrderItem = require('./OrderItem')

class Order {
  constructor() {
    this.orderId = Math.floor(Math.random() * 100) // use id generator function for this. (UUID)
    this.orderItems = [] // I'm going to export the info from the product class
    // I deleted status and date
    this.amount = 0 // Odenecek tutar ?
  }

  addProduct(product, quantity = 1) {
    // TODO: Use product.Id when searching product
    // TODO: No need to use some. Refactor the code.
    if (this.orderItems.some(orderItem => orderItem.product.id == product.id)) {
      this.orderItems.find(orderItem => orderItem.product.id == product.id).quantity += quantity
      return
    }

    this.orderItems.push(new OrderItem(product, quantity))
  }

  calculateAmount() {
    // eslint-disable-next-line no-const-assign
    for (let i = 0; i < this.orderItems.length; i++) {
      this.amount += this.orderItems[i].amount
    }
    return this.amount
  }

  // addProduct(productId, quantity) {
  //   const firstOrderItem = new Orderitem(this.orderId, productId, quantity)
  //   this.item.push(firstOrderItem)
  // }
}

module.exports = Order
