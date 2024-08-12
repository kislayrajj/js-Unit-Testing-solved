import { it, expect, describe, beforeEach } from "vitest";
import {
  calculateDiscount,
  canDrive,
  createProduct,
  fetchData,
  getCoupons,
  isPriceInRange,
  isStrongPassword,
  isValidUsername,
  Stack,
  validateUserInput,
} from "../src/core";

describe("getCoupons", () => {
  it("should return an array of coupons", () => {
    // const coupons = getCoupons();
    expect(Array.isArray(getCoupons())).toBe(true);
    expect(getCoupons()).toHaveLength(2);
    expect(getCoupons()[0]).toEqual({ code: "SAVE20NOW", discount: 0.2 });
    expect(getCoupons()[1]).toEqual({ code: "DISCOUNT50OFF", discount: 0.5 });
  });
});

describe("calculateDiscount", () => {
  it('should return "Invalid price" if price is invalid ', () => {
    expect(calculateDiscount("abc", "SAVE20")).toBe("Invalid price");
    expect(calculateDiscount(true, "SAVE20")).toBe("Invalid price");
  });
  it('should return "Invalid discount code" if code is invalid ', () => {
    expect(calculateDiscount(200, 20)).toBe("Invalid discount code");
    expect(calculateDiscount(180, true)).toBe("Invalid discount code");
  });

  it("should return 10% discount", () => {
    expect(calculateDiscount(100, "SAVE10")).toBe(90);
    expect(calculateDiscount(200, "SAVE10")).toBe(180);
    expect(calculateDiscount(150, "SAVE10")).toBe(135);
  });

  it("should return 20% discount", () => {
    expect(calculateDiscount(100, "SAVE20")).toBe(80);
    expect(calculateDiscount(200, "SAVE20")).toBe(160);
    expect(calculateDiscount(150, "SAVE20")).toBe(120);
  });
});

describe("validateUserInput", () => {
  it('should return "Invalid username"', () => {
    expect(validateUserInput(1234, 23)).toBe("Invalid username");
    expect(validateUserInput(true, 23)).toBe("Invalid username");
    expect(validateUserInput("kr", 23)).toBe("Invalid username");
  });
  it('should return "Invalid age"', () => {
    expect(validateUserInput("John", 2)).toBe("Invalid age");
    expect(validateUserInput("Jackson", "Abc")).toBe("Invalid age");
    expect(validateUserInput("raj", "12")).toBe("Invalid age");
  });

  it('should return "Validation successful"', () => {
    expect(validateUserInput("John", 2)).toBe("Invalid age");
    expect(validateUserInput("Jackson", "Abc")).toBe("Invalid age");
    expect(validateUserInput("raj", "12")).toBe("Invalid age");
  });
});

describe("isPriceRange", () => {
  it("should return true if price is equal to max ", () => {
    expect(isPriceInRange(20, 5, 20)).toBe(true);
    expect(isPriceInRange(26, 5, 26)).toBe(true);
  });

  it("should return true if price is less than max ", () => {
    expect(isPriceInRange(10, 5, 20)).toBe(true);
    expect(isPriceInRange(6, 5, 26)).toBe(true);
  });
  it("should return true if price is equal to min ", () => {
    expect(isPriceInRange(5, 5, 20)).toBe(true);
    expect(isPriceInRange(3, 3, 6)).toBe(true);
  });
  it("should return true if price is greater than min ", () => {
    expect(isPriceInRange(100, 51, 200)).toBe(true);
    expect(isPriceInRange(6, 1, 26)).toBe(true);
  });

  it("should return false price is less than min", () => {
    expect(isPriceInRange(23, 40, 80)).toBe(false);
    expect(isPriceInRange(230, 400, 800)).toBe(false);
  });

  it("should return false price is greater than max", () => {
    expect(isPriceInRange(230, 40, 80)).toBe(false);
    expect(isPriceInRange(1230, 400, 800)).toBe(false);
  });
});

