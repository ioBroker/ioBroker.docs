---
chapters: {"pages":{"en/adapterref/iobroker.synology/README.md":{"title":{"en":"ioBroker Synology adapter"},"content":"en/adapterref/iobroker.synology/README.md"},"en/adapterref/iobroker.synology/docs/en/template.md":{"title":{"en":"2FA"},"content":"en/adapterref/iobroker.synology/docs/en/template.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.synology/README.md
title: ioBroker Synology адаптер
hash: rlPB4VTbbUGuTGQgz02X1J+Q9dSy6AG+p0F7FQxCnN8=
---
![Логотип](../../../en/adapterref/iobroker.synology/admin/synology.png)

![Количество установок](http://iobroker.live/badges/synology-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.synology.svg)
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.synology/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/synology/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.synology.svg)

# ioBroker Synology адаптер

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

## Описание

Этот драйвер позволяет получать данные и управлять вашим NAS-сервером Synology.

### Настройки двухфакторной аутентификации

Если вы используете двухфакторную аутентификацию в DSM6/7, см. инструкции [здесь.](/#/docs/adapterref/iobroker.synology/docs/en/template.md)

### Важное примечание для установки Windows.

Для работы этого адаптера требуется установленный Git в системе hist. Установочные носители можно найти по адресу <https://git-scm.com/download/win> .

### Перезагрузка и выключение

Начиная с версии 2.1.4, адаптер будет делать это через SSH, поэтому, пожалуйста, укажите порт SSH в настройках адаптера. Вы можете увидеть его в настройках Synology:![графика](https://user-images.githubusercontent.com/6681528/161436776-bd04b0c6-cfb2-47ab-9bee-7ea700575bbb.png)![графика](https://user-images.githubusercontent.com/6681528/161436897-174f3396-c2bb-4248-b91c-707005f7d2a8.png)

### sendMethod

Вы можете отправить любую команду (метод), задав объект sendMethod, например: Получение информации о станции видеонаблюдения — это метод getInfo без дополнительных параметров.

`{"method": "getInfo", "params": {}}`

### Контроль

**commands.reboot** - перезагрузка NAS

**commands.wake** - отправить команду Wake On Lan на NAS

**commands.shutdown** - выключение NAS

_**SurveillanceStation.cameras.{NAMECAM}**_ :

- Включено - Текущее состояние и включение/выключение камеры
- linkSnapshot - URL для создания снимка

_**SurveillanceStation.HomeMode.status\_on**_ - Текущий статус и включение/выключение домашнего режима

_**SurveillanceStation.getSnapshotCamera**_ - Получает снимок по номеру камеры; файл сохраняется в каталоге.`...iobroker-data\synology_0\snapshotCam_2.jpg`

_**AudioStation.players.{PLAYERID}**_ :

- Воспроизведение, пауза, остановка, следующий, предыдущий — управление воспроизведением (кнопка, только в истинном состоянии)
- Повтор - Регулятор повтора (Выкл., Все, Один)
- перемешивание - Управление перемешиванием (истина/ложь)
- Громкость - Регулировка громкости с помощью пульта дистанционного управления проигрывателем (0-100)
- seek - Управление поиском при воспроизведении (0-100)
- play\_folder - Добавить треки из папки в плейлист (например, с идентификатором папки).`dir_5816` )
- play\_track - Воспроизводит трек по его идентификатору (например,`music_120847` )
- current\_play - Управление и статус текущего трека по его номеру в плейлисте (например,`14` )

_**DownloadStation**_ :

- activeTask - количество незавершенных загрузок
- listTasks - массив с незавершенными загрузками
- shedule\_enabled, shedule\_emule\_enabled - Состояние и управление запланированными или немедленными загрузками
- add\_hash\_download - добавить в список хэшей для скачивания (например)`8BD3CAD02FC9ECB661A12378414FA310D3F3FE03` )
- add\_url\_download - добавить URL для скачивания или magnet-ссылку
- папка — папка для загрузки, задается перед добавлением файла для скачивания; в противном случае файл будет загружен в папку по умолчанию.
- pause\_task, resume\_task - Приостановить загрузку и возобновить её. (например)`dbid_170` или`170` или`all` )

### Ящик для сообщений

```
sendTo('synology.0', 'getSnapshot', {camId: 2}, (res) => {
    if(res) sendTo('telegram.0', {text: res, caption: 'caption for image'});
});
```

## Changelog
<!--
     ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- (iobroker-bot) Adapter requires node.js >= 20 now.
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now
* (copilot) **CI/CD**: Updated ioBroker Copilot Instructions template from v0.4.0 to v0.4.2

### 3.1.0 (2024-04-07)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 3.0.1 (2023-10-01)
* (Standarduser) A Typo in RegEx for Mac-Address has been corrected.
* (McM1957) Dependencies have been updated.

### 3.0.0 (2023-09-07)
* (Standarduser) Added WOL to awake Synology NAS server
* (bluefox) Only node 16 or higher supported

### 2.1.13 (2022-11-05)
*(McM1957) Code has been prepared for upcoming js-controller release. Reference to utils.controllerDir has been removed. (#198)
*(McM1957) Several base modules have been updated.

### 2.1.12 (2022-10-26)
*(McM1957) Logging of password in clear text has been removed.

### 2.1.11 (2022-10-24)
*(McM1957) The adapter has been adapted to be compatible with node14.

### 2.1.10 (2022-10-23)
*(McM1957) Handling of passwords containing special characters (i.e. a dollar sign) has been fixed (#180)
*(McM1957) Base modules have been updated as suggested by dependabot.

### 2.1.9 (2022-07-01)
* (Apollon77) Try to prevent account locks when using 2FA on restarts of the NAS

### 2.1.8 (2022-06-12)
* (Apollon77) slow down reconnects to the DSM

### 2.1.7 (2022-04-26)
* (Apollon77) Try to prevent account locks when using 2FA on restarts of the NAS

### 2.1.6 (2022-04-04)
* (Apollon77) Fix 2FA

### 2.1.5 (2022-04-03)
* (Apollon77) fix DSM version detection

### 2.1.4 (2022-04-03)
* (arteck) workaround for shutdown and reboot(configure your ssh port in the settings)
* (Apollon77) prevent error when setting FileStation.info.items on start once

### 2.1.1 (2022-03-26)
* (Apollon77) Optimize object type determination and adjustments

### 2.1.0 (2022-03-25)
* IMPORTANT: You need to re-enter the password once after installing this version!
* (Apollon77) Camera snapshots are now also stored in ioBroker storage to be easier used in visualizations!
* (foxriver76) Hide password display in Admin when using Admin5
* (Apollon77) Fix volume description
* (Apollon77) Fix type issues since js-controller 3.3

### 2.0.1 (2021-09-17)
* (MeisterTR) Workaround JSON config Password

### 2.0.0
* (instalator) DSM7 support

### 1.1.3 (2021-08-23)
* (MeisterTR) Fixed 2FA

### 1.1.2 (2021-08-12)
* (MeisterTR) Fixed datatypes
* (MeisterTR) added new ConfigJson (if you use 2FA pleease retype in config)
* (MeisterTR) Fixed snapshot again

### 1.1.1 (2021-08-09)
* (MeisterTR) fix type of uptime
* (MeisterTR) fix broken snapshot link

### 1.1.0 (2021-08-07)
* (MeisterTR) fixes for DSM7
* (MeisterTR) added release-script
* (MeisterTR) change testing
* (MeisterTR) change syno repo to default

### 1.0.1
* (thost96) fix for wrong type number [issue 78](https://github.com/instalator/ioBroker.synology/issues/78)

### 1.0.0
* (instalator) changed name objects in hdd_info [issues 51](https://github.com/instalator/ioBroker.synology/issues/51)
* (Apollon77) BREAKING CHANGE: Please set password new in admin!
* (Apollon77) js-controller 3.0 is now needed minimum!
* (Apollon77 store password now encrypted)

### 0.1.20
* (instalator) fixed error

### 0.1.18
* (instalator) change link for album cover

### 0.1.17
* (instalator) added Sentry plugin support

### 0.1.16
* (instalator) fixed error

### 0.1.15
* (instalator) fixed error in parse Info
* (instalator) fixed api undefined

### 0.1.14
* (instalator) fixed missing [datapoints](https://github.com/instalator/ioBroker.synology/issues/43)
* (instalator) refactoring
* (instalator) Changed the logging of some errors
* (instalator) Changed format session in syno package

### 0.1.11
* (instalator) added motionDetected state
* (SpectreKr*) Adding to FS Sharing

### 0.1.10
* (instalator) fixed copy cover file
* (instalator) fix get packages for DSM 5.x
* (instalator) Added option to select services for receiving data

### 0.1.8
* (instalator) fix error addDownload
* (instalator) fixed listRadios
* (instalator) fixed get cover

### 0.1.7
* (instalator) fixed 2FA
* (instalator) Added setup guide 2FA

### 0.1.6
* (instalator) fix for 2fa
* (instalator) fix error
* (instalator) change error log
* (instalator) fix io-package
* (instalator) fix error status player

### 0.1.4
* (instalator) change for DownloadStation
* (instalator) added playlist favorite radio
* (instalator) added clearPlaylist button
* (instalator) refactoring

### 0.1.3
* (instalator) change obj for ss info fix for cover song 
* (instalator) fix for info.connection 
* (instalator) add 6.2.3 fix for player browser files 
* (instalator) fix for 2FA
* (instalator) fixed error add download 
* (instalator) added DownloadStation task list

### 0.1.2
* (instalator) fixed error

### 0.1.1
* (instalator) added messagebox for snapshot
* (instalator) update readme
* (instalator) added ss link for different streams
* (instalator) fix error
* (instalator) refactoring

### 0.1.0
* (instalator) added HomeMode switch 
* (instalator) change for audiostation 
* (instalator) change for as and ss
* (instalator) added snapshot functional 
* (instalator) fixed systemConfig 
* (instalator) fixed many error

### 0.0.4 (2018-10-07)
* (instalator) Изменен репозиторий библиотеки
* (instalator) Добавлено в конфиг время опроса

### 0.0.3 (2018-01-03)
* (instalator) initial

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.synology/blob/master/CHANGELOG_OLD.md)

## License
The MIT License (MIT)

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2021-2023 instalator <vvvalt@mail.ru>, ioBroker Community-Developers

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