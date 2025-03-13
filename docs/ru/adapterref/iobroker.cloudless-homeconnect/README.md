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
hash: gTEKnhfULkMsk/QaAj1SYVnLstOinSeDmSlxwLZ0lDg=
---
![логотип](../../../de/admin/cloudless-homeconnect-880x800.png)

# IoBroker.cloudless-homeconnect
Адаптер для устройств Homeconnect без облачной связи

## Адаптер Homeconnect без доступа к облаку
Адаптеру не требуется API для Homeconnect (https://api-docs.home-connect.com/), для которого требуется подключение устройств к Интернету. В этом адаптере связь и управление устройствами происходит локально после однократного создания конфигурации. Таким образом, устройства можно навсегда отключить от Интернета после их регистрации в приложении Homeconnect. Для загрузки правильной конфигурации требуется подключение к Интернету.

Основная идея этого адаптера взята из https://github.com/osresearch/hcpy. Код Python был перенесен на Javascript и адаптирован для ioBroker.

## Предварительные условия перед установкой
Должен быть установлен как минимум Node.js **версии 18**.

Для адаптера, в отличие от использования официального API<ins> нет</ins> Требуется ClientID, только имя пользователя и пароль, используемые в приложении Homeconnect. Устройства необходимо зарегистрировать один раз через приложение Homeconnect.

На устройстве в локальной сети должен быть включен порт 443.

Может случиться так, что после загрузки конфигурации устройство не будет доступно для обращения. Тогда в локальной сети отсутствует DNS-запись для домена устройства. Помимо настройки в сети, локальный IP-адрес устройства можно просто ввести в точку данных `info.config` в `host`.

## Первые шаги
Обычно рекомендуются согласно [Профили конфигурации адаптера](#configuration) зарегистрированных устройств извлекаются с серверов Homeconnect при запуске адаптера. На некоторых серверах процесс входа в систему был изменен, поэтому автоматическая загрузка профилей больше не работает и требуется ручная загрузка. Для этой цели используется внешний инструмент **[Homeconnect Profile Downloader](https://github.com/bruestel/homeconnect-profile-downloader/tags)**.

Таким образом, если автоматическое извлечение невозможно, в журнале ioBroker появляется **предупреждение**, **_если ничего не появляется и адаптер запускается нормально, никаких дальнейших действий не требуется, и следующие шаги можно проигнорировать!_**

```
warn: Login not successful. Please put the zip from homeconnect-profile-downloader as described in docs manually into path <<Pfad zum Ablageort heruntergeladener Geräteprofile>> and restart adapter. See https://github.com/bruestel/homeconnect-profile-downloader also.
```

Если выдается предупреждение, необходимо локально установить **Homeconnect Profile Downloader**. Для этого перейдите по ссылке, скачайте последнюю версию для вашей операционной системы и [установить](https://github.com/bruestel/homeconnect-profile-downloader?tab=readme-ov-file#run-it): ![Версии Homeconnect Profile Downloader](../../../de/adapterref/profile_git.png)

Затем запустите установленное приложение и на стартовой странице выберите регион: ![Домашняя страница загрузчика профилей Homeconnect](../../../de/adapterref/profile_start.png)

Нажав на `FETCH APPLIANCE PROFILE DATA`, вы будете перенаправлены на страницу входа в Homeconnect, где вам необходимо войти в систему, используя данные доступа из приложения Homeconnect: ![Войти в Homeconnect](../../../de/adapterref/profile_login.png)

Если все прошло успешно, появится обзор zip-файлов для каждого устройства, зарегистрированного через приложение Homeconnect. Теперь необходимо загрузить zip-файлы и переместить их **без изменений** в папку, указанную в предупреждении в журнале ioBroker.

Затем адаптер необходимо перезапустить. Теперь из этих файлов создается конфигурация адаптера.

## Конфигурация
Имя пользователя и пароль приложения Homeconnect необходимо ввести в конфигурации адаптера.

Проанализированная конфигурация сохраняется в точке данных `info.config`. Это не должно меняться. Если устройства добавляются или удаляются из сети, их необходимо зарегистрировать через приложение Homeconnect, а содержимое вышеупомянутой точки данных необходимо удалить. Затем адаптер перезапускается, подключается к настроенной учетной записи и перезагружает конфигурацию. После этого связь с устройствами снова становится чисто локальной.

Если со временем возникнут ошибки подключения, будет предпринята попытка нового подключения к устройству. По умолчанию это происходит 15 раз, но может быть настроено для конкретного экземпляра. Если попытка никогда не должна прерываться, т. е. если попытки установить соединение должны предприниматься снова и снова, необходимо установить `0`.

## Точки данных
Наиболее важные точки данных описаны здесь. Имя содержит UID, который знает и использует соответствующее устройство. Если изменяется значение, которое в данный момент является неправдоподобным для устройства, в журнал записывается запись в режиме отладки. Это может произойти, например, если `AbortProgram` изменяется, даже если в данный момент ни одна программа не активна. Структура, например, следующая:

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
|       └── sendOptionsSeperately
```

### Информация.соединение
Эта точка данных становится `false`, если соединение с **хотя бы** одним устройством не может быть установлено, т. е. в случае ошибки сокета. Это также приводит к тому, что адаптер становится желтым в обзоре экземпляра. Повторное подключение к устройству будет автоматически предпринято 15 раз, максимальное время ожидания составит 5 минут. Затем адаптер придется перезапустить вручную, чтобы восстановить соединение. Однако количество новых подключений можно изменить в настройках экземпляра (см. [Конфигурация](#configuration)) Причина, по которой устройство не может быть подключено, и какое это устройство, содержится в предупреждающих записях в журнале. Здесь вам придется «вручную» посмотреть, как можно решить проблему. Точка данных устанавливается только для устройств, которые контролируются адаптером (см. [observe](#observe)).

### Информация.config
Здесь конфигурация сохраняется в формате JSON. Если требуется повторное чтение, например, из-за добавления новых устройств, содержимое следует удалить и перезапустить адаптер, если необходимо.

### `ActiveProgram` и `SelectedProgram`
Точки данных содержат в качестве значения UID программы, которая в данный момент запущена. `ActiveProgram` — это `readonly`.

### Наблюдать
С точкой данных `observe` устройства могут быть исключены из мониторинга адаптером при изменении на `false`. Например, в случае ошибки можно настроить так, чтобы адаптер учитывал только одно устройство, а никакое другое не «вмешивалось».

### SendOptionsSeparately
Обычно для запуска программы необходимые параметры отправляются на устройство в целом. Однако некоторые устройства ожидают, что эти параметры будут передаваться по отдельности, а не как блок.

> [!ПРИМЕЧАНИЕ] > > Если запуск программы не работает так, как ожидалось, или если в журнале отладки содержится что-то вроде `resource":"/ro/activeProgram","version":1,"action":"RESPONSE","code":400}`, эту точку данных можно изменить на `true` перед повторной попыткой запустить программу.

### Команда
В разделе `Command` собираются точки данных роли `button`, которые устройство делает доступными для удаленного управления. Реакцию с другой стороны можно ожидать только в том случае, если команда правдоподобна: `AbortProgram` выполняется только в том случае, если также активна программа.

### Событие
Если происходит определенное событие, например, «программа завершена», срабатывает соответствующая точка данных в папке `Event`.

### Вариант
В разделе «Параметры» вы найдете доступные только для чтения точки данных, которые влияют на программы. Параметры записи можно найти в папке `Program`. Поскольку одновременно может быть активна только одна программа, доступные для чтения параметры всегда относятся к текущей запущенной программе.

### Программа
Соответствующую программу можно запустить через точку данных `Start`. Кроме того, считываются и передаются заданные параметры, поддерживаемые программой. Поэтому важно задать параметры **до** нажатия на `Start`. Когда программа запущена, она будет отображаться в `ActiveProgram`.

Если программа запускается, когда другая программа уже активна, то активная программа сначала будет завершена адаптером.

### Параметр
Здесь можно выполнить общие настройки устройства. Например, настройку `Light_Cavity_001_Power` можно использовать для включения или выключения света в духовке. Точка данных `InteriorIlluminationActive` в `Status` доступна только для чтения и показывает только состояние освещения.

### Статус
`Status` содержит обзор состояний устройства. Они доступны только для чтения.

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### 1.6.0 (2025-02-27)

- (eifel-tech) Datapoint to send program options seperately (Issue #208)

> [!CAUTION]
>
> See [english](./docs/en/README.md#sendoptionsseperately) or [german docu](./docs/de/README.md#sendoptionsseperately)

### 1.5.0 (2025-02-24)

- (eifel-tech) Admin-Version >= 7.4.10
- (eifel-tech) Handling to start program for dishwasher S255HVX15E (Issue #201)

### 1.4.3 (2025-02-18)

- (eifel-tech) Handling to start program for dishwasher SN53ES02CE (Issue #194)

### 1.4.2 (2025-02-13)

- (eifel-tech) Error message after sending to /ro/selectedProgram on hood devices (Issue #193)

### 1.4.1 (2025-01-16)

- (eifel-tech) Creating instance directory if absent

### 1.4.0 (2025-01-15)

- (eifel-tech) Dependency updates
- (eifel-tech) Changed login process for getting device information by homeconnect (Issue #170)

### 1.3.0 (2024-12-02)

- (eifel-tech) Dependency updates
- (eifel-tech) common.min is only set if it is also present in the config (Issue #149)
- (eifel-tech) Password in admin will be stored encrypted natively

> [!CAUTION]
>
> You have to reenter your password in admin config!

### 1.2.10 (2024-11-20)

- (eifel-tech) Handle missing enums during parsing (Issue #148)

### 1.2.9 (2024-11-14)

- (eifel-tech) Bugfix while reading program options (Issue #143)

### 1.2.8 (2024-11-05)

- (eifel-tech) Prevent forbidden signs
- (eifel-tech) More resolutions considered in instance settings
- (eifel-tech) Number of connection attempts configurable (Issue #135)

### 1.2.7 (2024-10-24)

- (eifel-tech) Notes from adapter checker

### 1.2.6 (2024-10-24)

- (eifel-tech) Added translations

### 1.2.5 (2024-10-23)

- (eifel-tech) Instance remains yellow when first started (Issue #129)

### 1.2.4 (2024-10-23)

- (eifel-tech) Prevent message `undefined` from being sent

### 1.2.3

- (eifel-tech) Added datapoint to indicate whether a socket connection exists

### 1.2.2

- (eifel-tech) Using a persistent websocket connection

### 1.2.1

- (eifel-tech) Abort the connection if errors occur in the socket connection to the device

### 1.2.0

- (eifel-tech) Ability to exclude individual devices from control (Issue #117)

> [!CAUTION]
>
> The configuration had to be expanded for this, so the contents of the `info.config` data point have to be deleted and the adapter has to be restarted. Also delete the `General` object tree.

### 1.1.2

- (eifel-tech) Washing machine: Program options are sent separately and not including the program to be started

### 1.1.1

- (eifel-tech) Parsing the configuration simplified

### 1.1.0

- (eifel-tech) Parsing of configuration for multiple devices revised

### 1.0.4

- (eifel-tech) Dishwasher support

### 1.0.3

- (eifel-tech) New socket connection after timeout

### 1.0.2

- (eifel-tech) If a new program is started, any program that may be running will first be terminated

### 1.0.1

- (eifel-tech) Increasing security with TLS

### 1.0.0

- (eifel-tech) initial release

## License

MIT License

Copyright (c) 2025 eifel-tech <hikaso@gmx.net>

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