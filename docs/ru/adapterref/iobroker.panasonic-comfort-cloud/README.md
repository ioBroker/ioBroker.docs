---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.panasonic-comfort-cloud/README.md
title: ioBroker.panasonic-comfort-cloud
hash: xQjDElXBH0ppzwQG8lJvCF1O+5zctozFA27kyd1fZAk=
---
# IoBroker.panasonic-comfort-cloud

![НПМ-версия](http://img.shields.io/npm/v/iobroker.panasonic-comfort-cloud.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.panasonic-comfort-cloud.svg)
![Статус зависимости](https://img.shields.io/david/marc2016/iobroker.panasonic-comfort-cloud.svg)
![Известные уязвимости](https://snyk.io/test/github/marc2016/ioBroker.panasonic-comfort-cloud/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.panasonic-comfort-cloud.png?downloads=true)

| :предупреждение: ВНИМАНИЕ |
|:---------------------------|
| Новая версия приложения в настройках адаптера — 1.21.0 |

![Логотип](../../../en/adapterref/iobroker.panasonic-comfort-cloud/admin/panasonic-comfort-cloud.png)

[![Тесты и выпуск](https://github.com//marc2016/ioBroker.panasonic-comfort-cloud/actions/workflows/test-and-release.yml/badge.svg)](https://www.npmjs.com/package/iobroker.panasonic-comfort-cloud)

## Адаптер panasonic-comfort-cloud для ioBroker
Адаптер для управления устройствами в Panasonic Comfort Cloud. Он использует вызовы REST, полученные из официального приложения Comfort Cloud.
Чтобы использовать адаптер, вам необходимо ввести имя пользователя и пароль в конфигурации. Они используются для аутентификации доступа к Comfort Cloud. Информация обо всех устройствах автоматически извлекается и вставляется в виде объекта. Адаптер циклически опрашивает информацию об устройстве (интервал смотрите в настройках) и отправляет команды напрямую в облако.

При использовании используемого метода только один клиент может одновременно войти в систему с учетной записью.
Рекомендуется использовать вторую учетную запись, для которой были предоставлены общие устройства.

## Changelog
### 3.0.0 (2024-06-29)

* Added option to deactivate the automatic refresh.
* Added state to manual refresh device infos.
* Updated client version for OAuth support.

### 2.3.0 (2023-12-21)

* Updated packages
* Added connected state to devices

### 2.2.4 (2023-10-18)

* Fixed load AppVersion from Github.

### 2.2.3 (2023-10-14)

* Added support for admin 5 UI (jsonConfig).
* Updated packages.
* Fixed translation.

### 2.2.2 (2023-09-16)

* Fixed wrong version number.

### 2.2.1 (2023-09-16)

* panasonic-comfort-cloud-client updated to new version. New headers added.

### 2.2.0

* Added feature to automatically load the app version from GitHub.

### 2.1.0

* Added app version to settings.

### 2.0.6

* panasonic-comfort-cloud-client updated to new version. (appVersion changed again)

### 2.0.5

* Translation for news added.

### 2.0.4

* New version of dependencies installed.

### 2.0.3

* panasonic-comfort-cloud-client updated to new version. (appVersion changed again)

### 2.0.2

* panasonic-comfort-cloud-client updated to new version.

### 2.0.1

* Changed the type of some states from string to number.

### 2.0.0

* Added js-controller 3 dependency.
* Added username and password to protectedNative and password to encryptedNative.
* Added connection info.
* Changed schdule to timeout for refresh.
* Fixes for async await pattern.

### 1.2.9

* Error handling for get device added.

### 1.2.8

* Fixed bug in Comfort Cloud client.

### 1.2.7

* Comfort Cloud client updated.

### 1.2.6

* Fixed bug that guid is null in device creation.

### 1.2.5

* *Comfort Cloud client updated.

### 1.2.4

* Fixed bug with undefined guid. Log messages added.

### 1.2.3

* Set parameters only for writable states.

### 1.2.2

* *Fixed error handling and added stack info.

### 1.2.1

* Fixed bug in refesh device method.

### 1.2.0

* States insideTemperature, outTemperature and Nanoe added.

## License

MIT License

Copyright (c) 2024 marc <marc@lammers.dev>

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
