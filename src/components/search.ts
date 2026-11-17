import "./search.css";
import { debounce } from "../core/debounce";
import { searchCountries } from "../core/searchCountries";
import { setIsLoading, setCancelLoading, renderResults } from "./result";

export const search = (): HTMLInputElement => {
  const input = document.createElement("input");
  input.setAttribute("type", "search");
  input.setAttribute("placeholder", "Введите название страны: S, SP, SPAIN");
  input.classList.add("search__input");

  let current: AbortController | null = null;

  const runSearch = debounce(async (query: string) => {
    current?.abort();
    const c = new AbortController();
    current = c;

    try {
      setIsLoading();
      const countries = await searchCountries(query, c.signal);
      setCancelLoading();
      renderResults(countries);
    } catch (e) {
      if ((e as Error).name === "AbortError") return;
      throw e;
    }
  }, 1000);

  input.addEventListener("input", () => {
    runSearch(input.value.trim());
  });

  return input;
};
