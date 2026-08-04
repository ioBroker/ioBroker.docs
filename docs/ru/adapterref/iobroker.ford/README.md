---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ford/README.md
title: ioBroker.ford
hash: oqlZLeXYRDuTAUgs++9W9xJncNE80NKLRBmsWfBtE/8=
---
![Логотип](../../../en/adapterref/iobroker.ford/admin/ford.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.ford.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.ford.svg)
![Количество установок (последние)](https://iobroker.live/badges/ford-installed.svg)
![Количество установок (стабильных)](https://iobroker.live/badges/ford-stable.svg)
![Статус зависимости](https://img.shields.io/david/TA2k/iobroker.ford.svg)
![НПМ](https://nodei.co/npm/iobroker.ford.png?downloads=true)

# IoBroker.ford
**Тесты:** ![Тестирование и выпуск](https://github.com/TA2k/ioBroker.ford/workflows/Test%20and%20Release/badge.svg)

## Адаптер Ford для ioBroker
Адаптер для автомобилей Ford, использующий официальный API запросов FordConnect (в соответствии с Законом ЕС о данных).

## Использование
### Предварительные условия
Создайте приложение на портале разработчиков Ford по адресу <https://developer.ford.com/developer-eu>.

Используйте тот же адрес электронной почты, что и для вашей учетной записи FordPass, установите URI перенаправления (например,
`http://localhost:8080/callback`) и запишите сгенерированные идентификатор клиента (Client ID) и секретный ключ клиента (Client Secret).

### Авторизоваться
1. Введите идентификатор клиента (Client ID), секретный ключ клиента (Client Secret) и URI перенаправления (Redirect URI) в настройках адаптера и сохраните.
2. Запустите адаптер — он выведет URL-адрес для входа в систему в журнал.
3. Откройте URL-адрес в браузере, войдите в систему, используя свою учетную запись FordPass, и авторизуйте приложение.
4. Вы будете перенаправлены на ваш URI перенаправления с параметром `?code=...`.
5. Скопируйте полный URL-адрес перенаправления из адресной строки браузера.
6. Вставьте его в поле "Code URL" в настройках адаптера, сохраните и перезапустите адаптер.

Адаптер обменивает код на токены, сохраняет сессию и автоматически обновляет её.

### Данные
- `{VIN}.general` - информация об автомобиле с конечной точки гаража.
- `{VIN}.telemetry` - телеметрические данные (уровень заряда батареи, запас хода, показания одометра, местоположение, давление в шинах и т. д.)
- `{VIN}.vehicleHealthAlerts` - оповещения о состоянии автомобиля
- `{VIN}.wallbox` - данные настенного блока (только для электромобилей, если доступны)
- `{VIN}.departureTimes` - время отправления электромобилей (только для электромобилей, если доступно)
- `{VIN}.chargeSchedules` - графики зарядки электромобилей (только для электромобилей, если доступны)
- `{VIN}.remote.refresh` - кнопка для немедленного получения данных

Конечные точки, недоступные для данного автомобиля, молча пропускаются.
API запросов FordConnect доступен только для чтения, поэтому команды для управления двигателем/блокировкой/зарядкой отсутствуют.

### Параметры конфигурации
- **Идентификатор клиента / Секретный ключ клиента**: Учетные данные с портала разработчиков Ford.
- **URI перенаправления**: Должен совпадать с URI, зарегистрированным на портале разработчика.
- **Интервал опроса**: Время в минутах между автоматическими запросами телеметрии (по умолчанию: 15)

## Что такое Sentry.io и какая информация передается на серверы этой компании?
Sentry.io — это сервис для разработчиков, позволяющий получать обзор ошибок в их приложениях. И именно это реализовано в данном адаптере.

Когда адаптер зависает или возникает другая ошибка в коде, это сообщение об ошибке, которое также появляется в журнале ioBroker, отправляется в Sentry. Если вы разрешили iobroker GmbH собирать диагностические данные, то в них также включается ваш идентификатор установки (это просто случайно сгенерированный уникальный идентификатор без какой-либо дополнительной информации). Это позволяет Sentry группировать ошибки и показывать, сколько уникальных пользователей затронуто такой ошибкой. Все это помогает мне предоставлять безошибочные адаптеры, которые практически никогда не зависают.

## Changelog

### 2.0.1 (2026-07-25)

- Switch to Ford's official FordConnect Query API (EU Data Act)
- Remove reverse-engineered FordPass login, Autonomic token and WebSocket to avoid account blocking
- Read-only telemetry: remote commands removed

### 1.1.5 (2025-12-29)

- update API headers to match latest FordPass app
- fix checkbox display in adapter configuration UI

### 1.1.4 (2025-12-27)

- fix login flow

### 1.0.5 (2024-07-09)

- Add location update option to reduce update requests

### 1.0.3 (2024-06-22)

- improve help text

### 1.0.2 (2024-05-24)

- improved failed login

### 1.0.0 (2024-05-24)

- added new login flow and public api. All new Datapoints

### 0.2.3 (2024-05-17)

- reverted domain ending setting to fix login

### 0.2.1 (2024-05-10)

- fixed login and added domain ending in settings

### 0.2.0

- Login Fix

### 0.0.14

- Improvements to prevent blocking from Ford

### 0.0.13

- removed not working detail api

### 0.0.12

- fix login

### 0.0.11

- fix login

### 0.0.8

- (TA2k) add remote control for refresh

### 0.0.7

- (TA2k) initial release

## License

MIT License

Copyright (c) 2021-2026 TA2k <tombox2020@gmail.com>

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