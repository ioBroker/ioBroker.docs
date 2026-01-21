---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ford/README.md
title: ioBroker.ford
hash: SwGh8ZuY/WUsnCeKE3ij6c8GDYf4Vseu3KQ/2C5ivuE=
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
Адаптер для FordPass

## Использование
### Вход через OAuth 2.0
Адаптер использует аутентификацию OAuth 2.0. Для аутентификации выполните следующие действия:

1. Запустите адаптер — в журнале отобразится URL-адрес аутентификации.
2. **ВАЖНО: Откройте инструменты разработчика (F12) ПЕРЕД тем, как нажать на ссылку для входа**
3. Перейдите на вкладку «Сеть» в инструментах разработчика.
4. Скопируйте URL-адрес OAuth из журнала и вставьте его в свой браузер.
5. Войдите в систему, используя данные своей учетной записи Ford.
6. После входа в систему браузер отобразит сообщение «Невозможно открыть страницу» — это ожидаемое поведение.
7. На вкладке «Сеть» найдите неудачный запрос с выделенным красным URL-адресом, начинающимся с `fordapp://userauthorized/?code=`.
8. Скопируйте полный URL-адрес из вкладки «Сеть».
9. Вставьте его в поле "URL-адрес кода v2" в настройках адаптера.
10. Сохраните изменения и перезапустите адаптер.

### Пульты дистанционного управления
Адаптер создает кнопки дистанционного управления для каждого транспортного средства в соответствии с `{VIN}.remote.*`:

- **Запуск двигателя**: Запуск или остановка двигателя (true = запуск, false = остановка)
- **двери/замки**: Заблокировать или разблокировать двери (true = заблокировать, false = разблокировать)
- **статус**: Запросить обновление статуса у транспортного средства (отправляет команду statusRefresh)
- **Обновление**: Обновить кэшированные данные без отправки команды транспортному средству.

### Параметры конфигурации
- **Интервал обновления**: Время в минутах между автоматическими обновлениями данных (по умолчанию: 5 минут)
- **Обновление местоположения**: Включение/отключение обновлений местоположения. Отключение этой функции позволяет сократить интервалы обновления и снизить расход заряда батареи.
- **Принудительное обновление**: Включите команду автоматического обновления статуса через определенные интервалы (ВНИМАНИЕ: Может разрядить 12-вольтовую батарею. Включайте только в том случае, если ваш автомобиль поддерживает эту команду).
- **Пропустить проверку 12 В**: Отключите проверку батареи 12 В при использовании принудительного обновления

### Защита батареи
По умолчанию адаптер регулярно запрашивает кэшированные данные об автомобиле. Для запроса актуальных данных об автомобиле выполните одно из следующих действий:

- Включите опцию "Принудительное обновление" (только если ваш автомобиль поддерживает эту функцию).
- Используйте кнопку `{VIN}.remote.status` вручную.

**Примечание:** Некоторые транспортные средства могут не поддерживать команду `statusRefresh` и возвращать ошибку 404 — это нормально. В этом случае отключите «Принудительное обновление» и используйте вместо этого кнопку `refresh`.

## Changelog

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

Copyright (c) 2021-2030 TA2k <tombox2020@gmail.com>

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