const platinumActive = (lastActiveDate, todaysDate) => {
    const memberLastActiveDate = new Date(
      lastActiveDate.setMonth(lastActiveDate.getMonth() + 6)
    );
  
    if (memberLastActiveDate <= todaysDate) {
      return memberLastActiveDate
    }
  };
  
  module.exports = {
    platinumActive,
  };