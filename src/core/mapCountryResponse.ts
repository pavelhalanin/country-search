import type { CountryDto, CountryRawDto } from "./mapCountry.dto";

export function mapCountryResponse(raw: CountryRawDto): CountryDto {
  return {
    area: raw.area,
    name: raw.name,
    flagSrc: raw.flags.png,
    region: raw.region,
    borders: raw.borders,
    capital: raw.capital,
    timezones: raw.timezones,
    population: raw.population,
    callingCodes: raw.callingCodes,
    topLevelDomain: raw.topLevelDomain,
    populationDensity: raw.populationDensity,
  };
}
