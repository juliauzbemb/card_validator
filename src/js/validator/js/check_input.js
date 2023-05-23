import { errors } from "./errors";
import { paymentOptions } from "./payment_options";
import { message } from "./messages";
import { getPaySysAndLength } from "./paysys_check";

export function checkInput(inputValue) {
  errors.cleanErrors();
  message.removeActive();
  paymentOptions.removeActive();

  let reg = /^\d+$/i;

  let requiredLength, paySys;

  if (inputValue.length === 0) {
    errors.setActive(errors.noInputError);
  } else if (reg.test(inputValue) === false) {
    errors.setActive(errors.notDigitsError);
  } else if (inputValue.length > 0) {
    [requiredLength, paySys] = getPaySysAndLength(inputValue);
    if (!requiredLength && !paySys) {
      errors.setActive(errors.notFound);
    } else {
      if (!verifyLength(requiredLength, inputValue)) {
        errors.setActive(errors.lengthError);
      }
      if (
        paymentOptions.element.some((option) =>
          option.classList.contains(paySys)
        )
      ) {
        let targetIndex = paymentOptions.element.findIndex((element) =>
          element.classList.contains(paySys)
        );
        paymentOptions.setActive(paymentOptions.element[targetIndex]);
      }
    }
  }
}

function verifyLength(length, inputValue) {
  let matchedLength = length.find((item) => item === Number(inputValue.length));
  if (!matchedLength) {
    return false;
  } else {
    return true;
  }
}
