import { checkInput } from "./check_input";

import { message } from "./messages";
import { errors } from "./errors";

import { validator } from "./validator_func";

export default class ValidatorForm {
  constructor(element) {
    if (typeof element === "string") {
      element = document.querySelector(element);
    }
    this.element = element;

    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onInputForm = this.onInputForm.bind(this);
    this.input = this.element.querySelector(".input-card");

    this.element.addEventListener("submit", this.onSubmitForm);
    this.element.addEventListener("input", this.onInputForm);
  }

  onSubmitForm(e) {
    e.preventDefault();
    let inputValue = this.input.value;
    if (inputValue !== "") {
      let errorsActive = [
        ...document.querySelector(".errors").querySelectorAll(".active"),
      ];
      checkInput(inputValue);
      if (errorsActive.length === 0) {
        if (validator(inputValue)) {
          message.setActive();
        } else {
          errors.setActive(errors.failedError);
        }
      }
    } else {
      errors.setActive(errors.noInputError);
    }
  }

  onInputForm(e) {
    e.preventDefault();
    let inputValue = this.input.value;
    checkInput(inputValue);
  }
}
