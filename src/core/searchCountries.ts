import { HttpError } from "./HttpError";
import type { CountryRawDto } from "./mapCountry.dto";

export const searchCountries = async (
  query: string,
  signal: AbortSignal
): Promise<Array<CountryRawDto>> => {
  const res = await fetch(
    `https://countries.dev/name/${encodeURIComponent(query)}`,
    { signal }
  );

  if (res.status === 404) {
    return [];
  }

  if (!res.ok) {
    throw new HttpError(res.status);
  }

  return res.json() as Promise<Array<CountryRawDto>>;
};
