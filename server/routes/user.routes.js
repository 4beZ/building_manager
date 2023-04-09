const { Router } = require("express")
const User = require("../models/User")
const Post = require("../models/Object")
const authMiddleware = require("../middleware/auth.middleware")
const router = Router()

router.get("/:name", async (req, res) => {
  try {
    const { _id, login } = await User.findOne({
      login: req.params.name,
    })

    if (!_id) throw Error

    res.json({ userId: _id, login })
  } catch (e) {
    res.status(500).json({ message: "No such worker" })
  }
})

module.exports = router
