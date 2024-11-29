const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URL

mongoose.connect(url)
.then(result => {
    console.log('connected to MongoDB');
})
.catch(err => {
    console.log('error connecting to the MongoDB',err.message);
})

const phoneSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [3, 'Name must be at least 3 characters long'],
        required: [true, 'Name is required']
    },
    number: {
        type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d{5,}$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid phone number! A valid phone number must have a length of 8 or more and match the pattern: xx-xxxxx or xxx-xxxxx.`,
    },
    }
});

  phoneSchema.set('toJSON',{
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject._v
    }
  })

  module.exports = mongoose.model('Person',phoneSchema)