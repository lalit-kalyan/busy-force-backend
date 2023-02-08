const goldDeactivate = (lastActiveDate, todaysDate) => {
  const memberLastActiveDate = new Date(
    lastActiveDate.setMonth(lastActiveDate.getMonth() + 3)
  );

  if (lastActiveDate.getFullYear() === todaysDate.getFullYear()) {
    if (
      lastActiveDate.getDate() <= todaysDate.getDate() &&
      memberLastActiveDate <= todaysDate
    ) {
      return false;
    }
  }
};

module.exports = {
  goldDeactivate,
};
