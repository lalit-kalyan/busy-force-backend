const diamondActivate = (lastActiveDate, isActive) => {
  if (isActive === false) {
    const memberLastActiveDate = new Date(
      lastActiveDate.setMonth(lastActiveDate.getMonth() + 12)
    );
    return memberLastActiveDate;
  }
};

module.exports = {
  diamondActivate,
};
