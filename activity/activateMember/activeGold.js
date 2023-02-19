const goldActivate = (lastActiveDate, todaysDate) => {
  if (lastActiveDate <= todaysDate) {
    const memberLastActiveDate = new Date(
      lastActiveDate.setMonth(lastActiveDate.getMonth() + 3)
    );
    return memberLastActiveDate;
  }
};

module.exports = {
  goldActivate,
};
