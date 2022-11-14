---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.homeconnect/README.md
title: ioBroker.homeconnect
hash: 5GSNFhmWTRyGHasKupfsb68eCzOXxF/IM7j2o4VR69g=
---
![Логотип](../../../en/adapterref/iobroker.homeconnect/admin/homeconnect.png)

![версия NPM](http://img.shields.io/npm/v/iobroker.homeconnect.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.homeconnect.svg)
![Статус сборки](https://travis-ci.org/iobroker-community-adapters/ioBroker.homeconnect.svg?branch=master)

# IoBroker.homeconnect
## Voraussetzungen vor der Installation
Вы должны установить Node.js версии 8 сразу!!

Для адаптера Wird eine ClientID bentigt. Nutze die Einstellungen um jeden Schritt der Registrierung zu erreichen.

## Требования перед установкой
Должен быть установлен как минимум Node.js версии 8!

Для адаптера требуется ClientID. Используйте настройки для каждого шага для регистрации.

<https://developer.home-connect.com>

![Скриншот](../../../en/adapterref/iobroker.homeconnect/img/registrierung1.JPG)

Bei **Учетная запись пользователя Home Connect по умолчанию для тестирования** с адресом электронной почты, зарегистрированным в Home-Connect-App, не может быть изменен и одобрен процесс авторизации.

Для **Учетной записи пользователя Home Connect по умолчанию для тестирования** укажите адрес электронной почты, с которого должно быть отправлено приложение Home Connect.
был зарегистрирован, это также требуется позже в процессе авторизации.

![Скриншот](../../../en/adapterref/iobroker.homeconnect/img/registrierung2.JPG)

Bei **Тип счета** Индивидуальный учет. Die restlichen Daten sofern vorhanden ergänzen (keine Ahnung, ob das geprüft wird).

Для **Типа учетной записи** выберите Индивидуальный. Добавьте оставшиеся данные, если они доступны (не знаю, будет ли это проверено).

![Скриншот](../../../en/adapterref/iobroker.homeconnect/img/application1.JPG)

Dann auf **Applications** и anschließend auf **Register Application** gehen.

Затем перейдите в **Приложения**, а затем в **Зарегистрировать приложение**.

![Скриншот](../../../en/adapterref/iobroker.homeconnect/img/application2.JPG)

Bei **Идентификатор приложения** einen Namen für die Application eintragen, z.B. ioБрокер. Выберите **OAuth Flow** Device Flow.
**Учетная запись пользователя Home Connect для тестирования** kann leer bleiben. Bei **Success Redirect** eine URI eintragen, z.B. https://example.com.
Dann Speichern и Dann Hat Man Di Benötigte ClientID.

В поле **Идентификатор приложения** введите имя приложения, например. ioБрокер. Выберите **OAuth Flow** Device Flow.
**Учетная запись пользователя Home Connect для тестирования** может оставаться пустой. Для **Успешного перенаправления** введите URI, например. https://example.com.
Затем сохраните, и у вас есть необходимый ClientID.

## Конфигурация
В адаптере-конфигурации должно быть указано имя пользователя и пароль приложения Homeconnect, а также идентификатор клиента.

## Обращение
Mit den заявляет в командах kannst du das Programm stoppen, pausieren oder fortführen.

Mit den заявляет в настройках kannst du das Gerät ein oder ausschalten.

Дополнительные программы для штатов.active.BSH_Common_Root_ActiveProgram для запуска программ

Внутренние программы государств.

Wenn man checken möchte, ob ein Programm fertig ist muss

status.BSH_Common_Status_OperationState

auf den kompletten Название статуса übrprüft werden:

BSH.Common.EnumType.OperationState.Finished

Weitere Zustände sind noch:

"BSH.Common.EnumType.OperationState.Inactive": "Неактивно", "BSH.Common.EnumType.OperationState.Ready": "Готово", "BSH.Common.EnumType.OperationState.Run": "Выполнить", "BSH .Common.EnumType.OperationState.ActionRequired": "ActionRequired", "BSH.Common.EnumType.OperationState.Finished": "Finished"

Oder ob ein Gerät geöffnet ist

"BSH.Common.EnumType.DoorState.Open": "Открыто", "BSH.Common.EnumType.DoorState.Closed": "Закрыто"

## Применение
С помощью состояний в командах вы можете остановить, приостановить и возобновить программу.
С состояниями в настройках можно выключить или включить устройство Изменение значенияprograms.active.BSH_Common_Root_ActiveProgram приводит к запуску программы Изменение значенияprograms.selected.BSH_Common_Root_SelectedProgram ведет к выбору программы или опций

## Changelog

### 1.0.3

- Add manually login for SingleKey User
  
### 1.0.2

- Adapter complete rewriten. Includes a lot of Bugfixes
### 0.0.36

- fix for js.controller 3.3. Please delete the device in Objects manually

### 0.0.32 (29.12.2020)

- (Morluktom) bugfix for devices that are completely switched off (e.g. washing machine, dryer)

### 0.0.31

- (ta2k) fix pause start command

### 0.0.30 (10.05.2020)

- (ta2k) fix js controller 3 issues

### 0.0.27 (13.11.2019)

- (ta2k) improve option selecting

### 0.0.26 (04.11.2019)

- (ta2k) fix boolean settings

### 0.0.25 (08.09.2019)

- (ta2k) fix compact mode
- (ta2k) reduce query per minute to prevent too much request error

### 0.0.24 (08.09.2019)

- (ta2k) improve error messaging

### 0.0.22 (08.09.2019)

- (ta2k) improve error messaging

### 0.0.22 (26.07.2019)

- (ta2k) bugfixing

### 0.0.21 (12.07.2019)

- (ta2k) bugfixing

### 0.0.19 (30.06.2019)

- (ta2k) improve displaying long states, options and events

### 0.0.18 (26.06.2019)

- (ta2k) add error handling for stoping

### 0.0.17 (26.06.2019)

- (ta2k) make commands writeable

### 0.0.16 (26.06.2019)

- (ta2k) cleanup states after update

### 0.0.15 (24.06.2019)

- (ta2k) reconnect after token refresh

### 0.0.14 (18.06.2019)

- (ta2k) check for keep alive events

### 0.0.13 (18.06.2019)

- (ta2k) close event stream before reconnect

### 0.0.12 (18.06.2019)

- (ta2k) fix events lost after 12hr

### 0.0.11 (09.06.2019)

- (ta2k) fix set values and refresh available options after program select

### 0.0.10 (04.06.2019)

- (ta2k) add settings and commands, add options to available and fix bugs

### 0.0.9 (29.05.2019)

- (ta2k) clean up code and receive event notifications

### 0.0.8 (10.04.2019)

- (dna909) increase refreshTokenInterval

### 0.0.7 (03.04.2019)

- (TA2k) Improve refreshToken and add Register process in instance option

### 0.0.6 (09.01.2019)

- (dna909) Oven: add Option.FastPreHeat, Logging, query stream.type DISCONNECTED
- (tFaster) code format and cleanups,fixed devices data structure,renamed deviceArray to devices,
    added startInRelative for Oven

### 0.0.5 (28.11.2018)

- (dna909) add eventstream handling

### 0.0.4 (23.11.2018)

- (dna909) add event-listener

### 0.0.3 (14.11.2018)

- (dna909) query States and available programs

### 0.0.2 (08.11.2018)

- (dna909) OAuth2 Deviceflow-Authorization, enumerate connected appliances

### 0.0.1 (09.10.2018)

- (dna909) initial release

## License

The MIT License (MIT)

Copyright (c) 2020 dna909 <dna909@googlemail.com>, TA2k

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