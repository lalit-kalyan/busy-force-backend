const router = require("express").Router();
const {
  registerAdmin,
  adminLogin,
  editAdmin,
  deleteAdmin,
  getAdmin,
} = require("../controlers/adminControler");
const { verfyAdmin } = require("../middleware/verifyAdmin");

router.route("/").post(registerAdmin);
router.route("/login").post(adminLogin);
router.route("/:userId").delete(verfyAdmin, deleteAdmin);
router.route("/:userId").put(verfyAdmin, editAdmin);
router.route("/:userId").get(getAdmin);

module.exports = router;   