describe("isValidUsername", () => {
  it("should return true if length of username is equal to minimum length ", () => {
    expect(isValidUsername("user1")).toBe(true);
    expect(isValidUsername("userA")).toBe(true);
    expect(isValidUsername("kRaj2")).toBe(true);
  });

  it("should return true if length of username is equal to max length", () => {
    expect(isValidUsername("hiThisIsNewUser")).toBe(true);
    expect(isValidUsername("thisIsNewUser12")).toBe(true);
    expect(isValidUsername("userKislayRaj89")).toBe(true);
  });
  it("should return true if length of username is in valid range", () => {
    expect(isValidUsername("userK89")).toBe(true);
    expect(isValidUsername("johnDoe99")).toBe(true);
    expect(isValidUsername("robertP45")).toBe(true);
  });
  it("should return false if length of username is less than minimum length", () => {
    expect(isValidUsername("user")).toBe(false);
    expect(isValidUsername("u")).toBe(false);
    expect(isValidUsername("hi12")).toBe(false);
  });
  it("should return false if length of username is greater than max length", () => {
    expect(
      isValidUsername("hiThisUserNameIsGreaterInLengthThanMaxLength")
    ).toBe(false);
    expect(isValidUsername("thisIsNewUser1234567890")).toBe(false);
    expect(isValidUsername("userKislayRaj1234567890")).toBe(false);
  });
});

describe("canDrive", () => {
  it("should return true if age is equal to legal driving age for US ", () => {
    expect(canDrive(16, "US")).toBe(true);
  });
  it("should return true if age is greater than legal driving age for US", () => {
    expect(canDrive(25, "US")).toBe(true);
    expect(canDrive(30, "US")).toBe(true);
    expect(canDrive(75, "US")).toBe(true);
  });
  it("should return true if age is equal to legal driving age for UK ", () => {
    expect(canDrive(17, "UK")).toBe(true);
  });
  it("should return true if age is greater than legal driving age for UK", () => {
    expect(canDrive(20, "UK")).toBeTruthy(); //should use toBe(true) to check true because toBeTruthy can be any truthy value other than true such as non-empty, non-zero and all
    expect(canDrive(25, "UK")).toBe(true);
    expect(canDrive(70, "UK")).toBe(true);
  });
  it("should return false if age is less than legal driving age for US ", () => {
    expect(canDrive(15, "US")).toBe(false);
    expect(canDrive(10, "US")).toBe(false);
  });
  it("should return false if age is less than legal driving age for UK ", () => {
    expect(canDrive(16, "UK")).toBeFalsy();
    expect(canDrive(6, "UK")).toBe(false);
  });
  it("should return false if country is not supported ", () => {
    expect(canDrive(20, "Canada")).toBe("Invalid country code");
    expect(canDrive(25, "Germany")).toBe("Invalid country code");
  });
});

describe("fetchData", () => {
  it("should resolve with the expected data", async () => {
    // const  data = await fetchData()
    expect(Array.isArray(await fetchData())).toBeTruthy();
    expect(await fetchData()).toEqual([1, 2, 3]);
  });

  it("should return a promise", () => {
    expect(fetchData()).toBeInstanceOf(Promise);
  });
});

