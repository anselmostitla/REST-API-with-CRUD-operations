const mongoose = require("mongoose")

const restaurantSchema = mongoose.Schema({
  rating: Number,
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
  ing: Number
})

module.exports = mongoose.model("Rest", restaurantSchema)