const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
  login: { type: String, requied: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, requied: true },
  objects: [{ type: Types.ObjectId, ref: "Object" }],
})

module.exports = model("User", schema)
