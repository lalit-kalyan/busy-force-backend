const router = require("express").Router();
const { singleMessage, bulkMsg } = require("../controlers/messageControler");
const { verfyAdmin } = require("../middleware/verifyAdmin");

router.route("/").post(verfyAdmin, singleMessage);
router.route("/bulk").post(verfyAdmin, bulkMsg);

module.exports = router;
