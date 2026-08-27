---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.wiegand-tcpip.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.wiegand-tcpip.svg
BADGE-Number of Installations: https://iobroker.live/badges/wiegand-tcpip-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/wiegand-tcpip-stable.svg
BADGE-Dependency Status: https://img.shields.io/david/kbrausew/iobroker.wiegand-tcpip.svg
BADGE-NPM: https://nodei.co/npm/iobroker.wiegand-tcpip.png?downloads=true
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.wiegand-tcpip/README.md
title: **Настраивать**
hash: TqYWNxlG8KIYJ/l1891qdT8wP67uB10q1BP8g2US/zw=
---
# **Настраивать**
- [Первоначальный запуск](#initial-start-up) Первый доступ к устройству
- [Настройка адаптера](#door-access-controllers-settings) Настройка адаптера ioBroker
- [Настройки сети TCP/IP](#tcpip-network-settings) Настройка сетевого адаптера
- [Настройки контроллеров](#controllers-settings) Настройка устройства
- [Трансляция](#трансляция)
- [Серийный номер](#серийный-номер)
- [Настройка выделенной сети](#dedicated-network-setup)
- [Серийный номер](#серийный-номер)
- [Сетевой адрес устройства](#device-network-address)
- [Адрес хоста открытого сервера](#exposed-server-host-address)
- [Открытый порт хоста сервера](#exposed-server-host-port)

## **Начальный запуск**
При первом подключении устройства может потребоваться ввести данные сети.

Эти шаги необязательны и необходимы только для использования устройства в другой, удаленной сети, за пределами локальной сети экземпляра ioBroker.

* Чтобы это сделать...
- Подключите устройство к той же сети, в которой также находится ioBroker. Без Docker, VPN или других подсетей. [^1]
— Установите и запустите адаптер с настройками по умолчанию.
— Перейдите в раздел «Настройки» и выберите вкладку «Удалённая настройка устройства».
- Запустите сканирование устройства.

![Сканирование кнопочного устройства](../../../en/adapterref/iobroker.wiegand-tcpip/images/device-scan.png) Возможны два сообщения об ошибке, в результате которых устройства не обнаруживаются[^3], [^4]

— Если у вас активно несколько устройств, выберите нужное в раскрывающемся списке «Идентификатор устройства».
- Введите необходимые адресные данные в соответствующие поля ввода[^2]
— Теперь установите устройство в целевую сеть.

## **Настройки контроллеров доступа к дверям**
### **Настройки сети TCP/IP**
#### **Сетевой интерфейс**
Из списка выберите сетевой адаптер, к которому вы подключили ваше устройство. [^2]

- Специальные адреса
- `0.0.0.0` Все доступные интерфейсы (по умолчанию)
- `127.0.0.1` Только локальная сеть хоста (для [симулятора](https://github.com/uhppoted/uhppote-simulator))
— Все остальные варианты можно использовать, если вы знаете, чего хотите. Например, VPN, Docker и т.д.

#### **Порт отправителя**
Значение по умолчанию — 60000. При отсутствии сообщений об ошибках в сети менять это значение не требуется.

#### **Порт приемника**
Значение по умолчанию — 60099. При отсутствии сообщений об ошибках в сети менять это значение не требуется.

#### **Тайм-аут соединения в миллисекундах**
Значение по умолчанию — 2500 (2,5 секунды).
Тайм-аут для любой связи по сети.
Не изменяйте без консультации.
Значения ниже 1000 и выше 10000 могут работать временно, но всегда приводят к ошибкам в реальной работе.

#### **Интервал сердцебиения в миллисекундах**
Значение по умолчанию — 300000 (300 секунд == 5 минут).
Время между двумя попытками установить стандартное соединение с устройством, чтобы определить, активно ли оно.
Значения ниже 60000 и выше 900000 могут вызвать нежелательные побочные эффекты, которые трудно проанализировать.

#### **Максимальное отклонение времени в миллисекундах**
Значение по умолчанию — 60000 (60 секунд == 1 минута). Максимальное отклонение времени в миллисекундах.
Если отклонение больше, часы контроллера перекалибровываются.
Значения ниже 1200 миллисекунд игнорируются, и калибровка отключается.

#### **Низкоуровневая отладка**
По умолчанию отключено. Если включено, необработанные данные сетевого обмена записываются в отладочный журнал.
Изменять это без запроса от разработчика не требуется.

### **Настройки контроллеров**
Настройка устройства для прямого и обратного канала через сеть.
Используйте кнопки **+ / добавить** и **корзину** для каждого доступного устройства.
Существует два варианта связи между хостом (ioBroker) и устройством:
Ограниченная широковещательная рассылка и выделенная сетевая настройка (одноадресная и направленная широковещательная рассылка). [^7]

#### **Серийный номер**
Серийный номер вашего устройства.

#### **Тип модели**
Модель входа в дверь

#### **Ограниченное вещание** [^7]
Добавьте только серийный номер и тип модели, никаких других адресных/сетевых данных.

В этом случае все компоненты должны находиться в одной подсети.

Это относится как к отправителю (контроллеру), так и к получателю (ioBroker).

Это можно определить по одинаковому адресу шлюза и сетевой маске на обоих компонентах.

Во всех остальных случаях ВСЕГДА используйте "выделенную сетевую конфигурацию".

#### **Настройка выделенной сети (одноадресная и направленная трансляция)** [^7]
Пожалуйста, введите все адресные данные...

#### **Сетевой адрес устройства** [^7]
Общеизвестный IP-адрес (Unicast) устройства в удаленной сети. [^2] [^8]

#### **Открытый адрес хоста сервера** [^7]
Общеизвестный IP-адрес (Unicast) экземпляра ioBroker в удаленной сети. [^2] [^8]

#### **Открытый порт хоста сервера** [^7]
Общеизвестный IP-порт экземпляра ioBroker в удаленной сети после NAT [^5] и Docker-Exposed [^6].

[^1]: If you are unable to connect the device to the same local network as the ioBroker instance,

Необходимо задать IP-адреса другим способом.

[^2]: The device only allows IPv4 addresses.

[^3]: ![Error message: No Device found](../../../en/adapterref/iobroker.wiegand-tcpip/images/no-devices-found.png)

[^4]: ![Error message: Adapter not started](../../../en/adapterref/iobroker.wiegand-tcpip/images/adapter-not-run.png)

[^5]: [NAT RFC#2663](https://datatracker.ietf.org/doc/html/rfc2663)

[^6]: [Docker CLI: Port](https://docs.docker.com/engine/reference/commandline/port/)

[^7]: ![Network Setup](../../../en/adapterref/iobroker.wiegand-tcpip/images/network-setup.png)

[^8]: You can replace the "Unicast Address" with the "Directed Broadcast Address" in the configuration.

## Changelog
### 1.0.0 (2026-07-07)
* Node.js >= 22 required (Node.js 20 EOL)
* js-controller >= 6.0.11 required
* Migrated to NPM Trusted Publishing (no more classic NPM tokens)
* Migrated to ESLint 9 with `@iobroker/eslint-config`
* Added Dependabot configuration with auto-merge
* TypeScript 5.x, removed deprecated `common.materialize`
* `node:` prefix added to all built-in module imports
* Added UHPPOTE simulator based regression tests and release preflight scripts

### 0.4.7 (2024-11-05)
* Fix for ioBroker.BOT see issues
* Changes to new dependencies Node 22.x, Admin 5 and JS-Controler 5.0.19...

### 0.4.6 (2022-03-18)
* Documentation
* Translations
* Cosmetic improvements
* Fix for [Repository PR1720](https://github.com/ioBroker/ioBroker.repositories/pull/1720).

### 0.4.5 (2022-03-11)
* Bugfix: error in workflow

### 0.4.4 (2022-03-11)
* Structur Native uAPI-Framework
* user action for setTime
* setup docs

### 0.4.3
* setTime if device is running out
* add per Controller the Model (1-, 2- and 4-Doors)
* add info direction

### 0.4.2 (Beta)
* Remote network setup
* Broadcast device communication
* Remote device communication
* Bug ::Found uncleared intervals:: change clearInterval to adapter.clearInterval
* special remoteDoorOpen (in other contex change net-access-mode unmotivated to broadcast)
* device lowlevel debug enabled (from UHPPOTE framework connect to ioBroker log)
* add various "silly" log messages

### 0.4.1-beta
* Small blemishes fixed and translation completed

### 0.4.0-alpha
* First working package

Initial release

## License
GPL-3.0-only

Copyright (c) 2024-2026 kbrausew <kbrausew@magenta.de>