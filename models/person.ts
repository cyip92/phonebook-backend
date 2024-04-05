import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;
console.log(`Connecting to ${url}`);
mongoose.connect(String(url))
  .then(result => {
    console.log("Connected to MongoDB");
  })
  .catch(error => {
    console.log("Error connecting to MongoDB: ", error.message);
  }
);

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: [true, "Name is required"]
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d+$/.test(v);
      },
      message: props => `${props.value} is an invalid phone number`
    },
    required: [true, "Phone number is required"]
  },
});
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Person = mongoose.model("Person", personSchema);

export default Person;
