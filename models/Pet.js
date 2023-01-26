const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
  animal: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  // breed: {
  //   type: String,
  //   required: false,
  // },
  // color: {
  //   type: String,
  //   required: true,
  // },
  // size: {
  //   type: String,
  //   required: true,
  // },
  dob: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Pet", PetSchema);