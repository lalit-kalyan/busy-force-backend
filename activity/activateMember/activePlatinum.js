const platinumActive = (lastActiveDate, isActive) => {
  if (isActive === false) {
    const memberLastActiveDate = new Date(
      lastActiveDate.setMonth(lastActiveDate.getMonth() + 6)
    );
    return memberLastActiveDate;
  }
};

module.exports = {
  platinumActive,
};
