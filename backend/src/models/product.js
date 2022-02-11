const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  photos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      autopopulate: true,
    },
  ],
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: { maxDepth: 1 },
    },
  ],
})
class Product {
  async addPhoto(photo) {
    this.photos.push(photo)
    await this.save()
  }
}
// photo ekleyebilmem icin photo class olusturmam lazim.
productSchema.loadClass(Product)
productSchema.plugin(autopopulate)

module.exports = mongoose.model('Product', productSchema)
