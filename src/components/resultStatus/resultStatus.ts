import "./resultStatus.css";

export const resultStatus = (): HTMLDivElement => {
  const div = document.createElement("div");
  div.setAttribute("id", "result_count");
  div.classList.add("result_count__wrapper");
  div.classList.add("info");
  return div;
};

export const resultStatusWithSearchText = (): void => {
  const selector = "#result_count";
  const div = document.querySelector(selector);
  if (!div) {
    throw new Error(`Node is not found: ${selector}`);
  }

  div.replaceChildren();
  div.textContent =
    "Начните вводить название страны, чтобы увидеть список стран по части слова";
};

export const resultStatusWithCount = (count: number, search: string): void => {
  const selector = "#result_count";
  const div = document.querySelector(selector);
  if (!div) {
    throw new Error(`Node is not found: ${selector}`);
  }

  const bCount = document.createElement("b");
  bCount.textContent = `${count} шт.`;

  const bSearch = document.createElement("b");
  bSearch.textContent = `"${search}"`;

  const br = document.createElement("br");

  if (count === 0) {
    div.replaceChildren();
    div.append("Ничего не найдено. Попробуйте ввести что-то другое...");
    div.appendChild(br);
    div.append("Вы искали: ");
    div.appendChild(bSearch);
    return;
  }

  div.replaceChildren();
  div.append("Найдено ");
  div.appendChild(bCount);
  div.appendChild(br);
  div.append("Вы искали: ");
  div.appendChild(bSearch);
};

export const setStatusIsLoading = (): void => {
  const selector = "#result_count";
  const div = document.querySelector(selector);
  if (!div) {
    throw new Error(`Node is not found: ${selector}`);
  }

  div.replaceChildren();

  const span = document.createElement("span");
  span.classList.add("loader");

  div.appendChild(span);
};
