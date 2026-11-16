import { describe, it, expect } from "vitest";
import { HttpError } from "./HttpError";

describe("HttpError", () => {
  it("is an Error carrying the HTTP status", () => {
    const error = new HttpError(500);
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(HttpError);
    expect(error.name).toBe("HttpError");
    expect(error.status).toBe(500);
  });

  it("uses a default message based on status", () => {
    const error = new HttpError(500);
    expect(error.message).toBe("HTTP 500");
  });

  it("can be thrown and caught as HttpError", () => {
    const thrown = () => {
      throw new HttpError(500);
    };
    expect(thrown).toThrow(HttpError);
  });
});
