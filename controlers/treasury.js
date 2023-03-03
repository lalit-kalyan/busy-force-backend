const Member = require("../models/Member");
const Treasury = require("../models/Treasury");

const countByMonth = async (req, res) => {
  const date = new Date();
  const monthStart = new Date(date.setDate(01));

  //Month ID....
  const monthId = +`${monthStart.getFullYear()}${date.getMonth() + 1}`;
  //console.log(typeof monthId);

  try {
    const dataOfMembers = await Member.aggregate([
      { $match: { $and: [{ monthCode: monthId }, { isActive: true }] } },
      {
        $group: {
          _id: "$monthCode",
          totalMember: { $sum: 1 },
          total: { $sum: "$plan" },
        },
      },
    ]);
    //console.log("month code ke hisab se :", dataOfMembers[0]);

    const findMonthData = await Treasury.findOne({ monthId });
    //console.log(findMonthData);

    if (!findMonthData) {
      await Treasury.create({
        activeMonth: monthStart,
        activeNo: dataOfMembers[0].totalMember,
        totalIncome: dataOfMembers[0].total,
        monthId: monthId,
      });
      res.status(201).json("new month data created.....!");
    } else {
      await Treasury.findOneAndUpdate(
        { monthId: monthId },
        {
          activeMonth: monthStart,
          activeNo: dataOfMembers[0].totalMember,
          totalIncome: dataOfMembers[0].total,
          monthId: monthId,
        },
        { new: true }
      );
      //console.log(findMonthData);

      res.status(201).json("data has been updated.....!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getMonthData = async (req, res) => {
  try {
    const getAllMonthData = await Treasury.find();
    res.status(200).json(getAllMonthData);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { countByMonth, getMonthData };
