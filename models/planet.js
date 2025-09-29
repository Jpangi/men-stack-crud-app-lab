const mongoose = require('mongoose')

const planetSchema = new mongoose.Schema({
  name: String,
  description: String,
  size: Number,
  galaxy: String
})

const Planet = mongoose.model('Planet', planetSchema)
module.exports = Planet
