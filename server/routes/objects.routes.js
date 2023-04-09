const { Router } = require("express")
const { Types } = require("mongoose")
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
    if (req.params.id === "all") {
      const objects = await Object.find()
      return res.status(201).json(objects)
    }
    const object = await Object.findById(req.params.id)
    res.status(201).json(object)
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong while getting object" })
  }
})

router.get("/", authMw, async (req, res) => {
  try {
    const objects = await Object.find({
      "workProcess.workGroup": Types.ObjectId(req.user.userId),
    })
    res.json(objects)
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong while getting objects" })
  }
})

router.post("/update", authMw, async (req, res) => {
  try {
    const { _id, workProcess } = req.body.object
    const { workGroup } = workProcess
    await Object.findOneAndUpdate({ _id }, req.body.object)

    workGroup.forEach(async (workerId) => {
      const worker = await User.findById(workerId)
      if (!worker.objects.includes(_id)) {
        await User.findByIdAndUpdate(workerId, {
          objects: [...worker.objects, _id],
        })
      }
    })

    return res.json({ message: "Edited" })
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong while getting objects" })
  }
})

router.delete("/:id", authMw, async (req, res) => {
  try {
    await Object.findOneAndDelete({ _id: req.params.id })
    return res.json({ message: `Object ${req.params.id} deleted` })
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong while deleting post" })
  }
})

module.exports = router
