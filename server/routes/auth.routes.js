const { Router } = require("express")
const config = require("config")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const router = Router()

router.post("/login", async (req, res) => {
  try {
    const { password, login } = req.body

    const user = await User.findOne({ login })
    if (!user) {
      return res.status(400).json({ message: "User doesnt exist" })
    }

    if (user.password != password)
      return res.status(400).json({ message: "Password doesnt match" })

    const token = jwt.sign({ userId: user.id }, config.get("secretJwt"), {
      expiresIn: "1h",
    })

    res.json({
      token,
      userId: user.id,
      message: "User signed in",
      isAdmin: user.isAdmin,
    })
  } catch (e) {
    res.status(500).json({ message: "Something went wrong on server" })
  }
})

module.exports = router
