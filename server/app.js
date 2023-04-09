const express = require("express")
const multer = require("multer")
const config = require("config")
const mongoose = require("mongoose")
const app = express()

//picture upload
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads")
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

app.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  })
})
//----------------------------------------------

app.use(express.json({ extended: true }))

app.use("/uploads", express.static("uploads"))
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
