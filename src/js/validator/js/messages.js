export default class Message {
  constructor(message) {
    if (typeof message === "string") {
      message = document.querySelector(message);
    }
    this.message = message;
  }

  setActive() {
    this.message.classList.add("active");
  }

  removeActive() {
    this.message.classList.remove("active");
  }
}

export const message = new Message(".message");
