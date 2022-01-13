class Product {
  constructor(name, category, brand, price) {
    this.name = name
    this.category = category
    this.brand = brand
    // this.productId = '' // use id generator
    // this.stock = ''
    // this.quantity = 0 // it's a number
    this.price = price // its supposed to be a number
    this.photos = [] // maybe I can also add this in orderitem?
    this.likedBy = []
  }

  addPhoto(photo) {
    this.photos.push(photo)
  }
}

module.exports = Product
