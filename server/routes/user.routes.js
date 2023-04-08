const { Router } = require("express")
const User = require("../models/User")
const Post = require("../models/Object")
const authMiddleware = require("../middleware/auth.middleware")
const router = Router()

router.get("/:name", async (req, res) => {
  try {
    const { _id } = await User.findOne({
      login: req.params.name,
    })

    if (!_id) throw Error

    res.json({ userId: _id })
  } catch (e) {
    res.status(500).json({ message: "Something went wrong while getting user" })
  }
})

// router.get("/:id", async (req, res) => {
//   try {
//     const { login, posts, profilePictureUrl } = await User.findById(
//       req.params.id
//     )
//     res.json({ login, postsNumber: posts.length, profilePictureUrl })
//   } catch (e) {
//     res.status(500).json({ message: "Something went wrong while getting user" })
//   }
// })

router.get("/clearPosts/:id", async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.id })
    await User.findByIdAndUpdate({ _id: req.params.id }, { posts: posts })
    res.json("completed")
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong while clearing posts" })
  }
})

router.post("/setPicture", authMiddleware, async (req, res) => {
  try {
    console.log(req.user.userId)
    const { profilePictureUrl } = req.body
    await User.findByIdAndUpdate(
      { _id: req.user.userId },
      { profilePictureUrl: profilePictureUrl }
    )
    res.json(profilePictureUrl)
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong while setting Picture" })
  }
})

module.exports = router
