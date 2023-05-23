import { options, paymentSysList } from "./data";

export function getPaySysAndLength(number) {
  let requiredLength, paySys;
  let index = 0;
  let checkArray = [];
  let reg = /^\d+$/i;

  if (!reg.test(number)) {
    return [requiredLength, paySys];
  }

  for (let i of number) {
    checkArray.push(i);
    let checkItem = checkArray.join("");
    for (let item of options) {
      let digitsArray = item[paymentSysList[index]].digits;
      let res = digitsArray.find((item) => item === Number(checkItem));
      if (res) {
        paySys = paymentSysList[index];
        requiredLength = item[paymentSysList[index]].length;
        return [requiredLength, paySys];
      }
      index += 1;
      if (index === paymentSysList.length) {
        index = 0;
        break;
      }
    }
  }
  return [requiredLength, paySys];
}
