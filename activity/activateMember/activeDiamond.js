const diamondActivate = (lastActiveDate, todaysDate) => {
  const memberLastActiveDate = new Date(
    lastActiveDate.setMonth(lastActiveDate.getMonth() + 12)
  );
  if (memberLastActiveDate <= todaysDate) {
    return memberLastActiveDate;
  }
};

module.exports = {
  diamondActivate,
};
