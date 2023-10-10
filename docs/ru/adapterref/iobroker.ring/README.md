---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ring/README.md
title: Кольцевой адаптер
hash: wBvVgVDQ5C1q5LAueoWqrfBt+F8w8nmPwlZD884QKok=
---
![Логотип](../../../en/adapterref/iobroker.ring/admin/ring.png)

![Статус сборки Travis CI](https://travis-ci.org/iobroker-community-adapters/ioBroker.ring.svg?branch=master)
![Статус сборки AppVeyor](https://ci.appveyor.com/api/projects/status/github/iobroker-community-adapters/ioBroker.ring?branch=master&svg=true)
![Количество установок](http://iobroker.live/badges/ring-stable.svg)
![НПМ-версия](http://img.shields.io/npm/v/iobroker.ring.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.ring.svg)
![НПМ](https://nodei.co/npm/iobroker.ring.png?downloads=true)

# Кольцевой адаптер
Адаптер Ring работает с устройствами Ring, такими как Ring Video Doorbell и Ring Cam, и показывает, звонит ли кто-то в дверной звонок или обнаружено движение.
Дверной звонок или камера Ring Video отправляет видеопоток при обнаружении движения или дверного звонка.

## Установка и настройка
После установки адаптера вам необходимо ввести свой токен.
Ring теперь требует использования двухфакторной аутентификации (2fa) для всех учетных записей.
Чтобы получить токен, выполните следующие действия в своей оболочке.

```shell
npx -p ring-client-api ring-auth-cli
```

или

```
# Unix
cd /opt/iobroker/node_modules/iobroker.ring/
npm i ring-client-api

cd /opt/iobroker/node_modules/iobroker.ring/node_modules/ring-client-api
node ring-auth-cli
```

Вы можете использовать специальные переменные для прямой трансляции, пути к снимку и имени файла. Эти переменные будут заменены счетчиком, меткой времени, идентификатором звонка или типом звонка.

* `%d`: временная метка Unix. Пример: `test_%d -> test_1588331430061`
* `%i`: идентификатор вашего кольцевого устройства: Пример: `test_%i -> test_234567890`
* `%n`: Счетчик с момента запуска экземпляра кольца. Пример: `test_%n -> test_1`
* `%k`: Тип вашего вызывного устройства: Пример: `test_%k -> test_doorbell`

### ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ
#### Я не получаю события, снимки и видео о движении или обнаружении человека
Поздравляем, весьма вероятно, что ваш текущий токен был помещен в черный список по звонку, что лишило вас возможности получать необходимые push-уведомления.
Лучший способ решить эту проблему — удалить все предыдущие токены браузеров/адаптеров на кольцевом веб-сайте и создать новый токен для адаптера.

Чтобы этот адаптер правильно реагировал на события, Ring должен отправить push-уведомление на используемый [Кольцо API-клиента](https://github.com/dgreif/ring), чтобы этот адаптер отреагировал на него. Логика этого адаптера была проверена несколько раз и работает для многих пользователей, поэтому если у вас возникнут проблемы с пропущенными событиями, вряд ли это вина этого адаптера.

### V3 Переписать критические изменения
1. Имена устройств были расширены за счет их описания (например, с «Устройство 1234567» на «Устройство 1234567 («Прожекторный сад»)»).
2. Данные моментального снимка/прямой трансляции теперь находятся в соответствующем канале, содержащем другие точки данных.
3. Объект моментального снимка/прямой трансляции был изменен с мета-типа на состояние с типом файла.
4. События (Движение, Звон и т.д.) теперь находятся в соответствующем канале.
5. Из-за того, что в Ring-Api прекращена поддержка узла до версии 16.x, этому адаптеру требуется узел v16.x или узел v18.x.
6. Активные обновления сокращены до одного раза в 2 часа, поскольку мы слушаем события и реагируем на них.

### SIP (до версии 3.x)
Вы можете использовать информацию SIP для видеоконференции SIP с вашим SIP-клиентом.
Адаптер не предоставит все кольцевые устройства, поскольку используемый API не включает все кольцевые устройства.

Вы можете использовать, например, SIP-клиент Blink на [http://icanblink.com/](http://icanblink.com/).
Чтобы видео работало, зайдите в настройки Blink и в разделе «Учетные записи», переключите вкладку на «Медиа» и снимите флажок «Шифровать аудио и видео» в разделе «Параметры RTP».
Будьте осторожны: срок действия SIP-информации истекает через несколько секунд! Надеюсь, скоро я смогу поддерживать видеопоток.
К сожалению, [Ring.com](https://ring.com) не имеет официального API, поддерживающего эту функцию.
Если вы нажмете кнопку `livestream request`, вы получите новую информацию SIP для создания сеанса SIP-видеовызова.
Если вы используете облако [Ring.com](https://ring.com), вы найдете в истории http-ссылку на ваше последнее записанное видео движения или дверного звонка.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 5.0.0 (2023-10-10)
* (bluefox) migrated the configuration to JSON
* (crocri) many changes for livestream and high-definition screenshots
* (theimo1221) Refactoring and cleanup

### 5.0.0-Beta (2023-10-10)
* (crocri) Ding event is now working again for Ring-Intercom
* (crocri) auto livestream creation takes now value from config, before fix
* (crocri) snapshot now async, because snapshot and livestream in parallel do not work
* (crocri) livestream duration now settable via tree entry will be auto reset via livestream request.
* (crocri) two new config entries auto_livestream and auto_snapshot to disable auto creation of livestream and snapshot.
* (crocri) some minor corrections to code
* (crocri) Removed binary States
* (crocri) Improvements for vis compatibility done
* (theimo1221) Refactoring and cleanup
* (theimo1221) Updated Packages

### 4.0.0 (2023-08-22)
* (theimo1221) !!Breaking Change!! From now on Node 18 or 20 is required, Node 16 is not supported anymore
* (theimo1221) Updated Ring-Api to v12 which needs Node 18 or 20
* (theimo1221) Updated Packages

### 3.4.1 (2023-08-06)
* (theimo1221) Compliance to adapter-checker
* (theimo1221) Updated Packages
* (theimo1221) Debounce Doorbell Presses
* (theimo1221) Added Support for cocoa_doorbell_v2
* (theimo1221) Added Support for stickup_cam_longfin
* (theimo1221) Fixed compatibility and recompile

### 3.4.0 (2023-06-09)
* (theimo1221) Updated Packages (which allows node 20 now)

### 3.3.1 (2023-05-18)
* (theimo1221) Updated Packages

### 3.3.0 (2023-04-02)
* (theimo1221) Updated Packages
* (theimo1221) Device with Type stickup_cam_longfin didn't yet support #483

### 3.2.7 (2023-03-22)
* (foxriver76) prepared js-controller v5

### 3.2.6 (2023-02-18)
* (theimo1221) Improve behavior on initial Location load fail
* (theimo1221) Updated Packages

### 3.2.5 (2023-01-28)
* (theimo1221) Updated Packages

### 3.2.4 (2022-12-15)
* (theimo1221) #385 Fix for Unlock Request on intercoms

### 3.2.3 (2022-12-15)
* (theimo1221) Updated Packages
* (theimo1221) #385 Experimental Ring Intercom support

### 3.2.2 (2022-12-02)
* (theimo1221) #373 Fix event receiving for iobroker instances without a unique hostname

### 3.2.1 (2022-12-02)
* (theimo1221) Redeploy

### 3.2.0 (2022-12-02)
* (theimo1221) Updated Packages
* (theimo1221) #373 Increase logging and change recording order on Doorbell Event

### 3.1.9 (2022-11-20)
* (theimo1221) #395 Resolve Package-lock.json issues

### 3.1.8 (2022-11-20)
* (theimo1221) Updated Packages
* (theimo1221) Compliance to the newest ring api version

### 3.1.7 (2022-10-28)
* (theimo1221) Updated Packages

### 3.1.6 (2022-10-28)
* (theimo1221) Inline subscription instead of properties for Event observer

### 3.1.5 (2022-10-16)
* (theimo1221) Updated Packages

### 3.1.4 (2022-10-16)
* (theimo1221) #376 Handling when reconnect fails

### 3.1.3 (2022-10-04)
* (theimo1221) Updated Packages

### 3.1.2 (2022-09-22)
* (theimo1221) Updated Packages
* (theimo1221) Fixed an issue with floodlight control

### 3.1.1 (2022-08-11)
* (theimo1221) Improved Doorbell Event Logging

### 3.1.0 (2022-08-04)
* (bluefox) Allowed to be used with node.js 18

### 3.0.5 (2022-07-05)
* (theimo1221) Improved Log Message on failed Snapshots during event handling
* (theimo1221) Added Support for doorbell oyster

### 3.0.4 (2022-06-17)
* (theimo1221) Fixed Edge Case resulting in lamps being permanently on

### 3.0.3 (2022-06-16)
* (theimo1221) Implemented location mode

### 3.0.1 (2022-06-08)
* (bluefox) Changed the russian translations

### 3.0.0-beta.13 (2022-05-30)
* (theimo1221) Prevented missing of events, due to a socket drop within ring-api-client
* (theimo1221) Improved device logging readability

### 3.0.0-beta.12 (2022-05-28)
* (theimo1221) Fixed error in beta.11 in regard to new installations
* (theimo1221) Harden Event Handling to prevent rare permanent busy occasions
* (theimo1221) Added support for doorbell device `doorbell_graham_cracker`

### 3.0.0-beta.11 (2022-05-24)
* (theimo1221) Added processing of new token provided by ring.

### 3.0.0-beta.10 (2022-05-24)
* (theimo1221) Added `lpd_v4` Doorbell

### 3.0.0-beta.9 (2022-05-21)
* (theimo1221) For stability reasons, perform an active refresh every 2 hours.

### 3.0.0-beta.8 (2022-05-17)
* (theimo1221) Fixed writing to iobroker-data/files folder (thx to Apollon)

### 3.0.0-beta.7 (2022-05-16)
* (theimo1221) Prevent Crashes on unsupported devices

### 3.0.0-beta.6 (2022-05-16)
* (theimo1221) Record more events (without recording twice)
* (theimo1221) Improved snapshot deleting for initial snapshot after restart

### 3.0.0-beta.5 (2022-05-14)
* (theimo1221) Prevented crashes during installation by clearer enforcing of node 16

### 3.0.0-beta.4 (2022-05-14)
* (theimo1221) Changes in io-package.json for release workflow

### 3.0.0-beta.3 (2022-05-14)
* (theimo1221) Rewrote V3 (Breaking Changes listed below)
* (theimo1221) Updated packages
* (theimo1221) Fixed in GitHub release workflow

### 2.0.0-beta.3 (2022-02-08)
* (theimo1221) Fixed adapter checker issues

### 2.0.0-beta.0 (2022-02-05)
* (theimo1221) Updated packages
* (theimo1221) Added JS-Controller 4.0 dependency
* (theimo1221) On ding --> First take snapshot then livestream

### 1.2.8 (2021-10-14)
* (theimo1221) Updated packages

### 1.2.6 (2021-09-05)
* (theimo1221) Updated packages
* (theimo1221) Stopped adapter on unhandled Error
* (theimo1221) Terminated adapter on invalid ring credentials

### 1.2.4-1 (2021-08-12)
* (theimo1221) Updated packages

### 1.2.4-0 (2021-08-07)
* (theimo1221) Refactoring
* (theimo1221) Updated packages

### 1.2.3 (2021-07-30)
* (theimo1221) Updated packages
* (theimo1221) Fixed compatibility issues with new ring api

### 1.2.2 (2021-05-05)
* (theimo1221) Updated packages due to security patches

### 1.2.1 (2021-04-09)
* (theimo1221) Bumped version

### 1.2.0 (2021-04-08)
* (theimo1221) Added new device type spotlightw as doorbell
* (theimo1221) Updated dependencies (ringapi, node-schedule, etc.)

### 1.1.6-3 (2021-03-29)
* (theimo1221) Fixed typo preventing Livestream recordings after motion detection
* (theimo1221) Reduced Levels of Log Messages, to not spam iobroker Log

### 1.1.6-2 (2021-03-29)
* (theimo1221) Fixing some Issues while saving snapshots and place Snapshots within 'iobroker-data' Folder.

### 1.1.6-1 (2021-03-26)
* (theimo1221) Support for Floodlight V2
* (theimo1221) Control Floodlight by Switch

### 1.1.5 (04.11.2020)
* (Stübi) Added floodlight

### 1.1.4 (23.05.2020)
* (Stübi) Added new libraries

### 1.1.3 (06.05.2020)
* (Stübi) Fixed error of missing objects

### 1.1.2 (02.05.2020)
* (Stübi) Fixed health info like missing battery status (Issue #22, Issue #25)
* (Stübi) Change error handling
* (Stübi) Providing Stick Up Cam (BETA)
* (Stübi) Using variables in the filename of the livestream or snapshot

### 1.1.1 (02.05.2020)
* (Stübi) Bugfixing
* (Stübi) User can enable/disable external sentry logging

### 1.1.0 (01.05.2020)
* (Stübi) Node 10 is now required, Node 12 recommended. If you use Node 8 or less, the adapter will stop immediately.
* (Stübi) Tested with js-controller 3. I recommend using js-controller 3 or higher because of sentry logging and more
  features in the future
* (Stübi) Snapshot link will be shown as https or http in state (Issue #18)
* (Stübi) Livestream link added and a request button added to get new livestream
* (Stübi) Old snapshots and livestreams can be deleted on the filesystem
* (Stübi) Sentry logging added
* (Stübi) Small improvements and bugfixing
* (Stübi) Added a Two-Factor Auth (2fa) description (Issue #14, Issue #13, Issue #19)

### 1.0.7 (24.12.2019)
* (Stübi) Bugfixing

### 1.0.6 (20.12.2019)
* (Stübi) Bugfixing: Login with username and password changed
* (Stübi) New feature (BETA): Now you can make snapshots in jpg and a livestream in mp4 format. Unfortunately, the snapshot / livestream does not always work!

### 1.0.5 (18.04.2019)
* (Stübi) Bugfixing
* (Stübi) Using new API. With this API livestreaming and snapshots are possible (work still in progress and not
  supported in this version)
* (Stübi) Fixed an error with js-controller 2.0. You need at least this version with js-controller 2.0
* (Stübi) Added two factory authentications

### 1.0.4 (17.04.2019)
* (Stübi) Bugfixing for Ring Pro

### 1.0.3 (09.03.2019)
* (Stübi) Major change! I had to change the used ring.com API to another API. The old one did not work anymore. For this reason, a lot has to be redesigned.

### 1.0.2 (01.02.2019)
* (Stübi) More debug information

### 1.0.1 (05.01.2019)
* (Stübi) Support js-controller compact mode

### 1.0.0 (04.01.2018)
* (Stübi) Added a camera device. For this reason, the device name changed from doorbot to doorbell.

### 0.1.3 (20.12.2018)
* (Stübi) Update error handling

### 0.1.2 (17.12.2018)
* (Stübi) Update error handling

### 0.1.1 (15.12.2018)
* (Stübi) Improvements

### 0.1.0 (14.12.2018)
* (Stübi) First Version

## License

MIT License

Copyright (c) 2018-2023 Thorsten <thorsten@stueben.de> / <https://github.com/schmupu>

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