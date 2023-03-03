const router = require("express").Router();
const {
  registerAdmin,
  adminLogin,
  editAdmin,
  deleteAdmin,
  getAdmin,
  getAllAdmin,
} = require("../controlers/adminControler");
const { verfyAdmin } = require("../middleware/verifyAdmin");

router.route("/").post(registerAdmin);
router.route("/login").post(adminLogin);
router.route("/all").get(verfyAdmin, getAllAdmin);
router.route("/:userId").delete(verfyAdmin, deleteAdmin);
router.route("/:userId").put(verfyAdmin, editAdmin);
router.route("/:userId").get(getAdmin);

module.exports = router;
