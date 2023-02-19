const router = require("express").Router();
const {
  singleMessage,
  bulkMessage,
} = require("../controlers/messageControler");
const { verfyAdmin } = require("../middleware/verifyAdmin");

router.route("/").post(singleMessage);

module.exports = router;
