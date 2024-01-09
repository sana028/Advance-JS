//object constructor
class Animal {
    constructor(species) {
        this.species = species;
        this.eats = true;
    }
    walks() {
        return `${this.species} walking`;
    }
}
let cat = new Animal("cat");

console.log(cat)

console.log('hello')
console.log(cat.walks('learn'))