import type { CountryRawDto } from "./mapCountry.dto";

export const searchCountries = async (
  _query: string,
  _signal: AbortSignal
): Promise<Array<CountryRawDto>> => {
  return [];
};
