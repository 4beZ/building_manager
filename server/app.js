const express = require("express")
const multer = require("multer")
const config = require("config")
const mongoose = require("mongoose")
const app = express()

app.use(express.json({ extended: true }))

app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/objects", require("./routes/objects.routes"))
app.use("/api/users", require("./routes/user.routes"))

const PORT = config.get("port") || 5000

const start = async () => {
  try {
    await mongoose.connect(config.get("mongodbUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    app.listen(PORT, () => console.log(`App started on port ${PORT}`))
  } catch (e) {
    console.log("Server error", e.message)
    process.exit(1)
  }
}

start()
