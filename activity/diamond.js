const diamondDeactive = (lastActiveDate, todaysDate) => {
  const memberLastActiveDate = new Date(
    lastActiveDate.setMonth(lastActiveDate.getMonth() + 12)
  );
  if (memberLastActiveDate <= todaysDate) {
    return false;
  }
};

module.exports = {
  diamondDeactive,
};
