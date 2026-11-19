import { getHistorySearch } from "../../state/historySearch";
import { repeatSearch } from "../search/search";

export const historySearch = (): HTMLDivElement => {
  const div = document.createElement("div");
  div.setAttribute("id", "history");
  div.classList.add("history__wrapper");
  div.classList.add("info");
  return div;
};

export const renderHistorySearch = (): void => {
  const selector = "#history";
  const div = document.querySelector(selector);
  if (!div) {
    throw new Error(`Node is not found: ${selector}`);
  }

  const historyArray = getHistorySearch();

  if (historyArray.length == 0) {
    div.replaceChildren();
    div.textContent = "История поиска пуста";
    return;
  }

  div.replaceChildren();
  div.append("Десять последних запросов:");
  historyArray.reverse().forEach((e) => {
    const button = document.createElement("button");
    button.textContent = e;
    button.addEventListener("click", () => repeatSearch(e));
    div.appendChild(button);
  });
};
