import "./search.css";
import { debounce } from "../../core/debounce";
import { searchCountries } from "../../core/searchCountries";
import { renderResults } from "../result/result";
import {
  resultStatusWithCount,
  resultStatusWithException,
  resultStatusWithNoInterner,
  resultStatusWithSearchText,
  setStatusIsLoading,
} from "../resultStatus/resultStatus";
import { addToHistorySearch } from "../../state/historySearch";
import { renderHistorySearch } from "../historySearch/historySearch";

let runSearchRef: ((q: string) => void) | null = null;

export const repeatSearch = (query: string): void => {
  runSearchRef?.(query);
};

export const search = (): HTMLInputElement => {
  const input = document.createElement("input");
  input.setAttribute("type", "search");
  input.setAttribute("placeholder", "Введите название страны: S, SP, SPAIN");
  input.classList.add("search__input");

  let current: AbortController | null = null;

  const runSearch = debounce(async (query: string) => {
    runSearchRef = runSearch;
    if (query.length === 0) {
      resultStatusWithSearchText();
      renderResults([]);
      return;
    }
    const c = new AbortController();
    current = c;

    const TIMEOUT = 5000;

    try {
      setStatusIsLoading();
      renderResults([]);
      addToHistorySearch(query);
      renderHistorySearch();
      renderRetryButton(() => runSearch(query), query);
      await new Promise((resolve) => setTimeout(resolve, 500));

      const timeoutSignal = AbortSignal.timeout(TIMEOUT);
      const signal = AbortSignal.any([c.signal, timeoutSignal]);

      const countries = await searchCountries(query, signal);
      renderResults(countries);
      resultStatusWithCount(countries.length, query);
    } catch (exception) {
      if ((exception as Error).name === "AbortError") {
        resultStatusWithException("Отмена fetch (AbortError)");
        return;
      }

      if (exception instanceof Error && exception.name === "TimeoutError") {
        renderResults([]);
        resultStatusWithException(
          `Запрос очень долго выполняется. Превышено время: ${TIMEOUT}ms`
        );
        return;
      }

      if (
        exception instanceof Error &&
        exception.name === "TypeError" &&
        exception.message === "Failed to fetch"
      ) {
        renderResults([]);
        resultStatusWithNoInterner();
        return;
      }

      renderResults([]);
      resultStatusWithException(`${exception}`);
    }
  }, 1000);

  input.addEventListener("input", () => {
    current?.abort();
    current = null;
    runSearch(input.value.trim());
  });

  runSearch("");

  return input;
};

export const renderRetryButton = (onRetry: () => void, query: string): void => {
  const selector = "#rebeat_button";
  const div = document.querySelector(selector);
  if (!div) {
    throw Error(`Node is not found: ${selector}`);
  }

  div.replaceChildren();

  const btn = document.createElement("button");
  btn.type = "button";
  btn.textContent = `Повторить "${query}"`;
  btn.addEventListener("click", onRetry);

  div.append(btn);
};
