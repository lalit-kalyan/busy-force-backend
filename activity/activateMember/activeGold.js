const goldActivate = (lastActiveDate, isActive) => {
  if (isActive === false) {
    const memberLastActiveDate = new Date(
      lastActiveDate.setMonth(lastActiveDate.getMonth() + 3)
    );
    return memberLastActiveDate;
  }
};

module.exports = {
  goldActivate,
};
