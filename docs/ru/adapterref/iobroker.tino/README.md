---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tino/README.md
title: ioBroker.tino
hash: z+wiZ/y+sdVnU+uJ+GMOYAsNHn8nfPUr4zCLYb0CAA4=
---
![Логотип](../../../en/adapterref/iobroker.tino/admin/tino.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.tino.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tino.svg)
![Статус зависимости](https://img.shields.io/david/bowao/iobroker.tino.svg)
![Известные уязвимости](https://snyk.io/test/github/bowao/ioBroker.tino/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.tino.png?downloads=true)
![Трэвис-Си](https://img.shields.io/travis/com/bowao/ioBroker.tino/master)

# IoBroker.tino
## Адаптер TiNo для ioBroker
(Немецкую версию см. Ниже)

Чтение беспроводных датчиков, полученных по протоколу TiNo версии 1.01 и протоколу TiNo версии 2.2.
Соответствующая версия протокола определяется автоматически на основе полученных данных.

Беспроводной приемопередатчик и приемник TiNo были разработаны Nurazur.

Страница проекта: https://nurazur.wordpress.com/

Github: https://github.com/nurazur/TiNo

«** TI ** ny ** NO ** de»: беспроводной датчик с батарейным питанием или беспроводной актер. Целью проекта является разработка небольших недорогих беспроводных датчиков с батарейным питанием. Датчики связываются со шлюзами, как Raspberry Pi. Цели:

* низкая стоимость (ВОМ до 5 евро)
* очень маленький размер (спичечный коробок)
* сверхнизкий ток сна
* длительный срок службы батареи: 5 лет и более на элементе CR2032
* большой диапазон (что бы это ни значило :-), но на самом деле долго)
* простой в сборке
* безопасность связи
* Прошивка Plug & Play

Датчики могут быть практически любыми, такими как температура, относительная влажность, давление воздуха, высотомер, интенсивность света, УФ-индекс, датчики движения, герконы и т. Д.

В конфигурации адаптера можно установить последовательный интерфейс и соответствующую скорость передачи данных.
Когда режим обучения активирован, датчики автоматически создаются с их идентификатором узла и всеми распознанными точками данных после получения первого сообщения.
Режим обучения автоматически завершается через 10 минут и может быть повторно активирован еще на 10 минут в разделе «Информация» через точку данных «LearningMode».
Соответствующие точки данных смещения создаются в «config», так что значения датчика могут быть скорректированы при необходимости.
Абсолютная влажность и точка росы рассчитанных точек данных создаются в разделе «Расчет», но только если датчик выдает значения температуры и относительной влажности.

Следующие точки данных будут созданы для протокола приемника версии 1.01:

* NodeId
* RSSI
* Напряжение батареи
* Счетчик сообщений
* Температура
* Влажность
* Heartbeat (только в версии протокола 1.01)
* Interupt 1, 2 и 3
* Индикатор ошибки частоты (только в версии протокола 1.01)
* Температура RFM69 (только в версии протокола 1.01)
* Битовые ошибки

Кроме того, для версии протокола приемника 2.2 (при наличии) создаются следующие точки данных.

* Прерывание с 4 по 8
* синхронизировано
* Индикатор качества ссылки
* Смещение частоты
* Расстояние (только с установленным датчиком расстояния)
* Высота (только с установленным датчиком высоты)
* Давление воздуха (только с установленным датчиком давления воздуха)
* Контакт (только с установленным герконом)
* Температура 1
* Температура 2

-------------------------------------------------------------------------------------------

## Адаптер TiNo для ioBroker
Einlesen der vom TiNo Version 1.01 и TiNo Version 2.2 empfangenen Funksensordaten.
Die entsprechende Protokoll-Version wird automatisch anhand der empfangen Daten erkannt.

Der Funksender und -empfänger TiNo wurden von nurazur entwickelt.

Projekt-Seite: https://nurazur.wordpress.com/

Github: https://github.com/nurazur/TiNo

"** TI ** ny ** NO ** de": Batteriebetriebener Funksensor или Funk-Aktor. Ziel dieses Projekts ist die Entwicklung schnurloser Funk Sensoren, die über Batterien versorgt werden und z.B. mit dem Raspberry Pi kommunizieren. Die Entwicklung hat zum Ziel:

* Minimale Kosten (Stückkosten unter 5 EUR)
* minimale Grösse (Streichholzschachtel)
* минималер Stromverbrauch
* maximale Batterielebensdauer (5 Jahre oder mehr)
* maximale Reichweite
* максимальный einfach nachzubauen
* Прошивка Plug & Play

Als Sensor kann man so ziemlich alles verwenden, ob Temperatur, Luftfeuchtigkeit, Luftdruck, Höhenmesser, Lichtintensität, UV Index, Anwesenheitssensoren, Magnetschalter, Erschütterungs-Sensoren, Feuchtig Sensorewicks также им.

In der Adapter Konfiguration lässt sich die Serielle Schnittstelle und die zugehörige Baudrate einstellen.
Wenn der Anlermodus aktiviert ist, werden die Sensoren nach dem ersten Nachrichten-Empfang automatisch mit ihrer Node-Id und allen erkannten Datenpunkten angelegt.
Der Anlernmodus wird nach 10min. Automatisch wasdet und kann unter "info" über den Datenpunkt "LearningMode" für weitere 10min. erneut aktiviert werden.
Unter "config" werden die zugehörigen offset Datenpunkte erstellt, damit die Sensorwerte bei Bedarf korrigiert werden können.
Unter "вычислил" werden die erechneten Datenpunkte Feuchte absolut und Taupunkt angelegt, jedoch nur wenn der Sensor die Werte Temperatur und родственник Feuchte liefert.

Folgende Datenpunkte werden für das Empfänger-Protokoll Version 1.01 angelegt:

* NodeId
* Signalstärke (RSSI)
* Batteriespannung
* Nachrichtenzähler
* Температур
* Feuchte
* Сердцебиение (Нур в Protokoll версии 1.01)
* Прерывания с 1 по 3
* Индикатор Frequenzfehler (Нур в Protokoll версии 1.01)
* RFM69 Temperatur (Нур в Protokoll версии 1.01)
* Bitfehler

zusätzlich werden für das Empfänger-Protokoll Version 2.2 folgende Datenpunkte angelegt (wenn vorhanden).

* Прерывание с 4 по 8
* Синхронизация
* Kanalgüte
* Frequenzversatz
* Entfernung (Nur bei installiertem Entfernungssensor)
* Höhe (Nur bei installiertem Höhensensor)
* Luftdruck (Nur bei installiertem Luftdrucksensor)
* Рид-Контакт (Nur bei installiertem Reed-Kontakt)
* Температур 1
* Температур 2

## Changelog
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