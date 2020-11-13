const { test } = require("@jest/globals");
const lib = require('../lib');

describe('absolute', () => {


    it('should return a postive number if input number is positive', () => {
        const result = lib.absolute(2);
        expect(result).toBe(2);
     });
     
     it('should return a postive number if input number is negative', () => {
         const result = lib.absolute(-2);
         expect(result).toBe(2);
      });
     
      it('should return zero if input is zero', () => {
         const result = lib.absolute(0);
         expect(result).toBe(0);
      });


});


describe('greet', () => {

    it('should return the greeting message', () => {
       const result = lib.greet('Marcus');
       expect(result).toBe('Welcome Marcus');

    });
});
