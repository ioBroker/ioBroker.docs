---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.yamaha/README.md
title: <img src="https://cdn.jsdelivr.net/gh/iobroker-community-adapters/ioBroker.yamaha@master/admin/yamaha.svg" width="48" align="top" /> ioBroker.yamaha
hash: k47k9S3ioDSalfpoxnNpgo0MGMDWe312emY4++ZQ7jc=
---
# <img src="https://cdn.jsdelivr.net/gh/iobroker-community-adapters/ioBroker.yamaha@master/admin/yamaha.svg" width="48" align="top" /> ioBroker.yamaha

![npm версия](https://img.shields.io/npm/v/iobroker.yamaha)
![стабильный](https://iobroker.live/badges/yamaha-stable.svg)
![Установки](https://iobroker.live/badges/yamaha-installed.svg)
![npm downloads](https://img.shields.io/npm/dt/iobroker.yamaha)
![Узел](https://img.shields.io/badge/node-%3E%3D22-brightgreen)
![Машинопись](https://img.shields.io/badge/TypeScript-strict-blue)
![Лицензия](https://img.shields.io/badge/license-MIT-green)
![Ко-фи](https://img.shields.io/badge/Ko--fi-Support%20me-ff5e5b?logo=ko-fi)
![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg)

Управление AV-ресиверами и устройствами MusicCast осуществляется через ioBroker по локальной сети. Он объединяет три протокола, используемые Yamaha — YNCA (текстовый протокол управления сетевых ресиверов), MusicCast / Yamaha Extended Control (более богатый протокол JSON поколения MusicCast) и устаревший протокол XML самых старых моделей, выпущенных до 2010 года, — в единое дерево объектов.

## Функции
- **Три протокола, один адаптер** — YNCA, MusicCast (Yamaha Extended Control) и устаревший XML-протокол моделей, выпущенных до 2010 года.
- **Протоколы работают параллельно** — ресивер MusicCast объединяет управление усилителем YNCA с мультирумом MusicCast, эквалайзером и медиафайлами в одном объектном дереве.
— **Мгновенные обновления** — MusicCast вносит изменения, сообщает YNCA в режиме реального времени.
- **Самовосстанавливающиеся соединения** — автономный приемник подключается после получения ответа; один протокол переподключается самостоятельно, в то время как другие продолжают работу.
- **Вводимые данные** — логические значения, выпадающие списки и числа с указанием единицы измерения и диапазона вместо необработанного текста.
- **Предустановки и избранное** — вызов предустановок тюнера и сохраненных сетевых/USB избранных станций по номеру, пошаговое переключение между предустановками, сохранение текущей станции в слот предустановки или добавление ее в закладки, а также просмотр сохраненных списков с их названиями (MusicCast); вызов недавно воспроизведенных станций на устройствах MusicCast.
- **Просмотр меню** — постраничное перемещение по меню сетевого радио, медиасервера и USB, как с помощью пульта дистанционного управления: видимые строки меню в виде точек данных, выбор по строкам и точка данных пути, которая позволяет перейти к избранному за один раз.
— **Отображение часов и будильника** — Настольные аудиоустройства MusicCast отображают настройки часов и будильника.
- **Ориентация на возможности** — состояния генерируются на основе данных, предоставляемых каждым устройством, нет жестко заданного списка моделей.
- **Автоматическое обнаружение** — пустой список устройств находит и настраивает устройства MusicCast при запуске.
- **Диспетчер устройств** — ресиверы отображаются в виде административных карт с указанием модели, адреса, индикаторов протокола в реальном времени и значка типа устройства (ресивер, стереосистема, колонка, саундбар, CD-проигрыватель).

## Требования
- Node.js >= 22
- js-controller >= 7.2.2
- admin >= 7.8.23

## Порты
- **UDP 41100 (прослушивание)** — Устройства MusicCast отправляют события изменения на этот порт на хосте ioBroker.
- **UDP 1900 (многоадресная рассылка, исходящий трафик)** — поиск SSDP при запуске системы.
- **TCP 50000 (исходящий)** — соединение управления YNCA с каждым приемником.
- **TCP 80 (исходящий)** — запросы по протоколам MusicCast и XML к каждому устройству.

## Конфигурация
В административной панели устройства управляются как карточки. **Оставьте список пустым**, и адаптер автоматически найдет устройства MusicCast в сети при запуске, или добавьте устройства по IP-адресу через диалоговое окно «+», чтобы запускать только их. По умолчанию поиск выполняется на каждом сетевом интерфейсе; дополнительный селектор **сетевого интерфейса** ограничивает его одним интерфейсом.

Более старые ресиверы Yamaha (выпущенные до ~2010 года, использующие протокол XML) не объявляют о себе в сети и должны быть добавлены вручную. Интервал **XML-запроса** определяет, как часто они опрашиваются (по умолчанию 60 секунд).

Раздел **Точки данных** включает или выключает целые группы точек данных — **Воспроизведение и просмотр**, **Тюнер**, **Мультирум**, **HDMI**, **Сцены**, **Звук**, **Дополнительно** и **Часы и будильник**. Выключенная группа удаляется из дерева и даже не запрашивается, что также ускоряет запуск; ядро усилителя (питание, громкость, отключение звука, вход, звуковая программа, спящий режим) всегда остается включенным.

## Государственное дерево
Каждый приемник становится отдельным узлом устройства с тематическими группами — теми же группами, которыми управляют коммутаторы **точек данных**. Создается только то, что передает ваше устройство.

- **Основной блок усилителя** (всегда включен) — питание, громкость, отключение звука, вход, звуковая программа, спящий режим, а также информация об устройстве с указанием модели, прошивки и типа подключения.
- **`player`** — один канал для каждого источника воспроизведения (Spotify, USB, сервер, сетевое радио, CD и т. д.) с указанием состояния воспроизведения, исполнителя, альбома, трека, обложки и кнопок управления воспроизведением. Папка `player.browse` отражает меню мультимедиа устройства: восемь видимых строк (папки и заголовки отмечены символом), `selectLine` работает как кнопка OK на пульте дистанционного управления, кнопки Page/Back/Root, JSON-файл `rows` для виджетов и точка данных `path`, которая, например, проходит по пути `Bookmarks>Radio Paradise` за одну запись.
- **Тюнер** — AM/FM и DAB радио, включая текстовые RDS-сигналы и частотный приемник.
- **`мультирум`** — зоны 2–4, зона B, переключатели для всех зон (общее питание, режим вечеринки) и группа устройств MusicCast в отдельной папке `multiroom.group`.
- **`hdmi`** — выходы HDMI и синхронизация звука и изображения.
- **`сцена`** — названия сцен, указанные получателем, и воспроизведение сцены.
- **Звук** — обработка тембра и звука: низкие/высокие частоты, режимы DSP, энхансер, эквалайзер, ….
- **Расширенные настройки** — параметры настройки: максимальная/начальная громкость, конфигурация динамиков, названия входов.
- **`clock`** — настройки часов и будильника настольных аудиоустройств MusicCast (только для чтения).

## Поиск неисправностей
### Обновление с версии 0.5.x
Версия 1.0.0 — это полная переработка. При первом запуске после обновления старые точки данных (`volume`, `power`, `Commands.*`, `Realtime.*`, …) удаляются, и ваш приемник создается заново как устройство; его IP-адрес переносится автоматически. Направляйте скрипты и визуализации по новым путям — например, `yamaha.0.<device>.power` вместо `yamaha.0.power`.

### Приёмник не обнаруживается автоматически
В сети объявляют о себе только устройства MusicCast — более старые ресиверы необходимо добавлять вручную через диалоговое окно «+». Если на хосте с несколькими сетевыми интерфейсами ничего не обнаруживается, проверьте настройку «сетевого интерфейса».

### Отсутствуют точки данных
Проверьте переключатель группы в настройках **точек данных** и помните, что дерево содержит только то, что сообщает ваше устройство. Точки данных зоны находятся в разделе `multiroom`, а не на верхнем уровне.

### Значения обновляются медленно
Если MusicCast обновляется только каждые несколько минут, значит, другой приложение занимает UDP-порт 41100, и адаптер переключился на опрос — это отмечается в журнале запуска.

### Первый запуск занимает некоторое время
При первом подключении адаптер запрашивает у приемника информацию о поддерживаемых им функциях — до половины минуты на каждое устройство YNCA. Результат запоминается, последующие запуски происходят быстрее.

## История
Адаптер Yamaha имеет долгую историю на платформе ioBroker, и эта версия продолжает её — для существующих пользователей это просто новая версия того же самого адаптера:

- **[soef](https://github.com/soef)** создал адаптер в 2015 году и разработал его.

Оригинальный контроль над сетевым протоколом XML от Yamaha, с обновлением состояния в реальном времени и поддержкой нескольких зон.

- **[Гарфонсо](https://github.com/Garfonso)**, **[Сник-Л8](https://github.com/Sneak-L8)**

а **[Аполлон77](https://github.com/Apollon77)** внес свой вклад в последующие годы — обеспечение совместимости с административным интерфейсом, исправления ошибок и отчеты о сбоях Sentry.

- **[Адаптеры сообщества ioBroker](https://github.com/iobroker-community-adapters)**

Команда разработчиков — в частности, [foxriver76](https://github.com/foxriver76) и [mcm1957](https://github.com/mcm1957) — поддерживала адаптер с 2020 по 2026 год, выпустив версии до 0.5.4.

— Начиная с 2026 года, [krobi](https://github.com/krobipd) поддерживает адаптер в сообществе.

организацию и перестроил ее с нуля, объединив протоколы YNCA, MusicCast (YXC) и устаревшие XML-протоколы в единое дерево объектов.

## Поддерживать
- [Форум ioBroker](https://forum.iobroker.net/)
- [Проблемы на GitHub](https://github.com/iobroker-community-adapters/ioBroker.yamaha/issues)

### Поддержка разработки
Этот адаптер бесплатный и с открытым исходным кодом. Если он вам пригодится, подумайте о том, чтобы угостить меня кофе:

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

- (krobipd) Fixed: commands sent in quick succession all arrive — a scene switching power, input and volume in one go used to lose everything after the first command
- (krobipd) Fixed: a command the device rejects is now reported instead of counting as success, so a MusicCast device that stops answering is reconnected rather than silently freezing
- (krobipd) Fixed: names and menu entries containing "&" or other special characters now read and write correctly on the older XML protocol
- (krobipd) Fixed: writing one equalizer band no longer resets the other two when the device has not reported its bands yet
- (krobipd) Fixed: switching the tuner band and setting a frequency right after each other now applies the frequency to the new band
- (krobipd) Improved: startup with automatic discovery is much faster on networks with many devices, and a reconnect no longer re-asks what the device already told us
- (krobipd) Fixed: recalling a favourite, a recently played item or a tuner preset now goes to the zone that is actually listening instead of always switching the main zone
- (krobipd) Improved: stopping or restarting the adapter no longer leaves requests running that write to datapoints afterwards
### 1.3.0 (2026-08-26)

- (krobipd) New: menu browsing — page through the Net Radio, server and USB menus like with the remote: visible lines as datapoints, select-by-line, and a path datapoint for one-write navigation (#613)
- (krobipd) New: save presets from ioBroker — store the current tuner or network station to a preset slot and bookmark the playing Net Radio station on YNCA receivers.
- (krobipd) New: Bluetooth pairing and connect controls, FM mono mode and tuning indicators on YNCA receivers.

### 1.2.0 (2026-08-25)

- (krobipd) Fixed: volume writes work again — a written -38 dB reached the receiver as -3.8 dB, so most values were ignored; all numeric controls now send the proper wire format (#612)
- (krobipd) Fixed: the FM frequency datapoint now shows MHz (it was mislabelled kHz) and accepts direct frequency writes in the form the tuner expects.
- (krobipd) New: preset selection — recall tuner presets by number with up/down stepping, and recall stored network or USB favourites per source on YNCA receivers (#613)
- (krobipd) New: MusicCast selection lists — stored favourites and tuner presets with names, a recently-played list with recall by number, and the device's own allowed values as dropdowns.
- (krobipd) New: more device detail — CD track and drive info, DAB and RDS station data, and a read-only clock and alarm view with its own datapoint group switch in the admin settings.

### 1.1.1 (2026-08-22)

- (krobipd) Changed: Internal cleanup. No user-facing changes.

### 1.1.0 (2026-08-22)

- (krobipd) Fixed: a device carried over from the old adapter is no longer called by its IP — the object folder and the admin card now show the name the device reports, or its model.
- (krobipd) Improved: a device that has not reported a model yet already carries its device-class symbol instead of none.

### 1.0.1 (2026-08-22)

- (krobipd) Complete rebuild: one adapter now speaks YNCA, MusicCast and the legacy XML protocol — every protocol a device answers runs in parallel on one object tree.
- (krobipd) New object tree with typed datapoints built from what your device reports. Old datapoints are removed automatically, the address is carried over — point scripts at the new paths.
- (krobipd) Instant updates: MusicCast push events and the live YNCA connection replace polling; connections heal themselves, and one protocol's hiccup reconnects just that protocol.
- (krobipd) Auto-discovery sets up MusicCast devices by itself when the device list is empty, and the admin shows every receiver as a card with model, address and protocol indicators.
- (krobipd) Whole datapoint groups such as playback sources, tuner, multiroom or scenes can be switched off in the admin — and are then not even queried from the device.
- (krobipd) The multiroom folder tells the scope at a glance: switches that affect all zones say so in their name, and the MusicCast device group has its own `multiroom.group` folder.
- (krobipd) Every device shows a type icon — receiver, stereo receiver, speaker, soundbar or CD system, detected from the reported model — in the object tree and on its admin card; the adapter logo now stays readable in light and dark mode.
- (krobipd) Upgrading from 0.5.x shows a one-time notice explaining the new object tree before the update installs.
- (mcm1957) version has been rebuilt due to deploy problems

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

The MIT License (MIT)

Copyright (c) 2015-2024 soef <soef@gmx.net>  
Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2026 krobi <krobi@power-dreams.com>

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

---

_Developed with assistance from Claude.ai_