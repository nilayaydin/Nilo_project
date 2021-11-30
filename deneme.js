class Person {
    constructor(name,age) {
        this.name = name
        this.age = age
        this.photos = []
        
    }
    greet (person) {
        console.log(`Hello ${person.name}, this is ${this.name}`)
    }
}
'before merging I just want this line to stay here'