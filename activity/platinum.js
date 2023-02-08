const platinumDeactive = (lastActiveDate, todaysDate) => {
  const memberLastActiveDate = new Date(
    lastActiveDate.setMonth(lastActiveDate.getMonth() + 6)
  );
  //   console.log(memberLastActiveDate);
  //   console.log(todaysDate);
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
  platinumDeactive,
};
