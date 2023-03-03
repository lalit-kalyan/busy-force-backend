const goldDeactivate = (lastActiveDate, todaysDate) => {
  if (lastActiveDate <= todaysDate) {
    return false;
  }
};

module.exports = {
  goldDeactivate,
};
