const diamondActivate = (lastActiveDate, todaysDate) => {
  if (lastActiveDate <= todaysDate) {
    const memberLastActiveDate = new Date(
      lastActiveDate.setMonth(lastActiveDate.getMonth() + 12)
    );
    return memberLastActiveDate;
  }
};

module.exports = {
  diamondActivate,
};
