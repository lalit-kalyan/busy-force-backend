const router = require("express").Router();
const multer = require("../cinfig/multer");
const { imageUploader } = require("../middleware/cloudinary");

const {
  addImage,
  getAllImages,
  deleteImage,
} = require("../controlers/gallerycontroler");
const { verfyAdmin } = require("../middleware/verifyAdmin");

router.route("/").post(multer.single("file"), imageUploader, addImage);
router.route("/").get(getAllImages);
router.route("/:imageId").delete(verfyAdmin, deleteImage);

module.exports = router;
