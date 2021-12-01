class Person {
    constructor (name,age){
        this.name = name
        this.age = age
        this.photos = []
        this.likes = []
    }
    greet (Person) {
        console.log (`Hello ${Person.name}, this is ${this.name}`)
    } 
};

const eli = 'New person'