class OrderItem {
  constructor(product, quantity) {
    this.product = product
    this.quantity = quantity
  }

  get amount() {
    return this.quantity * this.product.price
  }
}

module.exports = OrderItem
