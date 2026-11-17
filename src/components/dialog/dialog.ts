import type { CountryDto } from "../../core/mapCountry.dto";
import "./dialog.css";

export const openModal = (country: CountryDto): void => {
  const dialog = document.createElement("dialog");
  dialog.setAttribute("id", "country_modal");
  dialog.classList.add("country_modal");

  document.querySelectorAll("#country_modal").forEach((e) => e.remove());

  dialog.appendChild(closeModalButton());

  [
    `Страна: ${country.name}`,
    `Площадь: ${country.area}`,
    `Численость населения: ${country.population}`,
    `Плотность населения: ${country.populationDensity}`,
    `Регион: ${country.region}`,
    `Домен: ${country.topLevelDomain.join(", ")}`,
  ].forEach((e) => {
    const div = document.createElement("div");
    div.textContent = e;
    dialog.appendChild(div);
  });

  document.body.append(dialog);

  dialog.showModal();
};

export const closeModal = (): void => {
  const selector = "#country_modal";
  const dialog = document.querySelector(selector);
  if (dialog instanceof HTMLDialogElement) {
    dialog.close();
  }
  document.querySelectorAll("#country_modal").forEach((e) => e.remove());
};

export const closeModalButton = (): HTMLButtonElement => {
  const button = document.createElement("button");
  button.classList.add("country_modal__close_button");
  button.addEventListener("click", () => closeModal());
  button.textContent = "x";
  return button;
};
