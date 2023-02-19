const silverDeative = (lastActiveDate, todaysDate) => {
  const memberLastActiveDate = new Date(
    lastActiveDate.setMonth(lastActiveDate.getMonth() + 1)
  );

  if (memberLastActiveDate <= todaysDate) {
    return false;
  }
};

module.exports = {
  silverDeative,
};
