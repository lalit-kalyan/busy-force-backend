const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    username: { type: "String", required: true },
    email: { type: "String", unique: true, required: true },
    phone: { type: "Number", required: true, unique: true },
    isActive: { type: "Boolean", required: true, default: false },
    joining: { type: "Date", required: true },
    monthCode: { type: "Number", required: true },
    lastActive: { type: "Date", required: true },
    plan: { type: "Number", required: true },
    planId: { type: "String", required: true },
    picId: { type: "String", required: true },
    pic: {
      type: "String",
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Member", memberSchema);
