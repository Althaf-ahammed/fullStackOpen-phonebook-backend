const mongoose = require("mongoose");

const password = process.argv[2];
const newName = process.argv[3];
const newNumber = process.argv[4];

const url = `mongodb+srv://althafahammedm626:${password}@cluster0.wkxziwf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", phoneSchema);

const person = new Person({
  name: newName,
  number: newNumber,
});

if (process.argv.length < 4) {
    console.log('Persons: ');
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person.name,person.number);
    });
    mongoose.connection.close();
  });
} else {
  person.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
}
