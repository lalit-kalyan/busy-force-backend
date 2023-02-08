const diamondDeactive = (lastActiveDate, todaysDate) => {
  const memberLastActiveDate = new Date(
    lastActiveDate.setMonth(lastActiveDate.getMonth() + 12)
  );
  //   console.log("member ki tarikh", memberLastActiveDate);
  //   console.log("ajj ki takih", todaysDate);
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
  diamondDeactive,
};
