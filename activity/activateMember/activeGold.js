const goldActivate = (lastActiveDate, todaysDate) => {
    const memberLastActiveDate = new Date(
      lastActiveDate.setMonth(lastActiveDate.getMonth() + 3)
    );
  
    if (memberLastActiveDate <= todaysDate) {
      return memberLastActiveDate
    }
  };
  
  module.exports = {
    goldActivate,
  };