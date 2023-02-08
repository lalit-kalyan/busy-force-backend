const Member = require("../models/Member");
const { silverDeative } = require("../activity/silver");
const { goldDeactivate } = require("../activity/gold");
const { platinumDeactive } = require("../activity/platinum");
const { diamondDeactive } = require("../activity/diamond");

//*................. AUTO DEACTIVATE MEMBER..................................
const autoDeactivate = async (req, res) => {
  const { userId } = req.params;
  try {
    const member = await Member.findById(userId);

    const lastActiveDate = new Date(member.lastActive);
    const todaysDate = new Date();
    let activationCancle = true;

    //!---------------silver Plan----------------------
    if (member.planId === "silver") {
      activationCancle = silverDeative(lastActiveDate, todaysDate);
    }

    //!---------------gold Plan------------------------
    if (member.planId === "gold") {
      activationCancle = goldDeactivate(lastActiveDate, todaysDate);
    }

    //!---------------platinum Plan--------------------
    if (member.planId === "platinum") {
      activationCancle = platinumDeactive(lastActiveDate, todaysDate);
    }

    //!---------------diomond Plan---------------------
    if (member.planId === "diamond") {
      activationCancle = diamondDeactive(lastActiveDate, todaysDate);
    }

    //.......UPDATE MEMBER
    const updatedMember = await Member.findByIdAndUpdate(
      userId,
      { isActive: activationCancle },
      { new: true }
    );
    res.status(200).json(updatedMember);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

//*------------MANUAL ACTIVATE MEMBER--------------------------------------
const manulaActivation = async (req, res) => {
  const { userId } = req.params;
  try {
    const member = await Member.findById(userId);
    const lastActiveDate = member.lastActive;
    const todaysDate = new Date();
    let newActiveDate = lastActiveDate;

    //?------WHAN YEARS ARE SAME-----------
    if (lastActiveDate.getFullYear() === todaysDate.getFullYear()) {
      if (
        lastActiveDate.getDate() <= todaysDate.getDate() &&
        lastActiveDate.getMonth() + 1 === todaysDate.getMonth()
      ) {
        newActiveDate = `${lastActiveDate.getFullYear()}- ${
          lastActiveDate.getMonth() + 1
        } - ${lastActiveDate.getDate()}`;
      }
    }
    //?--------WHAN YEARS ARE NOT SAME-----------

    if (lastActiveDate.getFullYear() != todaysDate.getFullYear()) {
      if (
        todaysDate.getMonth() === 0 &&
        lastActiveDate.getDate() <= todaysDate.getDate()
      ) {
        const newYear = lastActiveDate.getFullYear() + 1;
        const getMonth = 01;
        newActiveDate = `${newYear}-${getMonth}-${lastActiveDate.getDate()}`;
      }
    }
    console.log(newActiveDate);
    //*------UPDATE MEMBER------
    const updatedMember = await Member.findByIdAndUpdate(
      userId,
      { lastActiveDate: newActiveDate, isActive: true },
      { new: true }
    );
    res.status(200).json(updatedMember);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { autoDeactivate, manulaActivation };
