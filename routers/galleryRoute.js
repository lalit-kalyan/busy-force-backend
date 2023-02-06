const router = require("express").Router();
const {
  addImage,
  getAllImages,
  deleteImage,
} = require("../controlers/gallerycontroler");
const { verfyAdmin } = require("../middleware/verifyAdmin");

router.route("/").post(addImage);
router.route("/").get(getAllImages);
router.route("/:imageId").delete(verfyAdmin, deleteImage);

module.exports = router;