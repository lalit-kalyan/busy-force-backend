const router = require("express").Router();
const { countByMonth, getMonthData } = require("../controlers/treasury");

router.route("/").post(countByMonth);
router.route("/all").get(getMonthData);

module.exports = router;
