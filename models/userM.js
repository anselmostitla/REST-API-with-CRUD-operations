const mongoose = require("mongoose")
const uuid = require("uuid")

const restaurantSchema = mongoose.Schema({
  id: {
    type: String,
    default: uuid.v4()
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  name: String,
  site: String,
  email: {
    type: String,
    require: true
  },
  phone: {
    type: String,
    require: true
  },
  street: String,
  city: String,
  state: String,
  lat: Number,
  lng: Number
})

module.exports = mongoose.model("Rest", restaurantSchema)
