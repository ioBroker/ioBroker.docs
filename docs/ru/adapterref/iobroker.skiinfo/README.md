---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.skiinfo/README.md
title: ioBroker.skiinfo
hash: ukR85pjwpp12fatOsK6ca8MCp6cNtAL1BmI+Nta4uT0=
---
# IoBroker.skiinfo
![Логотип](../../../en/adapterref/iobroker.skiinfo/admin/skiinfo.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.skiinfo.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.skiinfo.svg)
![Количество установок](https://iobroker.live/badges/skiinfo-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/skiinfo-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.skiinfo.png?downloads=true)

**Тесты:** ![Тест и выпуск](https://github.com/oweitman/ioBroker.skiinfo/workflows/Test%20and%20Release/badge.svg)

## Адаптер skiinfo для ioBroker
С помощью этого адаптера вы сможете узнать текущую глубину снежного покрова в горах, долинах и свежевыпавшего снега, а также открыть подъемники для различных мест в Европе.

## Конфигурация
Адаптер не требует настройки.

## Вис и виджеты
Следующие виджеты действительно существуют

- [`Skiinfo браузер`](#skiinfo-browser) - для просмотра всех доступных стран, регионов и областей, а также для установки избранных областей.
- [`Избранное Skiinfo`](#skiinfo-favorite) - для отображения только любимых горнолыжных курортов.

больше информации

- usabele [`CSS classes`](#css-classes) для индивидуального стиля

### Браузер Skiinfo
Виджет используется для просмотра всех доступных стран, регионов и областей, а также для установки избранных областей.
С помощью заголовка таблицы вы можете переключать режим сортировки для каждого столбца (по умолчанию, по убыванию, по возрастанию).
С помощью значка звезды вы можете переключать избранный режим.
В качестве точки данных выберите точку данных конфигурации.

### Избранное Skiinfo
Виджет используется для отображения только избранных горнолыжных зон.
С помощью заголовка таблицы вы можете переключать режим сортировки для каждого столбца (по умолчанию, по убыванию, по возрастанию).
С помощью значка звездочки вы можете удалить зону из списка избранных.
В качестве точки данных выберите точку данных конфигурации.

### CSS-классы
#### `widgetID` и `skiinfo`
Все классы CSS предоставляются с двумя базовыми классами `widgetID` и `skiinfo`. Это позволяет применять форматирование к отдельным виджетам или, при использовании нескольких виджетов skiinfo, ко всем виджетам skiinfo.

#### `countries`,`regions` и `areas`
Каждая из различных областей информации может быть обработана отдельно с помощью этих 3 классов CSS

#### Информация о странах, регионах и областях
Каждая из трех информационных областей представляет собой обычную HTML-таблицу.

#### Выбранные элементы в стране и регионе
Каждый из выбранных элементов расположен в элементе span и ему присвоен класс CSS `selected`.

#### Форматирование столбцов в разделе «Площадь»
Заголовок таблицы был снабжен классами CSS tharea и thsort. Каждый элемент столбца был снабжен `txtr` для выравнивания по правому краю и `txtl` для выравнивания по левому краю.

#### Любимая звезда
Звезда избранного может быть расположена в элементе span и может быть адресована через класс CSS `favorite`. Если элемент был выбран в качестве избранного, элемент span дополняется `selected`.

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
### ПолучитьServerSkiData
Предоставьте клиенту актуальные данные по запрошенным лыжам.

#### Параметры для getServerSkiData
никто

#### Пример для getServerSkiData
```javascript
let instance = 'skiinfo.0';
let response = await sendToAsync(instance, 'getServerSkiData', {});
console.log(response);
```

### ПолучитьДанныеСтраныСервера
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
Загружает данные о стране и регионе, если они еще не загружены, и отправляет данные обратно клиенту.

#### Параметры для getServerRegionData
- код страны
- код региона

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
Добавляет избранную область для указанной страны и области.
Если избранная область не существует, она будет добавлена.
Отправляет обновленные данные обратно клиенту.

#### Параметры для addServerFavorite
- код страны
- код региона

#### Пример для addServerFavorite
```javascript
let instance = 'skiinfo.0';
let response = await sendToAsync(instance, 'addServerFavorite', { countrycode: 'deutschland', countrycode: 'bayern' });
console.log(response);
```

### DelServerFavorite
Удаляет избранную область для указанной страны и области.
Отправляет обновленные данные обратно клиенту.

#### Параметры для delServerFavorite
- код страны
- код региона

#### Пример для delServerFavorite
```javascript
let instance = 'skiinfo.0';
let response = await sendToAsync(instance, 'delServerFavorite', { countrycode: 'deutschland', countrycode: 'bayern' });
console.log(response);
```

## То, что нужно сделать
- подлежит определению

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- fix url
- fix classname of CountryList
- improve icons with round corners
- fix advices from code review

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