## Обоснование механизма отмены и выбора задержки debounce

### Описание проблемы, которую решает debounce

Если пользователь вводит запрос:

1. s
2. sp
3. spa
4. spai
5. spain

То это еще не значит, что с сервера придут ответы в том же порядке.

Может отрисоваться spain, а потом прийти ответ от sp - и придется рисовать результаты для sp.
Тратится лишний раз интернет, а пользователь получает 5 раз мерцающий экран, который не гарантирует, что последний результат покажет spain.

### Решение пробемы

Функция debounce уменьшает количество запусков.

debounce(fn, delay) - выполняет функцию fn, если за время delay не было нового вызова. При вводи s -> sp -> spa -> spai -> spain - это схлопывает пять запусков в один. Промежуточные s, sp, spa, spai в сеть не уйдут

Функция debounce не отменяет уже запущенные запросы.

Debounce лишь откладывает слудющий запуск. Если предыдующий fetch еще выполняется, а пользователь дал следующий fetch, то два fetch дадут нам race condition. Ответ на belarus, может прийти раньше ответа spain - и на экране окажется устаревший результат.

Перед запуском нового поиска запускаем abort сигнал. Старый fetch прерывается. Он получет AbortError, который заглушим через catch. В любой момет времени активен только один запрос, а это один рендер.

Выбрано delay = 1000 мс - это порог между "пользователь ещё печатает" и "пользователь остановился". Меньше 200-300 мс - debounce почти не работает: пауза между символами успевает превысить delay и fn срабатывает на промежуточных s/sp/spa/spai. Больше 1500–2000 мс - воспринимается как "тормоза".

Итог: debounce уменьшает частоту запусков, AbortController убирает наложение уже запущенных fetch. Гарантия "один запрос — один рендер" достигается только связкой обеих техник.

## Сложность mapCountryResponse

Фунция mapCountryResponse из сырыых данные raw - возращает объект с нужными данными с типом interface CountryDto.

Обращения к полю имеет сложность O(1), то есть получим O(12).

Но если мы выполняем в цикле, то получаем O(1) + O(n * (1 + 1 + 1 + 12 + 1)) = O(1) + O(16n) = O(1 + 16n) ~= O(n)

```js
let i = 0; // O(1)
while (i < rawArray.length) { // O(n)
    const country = mapCountryResponse(rawArray[i]); // O(1) + O(1)
    div.appendChild(getElementBlock(country)); // O(1) + O(12)
    i = i + 1; // O(1)
}

export function mapCountryResponse(raw: CountryRawDto): CountryDto {
  return {
    area: raw.area, // O(1)
    name: raw.name, // O(1)
    flagSrc: raw.flags.png, // O(1) + O(1)
    region: raw.region, // O(1)
    borders: raw.borders, // O(1)
    capital: raw.capital, // O(1)
    timezones: raw.timezones, // O(1)
    population: raw.population, // O(1)
    callingCodes: raw.callingCodes, // O(1)
    topLevelDomain: raw.topLevelDomain, // O(1)
    populationDensity: raw.populationDensity, // O(1)
  };
}
```

Итог: функция mapCountryResponse в цикле имеет сложность O(1 + 16n), которая теоретически равна O(n).
