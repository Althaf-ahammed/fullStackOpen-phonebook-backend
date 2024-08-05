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
    name: String,
    number: String,
  });

  phoneSchema.set('toJSON',{
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject._v
    }
  })

  module.exports = mongoose.model('Person',phoneSchema)