class User {
  constructor(name, age) {
    this.name = name
    this.age = age
    this.bio = ''
    this.photos = []
    this.likes = []
  }
}

const zuko = new User('zuko', 3)
console.log(zuko)
