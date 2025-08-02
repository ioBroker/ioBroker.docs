---
BADGE-Number of Installations: http://iobroker.live/badges/tankerkoenig-installed.svg
BADGE-ioBroker stable release: http://iobroker.live/badges/tankerkoenig-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.tankerkoenig.svg?logo=npm
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.tankerkoenig.svg?logo=npm
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tankerkoenig/README.md
title: ioBroker.tankerkoenig
hash: pAi/iq8uvvin8+lOYL3p2mtIFMCrKTsmwyRmCSpJqqY=
---
![Логотип](../../../en/admin/tankerkoenig.png)

![Количество установок](http://iobroker.live/badges/tankerkoenig-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.tankerkoenig.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tankerkoenig.svg)
![НПМ](https://nodei.co/npm/iobroker.tankerkoenig.png?downloads=true)

# IoBroker.tankerkoenig
**Тесты:** [![Тестирование и выпуск] (https://github.com/iobroker-community-adapters/ioBroker.tankerkoenig/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.tankerkoenig/actions/workflows/test-and-release.yml)

## Описание
Этот адаптер возвращает цены на топливо для десяти различных станций через поток JSON веб-службы [tankerkoenig.de](https://creativecommons.tankerkoenig.de/#about). Все данные хранятся в объектах, которые будут использоваться и отображаться в [ioBroker.vis](https://github.com/ioBroker/ioBroker.vis).
Адаптер использует сайт Prices.php, который уменьшает объем передаваемых данных при обновлении по сравнению с list.php и detail.php (bulk). Адаптер создает точки данных для станции, которая продает самые дешевые E5, E10 и дизельное топливо.

## Конфигурация
### API-ключ
Ключ API можно получить по адресу [веб-сайт Tankerkönig](https://creativecommons.tankerkoenig.de/#about). В это поле необходимо ввести 36-значный код.

### Станции
Можно запросить до 10 заправочных станций. Для этого нужно ввести ID АЗС. Вы можете получить идентификатор каждой заправочной станции на tankerkoenig.de. Он также состоит из 36 цифр.
Кроме того, вы можете ввести свое имя для станции.
![альтернативный текст](../img/tankerkoenigSettingsScreenshot1.png "Настройки снимка экрана") ![альтернативный текст](../../../en/adapterref/img/tankerkoenigSettingsScreenshot2.png "Настройки снимка экрана")

Это окно используется для добавления новых станций, вы можете прочитать идентификатор стадиона непосредственно на карте ниже и скопировать его в поле выше.

#### Копировать ID станции Есть 2 способа скопировать ID в поле:
- вы отмечаете идентификатор и копируете его с помощью Ctrl+C или правой кнопкой мыши копируете, а затем вставляете в поле.
- вы также можете сделать это с помощью кнопки «Копировать», это скопирует все содержимое, и вы можете либо вставить его прямо в поле.

  Или вы нажимаете кнопку `Paste`, после чего в поле будет вставлен только идентификатор.

** Но для этого вы должны разрешить браузеру доступ к буферу обмена. ** (это работает, только если ваш администратор работает с https, а вы заходите на страницу с https)

![альтернативный текст](../../../en/adapterref/img/tankerkoenigStationFinder_copyId.png "Настройки снимка экрана") В параметрах скидки вы можете выбрать один из вариантов скидки ⇨ Евро / Процент и тип топлива, на который распространяется скидка (по умолчанию все выбрано).

![альтернативный текст](../../../en/adapterref/img/tankerkoenigStationFinder.png "Настройки снимка экрана")

### Установите значения на 0 Активируйте эту функцию, если цены должны быть установлены на 0, когда заправочная станция закрыта.\ Если функция отключена, цены будут установлены как недействительные, см. ниже.
### Неверные цены
Если заправочная станция не предоставляет цены на E5, E10 или дизельное топливо, т.е. если станция закрыта, цена не изменится, вместо этого качество состояния будет установлено на `Quality code 0x40 => Substitute value from device`, после чего состояние будет отображаться оранжевым цветом.

![альтернативный текст](../../../en/adapterref/img/state_quality.png "Настройки снимка экрана")

## Активация
Адаптер работает как демон (не в режиме расписания) и запускается регулярно каждые пять минут. Данные исходного фида обновляются сервером tankerkoenig.de только каждые 4 минуты, поэтому более частый запрос данных не имеет смысла и вызывает лишь лишний трафик данных и затраты ресурсов. В любой момент можно установить большие интервалы.

## Точки данных
Точки данных создаются динамически, то есть при создании станции для нее создаются точки данных (максимум 10 станций).
![альтернативный текст](../../../en/adapterref/img/tankerkoenigNewDP.png "Настройки снимка экрана") Для разных видов топлива создаются следующие точки данных:

* `feed` (цена с тремя знаками после запятой как число)
* `short` (цена с двумя десятичными знаками (не округленная) в виде строки)
* `3rd` (третий десятичный знак цены для представления верхнего индекса в VIS)
* «комбинированный» (готовый HTML-формат с ценой и третьим десятичным знаком в верхнем индексе или, при необходимости, статусом открытия [`закрыто`/`не найдено`] для удобного отображения с помощью HTML-виджета VIS)

Под каждым видом топлива есть еще одна папка `minmax`, в которой создаются точки данных для минимальных и максимальных цен АЗС. Они хранятся только в течение одного дня и будут установлены на 0 и пополнены на следующий день.

Кроме того, на соответствующей станции создаются пять точек данных:

* `скидка` (скидка в евро / проценты как число)
* `discounted` (показывает, действует скидка или нет)
* `статус` (станция открыта?)
* `name` (название заправки, данное пользователем)
* `station_id` (идентификатор заправочной станции Tanker King)

Дополнительно в каналах определяются самые дешевые заправки из списка

* `самый дешевый.E5`
* `чепест.Е10`
* `самый дешевый.дизель`

На уровне станции создаются еще пять точек данных:

* `adapterStatus` (показывает состояние адаптера, возможные значения: `ожидание/автоматический запрос/запрос вручную/подробный запрос/тайм-аут запроса 1 мин/состояния записи/ошибка запроса/офлайн`)
* `json` (данные АЗС в формате JSON)
* `jsonTable` (таблица json для vis `только данные json без виджета`)

![альтернативный текст](../../../en/adapterref/img/jsonTable.png "Настройки снимка экрана")

* `lastUpdate` (время последнего обновления)
* `обновить` (это кнопка для ручного обновления данных `ПРЕДУПРЕЖДЕНИЕ` после ее запуска один раз невозможно запустить ручное обновление в течение 1 минуты)

В пределах этих каналов создается наиболее выгодная АЗС для названного вида топлива. Если несколько заправок предлагают топливо по одинаковой цене, выводится та станция, которая была введена первой/вверху в настройках.

## ВИС
«Объединенные» точки данных можно легко отобразить в этом виджете VIS.

```js
[{"tpl":"tplHtml","data":{"visibility-cond":"==","visibility-val":1,"refreshInterval":"0","gestures-offsetX":0,"gestures-offsetY":0,"signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"html":"<span style=\"font-size: 80%; padding: 0 20px 0 5px;\">Diesel</span>{tankerkoenig.0.stations.0.diesel.combined}"},"style":{"left":"634px","top":"745px","z-index":"20","width":"228px","height":"36px","background-color":"","color":"rgba(225,225,225,1)","font-size":"30px","text-align":"center","background":"rgba(250,0,0,0.1)"},"widgetSet":"basic"}]
```

Значение точки данных `combined` предоставляет класс css. Это классы `station_open`, `station_closed` и `station_notfound`. С помощью определений CSS в редакторе CSS в VIS теперь можно добиться выдающегося дизайна (например, красный цвет шрифта для закрытой станции).

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
 Release Script: https://github.com/AlCalzone/release-script
 Placeholder for the next version (at the beginning of the line):
 ### __WORK IN PROGRESS__ (- falls nicht benötigt löschen sonst klammern entfernen und nach dem - dein text schreiben)
 -->
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

### 3.3.3 (2023-01-02)
* (xXBJXx) fixed => adapter does not fetch data after a `requestData error` e.g. internet termination.
* (xXBJXx) add adapter migration Guide from 3.1.x to 3.3.x or 3.2.x to 3.3.x [Migration guide](docs/guide/migration_3.3.x.md)
* (xXBJXx) fixed Issue [Issue #111](https://github.com/iobroker-community-adapters/ioBroker.tankerkoenig/issues/111)

## License

The MIT License (MIT)

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
