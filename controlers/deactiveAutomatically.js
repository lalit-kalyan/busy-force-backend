const {
  autoMonthlyDeative,
  autoQuaterlyDeative,
  autoSemiDeative,
  autoAnnualDeative,
} = require("../cinfig/autoDeativate");

const autoDeactivateMember = async (req, res) => {
  //*Monthly>>>>>>>>
  const data = autoMonthlyDeative();
  res.status(200).json(data);
};

module.exports = { autoDeactivateMember };
