const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    username: { type: "String", required: true },
    email: { type: "String", unique: true, required: true },
    address: { type: "String", required: true },
    phone: { type: "Number", required: true, unique: true },
    isActive: { type: "Boolean", required: true, default: false },
    joining: { type: "Date", required: true },
    monthCode: { type: "Number", required: true },
    lastActive: { type: "Date", required: true },
    plan: { type: "Number", required: true },
    planId: { type: "String", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Member", memberSchema);
