const monthlyDeative = (lastActiveDate, todaysDate) => {
  //..........WHAN YEARS ARE SAME.........................................
  if (lastActiveDate.getFullYear() === todaysDate.getFullYear()) {
    if (
      lastActiveDate.getDate() <= todaysDate.getDate() &&
      lastActiveDate.getMonth() + 1 === todaysDate.getMonth()
    ) {
      return false;
    }
  }
  //..........WHAN YEARS ARE NOT SAME.....................................

  if (lastActiveDate.getFullYear() != todaysDate.getFullYear()) {
    if (
      todaysDate.getMonth() === 0 &&
      lastActiveDate.getDate() <= todaysDate.getDate()
    ) {
      return false;
    }
  }
};

module.exports = {
  monthlyDeative,
};
