---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.wiegand-tcpip.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.wiegand-tcpip.svg
BADGE-Number of Installations: https://iobroker.live/badges/wiegand-tcpip-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/wiegand-tcpip-stable.svg
BADGE-Dependency Status: https://img.shields.io/david/kbrausew/iobroker.wiegand-tcpip.svg
BADGE-NPM: https://nodei.co/npm/iobroker.wiegand-tcpip.png?downloads=true
BADGE-Test and Release: https://github.com/kbrausew/ioBroker.wiegand-tcpip/workflows/Test%20and%20Release/badge.svg
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.wiegand-tcpip/README.md
title: **Настраивать**
hash: fLsGqwEXHnJc+iDscsQ5nbgp8L0iR/uJvuYoI4di4AE=
---
# **Настраивать**

- [Первоначальный запуск.](#initial-start-up) Первый доступ к устройству.
- [Настройка адаптера](#door-access-controllers-settings) Настройка адаптера ioBroker
  - Настройка [сетевых параметров TCP/IP.](#tcpip-network-settings) Настройка сетевого адаптера.
  - Настройки [контроллера](#controllers-settings) Настройка устройства
    - [Серийный номер](#serial-number)
    - [Серийный номер](#serial-number)

## **Первоначальный запуск**

При первом подключении устройства может потребоваться ввести данные сети.

Эти шаги необязательны и необходимы только для использования устройства в другой, удаленной сети, за пределами локальной сети экземпляра ioBroker.

- Для этого...
  - Подключите устройство к той же сети, в которой также находится ioBroker. Не используйте Docker, VPN или другие подсети.[^1]
  - Установите и запустите адаптер с настройками по умолчанию.
  - Перейдите в раздел «Настройки» и выберите вкладку «Удалённая настройка устройства».
  - Запустите сканирование устройства.![Сканирование кнопочного устройства](../../../en/adapterref/iobroker.wiegand-tcpip/images/device-scan.png) Возможны два сообщения об ошибке, в результате которых устройства не обнаруживаются.[^3] ,[^4]
  - Если у вас активировано несколько устройств, выберите нужное в раскрывающемся списке «Идентификатор устройства».
  - Введите необходимые адресные данные в соответствующие поля ввода.[^2]
  - Теперь установите устройство в целевую сеть.

## **Настройки контроллеров доступа к дверям**

### **Настройки сети TCP/IP**

#### **Сетевой интерфейс**

Из списка выберите сетевой адаптер, к которому подключено ваше устройство.[^2]

- Специальные адреса
  - `0.0.0.0` Все доступные интерфейсы (по умолчанию)
  - `127.0.0.1` Только локальная сеть хоста (для [симулятора](https://github.com/uhppoted/uhppote-simulator) )
  - Все остальные варианты можно использовать, если вы знаете, чего хотите. Например, VPN, Docker и т.д.

#### **Порт отправителя**

Значение по умолчанию — 60000. При отсутствии сообщений об ошибках в сети менять это значение не требуется.

#### **Порт приемника**

Значение по умолчанию — 60099. При отсутствии сообщений об ошибках в сети менять это значение не требуется.

#### **Время ожидания соединения в миллисекундах**

Значение по умолчанию — 2500 (2,5 секунды). Тайм-аут для любой связи по сети. Не изменяйте его без консультации. Значения ниже 1000 и выше 10000 могут временно работать, но в реальной работе всегда приводят к ошибкам.

#### **Интервал сердцебиения в миллисекундах**

Значение по умолчанию — 300000 (300 секунд == 5 минут). Это время между двумя попытками установить стандартное соединение с устройством, чтобы определить, активно ли оно. Значения ниже 60000 и выше 900000 могут вызвать нежелательные побочные эффекты, которые трудно проанализировать.

#### **Максимальное отклонение времени в миллисекундах**

Значение по умолчанию — 60000 (60 секунд == 1 минута). Максимальное отклонение времени в миллисекундах. Если отклонение больше, часы контроллера перекалибровываются. Значения ниже 1200 миллисекунд игнорируются, и калибровка отключается.

#### **Низкоуровневая отладка**

По умолчанию отключено. Если включено, необработанные данные сетевого обмена записываются в отладочный журнал. Нет необходимости менять это без запроса от разработчика.

### **Настройки контроллеров**

Настройка устройства для прямого и обратного канала связи через сеть. Используйте кнопки **+ / добавить** и **удалить** для каждого доступного устройства. Существует два варианта связи между хостом (ioBroker) и устройством: ограниченная широковещательная рассылка и выделенная сетевая настройка (одноадресная и направленная широковещательная рассылка).[^7]

#### **Серийный номер**

Серийный номер вашего устройства.

#### **Тип модели**

Модель входа в дверь

#### **Ограниченное вещание**[^7]

Добавляйте только серийный номер и тип модели, никаких других адресных/сетевых данных.

> В этом случае все компоненты должны находиться в одной подсети. Это касается как отправителя (контроллера), так и получателя (ioBroker). Это можно определить по одинаковому адресу шлюза и маске сети на обоих компонентах.

> Во всех остальных случаях ВСЕГДА используйте "выделенную сетевую конфигурацию".

#### **Настройка выделенной сети (одноадресная и направленная трансляция)**[^7]

Пожалуйста, введите все адресные данные...

#### **сетевой адрес устройства**[^7]

Общеизвестный IP-адрес (Unicast) устройства в удаленной сети.[^2][^8]

#### **Открытый адрес хоста сервера**[^7]

Общеизвестный IP-адрес (Unicast) экземпляра ioBroker в удаленной сети.[^2][^8]

#### **Открытый порт хоста сервера**[^7]

Общеизвестный IP-порт экземпляра ioBroker в удаленной сети после NAT.[^5] и доступ через Docker[^6] .

[^1]: Если вам не удаётся подключить устройство к той же локальной сети, что и экземпляр ioBroker, необходимо задать IP-адреса другим способом.

[^2]: Устройство поддерживает только IPv4-адреса.

[^3]: ![Сообщение об ошибке: Устройство не найдено](../../../en/adapterref/iobroker.wiegand-tcpip/images/no-devices-found.png)

[^4]: ![Сообщение об ошибке: Адаптер не запущен](../../../en/adapterref/iobroker.wiegand-tcpip/images/adapter-not-run.png)

[^5]: [NAT RFC#2663](https://datatracker.ietf.org/doc/html/rfc2663)

[^6]: [Интерфейс командной строки Docker: Порт](https://docs.docker.com/engine/reference/commandline/port/)

[^7]: ![Настройка сети](../../../en/adapterref/iobroker.wiegand-tcpip/images/network-setup.png)

[^8]: В настройках вы можете заменить "Unicast Address" на "Directed Broadcast Address".

## Changelog
### 1.0.1 (2026-07-20)
* Bugfix: Controller heartbeat crash when serial number passed as string to UHPPOTE API
* Fixed i18n syntax error in Chinese translation (admin/words.js)
* Fixed README.md H1 heading validation (E6025)
* Resolved GitHub master branching violation (removed feat/user-management-foundation merge)

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