---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.bmw/README.md
title: ioBroker.bmw
hash: Z+Gz0BFzpoYSG/LsgdOZ7/JEJkNp4KJJA4Jciqk4Te4=
---
![версия НПМ](https://img.shields.io/npm/v/iobroker.bmw.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.bmw.svg)
![узел-lts](https://img.shields.io/node/v-lts/iobroker.bmw?style=flat-square)
![Статус зависимости Libraries.io для последней версии](https://img.shields.io/librariesio/release/npm/iobroker.bmw?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/TA2k/iobroker.bmw?style=flat-square)
![Размер репозитория GitHub](https://img.shields.io/github/repo-size/TA2k/iobroker.bmw?logo=github&style=flat-square)
![Активность коммита GitHub](https://img.shields.io/github/commit-activity/m/TA2k/iobroker.bmw?logo=github&style=flat-square)
![Последний коммит GitHub](https://img.shields.io/github/last-commit/TA2k/iobroker.bmw?logo=github&style=flat-square)
![Проблемы с GitHub](https://img.shields.io/github/issues/TA2k/iobroker.bmw?logo=github&style=flat-square)
![Статус рабочего процесса GitHub](https://img.shields.io/github/actions/workflow/status/TA2k/iobroker.bmw/test-and-release.yml?branch=master&logo=github&style=flat-square)
![Известные уязвимости SNYK](https://snyk.io/test/github/TA2k/ioBroker.bmw/badge.svg)
![Бета](https://img.shields.io/npm/v/iobroker.bmw.svg?color=red&label=beta)
![Стабильный](https://iobroker.live/badges/bmw-stable.svg)
![Установлено](https://iobroker.live/badges/bmw-installed.svg)
![НПМ](https://nodei.co/npm/iobroker.bmw.png?downloads=true)

<img src="admin/bmw.png" alt="Логотип" width="200">

# IoBroker.bmw
## Версии
# Адаптер BMW для ioBroker
Этот адаптер легко интегрирует автомобили BMW в ioBroker, позволяя вам контролировать и управлять вашим BMW непосредственно на платформе ioBroker. Он извлекает и обновляет данные для всех моделей BMW, связанных с вашей учетной записью BMW через официальное приложение BMW, предоставляя свойства автомобиля и поддерживая удаленные команды.

## Функции
- Извлекает и обновляет данные об автомобилях BMW из сервиса BMW ConnectedDrive.
- Включает удаленные команды для вашего BMW в `bmw.0.VIN.remotev2`.

## Процесс входа
1. В параметрах экземпляра введите данные для входа в учетную запись BMW и пройдите проверку CAPTCHA/reCAPTCHA, если будет предложено.
2. Выберите тип вашего транспортного средства.
3. Поскольку квота API ограничена, вы можете отключить получение определенных статистических данных для оптимизации использования.
4. Установите интервал обновления, соответствующий вашим потребностям в данных — может потребоваться метод проб и ошибок, чтобы уложиться в максимальную квоту.
5. Чтобы увеличить квоту, вы можете по желанию добавить вторую учетную запись пользователя.
6. Первоначальные данные могут появиться после небольшой задержки или после первой активности транспортного средства (например, поездки).

## Структура данных
Данные по конкретному автомобилю доступны в разделе `bmw.0.VIN.properties`, где `VIN` представляет собой идентификационный номер транспортного средства вашего BMW.

## Удаленные команды
Дистанционное управление вашим BMW доступно в разделе `bmw.0.VIN.remotev2`. Поддерживаемые действия могут включать блокировку/разблокировку дверей, активацию климат-контроля или запуск других функций автомобиля в зависимости от модели вашего BMW и функций ConnectedDrive.

*Примечание: доступные поля и возможности удаленного управления зависят от модели BMW и API ConnectedDrive.*

## Источник
Этот адаптер доступен по адресу: [https://github.com/TA2k/ioBroker.bmw](https://github.com/TA2k/ioBroker.bmw)

## Changelog

### **WORK IN PROGRESS**

- BREAKING: Dropped support for Node.js 18 (#88)
- (hombach) BREAKING: Dropped support for js-controller 5 (#111)
- (hombach) BREAKING: change to admin 7.4.10 as recommended by ioBroker (#111)
- (hombach) encrypt and protect second user password - has to be reentered (#111)
- (hombach) bump dependencies

### 2.9.5 (2025-05-18)

- (hombach) update axios
- (hombach) fixing issues detected by repository checker (#88)
- (hombach) some small code cleanups/modernisations
- (hombach) add/translate description
- (hombach) update logo

### 2.9.4 (2025-02-26)

- fix for Mitbenutzer Feature

### 2.9.3 (2025-01-29)

- fix remote controls
- add Mitbenutzer Login for remote controls

### 2.9.0 (2024-11-28)

- added new remotes as switch and updated values
- added retry logic for remotes

### 2.8.4 (2024-11-21)

- improved charging session parsing
- added remote to fetch charging session from a specific month
- added raw JSON of charging session for export

### 2.8.3 (2024-11-18)

- login fixed

### 2.8.2 (2024-10-05)

- fix error getvehicles v2 failed

### 2.8.1 (2024-09-30)

- fix remote commands

### 2.7.1

- Bugfixes

### 2.5.5

- Fix login

### 2.5.0

- Fix login

### 2.4.1

- Add support for MINI and force refresh remote

### 2.3.0

- Disable v1 Endpoints

### 2.1.1

- Upgrade to statusV2 and remoteV2

### 2.0.0

- (TA2k) initial release

## License

MIT License

Copyright (c) 2021-2025 TA2k <tombox2020@gmail.com>

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