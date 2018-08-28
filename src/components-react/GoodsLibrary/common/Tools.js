const limit = (lim) => {
  if (arguments.length <= 0) return;
  const start = lim.substr(0, lim.indexOf(':')) || 0;
  const end = lim.substr(lim.indexOf(':') + 1) || this.length;
  return this.substr(start, end)
};
const isNull = (val) => {
  if (val === '' || val === undefined || val === null) return true;
  return false;
};
const isEmpty = (val, str) => {
  if (isNull(val)) {
    if (str) return str;
    return '---';
  } else {
    return val;
  }
};
const currency = (val, num, dollar) => {
  num = num || 0;
  dollar = dollar || '';
  let valStr, valFloor, valLen, valIndex, numMatch;
  numMatch = '1';
  for (let i = 0; i < num; i++) {
    numMatch += '0';
  }
  valFloor = Math.floor(val * numMatch) / numMatch;
  valStr = valFloor.toString();
  valLen = valStr.length;
  valIndex = valStr.indexOf('.');
  if (num && num > 0) {
    if (valIndex < 0) {
      valIndex = valLen;
      valStr += '.';
    }
    while (valStr.length <= valIndex + num) {
      valStr += '0';
    }
  }
  return dollar + valStr;
};

export {isEmpty, limit, currency, isNull};
