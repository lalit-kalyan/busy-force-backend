const silverActivate = (lastActiveDate, todaysDate) => {
  const memberLastActiveDate = new Date(
    lastActiveDate.setMonth(lastActiveDate.getMonth() + 1)
  );
  if (memberLastActiveDate <= todaysDate) {
    return memberLastActiveDate;
  }
};
module.exports = {
  silverActivate,
};
