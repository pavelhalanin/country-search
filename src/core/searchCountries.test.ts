import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { HttpError } from "./HttpError";
import { searchCountries } from "./searchCountries";

function mockResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

describe("searchCountries", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns the parsed countries array on 200", async () => {
    const countries = [{ name: "France" }, { name: "Finland" }];
    vi.mocked(fetch).mockResolvedValue(mockResponse(countries));

    const result = await searchCountries("fi", new AbortController().signal);

    expect(result).toEqual(countries);
  });

  it("returns an empty array on 404", async () => {
    vi.mocked(fetch).mockResolvedValue(mockResponse({}, 404));

    const result = await searchCountries("xx", new AbortController().signal);

    expect(result).toEqual([]);
  });

  it("throws HttpError", async () => {
    vi.mocked(fetch).mockResolvedValue(mockResponse({}, 500));

    await expect(
      searchCountries("xx", new AbortController().signal)
    ).rejects.toBeInstanceOf(HttpError);
  });

  it("propagates network errors from fetch", async () => {
    vi.mocked(fetch).mockRejectedValue(new TypeError("Failed to fetch"));

    await expect(
      searchCountries("xx", new AbortController().signal)
    ).rejects.toThrow("Failed to fetch");
  });

  it("rejects with AbortError when the signal is aborted", async () => {
    const controller = new AbortController();

    vi.mocked(fetch).mockImplementation((_url, init) => {
      return new Promise((_resolve, reject) => {
        init?.signal?.addEventListener("abort", () => {
          reject(new DOMException("Aborted", "AbortError"));
        });
      });
    });

    const promise = searchCountries("xx", controller.signal);
    controller.abort();

    await expect(promise).rejects.toHaveProperty("name", "AbortError");
  });
});
