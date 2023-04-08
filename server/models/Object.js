const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
  name: { type: String, required: true },
  country: { type: String },
  imageUrl: { type: String },
  district: { type: String },
  address: { type: String },
  state: { type: Number },
  square: { type: Number },
  owner: { type: String },
  user: { type: String },
  workProcess: {
    problemType: { type: String, requied: true },
    dateAppear: { type: String },
    solutionTerm: { type: Number },
    solutionDateNominal: { type: Date },
    solutionDateFact: { type: Date },
    workGroup: [{ type: Types.ObjectId, ref: "User" }],
  },
})

module.exports = model("Object", schema)
