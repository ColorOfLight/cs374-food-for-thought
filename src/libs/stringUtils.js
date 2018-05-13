const convertToMoneyString = (num, fixedNum = 0, suffix = " 원") => {

  if (typeof num !== 'number') num = parseInt(num);
  return (num).toFixed(fixedNum).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + suffix;
}

export {
  convertToMoneyString
}