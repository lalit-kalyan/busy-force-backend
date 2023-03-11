const mongoose = require("mongoose");

const gallerySchema = mongoose.Schema(
  {
    title: { type: "String", required: true },
    publicId: { type: "String", required: true },
    pic: {
      type: "String",
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timestamps: true }
);

const Gallery = mongoose.model("Gallery", gallerySchema);
module.exports = Gallery;
