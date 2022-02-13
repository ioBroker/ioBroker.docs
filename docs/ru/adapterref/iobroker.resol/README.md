---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.resol/README.md
title: ioBroker.resol
hash: 5KDhA+LkQammqaj6e563W7RHzA1/Ce2QS3Ad3XVu6G8=
---
# IoBroker.resol
![Логотип](../../../en/adapterref/iobroker.resol/admin/resol.svg)

![Количество установок (последние)](http://iobroker.live/badges/resol-installed.svg)
![версия NPM](https://img.shields.io/npm/v/iobroker.resol.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/resol-stable.svg)
![Известные уязвимости](https://snyk.io/test/github/Grizzelbee/ioBroker.resol/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.resol.svg?downloads=true)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Загрузки](https://img.shields.io/npm/dm/iobroker.resol.svg)

[![CodeQL] (https://github.com/Grizzelbee/ioBroker.resol/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Grizzelbee/ioBroker.resol/actions/workflows/codeql-analysis.yml) [![Тестирование и выпуск] (https://github.com/Grizzelbee/ioBroker.resol/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/Grizzelbee/ioBroker.resol/actions/workflows/test-and-release.yml)

## Кредиты
Этот адаптер является производным от адаптера myVbus и основан на работе DutchmanNL и pdbjjens. Большое спасибо им обоим за их работу.
Поскольку pdbjjens хотел только считывать значения с vbus, а некоторым людям необходимо получить больше контроля над своими устройствами - этот адаптер был поднят.
Здесь вы получаете возможность управлять своим контроллером vbus.

## Адаптер ioBroker для Resol VBus
Этот адаптер подключает различные устройства на базе VBus к ioBroker, поддерживая различные типы подключения.

Он использует resol-vbus, библиотеку JavaScript, предоставленную Даниэлем Випперманном.
Посетите <https://github.com/danielwippermann/resol-vbus> и <https://www.npmjs.com/package/resol-vbus>, если вы заинтересованы в более глубоком погружении.

## Функции
* Позволяет считывать данные измерений с различных устройств RESOL(R) VBus(R) — предпочтительно, солнечных и системных контроллеров серии DeltaSol(R), включая встроенные счетчики количества тепла (HQM) — с помощью регистраторов данных DL3 или DL2, KM2 модули связи, адаптеры интерфейса VBus/LAN или шлюзы последовательной/LAN локально через TCP/IP.
* Также поддерживается доступ к устройству с помощью адаптера последовательного интерфейса VBus/USB или через VBus.net(R) с использованием DLx/KMx.
* Обрабатывает живые потоки данных VBus и делает их доступными в состоянии ioBroker.
* Значения обновляются с настраиваемым временем цикла.
* Чтение или установка параметров конфигурации устройства VBus не поддерживается. Для этого следует использовать инструменты, предоставляемые Resol, например. через VBus.net или инструмент параметризации RPT.
* Чтение канала 0 DL3 (датчики, напрямую подключенные к устройству DL3) не поддерживается из-за ограничений интерфейса DL3.

## Сентри.ио
Этот адаптер использует sentry.io для сбора сведений о сбоях и автоматического сообщения об этом автору.
Для этого используется [Плагин ioBroker.sentry](https://github.com/ioBroker/plugin-sentry). Пожалуйста, обратитесь к [домашняя страница плагина](https://github.com/ioBroker/plugin-sentry) для получения подробной информации о том, что делает плагин, какая информация собирается и как его отключить, если вы не хотите поддерживать автора своей информацией о сбоях.

## Советы по настройке
* По умолчанию для типа соединения установлено значение VBus/LAN, но его необходимо явно выбрать даже для VBus/LAN, иначе соединение не будет установлено.
* Правильные настройки прямого доступа к LAN для VBus/LAN, DL3, DL2, KM2:
  * Тип подключения: VBus/LAN или KM2 или DL2 или DL3
  * Идентификатор соединения: IP-адрес (например, 192.168.178.188) или FullyQualifiedHostName (например, host1.example.com)
  * Пароль VBus: YourVBusPassword (по умолчанию: vbus)
  * Порт подключения: настройка по умолчанию 7053 не должна изменяться.
  * Канал DL3: относится только к DL3 (значения 1-6, канал 0 не может быть прочитан)
  * Интервал обновления: время между обновлениями измеренных значений (по умолчанию 30 с).
* Правильные настройки доступа DL3, DL2, KM2 через VBus.net:
  * Тип подключения: vbus.net
  * Идентификатор соединения: оставьте пустым
  * Порт подключения: настройка по умолчанию 7053 не должна изменяться.
  * Пароль VBus: YourVBusPassword (по умолчанию: vbus)
  * Канал DL3: относится только к DL3 (значения: 1-6, канал 0 не может быть прочитан)
  * Идентификатор Via: Ваш тег Via (например, d1234567890.vbus.io) - без префикса http://
  * Интервал обновления: время между обновлением измеренных значений (по умолчанию 30 с).

### Примеры:
#### Подключение через USB/последовательный порт
| Операционная система | Устройство подключения | Адрес устройства | Порт | DL3-канал | через тег |
|------------------|------------------|---------------------|------|-------------|---------|
| Окна | USB/последовательный | COMx | | Нет | |
| Линукс | | /dev/tty.usbserial/ | | Нет | |

#### Подключение по локальной сети
Это включает в себя:

  * ЛВС
  * Устройства КМ2
  * Устройства DL2
  * Устройства DL3 (выбор канала важен, канал 0 не поддерживается)
  * Последовательный доступ к шлюзам LAN

| | Устройство подключения | Адрес устройства | Порт | DL3-канал | через тег |
|---------|------------------------------|---------------------------|----------------|-------------------------------------|-------------|
| | выберите свое устройство из списка | IP-адрес вашего устройства | TCP-порт | Канал DL3 для использования, если применимо | оставить пустым |
| Пример | км2 | 192.168.17x.xxx | 7053 (по умолчанию) | Нет | |
| Пример | ДЛ2 | 192.168.17x.xxx | 7053 (по умолчанию) | Нет | |
| Пример | ДЛ3 | 192.168.17x.xxx | 7053 (по умолчанию) | Канал х | |

#### Подключение через vbus.net от Resol
Вы найдете свой личный Via-tag для каждого устройства на главной странице vbus.net в разделе: My VBus.net - Мои устройства.
Лучше всего скопировать/вставить его оттуда - **без http://**

| | Устройство подключения | Адрес устройства | Порт | DL3-канал | через тег |
|-------------------|---------------------------|----------------|----------------|-------------|----------------------------------|
| | выберите vbus.net из списка | оставить пустым | TCP-порт | Нет | ваш Via-тег от resol vbus.net |
| Пример КМ2/ДЛ2 | vbus.net | | 7053 (по умолчанию) | Нет | d01234567890.vbus.net |
| Пример КМ2/ДЛ2 | vbus.net | | 7053 (по умолчанию) | Нет | d01234567890.vbus.io |
| Пример Dl3 | vbus.net | | 7053 (по умолчанию) | Канал х | d01234567890.vbus.io |

#### Отправка команд на resol устройство
Отредактируйте файл вашего контроллера, который вы найдете в установленном каталоге «lib\resol-setup».

{"dp": [{"dpName":"Pumpe1","type":"число","min":0,"max":2}, {"dpName":"Pumpe2","type":" число","мин":0,"макс":2}, {"dpName":"AutoRueckkuehl","тип":"число","мин":0,"макс":1} ],

"fct": [{"name":"Pumpe1","cmd":"Handbetrieb1","val":"val"}, {"name":"Pumpe2","cmd":"Handbetrieb2","val ":"val"}, {"name":"AutoRueckkuehl","cmds":[{"cmd":"ORueckkuehlung","val":"val"},{"cmd":"OHolyCool","val ":"val"}]} ]}

Пункты "dp" будут созданы после установки адаптера Пункты "fct", "name" есть ссылка на dpName.
Пример: Если вы измените значение в объекте «Pumpe1», то адаптер отправляет команду «Handbetrieb1» со значением на устройство resol.
Также возможно более одной команды. Например. "Авто Рюккюль"

#### Как добавить новую команду
например охлаждение для устройства resol cs plus

Обратите внимание на идентификатор устройства в объектах разрешения (8721). Откройте файл выбора lib/resol-setup/Setup-Resol-Types.js и обратите внимание на строку, соответствующую идентификатору устройства {"id":8721,"setup":" setup-resol-deltasol-cs-plus", "data": "resol-deltasol-cs-plus-110-data"},

Откройте файл resol-deltasol-cs-plus-110-data.js в каталоге resol-vbus/src/configuration-optimizers. Найдите в этом файле «ORueckkuehlung».

Откройте файл setup-resol-deltasol-cs-plus.js в каталоге lib/resol-setup/ Добавьте строку в "dp" {"dpName":"Rueckkuehlung","type":"number","min": 0,"max":1} Добавить строку в "fct" {"name":"Rueckkuehlung","cmd":"ORueckkuehlung","val":"val"},

Файл должен выглядеть так

{"dp": [{"dpName":"Pumpe1","type":"число","min":0,"max":2}, {"dpName":"Pumpe2","type":" число", "мин": 0, "макс": 2}, {"dpName": "Rueckkuehlung", "тип": "число", "мин": 0, "макс": 1}, {"имя dp" :"AutoRueckkuehl","тип":"число","мин":0,"макс":1} ],

"fct": [{"name":"Pumpe1","cmd":"Handbetrieb1","val":"val"}, {"name":"Pumpe2","cmd":"Handbetrieb2","val ":"val"}, {"name":"Rueckkuehlung","cmd":"ORueckkuehlung","val":"val"}, {"name":"AutoRueckkuehl","cmds":[{"cmd ":"ORueckkuehlung","val":"val"},{"cmd":"OHolyCool","val":"val"}]} ]}

Сохраните файл и перезапустите адаптер, теперь вы найдете новый объект Rueckkuehlung.

## Сделать
## Официальные уведомления
RESOL, VBus, VBus.net, DeltaSol и другие являются товарными знаками или зарегистрированными товарными знаками RESOL - Elektronische Regelungen GmbH <https://www.resol.de/en>

Все другие товарные знаки являются собственностью их соответствующих владельцев.

## Авторское право
Copyright (c) grizzelbee, 2022 г. <open.source@hingsen.de>

## Changelog

### v0.4.3 (2022-02-08)
* (grizzelbee) Fix: fixed wrong state role "switch" and changed to "level"

### v0.4.2 (2022-01-05)
* (grizzelbee) Fix: Removed password encryption stuff from admin to avoid double encryption

### v0.4.1 (2022-01-05)
* (grizzelbee) Fix: switched action roles from "indicator" to "switch" to be compliant with ioBroker rules
* (grizzelbee) Fix: Removed password encryption stuff and added dependency Admin >=4.0.9
* (grizzelbee) Fix: Fixed a few code warnings
* (grizzelbee) Fix: Fixed: info.connection has been written w/o ACK 
* (grizzelbee) Upd: updated dependencies

### v0.4.0 (2021-11-08)
* (grizzelbee) Upd: updated dependencies
* (grizzelbee) New: Trying more than one time to connect when network isn't setup properly. E.g. on router startup.

### v0.3.3 (2021-11-04)
* (grizzelbee) Upd: updated dependencies
* (grizzelbee) Upd: Switched from adapter-type climate-control to energy

### v0.3.2 (2021-09-16)
* (grizzelbee) Upd: updated dependencies
* (grizzelbee) Fix: [#27](https://github.com/Grizzelbee/ioBroker.resol/issues/27) Fixed: State value to set for "resol.0.xxx.010221110010002220" has to be type "number" but received type "string" - it may be needed to delete datapoints manually
* (grizzelbee) Upd: set correct tier in io-package
* (grizzelbee) New: Writing value null when received value is <= -999 and >= 999. This is to avoid writing crap when no sensors are connected. 
* (grizzelbee) New: Making use of adapter internal decrypt function (req. at least js-controller >= 3.0)

### v0.3.1 (2021-05-07)
* (gargano)    Fix: wrong object types fixed according JS-Controller 3.x
* (gargano)    Fix: prevent setState if value = undefined
* (gargano)    Upd: Updated resol lib by Daniel Wippermann to v0.22.0
* (grizzelbee) New: Added sentry
* (grizzelbee) Fix: Made eslint happy
* (grizzelbee) Upd: updated dependencies

### v0.3.0 (2021-01-xx)
* (grizzelbee) Upd: Updated dependencies
* (grizzelbee) New: Log connection-losts as info

### v0.2.1 (2021-01-23)
* (gargano)    New: write function to resol device added

### v0.2.0 (2021-01-18)
* (grizzelbee) New: New Icon
* (grizzelbee) Upd: Update resol-Bus lib to V0.21.0 
* (grizzelbee) Upd: Security-Update to lodash lib 
* (grizzelbee) Upd: Reorganized configuration to get it more intuitive  
* (grizzelbee) Upd: Config-page translated via gulp
* (grizzelbee) New: Changed the way to configure access via vbus.net to be more intuitive
* (grizzelbee) New: Extended documentation
* (grizzelbee) Fix: Adapter doesn't crash on connection losts anymore

### v0.1.0 (2020-03-29)
* (grizzelbee) Fix: config page shows current settings now (not default anymore) **May raise the need to reenter the password!**
* (grizzelbee) Fix: "Connected" state is updated correctly now if connection is disrupted.
* (grizzelbee) New: Added Badge for latest(npm) version to readme
* (grizzelbee) Fix: removed default password from config to ensure it's encrypted on first config
* (grizzelbee) Fix: removed Force-ReInit
* (grizzelbee) Fix: sensor maintenance indicators are working booleans now
* (grizzelbee) New: added new activity indicator states for each relais.
* (grizzelbee) New: testing configuration to avoid start with invalid config

### v0.0.6
* (pdbjjens) alpha 6 release updated dependencies

### v0.0.5
* (pdbjjens) alpha 5 release improved type and role mapping of adapter values

### v0.0.4
* (pdbjjens) alpha 4 release updated dependency on resol-vbus library to 0.21.0

### v0.0.3
* (pdbjjens) alpha 3 release tested with DL3 over local LAN and VBus.net and DeltaSol SLT (0x1001) incl. HQM (0x1011)

### v0.0.2
* (pdbjjens) alpha 2 release tested with VBus/LAN, KM2, VBus.net and DeltaSol E (0x7721 & 0x7722), DeltaSol M (0x7311 & 0x716), DeltaSol CS Plus (0x2211), Oventrop RQXXL (0x7541)

### v0.0.1
* (pdbjjens) initial release tested only with VBus/USB (Serial) and DeltaSol(R) BS2009 (0x427B)

## License
MIT License

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