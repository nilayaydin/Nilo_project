const Person = require('./person')
const Photo = require('./photo')

const mihri = new Person('mihri', 35)
const steve = new Person('steve', 21)
const armagan = new Person('armagan', 36)
// const ayse = new Person('ayse', 32)
// const nilay = new Person('nilay', 24)
// console.log(ayse.greet(nilay))

const berlinPhoto = new Photo('berlin.jpg')
const munichPhoto = new Photo('munich.jpg')

function foo() {
  return 3
}

steve.addPhoto(berlinPhoto)
steve.addPhoto(munichPhoto)

steve.bio = 'An awesome hacker who has seen it all.'

armagan.likePhoto(berlinPhoto)
mihri.likePhoto(berlinPhoto)

// console.log(steve.profile);

// console.log(steve.profile);
console.log(steve.profile)
console.log(armagan.profile)

// steve.profile ='something'

// console.log(mihri,mihri.likes[0].likedBy[0].likes[0].filename)
// // This reads get the file name of the first photo that the first person who liked the photo that mihri liked first.

// console.log(mihri,mihri.likes[0].likedBy)
// // Mihri has a photo that she liked that liked by two people [mihri,armagan].

// console.log(mihri.likes[0].likedBy[0].name)
// // Mihri liked a photo that Armagan liked first.

// console.log(mihri.likes[0].likedBy[0].likes[0].filename == mihri.likes[0].filename, mihri.likes[0].filename == steve.photos[0].filename);
// Steve's first photo's name is the name of the photo that Mihri liked first and that Armagan liked first.
