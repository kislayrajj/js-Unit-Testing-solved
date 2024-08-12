import { it, expect, describe, vi } from "vitest";
import { getExchangeRate } from "../src/libs/currency";
import { getPriceInCurrency } from "../src/mocking";
import { send } from "vite";

vi.mock("../src/libs/currency");

describe("mocking test", () => {
  it(" exemplary test case", () => {
    const greet = vi.fn();

    //mockReturnvalue
    // greet.mockReturnValue("Hello")
    // greet.mockReturnValue("Hello")
    // const result = greet()
    // console.log("👁️ -> it -> result:", result)

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
