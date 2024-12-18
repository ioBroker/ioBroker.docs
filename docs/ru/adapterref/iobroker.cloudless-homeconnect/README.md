---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.cloudless-homeconnect.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.cloudless-homeconnect.svg
BADGE-Number of Installations: https://iobroker.live/badges/cloudless-homeconnect-installed.svg
BADGE-GitHub: https://img.shields.io/github/license/eifel-tech/iobroker.cloudless-homeconnect?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/eifel-tech/iobroker.cloudless-homeconnect?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/eifel-tech/iobroker.cloudless-homeconnect?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/eifel-tech/iobroker.cloudless-homeconnect?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/eifel-tech/iobroker.cloudless-homeconnect?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/actions/workflow/status/eifel-tech/iobroker.cloudless-homeconnect/test-and-release.yml?branch=master&logo=github&style=flat-square
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.cloudless-homeconnect/README.md
title: ioBroker.cloudless-homeconnect
hash: Jg4oioGeertbryhpacD5b0c/6gfrbrOE4+hHXwH3fsc=
---
![логотип](../../../de/admin/cloudless-homeconnect-880x800.png)

# IoBroker.cloudless-homeconnect
Адаптер для устройств Homeconnect без облачной связи

## Адаптер Homeconnect без доступа к облаку
Адаптеру не требуется API для Homeconnect (https://api-docs.home-connect.com/), для которого требуется подключение устройств к Интернету. В этом адаптере связь и управление устройствами происходит локально после однократного создания конфигурации. Таким образом, устройства можно полностью отключить от Интернета после их регистрации в приложении Homeconnect. Чтобы загрузить правильную конфигурацию, необходимо установить подключение к Интернету.

Основная идея этого адаптера взята из https://github.com/osresearch/hcpy. Код Python здесь был перенесен на JavaScript и адаптирован для ioBroker.

## Предварительные условия перед установкой
Должен быть установлен как минимум Node.js **версия 18**.

Для адаптера в отличие от использования официального API<ins> нет</ins> ClientID требует только имя пользователя и пароль, которые использовались в приложении Homeconnect. Устройства необходимо зарегистрировать один раз через приложение Homeconnect.

Порт 443 должен быть включен на устройстве в локальной сети.

Может случиться так, что после загрузки конфигурации к устройству невозможно обратиться. Тогда нет DNS-записи для домена устройства в локальной сети. Помимо настройки в сети, вы можете просто ввести локальный IP-адрес устройства в точке данных `info.config` по адресу `host`.

## Конфигурация
Имя пользователя и пароль приложения Homeconnect необходимо ввести в конфигурации адаптера.

Проанализированная конфигурация сохраняется в точке данных `info.config`. Это не следует менять. Если устройства добавляются или удаляются из сети, их необходимо зарегистрировать через приложение Homeconnect, а содержимое вышеуказанной точки данных необходимо удалить. Затем адаптер перезапускается, подключается к настроенной учетной записи и снова считывает конфигурацию. В этом случае связь с устройствами снова осуществляется чисто локально.

Если со временем возникают ошибки подключения, предпринимается попытка нового подключения к устройству. По умолчанию это происходит 15 раз, но это можно настроить для экземпляра. Если попытка никогда не должна прерываться, т. е. вы всегда должны пытаться установить соединение, необходимо установить `0`.

## Точки данных
Здесь описаны наиболее важные точки данных. Имя содержит UID, который знает и использует соответствующее устройство. При изменении значения, неправдоподобного для устройства на данный момент, в журнале пишется запись в режиме отладки. Это может произойти, если, например, изменить `AbortProgram`, даже если в данный момент ни одна программа не активна. Структура строится, например, следующим образом:

```
<cloudless-homeconnect.0>
|
└── info
│       └── config
│
└── <Geräte-ID>
│       └── Command
│       |       └── AbortProgram
│       |       └── PauseProgram
│       |       └── ...
│       └── Event
│       |       └── ProgramFinished
│       |       └── CavityTemperatureTooHigh
│       |       └── ...
│       └── Option
│       |       └── ElapsedProgramTime
│       |       └── ProgramProgress
│       |       └── ...
│       └── Program
│       |       └── KeepWarm
|       |       |       └── Start
|       |       |       └── Duration
|       |       |       └── ...
│       |       └── Hot_Air
|       |       |       └── Start
|       |       |       └── Duration
|       |       |       └── ...
│       |       └── ...
│       └── Setting
│       |       └── ChildLock
│       |       └── PowerState
│       |       └── ...
│       └── Status
│       |       └── BackendConnected
│       |       └── CurrentTemperature
│       |       └── ...
|       └── ActiveProgram
|       └── SelectedProgram
```

###информационное.соединение
Эта точка данных становится `false`, если соединение с **хотя бы** одним устройством не может быть установлено, то есть в случае ошибки сокета. Это также сделает адаптер «желтым» в обзоре экземпляра. Новое подключение к устройству автоматически предпринимается 15 раз с максимальным временем ожидания 5 минут. Затем адаптер придется перезапустить вручную, чтобы снова установить соединение. Однако количество новых подключений можно изменить в настройках экземпляра (см. [Configuration](#configuration)) Почему устройство не может быть подключено и что это за устройство, можно узнать из записей предупреждений в журнале. Вот тогда и придётся искать «вручную», как устранить проблему. Точка данных устанавливается только для устройств, которые контролируются адаптером (см.](#observe)).

###информация.конфигурация
Здесь конфигурация сохраняется в формате JSON. Если это необходимо прочитать еще раз, например, из-за добавления новых устройств, содержимое необходимо удалить и при необходимости перезапустить адаптер.

### `ActiveProgram` и `SelectedProgram`
Точки данных содержат в качестве значения UID программы, которая в данный момент выполняется. `ActiveProgram` — это `readonly`.

### Наблюдать
С помощью точки данных `observe` устройства можно исключить из мониторинга адаптера при изменении на `false`. Например, в случае возникновения ошибки можно настроить, чтобы адаптером учитывалось только одно устройство и никакое другое устройство не «взаимодействовало».

###Команда
Точки данных из роли `button` собираются в `Command`, которые устройство предоставляет для удаленного управления. Реакцию другой стороны можно ожидать только в том случае, если команда правдоподобна: `AbortProgram` выполняется только в том случае, если программа также активна.

### Событие
Если происходит определенное событие, например «программа завершена», срабатывает соответствующая точка данных в папке `Event`.

### Вариант
Единственные читаемые данные, влияющие на программы, можно найти в разделе «Параметры». Доступные для записи параметры можно найти в папке `Program`. Поскольку одновременно может быть активной только одна программа, читаемые параметры всегда относятся к текущей запущенной программе.

###Программа
Соответствующую программу можно запустить через точку данных `Start`. Кроме того, считываются и передаются опции, которые поддерживает программа. Поэтому важно установить параметры **прежде** нажатия на `Start`. Если программа запущена, она будет отображаться в `ActiveProgram`.

Если программа запускается, даже если она уже активна, активная программа сначала завершается адаптером.

### Параметр
Здесь можно произвести общие настройки устройства. Например, настройку `Light_Cavity_001_Power` можно использовать для включения или выключения освещения духовки. Точка данных `InteriorIlluminationActive` в разделе `Status` доступна только для чтения и показывает только состояние освещения.

###Статус
`Status` содержит обзор состояний устройства. Они доступны только для чтения.

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### 1.3.0 (2024-12-02)

-   (eifel-tech) Dependency updates
-   (eifel-tech) common.min is only set if it is also present in the config (Issue #149)
-   (eifel-tech) Password in admin will be stored encrypted natively
    > [!CAUTION]
    > You have to reenter your password in admin config!

### 1.2.10 (2024-11-20)

-   (eifel-tech) Handle missing enums during parsing (Issue #148)

### 1.2.9 (2024-11-14)

-   (eifel-tech) Bugfix while reading program options (Issue #143)

### 1.2.8 (2024-11-05)

-   (eifel-tech) Prevent forbidden signs
-   (eifel-tech) More resolutions considered in instance settings
-   (eifel-tech) Number of connection attempts configurable (Issue #135)

### 1.2.7 (2024-10-24)

-   (eifel-tech) Notes from adapter checker

### 1.2.6 (2024-10-24)

-   (eifel-tech) Added translations

### 1.2.5 (2024-10-23)

-   (eifel-tech) Instance remains yellow when first started (Issue #129)

### 1.2.4 (2024-10-23)

-   (eifel-tech) Prevent message `undefined` from being sent

### 1.2.3

-   (eifel-tech) Added datapoint to indicate whether a socket connection exists

### 1.2.2

-   (eifel-tech) Using a persistent websocket connection

### 1.2.1

-   (eifel-tech) Abort the connection if errors occur in the socket connection to the device

### 1.2.0

-   (eifel-tech) Ability to exclude individual devices from control (Issue #117)
    > [!CAUTION]
    > The configuration had to be expanded for this, so the contents of the `info.config` data point have to be deleted and the adapter has to be restarted. Also delete the `General` object tree.

### 1.1.2

-   (eifel-tech) Washing machine: Program options are sent separately and not including the program to be started

### 1.1.1

-   (eifel-tech) Parsing the configuration simplified

### 1.1.0

-   (eifel-tech) Parsing of configuration for multiple devices revised

### 1.0.4

-   (eifel-tech) Dishwasher support

### 1.0.3

-   (eifel-tech) New socket connection after timeout

### 1.0.2

-   (eifel-tech) If a new program is started, any program that may be running will first be terminated

### 1.0.1

-   (eifel-tech) Increasing security with TLS

### 1.0.0

-   (eifel-tech) initial release

## License

MIT License

Copyright (c) 2024 eifel-tech <hikaso@gmx.net>

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