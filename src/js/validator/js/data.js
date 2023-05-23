import Range from "./range";

export const paymentSysList = [
  "american-express",
  "diners",
  "diners",
  "discover",
  "jcb",
  "mastercard",
  "visa",
  "mir",
];

export const options = [
  {
    "american-express": {
      digits: [34, 37],
      length: [15],
    },
  },
  {
    diners: {
      digits: [300, 301, 302, 303, 304, 305, 36],
      length: [14],
    },
  },
  {
    diners: {
      digits: [54],
      length: [16],
    },
  },
  {
    discover: {
      digits: [6011, 644, 645, 646, 647, 648, 649, 65].concat([
        ...new Range(622126, 622925).getAll(),
      ]),
      length: new Range(16, 19).getAll(),
    },
  },
  {
    jcb: {
      digits: new Range(3528, 3589).getAll(),
      length: new Range(16, 19).getAll(),
    },
  },
  {
    mastercard: {
      digits: [51, 52, 53, 54, 55].concat([
        ...new Range(222100, 272099).getAll(),
      ]),
      length: [16],
    },
  },
  {
    visa: {
      digits: [4],
      length: [13, 16, 19],
    },
  },
  {
    mir: {
      digits: [2],
      length: new Range(16, 19).getAll(),
    },
  },
];
