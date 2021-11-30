class Person {
    constructor(name,age) {
        this.name = name
        this.age = age
        this.photos = []
        this.likes = []
    }
    greet (person) {
        console.log(`Hello ${person.name}, this is ${this.name}`)
    }
}
'new person = Emre, age:34 '