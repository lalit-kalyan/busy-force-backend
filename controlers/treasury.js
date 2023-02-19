const Member = require("../models/Member");
const Treasury = require("../models/Treasury");

const countByMonth = async (req, res) => {
  const date = new Date();
  const monthStart = new Date(date.setDate(01));

  //Month ID....
  const monthId = `${monthStart.getFullYear()}${date.getMonth() + 1}`;
  //console.log(monthId);
  try {
    const dataOfMembers = await Member.aggregate([
      {
        $match: { isActive: true },
      },
      {
        $group: {
          _id: "monthCode",
          total: { $sum: "$plan" },
          totalMember: { $sum: 1 },
        },
      },
    ]);

    const findMonthData = await Treasury.findOne({ monthId });

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
        monthId,
        {
          activeMonth: monthStart,
          activeNo: dataOfMembers[0].totalMember,
          totalIncome: dataOfMembers[0].total,
          monthId: monthId,
        },
        { new: true }
      );

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
