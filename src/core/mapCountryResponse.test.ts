import { describe, expect, it } from "vitest";
import { mapCountryResponse } from "./mapCountryResponse";
import type { CountryRawDto } from "./mapCountry.dto";

const raw: CountryRawDto = {
  area: 0,
  cioc: "XXX",
  flag: "xx",
  gini: 0.0,
  name: "Xxxxxxx",
  flags: {
    png: "https://example.com/image.png",
    svg: "https://example.com/image.svg",
  },
  latlng: [0, 0],
  region: "Xxxxxx",
  borders: ["XXX", "XXX", "XXX", "XXX", "XXX"],
  capital: "Xxxxx",
  demonym: "Xxxxxxxxxx",
  languages: [
    {
      name: "Xxxxxxxxxx",
      iso639_1: "xx",
      iso639_2: "xxx",
      nativeName: "xxxxxxxxx xxxx",
    },
  ],
  subregion: "Eastern Europe",
  timezones: ["UTC+00:00"],
  alpha2Code: "XX",
  alpha3Code: "XXX",
  currencies: [{ code: "XXX", name: "Xxx Xxxxxxxxxx xxxxx", symbol: "Xx" }],
  nativeName: "Xxxxxxxx",
  population: 0,
  independent: true,
  numericCode: "123",
  callingCodes: ["111"],
  topLevelDomain: [".com"],
  populationDensity: 0.0,
};

describe("mapCountryResponse", () => {
  it("convert RAW", () => {
    const result = mapCountryResponse(raw);
    expect(result).toEqual({
      area: 0,
      name: "Xxxxxxx",
      flagSrc: "https://example.com/image.png",
      region: "Xxxxxx",
      borders: ["XXX", "XXX", "XXX", "XXX", "XXX"],
      capital: "Xxxxx",
      timezones: ["UTC+00:00"],
      population: 0,
      callingCodes: ["111"],
      topLevelDomain: [".com"],
      populationDensity: 0.0,
    });
  });

  it("does not mutate the input DTO", () => {
    const snapshot = structuredClone(raw);
    mapCountryResponse(raw);
    expect(raw).toEqual(snapshot);
  });
});
