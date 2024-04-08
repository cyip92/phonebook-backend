import mongoose from "mongoose";

if (process.argv.length < 3) {
  console.log("Password must be given as an argument");
  process.exit(1);
}

const password = process.argv[2];
const dbRef = "phonebookApp";
const url =
  `mongodb+srv://christopheryip1992:${password}@fullstackopendb.aadwn6t.mongodb.net/${dbRef}?
    retryWrites=true&w=majority&appName=FullStackOpenDB`

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  // Try to print out the contents of the whole DB
  console.log("Phonebook Contents:");
  Person.find({}).then(res => {
    res.forEach(entry => {
      console.log(`${entry.name} ${entry.number}`);
    })
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  // Add a single new person
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then(() => {
    console.log(`Added ${person.name}, number ${person.number}, to phonebook`);
    mongoose.connection.close();
  });
} else {
  console.log(`Invalid number of parameters; expected 3 or 5, received ${process.argv.length}`);
  mongoose.connection.close();
}
