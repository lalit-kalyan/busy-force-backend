const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
  {
    username: { type: "String", required: true },
    email: { type: "String", unique: true, required: true },
    phone: { type: "Number", unique: true, required: true },
    picId: { type: "String", required: true },
    pic: {
      type: "String",
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
