const Member = require("../models/Member");
const { silverDeative } = require("../activity/silver");
const { goldDeactivate } = require("../activity/gold");
const { platinumDeactive } = require("../activity/platinum");
const { diamondDeactive } = require("../activity/diamond");
const { silverActivate } = require("../activity/activateMember/aSilver");
const { goldActivate } = require("../activity/activateMember/activeGold");
const { platinumActive } = require("../activity/activateMember/activePlatinum");
const { diamondActivate } = require("../activity/activateMember/activeDiamond");

//!................. AUTO DEACTIVATE MEMBER..................................
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

    //*---------silver---------------
    if (member.planId === "silver") {
      newActiveDate = silverActivate(lastActiveDate, todaysDate);
      console.log(newActiveDate);
    }
    //*---------gold-----------------
    if (member.planId === "gold") {
      newActiveDate = goldActivate(lastActiveDate, todaysDate);
      console.log(newActiveDate);
    }
    //*---------platinum-------------
    if (member.planId === "platinum") {
      newActiveDate = platinumActive(lastActiveDate, todaysDate);
      console.log(newActiveDate);
    }
    //*---------diamond--------------
    if (member.planId === "diamond") {
      newActiveDate = diamondActivate(lastActiveDate, todaysDate);
      console.log(newActiveDate);
    }
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
