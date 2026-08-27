---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.multicast/README.md
title: Адаптер Multicast-APi для ioBroker
hash: KU4BUtGyVANFwAVICfRb68GWFKRcE1QIyYZRdKvt8is=
---
![Версия NPM](http://img.shields.io/npm/v/iobroker.multicast.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.multicast.svg)
![Количество установок (последние)](http://iobroker.live/badges/multicast-installed.svg)
![Количество установок (стабильных)](http://iobroker.live/badges/multicast-stable.svg)
![Статус зависимости](https://img.shields.io/david/DrozmotiX/ioBroker.multicast.svg)
![Известные уязвимости](https://snyk.io/test/github/DrozmotiX/ioBroker.multicast/badge.svg)
![НПМ](https://nodei.co/npm/ioBroker.multicast.png?downloads=true)

<h1>

<img  src="admin/multicast.png"  width="64" alt=""/>ioBroker.multicast

</h1>

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации и сведений о том, как отключить отправку сообщений об ошибках, см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отправка сообщений Sentry используется начиная с js-controller 3.0.

# Адаптер Multicast-APi для ioBroker
Этот адаптер предоставляет API на основе протокола многоадресной связи для отправки и получения состояний на устройства с пользовательской прошивкой.

Назначение этого адаптера заключалось в следующем:

* Предоставляет альтернативу протоколам HTTP POST и MQTT.
* Обеспечить наличие единого API, основанного на многоадресной передаче данных и передаче данных в формате JSON.
* Необходимо установить адаптер с нулевым потреблением энергии для интеграции любых устройств Ethernet (например, платы на базе ESP, таких как Wemos D1 mini), например, умных розеток Vansware/Gosound или других устройств автоматизации собственной разработки.

### Бесконтактное взаимодействие?
API разработан таким образом, что не требует дополнительной настройки со стороны конечного пользователя ни в самом адаптере, ни в используемом устройстве.
В случае использования Wi-Fi-перехода необходимо предоставить только учетные данные Wi-Fi (устройства, работающие в локальной сети, будут обрабатываться полностью автоматически).
Это требует от разработчика усилий по созданию бинарного файла для прошивки соответствующего чипсета (например, чипсетов на базе ESP).

Когда прошивка соответствует всем правилам API (см. ниже), обмен данными осуществляется следующим образом:

* Устройство отправляет значения состояния по протоколу UDP multicast.
* Адаптер распознает это сообщение и проверяет, присутствуют ли состояния для этого устройства в ioBroker.

#### Новое устройство
Согласно предыдущему сообщению, адаптер указал, что устройство не найдено; будет выполнена следующая процедура:

* ioBroker отправляет широковещательное сообщение для инициализации устройства.
* Устройство отправляет все состояния и связанную с ними структуру в ioBroker.
* ioBroker создает новое устройство и все необходимые состояния.
* После создания всех состояний ioBroker отправляет устройству подтверждение готовности к приему данных.
* Устройство начинает отправлять информацию о своем состоянии с определенными интервалами или по мере изменения (в соответствии с конфигурацией прошивки).

#### Переподключение существующих устройств
Согласно предыдущему сообщению, адаптер указал, что устройство уже существует; будет выполнена следующая процедура:

* ioBroker проверяет, установлен ли параметр конфигурации в значение "restore".
* При активации функции восстановления ioBroker отправляет все состояния (кроме информационных состояний) на устройство.
* После получения всех состояний устройство отправляет ioBroker подтверждение готовности к приему данных.
* ioBroker подтверждает
* Устройство начинает отправлять информацию о своем состоянии с определенными интервалами или по мере изменения (в соответствии с конфигурацией прошивки).

#### Изменения состояния
Адаптер сконструирован таким образом, чтобы отправлять до 5 повторных попыток для обеспечения получения устройством всех изменений состояния. Эта процедура обрабатывается следующим образом:

* Состояние изменено в ioBroker
* Адаптер распознает изменение значения и отправит новое значение на устройство.
* Устройство должно подтвердить сообщение в течение 500 мс.
* Если сообщение не подтверждено, адаптер повторно отправит значение.
* Будет выполнено максимум 5 повторных попыток, после чего появится сообщение об ошибке, указывающее на потерю связи.

### Структура и документация API
{будет сделано / в процессе выполнения}

## Запланированные дела:
* [ ] Реализовать очередь, подождать 20 мс после изменения состояния устройства и отправить массив со всеми обновлениями состояния.
* [x] Реализация значения истечения срока действия через API
* [x] Оптимизировать повторную попытку состояния, не запускать повторное срабатывание каждые 500 мс, увеличивая очередь.
* [x] Отправить данные восстановления, если получен сигнал Harbert и соединение с устройством FALSE
* [x] Реализовать состояния (возможность для списка значений)
* [x] Корректная обработка имени хоста и изменений имени хоста

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->

### __WORK IN PROGRESS__
* (DutchmanNL) Dependencies updated to current versions
* (DutchmanNL) Resolved remaining repository checker findings

### 0.2.0-ALpha.1
* (DutchmanNL) Maintenance: raise Node.js to 22, modernise CI and release tooling, update dependencies, resolve repository checker findings
* ([Andiling](https://github.com/andiling)) Expire value by API implemented
* (DutchmanNL) Rebuild retry functionality

### 0.1.6 (2021-03-23)
* (DutchmanNL) Dependency updates

### 0.1.5
* (Dutchman & Andiling) Stable-Release candidate

### 0.1.4
* (DutchmanNL) Fix Device Name
* (DutchmanNL) improved way of handling info channel values compatible with old firmware

### 0.1.3
* (Dutchman) Optimise state retry, don't fire every 500ms more queuing
* (Dutchman) Send recovery data if Harbeat is received and connection to device is FALSE
* (Dutchman) Implement states (capability for value list)

### 0.1.2
* (Dutchman) Optimise state retry, don't fire every 500ms more queuing
* (Dutchman) Correct handling of hostname and hostname changes

### 0.1.1
* (Dutchman) Send recovery data if Harbeat is received and connection to device is FALSE
* (Dutchman) Implement states (capability for value list)

### 0.1.0

* (Dutchman & Andiling) initial release

## License

MIT License

Copyright (c) 2021 Dutchman & Andiling

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