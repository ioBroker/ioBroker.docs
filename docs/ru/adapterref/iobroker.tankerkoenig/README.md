---
BADGE-Number of Installations: http://iobroker.live/badges/tankerkoenig-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.tankerkoenig.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.tankerkoenig.svg
BADGE-NPM: https://nodei.co/npm/iobroker.tankerkoenig.png?downloads=true
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tankerkoenig/README.md
title: ioBroker.tankerkoenig
hash: EVWakFmysLhV8jLpiuNRzO7eNy4Jr6IqSS4XZofd160=
---
![Логотип](../../../en/adapterref/iobroker.tankerkoenig/../../admin/tankerkoenig.png)

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
![альтернативный текст](../img/tankerkoenigSettingsScreenshot1.png "Настройки снимка экрана") ![альтернативный текст](../../../en/adapterref/iobroker.tankerkoenig/../img/tankerkoenigSettingsScreenshot2.png "Настройки снимка экрана")

Это окно используется для добавления новых станций, вы можете прочитать идентификатор стадиона непосредственно на карте ниже и скопировать его в поле выше.

#### Копировать ID станции Есть 2 способа скопировать ID в поле:
- вы отмечаете идентификатор и копируете его с помощью Ctrl+C или правой кнопкой мыши копируете, а затем вставляете в поле.
- вы также можете сделать это с помощью кнопки «Копировать», это скопирует все содержимое, и вы можете либо вставить его прямо в поле.

  Или вы нажимаете кнопку `Paste`, после чего в поле будет вставлен только идентификатор.

![альтернативный текст](../../../en/adapterref/iobroker.tankerkoenig/../img/tankerkoenigStationFinder_copyId.png "Настройки снимка экрана") В параметрах скидки вы можете выбрать один из вариантов скидки ⇨ Евро / Процент и тип топлива, на который распространяется скидка (по умолчанию все выбрано).

![альтернативный текст](../../../en/adapterref/iobroker.tankerkoenig/../img/tankerkoenigStationFinder.png "Настройки снимка экрана")

### Установите значения на 0 Активируйте эту функцию, если цены должны быть установлены на 0, когда заправочная станция закрыта.\ Если функция отключена, цены будут установлены как недействительные, см. ниже.
### Неверные цены
Если заправочная станция не предоставляет цены на E5, E10 или дизельное топливо, т.е. если станция закрыта, цена не изменится, вместо этого качество состояния будет установлено на `Quality code 0x40 => Substitute value from device`, после чего состояние будет отображаться оранжевым цветом.

![альтернативный текст](../../../en/adapterref/iobroker.tankerkoenig/../img/state_quality.png "Настройки снимка экрана")

### Свернуть журнал
Чтобы сократить количество записей в журнале (например, на SD-картах), можно выбрать этот параметр.

## Активация
Адаптер работает как демон (не в режиме расписания) и запускается регулярно каждые пять минут. Данные исходного фида обновляются сервером tankerkoenig.de только каждые 4 минуты, поэтому более частый запрос данных не имеет смысла и вызывает лишь лишний трафик данных и затраты ресурсов. В любой момент можно установить большие интервалы.

## Точки данных
Точки данных создаются динамически, то есть при создании станции для нее создаются точки данных (максимум 10 станций).
Когда вы удаляете станцию, точки данных, которые больше не нужны, также удаляются.
![альтернативный текст](../../../en/adapterref/iobroker.tankerkoenig/../img/tankerkoenigNewDP.png "Настройки снимка экрана") Для разных видов топлива создаются следующие точки данных:

* `feed` (цена с тремя знаками после запятой как число)
* `short` (цена с двумя десятичными знаками (не округленная) в виде строки)
* `3rd` (третий десятичный знак цены для представления верхнего индекса в VIS)
* `комбинированный` (готовый HTML-формат с ценой и третьим десятичным знаком верхнего индекса или, при необходимости, статусом открытия ["закрыто"/"не найдено"] для удобного отображения с помощью HTML-виджета VIS)

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

* `adapterStatus` (показывает состояние адаптера, возможные значения: `ожидание/автоматический запрос/запрос вручную/тайм-аут запроса 1 мин/состояния записи/ошибка запроса/офлайн`)
* `json` (данные АЗС в формате JSON)
* `jsonTable` (таблица json для vis `только данные json без виджета`)

![альтернативный текст](../../../en/adapterref/iobroker.tankerkoenig/../img/jsonTable.png "Настройки снимка экрана")

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
### __WORK IN PROGRESS__
* (xXBJXx) Ukrainian translation added
* (xXBJXx) add validation function for ID and Name Input fields
* (xXBJXx) add copy from clipboard function for ID Input field

### 3.0.2 (2022-11-10)
* (xXBJXx) release new version from Tankerkoenig

