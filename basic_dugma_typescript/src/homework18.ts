/*class Animal {
  name: string;
  species: string;

  constructor(name: string, species: string) {
    this.name = name;
    this.species = species;
  }

  sound(): void {
    console.log("The animal makes a sound");
  }
}

class Dog extends Animal {
  breed: string;

  constructor(name: string, species: string, breed: string) {
    super(name, species);
    this.breed = breed;
  }

  sound(): void {
    console.log("The dog barks");
  }
}

const dog = new Dog("Rex", "Canine", "German Shepherd");
dog.sound();*/
///////////////////////////////////////

/*class Library {
  static totalBooks: number = 0; 

  title: string;

  constructor(title: string) {
    this.title = title;
    Library.addBook(); 
  }

  static addBook(): void {
    Library.totalBooks += 1; 
  }
}


const book1 = new Library("Book One");
console.log(Library.totalBooks); 

const book2 = new Library("Book Two");
console.log(Library.totalBooks); 

const book3 = new Library("Book Three");
console.log(Library.totalBooks); */
///////////////////////////////////////

class Vehicle {
  make: string;
  model: string;

  constructor(make: string, model: string) {
    this.make = make;
    this.model = model;
  }
}

class Motorcycle extends Vehicle {
  type: string;

  constructor(make: string, model: string, type: string) {
    super(make, model);
    this.type = type;
  }
}

const car = new Vehicle("Toyota", "Corolla");
console.log(car);

const bike = new Motorcycle("Harley-Davidson", "Street 750", "Cruiser");
console.log(bike);
/////////////////////////////////////////////////////////////////
