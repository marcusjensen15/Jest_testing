const { test } = require("@jest/globals");
const lib = require('../lib');

test('absolute - should return a postive number if input number is positive', () => {
   const result = lib.absolute(2);
   expect(result).toBe(2);
});

test('absolute - should return a postive number if input number is negative', () => {
    const result = lib.absolute(-2);
    expect(result).toBe(2);
 });

 test('absolute - should return zero if input is zero', () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
 });