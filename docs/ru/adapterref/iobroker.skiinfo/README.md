---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.skiinfo/README.md
title: ioBroker.skiinfo
hash: 6aSEES/WuLqmEA2uTN3WjAWcEd+NfAfpLl8mUuQ0fYw=
---
# IoBroker.skiinfo
![Логотип](../../../en/adapterref/iobroker.skiinfo/admin/skiinfo.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.skiinfo.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.skiinfo.svg)
![Количество установок](https://iobroker.live/badges/skiinfo-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/skiinfo-stable.svg)
![Конфигурация nycrc на GitHub](https://img.shields.io/nycrc/oweitman/iobroker.skiinfo?preferredThreshold=functions)
![НПМ](https://nodei.co/npm/iobroker.skiinfo.png?downloads=true)

**Тесты:** ![Тестирование и выпуск](https://github.com/oweitman/ioBroker.skiinfo/workflows/Test%20and%20Release/badge.svg)

## Адаптер skiinfo для ioBroker
С помощью этого адаптера вы сможете получить доступ к текущей глубине снежного покрова в горах, долинах и свежевыпавшему снегу, а также к открытым подъемникам в различных местах Европы.

## Конфигурация
Адаптер не требует какой-либо настройки.

## Vis и виджеты
Следующие виджеты действительно существуют

- [`Skiinfo browser`](#skiinfo-browser) - для просмотра всех доступных

страны, регионы и области и задать избранные области.

- [`Skiinfo Favorites`](#skiinfo-favorite) - показывать только избранные горнолыжные курорты.

weitere Informationen

- usabele [`CSS classes`](#css-classes) для индивидуального оформления

### Браузер Skiinfo
Виджет позволяет просматривать все доступные страны, регионы и территории, а также добавлять избранные.

Вы можете переключать сортировку для каждого столбца (по умолчанию, по убыванию или по возрастанию) с помощью заголовка таблицы.
Вы можете осуществлять поиск, используя значок поиска в столбце области.
Вы можете переключаться в режим избранного с помощью значка звёздочки.
Все записи можно свернуть в избранное для более быстрого поиска.

Выберите точку данных конфигурации в качестве точки данных.

### Любимое Skiinfo
Виджет используется для отображения только избранных горнолыжных курортов.
С помощью заголовка таблицы можно переключать режим сортировки для каждого столбца (по умолчанию, по убыванию, по возрастанию).
С помощью значка звёздочки можно удалить курорт из списка избранных.

В качестве точки данных выберите точку данных конфигурации.

### CSS-классы
#### `widgetID` и `skiinfo`
Все CSS-классы поддерживают два базовых класса: `widgetID` и `skiinfo`.
Это позволяет применять форматирование к отдельным виджетам или, при использовании нескольких виджетов SkiInfo, ко всем виджетам SkiInfo.

#### `countries`,`regions` и `areas`
Каждая из областей информации может быть обработана отдельно с помощью этих трех классов CSS.

#### Информационные области страны, региона и местности
Каждая из трех информационных областей представляет собой обычную HTML-таблицу.

#### Выбранные элементы в стране и регионе
Каждый из выбранных элементов расположен в элементе span и ему присвоен класс CSS `selected`.

#### Форматирование столбцов в разделе «Площадь»
Заголовок таблицы был снабжён CSS-классами tharea и thsort.
Каждому элементу столбца было присвоено форматирование `txtr` для выравнивания по правому краю и `txtl` для выравнивания по левому краю.

#### Любимая звезда
Избранная звезда может быть размещена в элементе span и к ней можно обратиться через CSS-класс `favorite`. Если элемент выбран в качестве избранного, элемент span дополняется тегом `selected`.

#### Примеры классов CSS
##### Другой цвет для выбранного элемента страны или региона
```css
.skiinfo .selected {
    color: green;
}
```

##### Различное форматирование элементов `regions`
```css
.skiinfo.regions span {
    color: grey;
}
```

## Доступные команды sendTo
### GetServerSkiData
Предоставьте клиенту актуальные данные по запрошенным данным о лыжах.

#### Параметры для getServerSkiData
никто

#### Пример для getServerSkiData
```javascript
let instance = 'skiinfo.0';
let response = await sendToAsync(instance, 'getServerSkiData', {});
console.log(response);
```

### ПолучитьServerCountryData
Загружает данные о стране, если они еще не загружены, и отправляет данные обратно клиенту.

#### Параметры для getServerCountryData
- код страны

#### Пример для getServerCountryData
```javascript
let instance = 'skiinfo.0';
let response = await sendToAsync(instance, 'getServerCountryData', { countrycode: 'deutschland' });
console.log(response);
```

### ПолучитьServerRegionData
Загружает данные о стране и регионе, если они еще не были загружены, и отправляет данные обратно клиенту.

#### Параметры для getServerRegionData
- код страны
- региональный код

#### Пример для getServerRegionData
```javascript
let instance = 'skiinfo.0';
let response = await sendToAsync(instance, 'getServerRegionData', {
    countrycode: 'deutschland',
    countrycode: 'bayern',
});
console.log(response);
```

### AddServerFavorite
Добавляет избранный регион для указанной страны и региона.
Если избранный регион отсутствует, он будет добавлен.
Отправляет обновлённые данные обратно клиенту.

#### Параметры для addServerFavorite
- код страны
- региональный код

#### Пример для addServerFavorite
```javascript
let instance = 'skiinfo.0';
let response = await sendToAsync(instance, 'addServerFavorite', { countrycode: 'deutschland', countrycode: 'bayern' });
console.log(response);
```

### DelServerFavorite
Удаляет избранный регион для указанной страны и региона.
Отправляет обновленные данные обратно клиенту.

#### Параметры для delServerFavorite
- код страны
- региональный код

#### Пример для delServerFavorite
```javascript
let instance = 'skiinfo.0';
let response = await sendToAsync(instance, 'delServerFavorite', { countrycode: 'deutschland', countrycode: 'bayern' });
console.log(response);
```

## Задача
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

Copyright (c) 2025 oweitman <oweitman@gmx.de>

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