### 3.0.1 (2022-07-30)
* (xXBJXx) added datapoints delete function
* (xXBJXx) resetValue function removed and state quality implemented. [issue #79](https://github.com/iobroker-community-adapters/ioBroker.tankerkoenig/issues/79)
* (xXBJXx) added function => Set values to 0 when the Station is closed.
* (xXBJXx) updated dependencies

### 3.0.0 (2022-07-02)
* (xXBJXx) BREAKING Adapter code completely revised
* (xXBJXx) Adapter completely switched to TypeScript
* (xXBJXx) BREAKING Adapter configurations page switched to React and redesigned
  (old config not compatible stations must be recreated)
* (xXBJXx) add Dependabot auto merge support
* (xXBJXx) add test and release script 
* (xXBJXx) Dependency updated
* (xXBJXx) add feature request: manual update of all stations (one request per minute allowed) [issue #53](https://github.com/iobroker-community-adapters/ioBroker.tankerkoenig/issues/53) 
* (xXBJXx) add a new state => adapterStatus (indicates whether the adapter executes an automatic request or a manual request)
* (xXBJXx) add new cutPrice function [issue #73](https://github.com/iobroker-community-adapters/ioBroker.tankerkoenig/issues/73)
* (xXBJXx) add the feature request: Include discount in price (euro and percent) [issue #50](https://github.com/iobroker-community-adapters/ioBroker.tankerkoenig/issues/50) and adapter code optimized
* (xXBJXx) add the feature request: JsonTable for the vis [issue #24](https://github.com/iobroker-community-adapters/ioBroker.tankerkoenig/issues/24)

### 2.2.0 (2021-11-14)
* (simatec) Design Fix for Admin Dark/Blue Theme

### 2.1.1 (2021-06-22)
* (pix) New adapter category "vehicle" [#67](https://github.com/iobroker-community-adapters/ioBroker.tankerkoenig/issues/67)
* (pix) Testing for Nodejs 16

### 2.0.12 (2021-05-05)
* (pix) connectionType and dataSource added

### 2.0.11 (2021-05-02)
* (anwa) "wrong type" and "ack flag" issues fixed (upcoming in js-controller > 3.3)

### 2.0.10 (2021-02-01)
* (wendy) "has no existing object" issue fixed

### 2.0.9 (2020-04-21)
* (pix) NodeJS 10 or higher required

### 2.0.8 (2020-03-27)
* (Zwer2k) 2.0.8 Catch error if station status reports _no data_

### 2.0.7 (2020-03-25)
* (pix) 2.0.7 Catch error if station status reports _no stations_

### 2.0.6 (2019-04-17)
* (Zwer2k) implementation of utils corrected
* (Zwer2k) fixed error occured when all stations were closed

### 2.0.5 (2019-02-22)
* (jens-maus) fixes to prevent _request()_ floodings

### 2.0.3 (2019-02-21)
* (pix) fixed issue with too short sync interval
* (pix) removed datapoint __price__ which was created for debug only

### 2.0.1 (2019-02-20)
* (pix) fixed scrollbar issue in firefox

### 2.0.0 (2019-02-18)
* (pix) admin3 ready

### 1.3.1 (2019-02-05)
* (arteck, pix) request issues fixed

### 1.3.0 (2019-02-05)
* (pix) Compact mode added

### 1.2.1 (2018-11-25)
* (pix) fixed issue __station_id__ and __status__ mixed up

### 1.2.0 (2018-11-25)
* (pix) new datapoint station ID added

### 1.1.0 (2018-05-12)
* (bluefox) prices as number to allow logging were added

### 1.0.5 (2018-02-07)
* (pix) Log entry opt out

### 1.0.4 (2017-03-21)
* (pix) position of _adapter.stop()_ optimized

### 1.0.3 (2017-01-05)
* (pix) Appveyor testing added

### 1.0.2 (2017-01-04)
* (apollon77) TravisCI testing added

### 1.0.1 (2016-12-20)
* (pix) reset to zero issue fixed

### 1.0.0 (2016-10-08)
* (pix) reset values to zero before each refresh now can be ticked off.

### 0.1.2 (2016-07-05)
* (pix,jens-maus) whitespaces between price and € sign

### 0.1.1 (2016-07-05)
* (pix) € appearance in datapoints __combined__ is customizable through css now (thanx jens-maus)

### 0.1.0 (2016-06-12)
* (pix) first version for npm
* (pix) settings window

### 0.0.8 (2016-06-09)
* (pix) Adapter.stop() fixed

### 0.0.7 (2016-06-09)
* (pix) New channels and values for cheapest station created

### 0.0.6 (2016-06-08)
* (pix) Short prices now string

### 0.0.5 (2016-06-08)
* (pix) Channels added for stations 2 to 10
* (pix) Readme corrected (CSS code example)
* (pix) no more log.warn if station is closed
* (pix) scheduled starting improved

### 0.0.4 (2016-06-01)
* (pix) HTML Code in Datapoint __combined__ corrected

### 0.0.3 (2016-06-01)
* (pix) Datapoint __combined__ with CSS class for status

### 0.0.2 (2016-06-01)
* (pix) Datapoint __combined__

### 0.0.1 (2016-05-31)
* (pix) Adapter created

## License

The MIT License (MIT)

Copyright (c) 2016-2022 xXBJXx <issi.dev.iobroker@gmail.com> pix

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