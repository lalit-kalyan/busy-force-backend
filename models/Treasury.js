const mongoose = require("mongoose");

const treasurySchema = mongoose.Schema(
  {
    activeMonth: { type: "Date", required: true },
    activeNo: { type: "Number", required: true },
    totalIncome: { type: "Number", required: true },
    monthId: { type: "Number", unique: true, required: true },
  },
  { timestamps: true }
);

const Treasury = mongoose.model("Treasury", treasurySchema);
module.exports = Treasury;