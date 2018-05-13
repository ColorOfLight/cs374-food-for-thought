const convertToMoneyString = (num, suffix = " 원") => {
  return num.toFixed().replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + suffix;
}

export {
  convertToMoneyString
}