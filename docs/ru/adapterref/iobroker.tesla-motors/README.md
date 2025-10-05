---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tesla-motors/README.md
title: ioBroker.tesla-motors
hash: Fvr1aTw0IyZbJ+fLgciBIKNx+41ASXE7fi8j6dPSNfk=
---
![Логотип](../../../en/adapterref/iobroker.tesla-motors/admin/tesla-motors.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.tesla-motors.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tesla-motors.svg)
![Количество установок (последнее)](https://iobroker.live/badges/tesla-motors-installed.svg)
![Количество установок (стабильное)](https://iobroker.live/badges/tesla-motors-stable.svg)
![Статус зависимости](https://img.shields.io/david/iobroker-community-adapters/iobroker.tesla-motors.svg)
![НПМ](https://nodei.co/npm/iobroker.tesla-motors.png?downloads=true)

# IoBroker.tesla-motors
**Тесты:** ![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.tesla-motors/workflows/Test%20and%20Release/badge.svg)

## Адаптер Tesla для ioBroker
Все модели Tesla и Powerwall из приложения Tesla отображаются и обновляются.

**Удаленные команды для Tesla и Powerwall доступны по адресу** tesla-motors.0.id.remote

**Процесс входа:**

- Нажмите ссылку «Аутентификация» в параметрах экземпляра.
- Введите свои учетные данные и, при необходимости, пройдите Captcha/reCaptcha и MFA.
- На странице «Страница не найдена» скопируйте полный URL-адрес из браузера и вставьте его в параметры экземпляра, затем нажмите «Сохранить и закрыть».
- Исходные данные могут появиться только после первого проезда

**Описание поля**

- передний водительский DF
- водитель сзади
- передний пассажирский
- пассажир сзади
- фут передний багажник
- задний багажник

[Объяснение кодов опций](https://tesla-api.timdorr.com/vehicle/optioncodes)

## Вопросы и обсуждения:
https://forum.iobroker.net/topic/47203/test-tesla-motors-v1-0-0

## Changelog

<!-- ### **WORK IN PROGRESS** -->
### 1.4.5 (2024-04-19)

- cleaned up token folder to reduce state objects

### 1.4.4 (2024-04-10)

- improve energy history data

### 1.4.3 (2024-04-10)

- fix for too many state in the powerwall energy history

### 1.4.2 (2023-11-17)

- fix km states are not refreshed

### 1.4.1 (2023-11-17)

- fix \_km states are not refreshed

### 1.4.0 (2023-11-14)

- fix location fetching and add new option to change location fetching interval

### 1.3.5 (2023-10-24)

- fix vehicle update

### 1.3.4 (2023-10-24)

- add wall_connector devices

### 1.3.4-alpha.0 (2023-10-18)

- (mcm1957) Standard iobroker release environment has been added.
- (mcm1957) Some dependencies have been updated.

### 1.3.2

- Create history elements by index not by date

### 1.3.1

- login url and ordered car fix

### 1.0.2

- (iobroker-community-adapters) ALL DATA POINTS ARE NEW, Vis must be adapted. New version with new states for Tesla and Powerwalls.

## License

MIT License

Copyright (c) 2021-2029 iobroker-community

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