import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { searchCountries } from "./searchCountries";

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

const flush = () => new Promise<void>((r) => setTimeout(r, 0));

describe("old request is aborted and does not overwrite result", () => {
  beforeEach(() => vi.stubGlobal("fetch", vi.fn()));
  afterEach(() => vi.unstubAllGlobals());

  it("shows only the result of the last request when typing s -> spain", async () => {
    const signals: AbortSignal[] = [];
    const resolvers: Array<(body: unknown) => void> = [];

    vi.mocked(fetch).mockImplementation((_url, init) => {
      const signal = init!.signal as AbortSignal;
      signals.push(signal);

      return new Promise<Response>((resolve, reject) => {
        const onAbort = () => reject(new DOMException("Aborted", "AbortError"));

        if (signal.aborted) return onAbort();
        signal.addEventListener("abort", onAbort, { once: true });

        resolvers.push((body) => resolve(jsonResponse(body)));
      });
    });

    let displayed: unknown[] = [];
    let current: AbortController | null = null;

    async function search(query: string): Promise<void> {
      current?.abort();
      const c = new AbortController();
      current = c;
      try {
        displayed = await searchCountries(query, c.signal);
      } catch (e) {
        if ((e as Error).name === "AbortError") return;
        throw e;
      }
    }

    void search("s");
    void search("spain");

    expect(signals).toHaveLength(2);
    expect(signals[0].aborted).toBe(true);
    expect(signals[1].aborted).toBe(false);

    resolvers[1]([{ name: "Spain" }]);
    await flush();
    expect(displayed).toEqual([{ name: "Spain" }]);

    resolvers[0]([{ name: "Sweden" }]);
    await flush();

    expect(displayed).toEqual([{ name: "Spain" }]);
  });
});
