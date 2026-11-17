import type { CountryDto, CountryRawDto } from "../../core/mapCountry.dto";
import { mapCountryResponse } from "../../core/mapCountryResponse";
import "./result.css";

export const result = (): HTMLDivElement => {
  const div = document.createElement("div");
  div.setAttribute("id", "result_block");
  return div;
};

export const renderResults = (rawArray: Array<CountryRawDto>) => {
  const selecter = "#result_block";
  const div = document.querySelector(selecter);
  if (!div) {
    throw new Error(`Node is not found: ${selecter}`);
  }

  div.replaceChildren();

  div.classList.add("result__wrapper");

  for (let i = 0; i < rawArray.length; i++) {
    const country = mapCountryResponse(rawArray[i]);
    div.appendChild(getElementBlock(country));
  }
};

const getImg = (imgSrc: string): HTMLImageElement => {
  const img = document.createElement("img");
  img.setAttribute("src", imgSrc);
  return img;
};

const getImageBlock = (imgSrc: string): HTMLDivElement => {
  const div = document.createElement("div");
  div.classList.add("result__image_block");
  div.appendChild(getImg(imgSrc));
  return div;
};

const getTextBlock = (country: CountryDto): HTMLDivElement => {
  const div = document.createElement("div");
  div.classList.add("result__text_block");
  div.textContent = country.name;
  return div;
};

const getElementBlock = (country: CountryDto): HTMLDivElement => {
  const div = document.createElement("div");
  div.classList.add("result__element_block");
  div.appendChild(getImageBlock(country.flagSrc));
  div.appendChild(getTextBlock(country));
  div.addEventListener("click", () => openModal(country));
  return div;
};

const openModal = (country: CountryDto): void => {
  alert(
    [
      `Страна: ${country.name}`,
      `Площадь: ${country.area}`,
      `Численость населения: ${country.population}`,
      `Плотность населения: ${country.populationDensity}`,
      `Регион: ${country.region}`,
      `Домен: ${country.topLevelDomain.join(", ")}`,
    ].join("\n")
  );
};
