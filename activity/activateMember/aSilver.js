const silverActivate = (lastActiveDate, isActive) => {
  if (isActive === false) {
    const memberLastActiveDate = new Date(
      lastActiveDate.setMonth(lastActiveDate.getMonth() + 1)
    );
    return memberLastActiveDate;
  }
};
module.exports = {
  silverActivate,
};
