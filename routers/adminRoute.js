const router = require("express").Router();
const multer = require("../cinfig/multer");
const { imageUploader } = require("../middleware/cloudinary");
const {
  registerAdmin,
  adminLogin,
  editAdmin,
  deleteAdmin,
  getAdmin,
  getAllAdmin,
} = require("../controlers/adminControler");
const { verfyAdmin } = require("../middleware/verifyAdmin");

router.route("/").post(multer.single("file"), imageUploader, registerAdmin);
router.route("/login").post(adminLogin);
router.route("/all").get(verfyAdmin, getAllAdmin);
router.route("/:userId").delete(verfyAdmin, deleteAdmin);
router
  .route("/:userId")
  .put(verfyAdmin, multer.single("file"), imageUploader, editAdmin);
router.route("/:userId").get(getAdmin);

module.exports = router;