describe("Stack", () => {
  let stack;
  beforeEach(() => {
    stack = new Stack();
  });
  it("should be empty on creation", () => {
    expect(stack.isEmpty()).toBe(true);
  });
  it("should push items correctly", () => {
    stack.push(14);
    expect(stack.isEmpty()).toBe(false);
    expect(stack.size()).toBe(1);
    expect(stack.peek()).toBe(14);
  });
  it("should delete item correctly", () => {
    stack.push(1);
    const popItem = stack.pop();
    expect(popItem).toBe(1);
    expect(stack.size()).toBe(0);
    expect(stack.isEmpty()).toBe(true);
  });
  it("should throw error on delete item when stack is empty", () => {
    stack.push(10); // added one item ie. stack has only one item
    stack.pop(); // remove only available item i.e. stack is empty now
    const popOnEmpty = () => stack.pop();
    expect(popOnEmpty).toThrow("Stack is empty");
    // expect(() => stack.pop()).toThrowError('Stack is empty') // one liner
  });
  it("should peek correctly i.e. return top most item", () => {
    stack.push(15);
    stack.push(20);
    expect(stack.peek()).toBe(20);
  });
  it("should throw error when using peek on empty stack", () => {
    // no pushing i.e. stack is empty
    // const peekOnEmptyStack = ()=> stack.peek();
    // expect(peekOnEmptyStack).toThrow("Stack is empty")

    expect(() => stack.peek()).toThrow("Stack is empty"); // one liner
  });

  it("should return empty when stack is empty", () => {
    expect(stack.isEmpty()).toBe(true);
  });

  it("should return size of the stack", () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect(stack.size()).toBe(3);
  });

  it("should clear the stack on clear", () => {
    stack.push(1);
    stack.push(34);
    stack.push(451);
    stack.clear();
    expect(stack.isEmpty()).toBe(true);
  });
});

describe("createProduct", () => {
  it("should return error object when product name is not available", () => {
    const product = [{ price: 100 }, { price: 560 }, { price: 10 }];
    // const argument= createProduct(product)
    const error = {
      success: false,
      error: { code: "invalid_name", message: "Name is missing" },
    };
    expect(createProduct(product[0])).toEqual(error);
    expect(createProduct(product[1])).toEqual(error);
    expect(createProduct(product[2])).toEqual(error);
    //one liner
    // expect(createProduct({ name:"",price:100})).toEqual({
    //   success: false,
    //   error: { code: 'invalid_name', message: 'Name is missing' }
    // })

    // expect(createProduct({price:1400})).toEqual({
    //   success: false,
    //   error: { code: 'invalid_name', message: 'Name is missing' }
    // })
  });
  it("should return error object when product price is less than or equal to 0", () => {
    expect(createProduct({ name: "Pen", price: 0 })).toEqual({
      success: false,
      error: { code: "invalid_price", message: "Price is missing" },
    });
    expect(createProduct({ name: "Pencil", price: -1 })).toEqual({
      success: false,
      error: { code: "invalid_price", message: "Price is missing" },
    });
    expect(createProduct({ name: "Car", price: -34 })).toEqual({
      success: false,
      error: { code: "invalid_price", message: "Price is missing" },
    });
  });

  it("should return successful when product name and price is valid", () => {
    expect(createProduct({ name: "Pen", price: 10 })).toEqual({
      success: true,
      message: "Product was successfully published",
    });
    expect(createProduct({ name: "Notebook", price: 70 })).toEqual({
      success: true,
      message: "Product was successfully published",
    });
  });
});

describe('isStrongPassword', () => {
  it('should return false if password length is less than 8', () => {
    expect(isStrongPassword('abc')).toBe(false);
    expect(isStrongPassword('abc123')).toBe(false);
    expect(isStrongPassword('weakPass')).toBe(false);
  })

  it('should return false if password does not contain any uppercase letter', () => {
    expect(isStrongPassword('abc1234')).toBe(false);
    expect(isStrongPassword('xyz123')).toBe(false);
    expect(isStrongPassword('bcd99')).toBe(false);
  })
  it('should return false if password does not contain any lowercase letter', () => {
    expect(isStrongPassword('ABC1234')).toBe(false);
    expect(isStrongPassword('XYZ123')).toBe(false);
    expect(isStrongPassword('BCD99')).toBe(false);
  })
  it('should return false if password does not contain any digit', () => {
    expect(isStrongPassword('abcABC')).toBe(false);
    expect(isStrongPassword('xyzABC')).toBe(false);
    expect(isStrongPassword('bcdABC')).toBe(false);
  })
  it('should return true if password contain lowercase, uppercase and number(s), i.e., all criteria are met', () => {
    expect(isStrongPassword('abcABC123')).toBe(true);
    expect(isStrongPassword('xyzABC123')).toBe(true);
    expect(isStrongPassword('bcdABC123#')).toBe(true);
  })
})

