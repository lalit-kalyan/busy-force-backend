const platinumActive = (lastActiveDate, todaysDate) => {
  if (lastActiveDate <= todaysDate) {
    const memberLastActiveDate = new Date(
      lastActiveDate.setMonth(lastActiveDate.getMonth() + 6)
    );
    return memberLastActiveDate;
  }
};

module.exports = {
  platinumActive,
};
