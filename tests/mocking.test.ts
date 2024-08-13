import { it, expect, describe, vi } from "vitest";
import { getExchangeRate } from "../src/libs/currency";
import { getPriceInCurrency, getShippingInfo } from "../src/mocking";
import { getShippingQuote } from "../src/libs/shipping";

vi.mock("../src/libs/currency");
vi.mock("../src/libs/shipping.js");

describe("mocking test", () => {
  it(" exemplary test case", () => {
    const greet = vi.fn();

    //mockReturnvalue
    // greet.mockReturnValue("Hello")
    // greet.mockReturnValue("Hello")
    // const result = greet()
    // mockResolvedValue to get promise
    // greet.mockResolvedValue("Hello")
    // greet().then((result: string) => console.log(result))

    //mockImplementation to implement some logic
    // greet.mockImplementation((name) => "Hello " + name);
    // const result = greet("Jack");
    // console.log(result);

    // Q. create a mock for sending text and checking ig received
    //  create a mock fn
    const sendText = vi.fn();
    sendText.mockReturnValue("ok");

    // call the mock fn
    const result = sendText("message");

    //Assert that the mock function is called
    expect(sendText).toHaveBeenCalledWith("message");

    //Assert that the result is "ok"
    expect(result).toEqual("ok");
  });
});

// mocking tests

describe("getPriceInCurrency", () => {
  it("should return price in target currency", () => {
    vi.mocked(getExchangeRate).mockReturnValue(1.5);
    const price = getPriceInCurrency(10, "AUD");
    expect(price).toBe(15);
  });
});

describe('getShippingInfo', () => {
  it('should return unavailable', () => {
    vi.mocked(getShippingQuote).mockReturnValue(null)
    const result = getShippingInfo("New York")
    expect(result).toMatch(/unavailable/i)
  })
  it('should return shipping info when destination is found', () => {
    vi.mocked(getShippingQuote).mockReturnValue({cost: 300, estimatedDays:2})
    const result = getShippingInfo("Delhi")
    expect(result).toMatch("$300")
    expect(result).toMatch(/2 days/i)

    //or

    expect(result).toMatch(/shipping cost: \$300 \(2 days\)/i)
  })
})
