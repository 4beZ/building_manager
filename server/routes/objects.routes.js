const { Router } = require("express")
const { Types } = require("mongoose")
const { check, validationResult } = require("express-validator")
const authMw = require("../middleware/auth.middleware")
const Object = require("../models/Object")
const User = require("../models/User")
const router = Router()
const fs = require("fs")

router.post("/", async (req, res) => {
  try {
    const { object } = req.body

    const newObject = new Object(object)

    const createdObject = await newObject.save()

    createdObject.workProcess.workGroup.forEach(async (worker) => {
      const { objects } = await User.findOne({ _id: worker })
      await User.findByIdAndUpdate(
        { _id: worker },
        { objects: [...objects, createdObject._id] }
      )
    })

    res.status(201).json({ message: "Object created", object: createdObject })
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong while creating object" })
  }
})

router.get("/:id", authMw, async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.userId })
    res.json(posts)
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong while getting posts" })
  }
})

router.get("/", authMw, async (req, res) => {
  try {
    console.log(req.user.userId)
    const objects = await Object.find({
      "workProcess.workGroup": Types.ObjectId(req.user.userId),
    })

    console.log(objects)
    res.json(objects)
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong while getting objects" })
  }
})

router.delete("/:id", authMw, async (req, res) => {
  try {
    const foundPost = await Post.findOneAndDelete({ _id: req.params.id })
    res.json({ message: `Post ${req.params.id} deleted` })

    const author = await User.findOne({ _id: foundPost.author })
    const newAuthorPosts = author.posts.filter(
      (post) => post._id.toString() !== foundPost._id.toString()
    )
    await User.findByIdAndUpdate(
      { _id: foundPost.author },
      { posts: newAuthorPosts }
    )

    const posts = await Post.find({ imageUrl: { $ne: "" } })

    if (foundPost.imageUrl) {
      for (const post of posts) {
        if (foundPost.imageUrl === post.imageUrl) {
          return
        }
      }
      fs.unlink(`./${foundPost.imageUrl}`, (e) => {
        console.log("deleting image", foundPost.imageUrl)
        if (e) console.log(e)
      })
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong while deleting post" })
  }
})

module.exports = router
