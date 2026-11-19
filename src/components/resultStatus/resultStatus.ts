import "./resultStatus.css";

export const resultStatus = (): HTMLDivElement => {
  const div = document.createElement("div");
  div.setAttribute("id", "result_count");
  div.classList.add("result_count__wrapper");
  return div;
};

export const resultStatusWithSearchText = (): void => {
  const selector = "#result_count";
  const div = document.querySelector(selector);
  if (!div) {
    throw new Error(`Node is not found: ${selector}`);
  }

  div.replaceChildren();
  const d = document.createElement("div");
  d.classList.add("info");

  d.textContent =
    "Начните вводить название страны, чтобы увидеть список стран по части слова";

  div.appendChild(d);
};

export const resultStatusWithNoInterner = () => {
  resultStatusWithException(
    "Нет возможности связаться с сервером. У вас включен интеренет?"
  );
};

export const resultStatusWithException = (message: string) => {
  const selector = "#result_count";
  const div = document.querySelector(selector);
  if (!div) {
    throw new Error(`Node is not found: ${selector}`);
  }

  div.replaceChildren();

  const d = document.createElement("div");
  d.classList.add("danger");

  d.textContent = message;

  div.appendChild(d);
};

export const resultStatusAbort = () => {
  const selector = "#result_count";
  const div = document.querySelector(selector);
  if (!div) {
    throw new Error(`Node is not found: ${selector}`);
  }

  div.replaceChildren();

  const d = document.createElement("div");
  d.classList.add("info");

  d.textContent = "AbortError (не ошибка) - мы отменили запрос";

  div.appendChild(d);
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

  div.replaceChildren();

  const d = document.createElement("div");

  if (count === 0) {
    d.classList.add("danger");
    d.append("Ничего не найдено. Попробуйте ввести что-то другое...");
    d.appendChild(br);
    d.append("Вы искали: ");
    d.appendChild(bSearch);
    div.appendChild(d);
    return;
  }

  d.classList.add("success");
  d.append("Найдено ");
  d.appendChild(bCount);
  d.appendChild(br);
  d.append("Вы искали: ");
  d.appendChild(bSearch);
  div.appendChild(d);
};

export const setStatusIsLoading = (): void => {
  const selector = "#result_count";
  const div = document.querySelector(selector);
  if (!div) {
    throw new Error(`Node is not found: ${selector}`);
  }

  div.replaceChildren();

  const d = document.createElement("div");
  d.classList.add("light");

  const span = document.createElement("span");
  span.classList.add("loader");

  d.appendChild(span);

  div.appendChild(d);
};
