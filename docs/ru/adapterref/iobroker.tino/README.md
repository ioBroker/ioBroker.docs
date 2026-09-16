---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tino/README.md
title: ioBroker.tino
hash: gTPH6uBr1SNiO4F9GdLsMhPk3tBQbBnAxJZLF3xTLhk=
---
![Логотип](../../../en/adapterref/iobroker.tino/admin/tino.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.tino.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tino.svg)
![Статус зависимости](https://img.shields.io/david/bowao/iobroker.tino.svg)
![Известные уязвимости](https://snyk.io/test/github/bowao/ioBroker.tino/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.tino.png?downloads=true)
![Трэвис-CI](https://img.shields.io/travis/com/bowao/ioBroker.tino/master)

# ioBroker.tino

## Адаптер TiNo для ioBroker

(Немецкая версия см. ниже)

Считывание данных с беспроводных датчиков, полученных по протоколам TiNo версии 1.01 и TiNo версии 2.2. Соответствующая версия протокола определяется автоматически на основе полученных данных.

Беспроводной приемопередатчик и приемник TiNo были разработаны компанией nurazur.

Страница проекта: <https://nurazur.wordpress.com/>

Гитхаб: <https://github.com/nurazur/TiNo>

" **TI** ny **NO** de": беспроводной датчик или беспроводной исполнитель с питанием от батареи. Цель проекта — разработка малогабаритных и экономичных беспроводных датчиков с питанием от батарей. Датчики взаимодействуют с шлюзами, такими как Raspberry Pi. Цели проекта:

- Низкая стоимость (спецификация материалов менее 5 евро)
- очень маленький размер (спичечный коробок)
- сверхнизкий ток сна
- Длительный срок службы батареи: 5 лет и более от батарейки CR2032.
- большая дальность (что бы это ни значило :-), но она действительно очень большая)
- просто построить
- безопасность связи
- Прошивка Plug\&Play

В качестве датчиков могут использоваться практически любые, например, датчики температуры, относительной влажности, атмосферного давления, высотомеры, датчики интенсивности света, УФ-индекса, датчики движения, герконовые переключатели и т. д.

В конфигурации адаптера можно задать последовательный интерфейс и соответствующую скорость передачи данных. После активации режима обучения датчики автоматически создаются с их идентификатором узла и всеми распознанными точками данных после получения первого сообщения. Режим обучения автоматически завершается через 10 минут и может быть повторно активирован на 10 минут в разделе «info» через точку данных «learningMode». Соответствующие точки смещения данных создаются в разделе «config», чтобы при необходимости можно было скорректировать значения датчиков. Расчетные точки данных «абсолютная влажность» и «точка росы» создаются в разделе «calculated», но только если датчик предоставляет значения температуры и относительной влажности.

Для протокола приемника версии 1.01 будут созданы следующие точки данных:

- NodeId
- РССИ
- Напряжение батареи
- Счетчик сообщений
- Температура
- Влажность
- Сердцебиение (только в версии протокола 1.01)
- Прерывания 1, 2 и 3
- Индикатор ошибки частоты (только в версии протокола 1.01)
- Температура RFM69 (только в версии протокола 1.01)
- Битовые ошибки

Кроме того, для версии протокола приемника 2.2 (если она доступна) создаются следующие точки данных.

- Прерывание 4–8
- синхронизированный
- Индикатор качества связи
- Смещение частоты
- Расстояние (только при установленном датчике расстояния)
- Высота (только при установленном датчике высоты)
- Давление воздуха (только при установленном датчике давления воздуха)
- Контакт (только при установленном герконовом контакте)
- Температура 1
- Температура 2

---

## Адаптер TiNo для ioBroker

Einlesen der vom TiNo версии 1.01 и TiNo версии 2.2 empfangenen Funksensordaten. Die entsprechende Protokoll-Version автоматически включается в работу.

Der Funksender und -empfänger TiNo wurden von nurazur entwickelt.

Сайт проекта: <https://nurazur.wordpress.com/>

Гитхаб: <https://github.com/nurazur/TiNo>

« **TI** ny **NO** de»: Batteriebetriebener Funksensor или Funk-Aktor. Ziel dieses Projekts — это Entwicklung Schnurloser Funk Sensoren, Die über Batterien versorgt werden und zB mit dem Raspberry Pi коммунитарный. Die Entwicklung Hat zum Ziel:

- минимальная стоимость (Stückkosten до 5 евро)
- минимальный Грёссе (Streichholzschachtel)
- минималистское стромвербраух
- Максимальный Batterielebensdauer (5 лет или больше)
- maximale Reichweite
- maximal einfach nachzubauen
- Прошивка Plug\&Play

Датчик может быть установлен таким образом, чтобы он мог работать со всеми температурами, датчиками температуры, датчиками освещенности, датчиками освещенности, датчиками температуры, освещенности, УФ-индексом, датчиками температуры, магнитными датчиками, датчиками срабатывания, датчиками температуры, а также с принципом работы всех датчиков.

В конфигурации адаптера указана серийная шпиндельная и дополнительная скорость передачи данных. Когда активируется модус Anlermodus, датчики автоматически активируются с идентификатором узла и всеми соответствующими датами. Der Anlernmodus продлится около 10 минут. автоматически включается и может перейти в «информацию» к «режиму обучения» в течение 10 минут. всегда активен. Если в параметре «config» указано смещение даты, необходимо, чтобы датчик был корректно установлен. При «расчетном» использовании эрехнетен Datenpunkte Feuchte абсолютного и Taupunkt angelegt, необходимо, чтобы датчик был Werte Temperatur и относительный Feuchte Lifert.

Folgende Datenpunkte werden für das Empfänger-Protokoll версии 1.01:

- NodeId
- Signalstärke (RSSI)
- Batteriespannung
- Nachrichtenzähler
- Температура
- Фойхте
- Сердцебиение (Нур в Протоколе версии 1.01)
- Прерывания 1–3
- Индикатор Frequenzfehler (Нур в протоколе версии 1.01)
- RFM69 Temperatur (Нур в протоколе версии 1.01)
- Битфелер

zusätzlich werden für das Empfänger-Protokoll Version 2.2 folgende Datenpunkte angelegt (wenn vorhanden).

- Прерывание 4–8
- Синхронизация
- Каналгюте
- Frequenzversatz
- Включение (Nur bei installiertem Entfernungssensor)
- Höhe (Nur bei installiertem Höhensensor)
- Luftdruck (Nur bei installiertem Luftdrucksensor)
- Рид-Контакт (Nur bei installiertem Reed-Kontakt)
- Температура 1
- Температура 2

## Changelog
### 1.1.1
- Optimization for js-controller 3.3

### 1.1.0
- Add TiNo Protocol V2.2 support
- (Add Datapoints temperature 1 and Temperatur 2)
- (max value of data point temperature increased to 600)
- Add connectionType and dataSource in io-package.json
- Add testing for Node.js 16

### 1.0.3
- Displays the interrupt value only for short time

### 1.0.2
- (AndrObe) Fix for negative temperature values
- (bowao) Update devDependencies

### 1.0.1
- fix bug in interrupt detection for protocol V2

### 1.0.0
- Update dependencies
- BREAKING CHANGE: Drop node 8 support, requires node 10 or above
- BREAKING CHANGE: js-controller v2.4.0 or above required

### 0.1.3
- Update travis.yml, License, Readme

### 0.1.2
- (bowao) learningMode set to true if not defined

### 0.1.1
- (bowao) New learning mode with 10min. auto-timeout

### 0.1.0
- (bowao) Add tino protocol V2.0 support
- (bowao) Add option to search new data points on already created sensors
- (bowao) Add calculated data points humidity_absolute and dew point

### 0.0.5
- (bowao) Add datapoints interrupt an heartbeat
- (bowao) Set default baudrate to 38400
- (bowao) Close serialport on unload and cleanup

### 0.0.4
- (bowao) Resize logo

### 0.0.3
- (bowao) Update readme

### 0.0.2
- (nurazur) Add logo

### 0.0.1
- (bowao) initial release

## License
MIT License

Copyright (c) 2021 bowao <cryolab@web.de>

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