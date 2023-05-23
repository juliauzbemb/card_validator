function isEvenNumber(number) {
  return number.length % 2 === 0;
}

function getCondition(index, number) {
  if (isEvenNumber(number)) {
    return index % 2 === 0;
  } else {
    return index % 2 !== 0;
  }
}

export function validator(number) {
  if (number === "") {
    return false;
  }
  let modifiedNumber = [];
  let index = 0;

  for (index; index < number.length; index++) {
    if (getCondition(index, number)) {
      if (2 * number[index] > 9) {
        modifiedNumber.push(Number(number[index] * 2 - 9));
      } else {
        modifiedNumber.push(Number(number[index] * 2));
      }
    } else {
      modifiedNumber.push(Number(number[index]));
    }
  }

  let sumNumbers = modifiedNumber.reduce(
    (accum, current) => accum + current,
    0
  );

  if (sumNumbers % 10 === 0) {
    return true;
  } else {
    return false;
  }
}
