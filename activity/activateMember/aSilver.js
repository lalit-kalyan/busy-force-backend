const silverActivate = (lastActiveDate, todaysDate) => {
  if (lastActiveDate <= todaysDate) {
    const memberLastActiveDate = new Date(
      lastActiveDate.setMonth(lastActiveDate.getMonth() + 1)
    );
    return memberLastActiveDate;
  }
};
module.exports = {
  silverActivate,
};
