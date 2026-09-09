---
BADGE-Number of Installations: http://iobroker.live/badges/tankerkoenig-installed.svg
BADGE-ioBroker stable release: http://iobroker.live/badges/tankerkoenig-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.tankerkoenig.svg?logo=npm
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.tankerkoenig.svg?logo=npm
BADGE-Test and Release: https://github.com/iobroker-community-adapters/ioBroker.tankerkoenig/actions/workflows/test-and-release.yml/badge.svg
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tankerkoenig/README.md
title: ioBroker.tankerkoenig
hash: 8YkkfBayerxaOBkmRf8Y634RQ2Oa7FSV++TGDM+bKbs=
---
![Логотип](../../../en/admin/tankerkoenig.png)

![Количество установок](http://iobroker.live/badges/tankerkoenig-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.tankerkoenig.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tankerkoenig.svg)
![НПМ](https://nodei.co/npm/iobroker.tankerkoenig.png?downloads=true)
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.tankerkoenig/actions/workflows/test-and-release.yml/badge.svg)

# ioBroker.tankerkoenig

**Тесты:**

## Описание

Этот адаптер возвращает цены на топливо для десяти различных заправочных станций через JSON-канал веб-сервиса [tankerkoenig.de](https://creativecommons.tankerkoenig.de/#about) . Все данные хранятся в объектах, которые используются и отображаются в [ioBroker.vis](https://github.com/ioBroker/ioBroker.vis) . Адаптер использует файл prices.php, что уменьшает объем передаваемых данных при обновлении по сравнению с файлами list.php и detail.php (для массовой загрузки). Адаптер создает точки данных для заправочной станции, которая продает самые дешевые E5, E10 и дизельное топливо.

## Конфигурация

### ключ API

Ключ API можно получить на [сайте Tankerkönig](https://creativecommons.tankerkoenig.de/#about) . Это 36-значный код, который необходимо ввести в это поле.

### Станции

Можно запросить данные до 10 автозаправочных станций. Для этого необходимо ввести идентификатор автозаправочной станции. Идентификатор каждой станции можно найти на сайте tankerkoenig.de. Он также состоит из 36 цифр. Кроме того, вы можете указать собственное название станции.![альтернативный текст](../img/tankerkoenigSettingsScreenshot1.png "Настройки скриншота")![альтернативный текст](../../../en/adapterref/img/tankerkoenigSettingsScreenshot2.png "Настройки скриншота")

Это окно используется для добавления новых станций. Вы можете прочитать идентификатор стадиона непосредственно на карте ниже и скопировать его в поле выше.

#### Идентификатор копировальной станции

Существует два способа скопировать идентификатор в поле:

- Выделите идентификатор и скопируйте его с помощью Ctrl+C или щелкните правой кнопкой мыши по кнопке «Копировать», а затем вставьте в поле.
- Это также можно сделать с помощью кнопки.`Copy` Это скопирует всё содержимое, и вы сможете либо вставить его непосредственно в поле, либо нажать на кнопку.`Paste` В этом случае в поле будет вставлен только идентификатор.

**Но для этого необходимо разрешить браузеру доступ к буферу обмена.** (Это работает только в том случае, если ваша административная панель работает по протоколу HTTPS, и вы заходите на страницу по HTTPS).

![альтернативный текст](../../../en/adapterref/img/tankerkoenigStationFinder_copyId.png "Настройки скриншота") В разделе «Варианты скидок» вы можете выбрать один из вариантов скидки ⇨ Евро / Процент и указать, для какого типа топлива применяется скидка (по умолчанию выбраны все варианты).

![альтернативный текст](../../../en/adapterref/img/tankerkoenigStationFinder.png "Настройки скриншота")

### Установите значения равными 0.

Активируйте эту функцию, если цены должны обнуляться при закрытии автозаправочной станции.\
&#x20;Если эта функция отключена, цены будут считаться недействительными (см. ниже).

### Недействительные цены

Если на заправке не указаны цены на топливо E5, E10 или дизельное топливо, например, если заправка закрыта, цена не изменится, вместо этого будет установлено значение «качество».`Quality code 0x40 => Substitute value from device` В этом случае штат будет отображен оранжевым цветом.

![альтернативный текст](../../../en/adapterref/img/state_quality.png "Настройки скриншота")

## Активация

Адаптер работает как демон (не в режиме планирования) и запускается регулярно каждые пять минут. Данные из исходного потока обновляются сервером tankerkoenig.de только каждые 4 минуты, поэтому более частый запрос данных не имеет смысла и приводит только к избыточному трафику данных и расходу ресурсов. Более частые интервалы можно установить в любое время.

## Точки данных

Точки данных создаются динамически, то есть при создании станции для нее создаются точки данных (максимум 10 станций).![альтернативный текст](../../../en/adapterref/img/tankerkoenigNewDP.png "Настройки скриншота") Для разных типов топлива создаются следующие параметры:

- `feed` (цена с тремя знаками после запятой)
- `short` (Цена с двумя знаками после запятой (без округления) в виде строки)
- `3rd` (третий знак после запятой цены используется для обозначения верхнего индекса в системе VIS)
- `combined` (готовый HTML-код, отформатированный с указанием цены и третьего знака после запятой в верхнем индексе или, при необходимости, статуса открытия \[`closed` /`not found` (для удобного отображения с помощью виджета VIS HTML)

Под каждым типом топлива находится отдельная папка.`minmax` В этой базе данных создаются точки данных для минимальной и максимальной цен на автозаправке. Они хранятся только один день, после чего обнуляются и пополняются на следующий день.

Кроме того, на соответствующей станции создаются пять точек данных:

- `discount` (скидка в евро / проценты в виде числа)
- `discounted` (показывает, действует ли скидка или нет)
- `status` (станция открыта?)
- `name` (название автозаправочной станции, указанное пользователем)
- `station_id` (Идентификатор автозаправочной станции Tanker King)

Кроме того, самые дешевые заправки из списка определяются в каналах.

- `cheapest.E5`
- `chepest.E10`
- `cheapest.diesel`

На уровне станции создаются еще пять точек данных:

- `adapterStatus` (Отображает состояние адаптера и возможные значения:)`idle / automatic request / manual request / detail request / requet timeout 1min / write states / request Error / offline` )
- `json` (JSON-данные автозаправочной станции)
- `jsonTable` (JSON-таблица для визуализации)`only the json data no widget` )

![альтернативный текст](../../../en/adapterref/img/jsonTable.png "Настройки скриншота")

- `lastUpdate` (время последнего обновления)
- `refresh` (Это кнопка для ручного обновления данных)`WARNING` После однократного запуска ручное обновление в течение 1 минуты запустить невозможно.

В рамках этих каналов создается наиболее выгодная автозаправочная станция для указанного типа топлива. Если несколько заправочных станций предлагают топливо по одинаковой цене, выводится станция, указанная первой/вверху в настройках.

## ВИС

В этом виджете VIS можно легко отобразить объединенную точку данных.

```js
[{"tpl":"tplHtml","data":{"visibility-cond":"==","visibility-val":1,"refreshInterval":"0","gestures-offsetX":0,"gestures-offsetY":0,"signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"html":"<span style=\"font-size: 80%; padding: 0 20px 0 5px;\">Diesel</span>{tankerkoenig.0.stations.0.diesel.combined}"},"style":{"left":"634px","top":"745px","z-index":"20","width":"228px","height":"36px","background-color":"","color":"rgba(225,225,225,1)","font-size":"30px","text-align":"center","background":"rgba(250,0,0,0.1)"},"widgetSet":"basic"}]
```

Значение точки данных`combined` Предоставляет CSS-класс. Эти классы:`station_open` ,`station_closed` и`station_notfound` Благодаря определениям CSS в редакторе CSS в VIS теперь можно создавать оригинальные дизайнерские решения (например, красный цвет шрифта для закрытой станции).

```css
.station_open {
    color: blue; 
}
.station_closed {
    color: red !important; /* !important kann ggf. weggelassen werden */
}
.station_notfound {
    color: yellow !important; /* !important kann ggf. weggelassen werden */
}
.station_no_prices {
    color: yellow !important; /* !important kann ggf. weggelassen werden */
}

/* € sign */
.station_combined_euro {
    font-family: Times;
    font-size: 80%;
}
```

## Changelog
<!--
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
* (@klein0r) Adapter requires node.js 20 and js-controller >= 6 now

### 3.4.0 (2024-04-28)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 3.3.7 (2023-02-06)
* (xXBJXx) added difference to jsonTable [issue #116](https://github.com/iobroker-community-adapters/ioBroker.tankerkoenig/issues/116)
* (xXBJXx) added a log message for the error `parameter error`
* (xXBJXx) set the name length to 34 characters
* (xXBJXx) Added verification if the api key is encrypted
* (xXBJXx) updated the Dependencies

### 3.3.6 (2023-01-22)
* (xXBJXx) fixed position of the warning message in the UI
* (xXBJXx) updated the documentation and migration guides for stable version 3.3.6

### 3.3.5 (2023-01-04)
* (xXBJXx) fixed copy/paste bug in the UI

### 3.3.4 (2023-01-03)
* (xXBJXx) Fixed an issue where a postal code starting with 0 was not displayed correctly [Issue #113](https://github.com/iobroker-community-adapters/ioBroker.tankerkoenig/issues/113)

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

The MIT License (MIT)

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2016-2023 xXBJXx <issi.dev.iobroker@gmail.com> pix

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.