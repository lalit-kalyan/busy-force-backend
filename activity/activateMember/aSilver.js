const silverActivate = (lastActiveDate, todaysDate) => {
  console.log("last active date >>", lastActiveDate);

  if (lastActiveDate <= todaysDate) {
    const memberLastActiveDate = new Date(
      lastActiveDate.setMonth(lastActiveDate.getMonth() + 1)
    );
    console.log(memberLastActiveDate);
    return memberLastActiveDate;
    //console.log("running");
  }
};
module.exports = {
  silverActivate,
};
