import {
  historySearch,
  renderHistorySearch,
} from "./historySearch/historySearch";
import { repeatButton } from "./repeatButton/repeatButton";
import { result } from "./result/result";
import {
  resultStatus,
  resultStatusWithSearchText,
} from "./resultStatus/resultStatus";
import { search } from "./search/search";

export const app = () => {
  const selector = "#app";
  const div = document.querySelector(selector);
  if (!div) {
    throw new Error(`Node is not found: ${selector}`);
  }

  div.appendChild(search());
  div.appendChild(resultStatus());
  div.appendChild(historySearch());
  div.appendChild(repeatButton());
  div.appendChild(result());
  resultStatusWithSearchText();
  renderHistorySearch();
};
