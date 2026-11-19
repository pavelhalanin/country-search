import type { CountryRawDto } from "../core/mapCountry.dto";

export const getFetchCache = (search: string): Array<CountryRawDto> | null => {
  const cacheKey = `cache:${search}`;
  try {
    const value = localStorage.getItem(cacheKey);
    if (!value) {
      localStorage.removeItem(cacheKey);
      return null;
    }

    const obj = JSON.parse(value);
    if (Array.isArray(obj)) {
      return obj;
    }

    localStorage.removeItem(cacheKey);
    return [];
  } catch (_exception) {
    localStorage.removeItem(cacheKey);
    return null;
  }
};

export const addFetchCache = (
  search: string,
  arr: Array<CountryRawDto>
): void => {
  const cacheKey = `cache:${search}`;
  localStorage.setItem(cacheKey, JSON.stringify(arr));
};

export const isStringRecord = (
  value: unknown
): value is Record<string, string> => {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  const proto = Object.getPrototypeOf(value);
  if (proto !== Object.prototype && proto !== null) {
    return false;
  }

  return Object.values(value).every((v) => typeof v === "string");
};

export const getExpireCache = (): Record<string, string> => {
  const expireCache = localStorage.getItem("expireCache");
  if (!expireCache) {
    return {};
  }

  const obj: unknown = JSON.parse(expireCache);
  if (isStringRecord(obj)) {
    return obj;
  }

  return {};
};

export const addExpireTime = (search: string) => {
  const dict = getExpireCache();

  const date = new Date();
  date.setMinutes(date.getMinutes() + 5);

  dict[search] = date.toJSON();
  const searchCache = `search:${search}`;
  localStorage.setItem(searchCache, JSON.stringify(dict));
};
