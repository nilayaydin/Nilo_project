class User {
  constructor(name, age) {
    this.name = name
    this.age = age
    this.orders = []
    this.addresses = []
    this.likesProduct = []
  }

  addOrder(order) {
    this.orders.push(order)
  }

  createAddress(address) {
    this.addresses.push(address)
  }

  likeProduct(product) {
    this.likesProduct.push(product.name)
    product.likedBy.push(this.name)
  }
}

// const nilay = new User('nilay', 18)

module.exports = User

// if (this.email === undefined) this.email = ''
// if (this.password === undefined) this.password = ''
