const mongoose = require("mongoose")
require("dotenv").config()

const MONGO_PASS = process.env.MONGO_PASS
const MONGO_URI = `mongodb+srv://mongodb:${MONGO_PASS}@cluster0.lpvkip7.mongodb.net/melp?retryWrites=true&w=majority&appName=AtlasApp`

const connector = async() => {
  await mongoose.connect(MONGO_URI)
}

module.exports = connector


