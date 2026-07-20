---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.go-e-charger/README.md
title: ioBroker.go-eCharger
hash: 5xvlWK8KdbisRC8OiSukNL90CCh9HoBuH2Pu7c305UA=
---
![Логотип](../../../en/adapterref/iobroker.go-e-charger/admin/go-eCharger.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.go-e-charger?style=flat-square)
![Загрузки](https://img.shields.io/npm/dm/iobroker.go-e-charger?label=npm%20downloads&style=flat-square)
![node-lts](https://img.shields.io/node/v-lts/iobroker.go-e-charger?style=flat-square)
![Статус зависимостей Libraries.io для последней версии](https://img.shields.io/librariesio/release/npm/iobroker.go-e-charger?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/hombach/iobroker.go-e-charger?style=flat-square)
![размер репозитория GitHub](https://img.shields.io/github/repo-size/hombach/iobroker.go-e-charger?logo=github&style=flat-square)
![активность коммитов на GitHub](https://img.shields.io/github/commit-activity/m/hombach/iobroker.go-e-charger?logo=github&style=flat-square)
![Последний коммит на GitHub](https://img.shields.io/github/last-commit/hombach/iobroker.go-e-charger?logo=github&style=flat-square)
![Проблемы на GitHub](https://img.shields.io/github/issues/hombach/iobroker.go-e-charger?logo=github&style=flat-square)
![Статус рабочего процесса GitHub](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.go-e-charger/test-and-release.yml?branch=master&logo=github&style=flat-square)
![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.go-e-charger?branch=master&svg=true)
![Известные уязвимости SNYK](https://snyk.io/test/github/hombach/ioBroker.go-e-charger/badge.svg)
![Бета](https://img.shields.io/npm/v/iobroker.go-e-charger.svg?color=red&label=beta)
![Стабильный](https://iobroker.live/badges/go-e-charger-stable.svg)
![Установлено](https://iobroker.live/badges/go-e-charger-installed.svg)
![НПМ](https://nodei.co/npm/iobroker.go-e-charger.png?downloads=true)

# IoBroker.go-eCharger
[![CodeQL](https://github.com/hombach/ioBroker.go-e-charger/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hombach/ioBroker.go-e-charger/actions/workflows/codeql-analysis.yml)

## Версии
## Адаптер ioBroker для настенных зарядных устройств go-e Charger EV
Этот адаптер интегрирует одну или несколько настенных зарядных устройств go-e Charger в вашу систему домашней автоматизации ioBroker. Он циклически опрашивает каждое зарядное устройство через его локальный HTTP API, предоставляет все необходимые данные в соответствии с настройками ioBroker и позволяет управлять зарядкой непосредственно из вашей системы умного дома.

Для получения дополнительной информации об оборудовании go-e Charger посетите веб-сайт производителя: [go-e GmbH](https://go-e.com).

### Функции
- Поддерживает несколько зарядных устройств go-e в рамках одного адаптера.
- Мониторинг состояния автомобиля, мощности зарядки, тока зарядки, фаз сети и статистики энергопотребления.
- **ChargeNOW** – начните зарядку немедленно с настраиваемым током.
- **ChargeManager** – автоматическая зарядка от избытка солнечной энергии: зарядный ток постоянно регулируется в зависимости от доступной солнечной энергии, учитывая потребление электроэнергии в доме и уровень заряда домашней батареи. Зарядку вашего электромобиля можно отложить до тех пор, пока домашняя батарея не достигнет настраиваемого минимального уровня заряда.

> **Примечание:** В настоящее время функция зарядки от избытка солнечной энергии предназначена для управления **одним** зарядным устройством. При одновременном включении ChargeManager на нескольких зарядных устройствах зарядные токи не согласовываются между ними, и расчет избытка солнечной энергии будет давать неверные значения. Вскоре будет доступно расширение с согласованным управлением нагрузкой для нескольких зарядных устройств.

- Переключение между однофазной и трехфазной зарядкой (оборудование 3-го поколения и новее)
- Статистика энергопотребления для каждой RFID-карты (название карты, идентификатор и уровень заряженной энергии)
- Режим только для чтения для каждого настенного зарядного устройства – мониторинг только зарядного устройства без отправки **каких-либо** команд управления (без отпускания заряда, без зарядного тока, без переключения фаз), например, когда зарядка контролируется в другом месте или доступ управляется с помощью RFID-меток.

Протестировано с прошивками V033, V040.0, V041.0, V054.7, V054.11, V055.5, V055.7, V055.8, V56.1, V56.2, V56.8, V56.9, V56.11, V57.0, V57.1, V59.4, V60.0, V60.1, V60.2 и с параллельным подключением до 3 зарядных устройств.

### Требования
- Для аппаратных устройств 3-го и 4-го поколений необходимо включить "HTTP API v1" в вашем приложении go-e.
- Для переключения фаз дополнительно необходимо включить "HTTP API v2" в вашем приложении go-e (для оборудования 3-го поколения и новее).

## Конфигурация
Добавьте по одной записи для каждого зарядного устройства go-e в список настенных зарядных устройств и укажите его IP-адрес. При желании присвойте каждому зарядному устройству имя.

Включите режим «только для чтения» для зарядного устройства, если адаптер должен только считывать данные и никогда не записывать их. В режиме «только для чтения» адаптер не отправляет никаких команд управления — ни команды разблокировки заряда, ни команды зарядного тока, ни команды переключения фаз. Состояния ChargeNOW и ChargeManager по-прежнему можно переключать, но они не влияют на работу зарядного устройства в режиме «только для чтения». Используйте этот режим, если зарядка данного настенного зарядного устройства контролируется другой системой или управляется локально с помощью RFID-меток.

Для зарядки избыточной энергии от солнечных батарей с помощью ChargeManager настройте идентификаторы объектов следующих состояний вашей фотоэлектрической системы:

- доступная в настоящее время солнечная энергия [Вт]
- текущее потребление электроэнергии в доме [Вт]
- Текущий уровень заряда вашей домашней батареи [%]

Если потребление электроэнергии настенной приставки уже включено в общее потребление электроэнергии в вашем доме, установите соответствующий флажок, чтобы адаптер мог правильно рассчитать доступный избыток.

Длительность цикла опроса определяет, как часто адаптер считывает данные с зарядных устройств и регулирует зарядный ток (минимум 3 секунды, по умолчанию 10 секунд).

## Часовой
Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде. Для получения более подробной информации и сведений о том, как отключить отправку сообщений об ошибках, обратитесь к разделу [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!

## Пожертвовать
<a href="https://www.paypal.com/donate/?hosted_button_id=76GBRV9BX5US8"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.go-e-charger/master/docu/bluePayPal.svg" height="40"></a> Если вам понравился этот проект — или вы просто в хорошем настроении — подумайте о том, чтобы угостить меня пивом. За ваше здоровье! :beers:

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- (hombach) removed chai-based unit test dependencies; modernized test harness to Node.js assert (fixes Appveyor, #836)

### 1.1.0 (2026-07-05)

- (hombach) fixed reading of "unlocked by RFID" (uby) on gen 3+ chargers via API V2
- (hombach) read-only mode now suppresses all control commands (charge release, charging current, phase switching)
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 1.0.4 (2026-07-04)

- (hombach) harmonized i18n files
- (hombach) improved README and English texts
- (hombach) reworked translations in all languages
- (hombach) added 5s timeout to all HTTP requests to chargers
- (hombach) fixed adapter stop when no charger is reachable at startup; warn per unreachable charger
- (hombach) fixed German fallback text for RFID card channel names
- (hombach) added upper bound validation for cycle time
- (hombach) added link to manufacturer's website
- (hombach) code optimizations

### 1.0.3 (2026-07-03)

- (hombach) added translations
- (hombach) fixed state roles

### 1.0.2 (2026-07-01)

- (hombach) fix RFID data readout for gen 3+ chargers via API V2 (#802)
- (hombach) prepared for beta repo
- (hombach) eliminate yarn
- (hombach) upgraded adapter-core
- (hombach) updated axios
- (hombach) updated dependencies

### 1.0.1 (2026-05-17)

- (hombach) fix total stats
- (hombach) fix adapter checker findings
- (hombach) fix docu
- (hombach) fix tsconfig

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2020-2026 C.Hombach

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