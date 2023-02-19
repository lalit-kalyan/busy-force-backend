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

router.route("/").post(registerMember);
router.route("/login").post(memberLogin);
router.route("/:userId").delete(verfyAdmin, deleteMember);
router.route("/:userId").put(editMember);
router.route("/all").get(getAllMember);
router.route("/:userId").get(getMember);
router.route("/activate/:userId").put(verfyAdmin, manulaActivation);
router.route("/deactivate/:userId").put(autoDeactivate);

module.exports = router;
