---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.skiinfo/README.md
title: ioBroker.skiinfo
hash: KVMaVpIWsAdC2QQh5H1LWJJq8CoeQtgP6zeJXB3j+2I=
---
# ioBroker.skiinfo

![Версия NPM](https://img.shields.io/npm/v/iobroker.skiinfo.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.skiinfo.svg)
![Количество установок](https://iobroker.live/badges/skiinfo-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/skiinfo-stable.svg)
![nycrc config на GitHub](https://img.shields.io/nycrc/oweitman/iobroker.skiinfo?preferredThreshold=functions)
![НПМ](https://nodei.co/npm/iobroker.skiinfo.png?downloads=true)
![Тестирование и выпуск](https://github.com/oweitman/ioBroker.skiinfo/workflows/Test%20and%20Release/badge.svg)

![Логотип](../../../en/adapterref/iobroker.skiinfo/admin/skiinfo.png)

## Адаптер skiinfo для ioBroker

С помощью этого адаптера вы можете получить доступ к информации о текущей глубине снега в горах, долинах и свежевыпавшем снегу, а также к данным об открытых подъемниках в различных европейских регионах.

## Конфигурация

Адаптер не требует никакой настройки.

## визуализация и виджеты

Следующие виджеты действительно существуют.

- [`Skiinfo browser`](#skiinfo-browser) - для просмотра всех доступных стран, регионов и областей и установки избранных регионов.
- [`Skiinfo Favorites`](#skiinfo-favorite) - отображать только самые популярные горнолыжные курорты.

дополнительная информация

- usabele[`CSS classes`](#css-classes) для индивидуального стиля

### браузер Skiinfo

Этот виджет позволяет просматривать все доступные страны, регионы и территории, а также добавлять их в избранное.

Вы можете переключать сортировку для каждого столбца (по умолчанию, по убыванию или по возрастанию) с помощью заголовка таблицы. Вы можете осуществлять поиск с помощью значка поиска в столбце «Области». Вы можете переключать режим избранного с помощью значка звездочки. Все записи можно свести в избранное для более быстрого поиска.

Выберите точку данных конфигурации в качестве точки данных.

### Любимый сайт Skiinfo

Этот виджет используется для отображения только избранных горнолыжных курортов. С помощью заголовка таблицы можно переключать режим сортировки для каждого столбца (по умолчанию, по убыванию, по возрастанию). С помощью значка звездочки можно удалить курорт из списка избранных.

В качестве точки данных выберите точку данных конфигурации.

### CSS-классы

#### `widgetID` и`skiinfo`

Все CSS-классы предоставляются двумя базовыми классами.`widgetID` и`skiinfo` Это позволяет применять форматирование к отдельным виджетам или, при использовании нескольких виджетов skiinfo, ко всем виджетам skiinfo.

#### `countries` ,`regions` и`areas`

Каждую из различных областей информации можно рассматривать отдельно с помощью этих 3 классов CSS.

#### Информационные области: страна, регион и территория

Каждая из 3 информационных областей представляет собой обычную HTML-таблицу.

#### Отдельные элементы в стране и регионе

Каждый из выбранных элементов расположен внутри элемента \`\<span>\` и имеет CSS-класс.`selected` .

#### Форматирование столбцов в разделе «Область».

Заголовок таблицы был снабжен CSS-классами tharea и thsort. Каждый элемент столбца был снабжен соответствующими классами.`txtr` для выравнивания по правому краю и`txtl` для форматирования по левому краю.

#### Любимая звезда

Избранную звезду можно разместить в элементе \`\<span>\` и указать с помощью CSS-класса.`favorite` Если элемент выбран как избранный, элемент \`\<span>\` дополняется следующим содержимым:`selected` .

#### Примеры использования CSS-классов

##### Разный цвет для выбранного элемента страны или региона.

```css
.skiinfo .selected {
    color: green;
}
```

##### Различное форматирование`regions` элементы

```css
.skiinfo.regions span {
    color: grey;
}
```

## Доступные команды sendTo

### getServerSkiData

Передайте клиенту актуальные данные по запрошенным параметрам катания на лыжах.

#### Параметры для getServerSkiData

никто

#### Пример использования функции getServerSkiData

```javascript
let instance = 'skiinfo.0';
let response = await sendToAsync(instance, 'getServerSkiData', {});
console.log(response);
```

### getServerCountryData

Загружает данные по странам, если они еще не были загружены, и отправляет данные обратно клиенту.

#### Параметры для функции getServerCountryData

- код страны

#### Пример использования функции getServerCountryData

```javascript
let instance = 'skiinfo.0';
let response = await sendToAsync(instance, 'getServerCountryData', { countrycode: 'deutschland' });
console.log(response);
```

### getServerRegionData

Загружает данные о странах и регионах, если они еще не были загружены, и отправляет данные обратно клиенту.

#### Параметры для функции getServerRegionData

- код страны
- регионкод

#### Пример использования функции getServerRegionData

```javascript
let instance = 'skiinfo.0';
let response = await sendToAsync(instance, 'getServerRegionData', {
    countrycode: 'deutschland',
    countrycode: 'bayern',
});
console.log(response);
```

### addServerFavorite

Добавляет в избранное место для указанной страны и региона. Если избранное место отсутствует, оно будет добавлено. Отправляет обновленные данные обратно клиенту.

#### Параметры для addServerFavorite

- код страны
- регионкод

#### Пример использования функции addServerFavorite

```javascript
let instance = 'skiinfo.0';
let response = await sendToAsync(instance, 'addServerFavorite', { countrycode: 'deutschland', countrycode: 'bayern' });
console.log(response);
```

### delServerFavorite

Удаляет избранный регион для указанной страны и региона. Отправляет обновленные данные обратно клиенту.

#### Параметры для delServerFavorite

- код страны
- регионкод

#### Пример использования delServerFavorite

```javascript
let instance = 'skiinfo.0';
let response = await sendToAsync(instance, 'delServerFavorite', { countrycode: 'deutschland', countrycode: 'bayern' });
console.log(response);
```

## Все

- будет определено

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.0.0 (2025-10-08)

- test remove node 18,extend to node 24
- add filter button in browser to reduce all entries to favorites.

### 0.5.0 (2025-04-16)

- add search for regions in browser

### 0.4.1 (2025-04-08)

- fix url
- fix classname of CountryList
- improve icons with round corners
- fix advices from code review
- fix global dependency

### 0.4.0 (2025-03-05)

- fix version info

### 0.3.0 (2025-03-05)

- release

### 0.2.0 (2025-03-05)

- enable npm deploy

### 0.1.0 (2025-03-05)

- initial release
- The color for favorites has now been made selectable
- minor CSS improvements
- Documentation of the sendTo commands has been added.
- The documentation of the CSS classes has been added.

## License

MIT License

Copyright (c) 2025-2026 oweitman <oweitman@gmx.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.