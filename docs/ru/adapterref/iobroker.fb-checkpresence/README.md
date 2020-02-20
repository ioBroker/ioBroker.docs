---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.fb-checkpresence/README.md
title: без заголовка
hash: G+3VyP1KeB3eWta19/yCP3zVMtx6BNH1rOOajZ5zV9g=
---
![Количество установок](http://iobroker.live/badges/fb-checkpresence-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.fb-checkpresence.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.fb-checkpresence.svg)
![Статус зависимости](https://img.shields.io/david/afuerhoff/iobroker.fb-checkpresence.svg)
![Известные уязвимости](https://snyk.io/test/github/afuerhoff/ioBroker.fb-checkpresence/badge.svg)
![NPM](https://nodei.co/npm/iobroker.fb-checkpresence.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/afuerhoff/ioBroker.fb-checkpresence/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/afuerhoff/ioBroker.fb-checkpresence?branch=master&svg=true)

<h1><img src="admin/fb-checkpresence.png" width="64"/> ioBroker.fb-checkpresence </h1>

## Адаптер fb-checkpresence для ioBroker
Адаптер проверяет присутствие членов семьи через fritzbox.
Вы должны указать имя члена семьи и mac-адрес (или ip-адрес) используемого устройства.
Комментарий не является обязательным, и вы можете включить или отключить члена семьи.
Назначение данных основано на имени члена.

### Адаптер предварительных условий
Для правильной работы необходимо установить адаптер истории. Вы можете выбрать один из следующих адаптеров:

* История
* SQL
* InfluxDB

## Используемое устройство
Для этого адаптера используется AVM Fritzbox. Здесь вы можете найти информацию о Fritzbox https://avm.de/produkte/fritzbox/.

### Fritzbox условия
Используемый интерфейс TR-064 для fritzbox описан здесь: https://avm.de/service/schnittstellen/.
Используются следующие функции TR-064:

* GetSpecificHostEntry
* X_AVM-DE_GetSpecificHostEntryByIP (поддерживается с 2016-05-18) -> используется для чтения статуса участника через IP-адрес
* GetHostNumberOfEntries
* X_AVM-DE_GetHostListPath (поддержка с 2017-01-09) -> используется для конфигурации элемента
* GetSecurityPort

По умолчанию интерфейс TR-064 не активирован. Однако это можно легко изменить через веб-интерфейс FritzBox. Для этого войдите в свой FritzBox и убедитесь, что экспертный вид активирован. Тогда вы найдете под «Домашняя сеть» Обзор домашней сети »Настройки сети» пункт «Разрешить доступ для приложений». Там вы должны активировать флажок, а затем перезапустить FritzBox один раз. <img src="doc/access_settings_network.JPG"/>

## Диалог конфигурации
### Fritzbox IP-адрес, пользователь и пароль
Настройка ip-адреса, пользователя и пароля необходима для получения данных устройства из fritzbox.
Пароль зашифрован и не был сохранен в виде открытого текста.

### Интервал
Интервал можно настроить от 1 до 59 минут. Обычно значение от 1 до 5 минут является оптимальным интервалом для чтения данных fritzbox.

### Адаптер истории
Для адаптера истории вычисляются некоторые значения. Вы можете выбрать, если для этих расчетов используется история, адаптер sql или effxdb. Адаптер истории должен быть установлен предварительно.

### Формат даты
Параметры маски формата даты описаны на этой веб-странице: https://www.npmjs.com/package/dateformat.
Маска форматирования используется для форматирования объектов таблиц html и json.

### Настройки члена семьи
Для настроенного члена семьи вы должны ввести Имя, MAC- или IP-адрес, комментарий и, если член включен для расчета. Для каждого члена адаптер создает объекты данных и проверяет, присутствует ли член или отсутствует.

### Настройки белого списка
В белый список вы можете вставить все известные устройства. Любые неизвестные устройства перечислены в черном списке объекта.
Если вы установите флажок в заголовке таблицы, все устройства будут выбраны.

## Характеристики
### Проверка поддержки AVM
Функция проверяет доступность используемых функций fritzbox. Доступность регистрируется как информация.

### Получить гостей, черный список
В этой функции проверяется, зарегистрирован ли какой-либо пользователь как гость. Также проверяется, нет ли какого-либо устройства в белом списке.
Эти устройства добавлены в черный список.

### Активируйся
Для каждого члена семьи вычисляются и сохраняются в объекте-члене присутствие, даты прихода и отправления и несколько других сведений.

### Номер хоста, активные устройства
Количество устройств и количество активных извлекаются из fritzbox.

## Объекты
### Присутствие объектаВсе
Если присутствуют все члены семьи, тогда объект верный.

### Наличие объекта
Если один из членов семьи не присутствует, то объект является истинным.

### Объектные устройства
Это все перечисленные устройства в fritzbox

### Объект activeDevices
Это количество всех активных устройств в fritzbox.

### Объект html, json
Эти объекты являются таблицами (json и html) с информацией о приходе и переходе всех членов семьи.

### Информация об объекте
Ниже приведена информация о последнем обновлении и состоянии подключения адаптера.

### Объект гость
Ниже приведена информация о количестве активных гостей и табличных объектов с информацией об устройстве.

### Черный список объектов
Ниже приведена информация о количестве неизвестных устройств и табличных объектов с информацией о неизвестном устройстве.

### Объект member.present
Здесь вы найдете информацию о присутствии участника в текущий день и о том, как долго участник имеет статус «истина» с момента последнего изменения.

### Объект member.absent
Здесь вы найдете информацию об отсутствии участника в текущий день и о том, как долго участник имеет статус ложного с момента последнего изменения.

### Объект member.comming, member.going
Здесь вы найдете информацию, когда член семьи прибывает или покидает дом.

### Объект member.history, member.historyHtml
Здесь вы найдете информацию об истории текущего дня.

## Changelog

### 0.0.1
* (Achim Fürhoff) initial release
### 0.0.2
* (Achim Fürhoff) optimized features
### 0.0.3
* (Achim Fürhoff) guest feature added
### 0.0.4
* (Achim Fürhoff) calculation error resolved
### 0.0.5
* (Achim Fürhoff) configuration optimized
### 0.0.6
* (Achim Fürhoff) bug in json and html table resolved
### 0.0.7
* (Achim Fürhoff) Fix bug invalid date. Add debug information.
### 0.1.0
* (Achim Fürhoff) Influxdb added, debug information added
### 0.2.0
* (Achim Fürhoff) debug and error information optimized, crypto dependency removed, service check and blacklist added   
### 0.2.1
* (Achim Fürhoff) getGuests issue resolved, lastVal function and debug information optimized   
### 0.2.2
* (Achim Fürhoff) outdated packages updated, documentation changed, 
  history dependency removed, onstate/objectChange removed, scheduler library removed,
  two fixes from publish review

## License
MIT License

Copyright (c) 2019-2020 Achim Fürhoff <achim.fuerhoff@outlook.de>

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