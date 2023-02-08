const goldDeactivate = (lastActiveDate, todaysDate) => {
  const memberLastActiveDate = new Date(
    lastActiveDate.setMonth(lastActiveDate.getMonth() + 3)
  );

  if (memberLastActiveDate <= todaysDate) {
    return false;
  }
};

module.exports = {
  goldDeactivate,
};
