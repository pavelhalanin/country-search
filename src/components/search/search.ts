import "./search.css";
import { debounce } from "../../core/debounce";
import { searchCountries } from "../../core/searchCountries";
import { renderResults } from "../result/result";
import {
  resultStatusWithCount,
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
    current?.abort();
    if (query.length === 0) {
      resultStatusWithSearchText();
      renderResults([]);
      return;
    }
    const c = new AbortController();
    current = c;

    try {
      setStatusIsLoading();
      renderResults([]);
      addToHistorySearch(query);
      renderHistorySearch();
      renderRetryButton(() => runSearch(query), query);
      await new Promise((resolve) => setTimeout(resolve, 500));
      const countries = await searchCountries(query, c.signal);
      renderResults(countries);
      resultStatusWithCount(countries.length, query);
    } catch (e) {
      if ((e as Error).name === "AbortError") return;
      throw e;
    }
  }, 1000);

  input.addEventListener("input", () => {
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
