import { it, expect, describe } from "vitest";
import { fizzBuzz, max } from "../src/intro";
describe("max", () => {
  it("should return first argument if it greater", () => {
    // // vitest followS AAA

    // // Arrange
    // const a = 5;
    // const b = 3;

    // // Act
    // const result = max(a, b);

    // // Assert
    // expect(result).toBe(5);

    expect(max(5, 2)).toBe(5);
    expect(max(3, 1)).toBe(3);
    expect(max(13, 11)).toBe(13);
  });
  it("should return second argument if it greater than first ", () => {
    expect(max(5, 12)).toBe(12);
    expect(max(15, 112)).toBe(112);
    expect(max(54, 124)).toBe(124);
  });
  it("should return same argument if both are equal ", () => {
    expect(max(5, 5)).toBe(5);
    expect(max(112, 112)).toBe(112);
  });
  it("should handle cases with negative numbers", () => {
    expect(max(-10, -2)).toBe(-2);
    expect(max(-5, -4)).toBe(-4);
  });

  it("should return second argument if it greater than first ", () => {
    expect(max(5, 12)).toBe(12);
    expect(max(15, 112)).toBe(112);
    expect(max(54, 124)).toBe(124);
  });
});

describe("fizzBuzz", () => {
  it('should return "FizzBuzz" if n is divisible by 3 and 5 both', () => {
    expect(fizzBuzz(15)).toBe("FizzBuzz");
    expect(fizzBuzz(30)).toBe("FizzBuzz");
    expect(fizzBuzz(45)).toBe("FizzBuzz");
  });

  it('should return "Fizz" if n is only divisible by 3', () => {
    expect(fizzBuzz(3)).toBe("Fizz");
    expect(fizzBuzz(9)).toBe("Fizz");
    expect(fizzBuzz(27)).toBe("Fizz");
  });

  it('should return "Buzz" if n is only divisible by 5', () => {
    expect(fizzBuzz(10)).toBe("Buzz");
    expect(fizzBuzz(25)).toBe("Buzz");
    expect(fizzBuzz(50)).toBe("Buzz");
  });

  it("should return n as string if n is not divisible by 3 or 5", () => {
    expect(fizzBuzz(1)).toBe("1");
    expect(fizzBuzz(4)).toBe("4");
    expect(fizzBuzz(34)).toBe("34");
  });
});
