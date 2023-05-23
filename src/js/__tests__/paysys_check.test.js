import { getPaySysAndLength } from "../validator/js/paysys_check";

test("expect to receive visa", () => {
  const result = getPaySysAndLength("4929802127528189");
  expect(result).toEqual([[13, 16, 19], "visa"]);
});

test("expect to receive diners", () => {
  const result = getPaySysAndLength("30320505686028");
  expect(result).toEqual([[14], "diners"]);
});

test("expect to receive undefined", () => {
  const result = getPaySysAndLength("123123");
  expect(result).toEqual([undefined, undefined]);
});

test("expect to receive undefined", () => {
  const result = getPaySysAndLength("");
  expect(result).toEqual([undefined, undefined]);
});

test("expect to receive undefined", () => {
  const result = getPaySysAndLength("4523d98298080913841");
  expect(result).toEqual([undefined, undefined]);
});
