const router = require("express").Router();
const {
  registerMember,
  memberLogin,
  getAllMember,
  getMember,
  deleteMember,
  editMember,
} = require("../controlers/memberControler");
const {
  manulaActivation,
  autoDeactivate,
} = require("../controlers/activationControler");
const { verfyAdmin } = require("../middleware/verifyAdmin");
const multer = require("../cinfig/multer");
const { imageUploader } = require("../middleware/cloudinary");

router.route("/").post(multer.single("file"), imageUploader, registerMember);
router.route("/login").post(memberLogin);
router.route("/:userId").delete(verfyAdmin, deleteMember);
router.route("/:userId").put(multer.single("file"), imageUploader, editMember);
router.route("/all").get(getAllMember);
router.route("/:userId").get(getMember);
router.route("/activate/:userId").put(verfyAdmin, manulaActivation);
router.route("/deactivate/:userId").put(autoDeactivate);

module.exports = router;
