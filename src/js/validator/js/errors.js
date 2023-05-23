export default class Error {
  constructor(
    lengthError,
    notDigitsError,
    failedError,
    noInputError,
    notFound
  ) {
    let checkArr = [
      lengthError,
      notDigitsError,
      failedError,
      noInputError,
      notFound,
    ];
    if (checkArr.every((item) => typeof item === "string")) {
      lengthError = document.querySelector(lengthError);
      notDigitsError = document.querySelector(notDigitsError);
      failedError = document.querySelector(failedError);
      noInputError = document.querySelector(noInputError);
      notFound = document.querySelector(notFound);
    }
    this.lengthError = lengthError;
    this.notDigitsError = notDigitsError;
    this.failedError = failedError;
    this.noInputError = noInputError;
    this.notFound = notFound;
  }

  setActive(error) {
    error.classList.add("active");
  }

  removeActive(error) {
    error.classList.remove("active");
  }

  cleanErrors() {
    this.removeActive(this.lengthError);
    this.removeActive(this.notDigitsError);
    this.removeActive(this.failedError);
    this.removeActive(this.noInputError);
    this.removeActive(this.notFound);
  }

  getActive() {
    return [...document.querySelector(".errors").querySelectorAll(".active")];
  }
}

export const errors = new Error(
  ".error-length",
  ".error-not-digits",
  ".error-failed",
  ".error-no-input",
  ".error-not-found"
);
