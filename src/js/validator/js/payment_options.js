export default class PaymentOptions {
  constructor(element) {
    if (typeof element === "string") {
      element = document.querySelectorAll(element);
    }
    this.element = [...element];
  }

  getIcon(element) {
    return element.querySelector(".icon");
  }

  removeActive() {
    this.element.forEach((element) =>
      this.getIcon(element).classList.remove("icon-active")
    );
  }

  setActive(element) {
    this.getIcon(element).classList.add("icon-active");
  }
}

export const paymentOptions = new PaymentOptions(".card-item");
