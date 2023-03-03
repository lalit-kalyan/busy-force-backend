const router = require("express").Router();
const { countByMonth, getMonthData } = require("../controlers/treasury");
const { verfyAdmin } = require("../middleware/verifyAdmin");

router.route("/").post(verfyAdmin, countByMonth);
router.route("/all").get(verfyAdmin, getMonthData);

module.exports = router;
