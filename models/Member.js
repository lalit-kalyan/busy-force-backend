const mongoose = require("mongoose");

const memberSchema = mongoose.Schema(
  {
    username: { type: "String", required: true },
    email: { type: "String", unique: true, required: true },
    phone: { type: "String", required: true, unique: true },
    isActive: { type: "Boolean", required: true, default: false },
    joining: { type: "Date", required: true },
    lastActive: { type: "Date", required: true },
    plan: { type: "Number" },
    planId: { type: "String", required: true },
    pic: {
      type: "String",
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timestamps: true }
);

const Member = mongoose.model("Member", memberSchema);
module.exports = Member;
