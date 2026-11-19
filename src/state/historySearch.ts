export const getHistorySearch = (): Array<string> => {
  try {
    const value = localStorage.getItem("history");
    if (!value) {
      return [];
    }

    const obj = JSON.parse(value);
    if (Array.isArray(obj)) {
      return filterHistorySearch(obj.filter((e) => typeof e === "string"));
    }

    return [];
  } catch (_exception) {
    return [];
  }
};

export const filterHistorySearch = (arr: Array<string>): Array<string> => {
  const newArray: Array<string> = [];
  const dict: Record<string, 1> = {};
  for (let i = 0; i < arr.length; i++) {
    const key = arr[i];

    if (dict[key] != 1) {
      newArray.push(key);
    }

    dict[key] = 1;
  }

  const historySize = 5;
  if (newArray.length > historySize) {
    return newArray.slice(1).slice(0, historySize);
  }

  return newArray;
};

export const addToHistorySearch = (value: string): void => {
  const arr = getHistorySearch();
  arr.push(value);
  localStorage.setItem("history", JSON.stringify(arr));
};
