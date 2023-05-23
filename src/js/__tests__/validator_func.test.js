import { validator } from "../validator/js/validator_func";

test("expect to receive true", () => {
  const result = validator("379595962078244");
  expect(result).toBe(true);
});

test("expect to receive true", () => {
  const result = validator("6011535229714786");
  expect(result).toBe(true);
});

test("expect to receive false due to not valid number", () => {
  const result = validator("376749288672970");
  expect(result).toBe(false);
});

test("expect to receive false due to empty string", () => {
  const result = validator("");
  expect(result).toBe(false);
});
