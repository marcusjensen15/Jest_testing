const { test } = require("@jest/globals");
const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

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
       expect(result).toMatch(/Marcus/);
       expect(result).toContain('Marcus');

    });
});


describe('getCurrencies', () => {

   

        it('should return supported currencies', () => {
            const result = lib.getCurrencies();

            expect(result).toContain('USD');
            expect(result).toContain('AUD');
            expect(result).toContain('EUR');

            //below is the best way to test an array:

            expect(result).toEqual(expect.arrayContaining(['AUD', 'EUR', 'USD']));


        });
});


describe('getProduct', () => {
    it('should return the product with the given id', () => {
       const result = lib.getProduct(1);
       expect(result).toEqual({id: 1, price: 10});
       expect(result).toMatchObject({id: 1, price: 10});

       expect(result).toHaveProperty('id', 1);
    });
});

describe('registerUser', () => {

    it('should throw if username is falsy', () =>{
        const args = [null, undefined, NaN, '', 0, false];
        args.forEach(a => {
            expect(() => {lib.registerUser(a)}).toThrow();
        });
    });

    it('should return a user object if valid username is passed', () => {
        const result = lib.registerUser('Marcus');
        expect(result).toMatchObject({ username: 'Marcus'});
        expect(result.id).toBeGreaterThan(0);
    });
});

describe('applyDiscount', () => {

    it('should apply 10% discount if customer has more than 10 points', () => {

        db.getCustomerSync = function(customerId){
            console.log('fake reading customer....');
            return { id:customerId, points: 20};
        }

       const order = { customerId: 1, totalPrice: 10};
       lib.applyDiscount(order);
       expect(order.totalPrice).toBe(9);


    });
});

describe('notifyCustomer', () => {

    it('should send an email to the customer', () => {

        // const mockFunction = jest.fn();
        // mockFunction.mockReturnValue(1);
        // mockFunction/mockResolvedValue(1);
        // mockFunction.mockRejectedValue(new Error('...'));
        // const result = await mockFunction();

        // mockFunction();
        // we are going to replace getCustomerSync with a mock function. below line is equivalent to the alternitive funciton below it.

        db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a'});
        mail.send = jest.fn();

        // db.getCustomerSync = function(customerId) {
        //     return {email: 'a', };
        // }
        // let mailSent = false;

        // mail.send = function(email, message) {
        //     mailSent = true;
        // }
        // lib.notifyCustomer({ customerId: 1});
        // expect(mailSent).toBe(true);

        lib.notifyCustomer({ customerId: 1});
        expect(mail.send).toHaveBeenCalled();
        expect(mail.send.mock.calls[0][0]).toBe('a');
        expect(mail.send.mock.calls[0][1]).toMatch(/order/);
    });
});