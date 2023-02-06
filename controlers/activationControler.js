const Member = require("../models/Member");

//* MANUAL ACTIVATE MEMBER............................
const manulaActivation = async (req, res) => {
  const { userId } = req.params;
  try {
    const member = await Member.findById(userId);
    const lastActiveDate = member.lastActive;
    const todaysDate = new Date();
    let newActiveDate = lastActiveDate;

    //?..........WHAN YEARS ARE SAME.......................
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
    //?..........WHAN YEARS ARE NOT SAME.......................

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
    //.......UPDATE MEMBER
    const updatedMember = await Member.findByIdAndUpdate(
      userId,
      { lastActiveDate: newActiveDate, isActiveMember: true },
      { new: true }
    );
    res.status(200).json(updatedMember);
  } catch (err) {
    res.status(500).json(err);
  }
};

//*................. AUTO DEACTIVATE MEMBER..............................
const autoDeactivate = async (req, res) => {
  const { userId } = req.params;
  try {
    const member = await Member.findById(userId);
    const lastActiveDate = new Date(member.lastActive);
    const todaysDate = new Date();
    let activationCancle = true;

    //?..........WHAN YEARS ARE SAME.......................
    if (lastActiveDate.getFullYear() === todaysDate.getFullYear()) {
      if (
        lastActiveDate.getDate() <= todaysDate.getDate() &&
        lastActiveDate.getMonth() + 1 === todaysDate.getMonth()
      ) {
        activationCancle = false;
      }
    }

    //?..........WHAN YEARS ARE NOT SAME.......................

    if (lastActiveDate.getFullYear() != todaysDate.getFullYear()) {
      if (
        todaysDate.getMonth() === 0 &&
        lastActiveDate.getDate() <= todaysDate.getDate()
      ) {
        activationCancle = false;
      }
    }
    //.......UPDATE MEMBER
    const updatedMember = await Member.findByIdAndUpdate(
      userId,
      { isActiveMember: activationCancle },
      { new: true }
    );
    res.status(200).json(updatedMember);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = { autoDeactivate, manulaActivation };
