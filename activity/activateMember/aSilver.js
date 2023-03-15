const silverActivate = (lastActiveDate, isActive) => {
  //console.log(lastActiveDate);
  if (isActive === false || !isActive) {
    const memberLastActiveDate = new Date(
      lastActiveDate.setMonth(lastActiveDate.getMonth() + 1)
    );
   // console.log("UPDATED LAST ACTIVE DATE >>", memberLastActiveDate);
    return memberLastActiveDate;
  }
};
module.exports = {
  silverActivate,
};
