const express = require("express")
const app = express()
require("dotenv").config()
const connector = require("./config/initDB")
const router = require("./routes/userR")

app.use(express.json())
app.use("/", router)



PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  connector()
  console.log(`Server running on port ${PORT}...`)
})  