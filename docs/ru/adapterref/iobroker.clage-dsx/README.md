---
chapters: {"pages":{"en/adapterref/iobroker.clage-dsx/README.md":{"title":{"en":"ioBroker.clage-dsx"},"content":"en/adapterref/iobroker.clage-dsx/README.md"},"en/adapterref/iobroker.clage-dsx/README_DE.md":{"title":{"en":"ioBroker.clage-dsx"},"content":"en/adapterref/iobroker.clage-dsx/README_DE.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.clage-dsx/README.md
title: ioBroker.clage-dsx
hash: UjxBHvxaApvQKU3s6Cm1Atpkjlhqlu0y1jzq5HNvtMU=
---
# ioBroker.clage-dsx

![Версия NPM](https://img.shields.io/npm/v/iobroker.clage-dsx.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.clage-dsx.svg)
![Тестирование и выпуск](https://github.com/TheBam1990/ioBroker.clage-dsx/actions/workflows/test-and-release.yml/badge.svg)

![Логотип CLAGE DSX](../../../en/adapterref/iobroker.clage-dsx/admin/clage-dsx.png)

[Немецкая документация](/#/docs/adapterref/iobroker.clage-dsx/README_DE.md)

## Описание

Этот адаптер подключает ioBroker к локальному серверу [CLAGE](https://www.clage.com/) Home Server и зарегистрированным на нем проточным водонагревателям. Для связи используется API HTTPS в локальной сети; облачные сервисы не требуются.

Реализация основана на прилагаемой \[спецификации CLAGE Home Server API v1.3.4]\( <https://github.com/TheBam1990/ioBroker.clage-dsx/blob/master/CLAGE> HomeServer API v1.3.4.pdf).

## Требования

- ioBroker с Node.js версии 22 или новее
- Домашний сервер CLAGE доступен с хоста ioBroker.
- Имя пользователя и пароль для доступа к API домашнего сервера
- Доступ к домашнему серверу по протоколу HTTPS

## Конфигурация

Откройте настройки экземпляра и введите:

1. **IP-адрес домашнего сервера CLAGE** , например.`192.168.2.35` (без`https://` )
2. **имя пользователя API** , например`admin`
3. **пароль API** , например`geheim`

Все три поля обязательны для заполнения. Исторический ключ конфигурации для имени пользователя называется...`port` Это сохранено для обеспечения совместимости с существующими установками.

Значения`admin` и`geheim` Это примеры из документации API CLAGE. Используйте учетные данные API, настроенные на вашем домашнем сервере; не используйте пример пароля, если он фактически там не настроен.

Домашний сервер обычно использует самоподписанный TLS-сертификат. Поэтому адаптер принимает локальный сертификат при прямом подключении к настроенному устройству.

## Текущая функциональность

Для каждого зарегистрированного устройства CLAGE адаптер создает состояния для:

- идентификатор, состояние соединения, RSSI, LQI, маска доступа к API и последняя активность радиосвязи.
- заданное значение, предельная температура, температура на входе/выходе и все четыре предустановленных значения температуры.
- расход, предельный расход, положение клапана, исходная и расчетная мощность, состояние нагрева и ошибки
- Встроенная прошивка и серийные номера, информация о блоке питания и счетчики времени работы.
- Общее потребление плюс последний цикл слива и история потребления в формате JSON.
- Текущая ошибка плюс история ошибок в формате JSON.
- Версия домашнего сервера, идентификатор, радиоканал, адрес и рекламируемые услуги.
- все таймеры, как глобальные, так и отфильтрованные по каждому устройству.

Доступные для записи состояния:

- `Setpoint` Значение API в десятых долях градуса Цельсия, например.`450` = 45,0 °C
- `Themperatur` : температура в °C; для удобства сохранено историческое написание.
- `flowMax` : предельный расход в десятых долях литра в минуту; специальные значения API включают`253` (ЭКО) и`254` (АВТО)
- `Name` : название устройства
- `setup.flowMax` ,`setup.loadShedding` ,`setup.scaldProtection` и`setup.sound`
- `timers.createJson` ,`timers.updateJson` и`timers.deleteId` для управления таймером

`info.connection` Указывает, доступен ли домашний сервер и принимает ли он настроенные учетные данные.

Перед записью адаптер проверяет маску доступа к API. Задержка при изменении заданных значений составляет две секунды, активные устройства обновляются чаще, а список устройств по умолчанию использует последовательный HTTP-опрос с длительным интервалом. Интервалы, длительность опроса и период истории потребления (по умолчанию 30 дней) можно настроить в конфигурации адаптера.

## Таймер JSON

Создайте таймер, написав в формате JSON следующий код.`timers.createJson` :

```json
{"type":0,"weekdays":127,"start":"06:00","stop":"07:00","deviceId":"A001FF0034","setpoint":450}
```

Для обновлений используйте ту же структуру, включая числовое значение.`id` к`timers.updateJson` Чтобы удалить таймер, запишите его числовой идентификатор в...`timers.deleteId` Деструктивные пакетные операции, отмена регистрации устройств и изменение радиоадресов намеренно не раскрываются.

## Поиск неисправностей

- Убедитесь, что IP-адрес не содержит префикса протокола или пути.
- Проверьте учетные данные API в конфигурации домашнего сервера CLAGE.
- Убедитесь, что TCP-порт 443 доступен с хоста ioBroker.
- HTTP-статус`401` означает недействительные учетные данные;`403` означает недостаточные права доступа к API.
- Устройство может быть зарегистрировано, но временно недоступно. API сообщает об этом следующим образом:`404` ,`410` или отрицательный код ошибки устройства.

## Changelog

### 0.0.9

- Fixed the Home Server address input so any IPv4 address, host name or host with an explicit port can be entered.
- Updated the minimum Admin dependency to 7.8.23.

### 0.0.8

- Fixed all findings from the ioBroker latest-repository review.
- Updated energy and timestamp state roles and clarified the legacy temperature state.
- Restricted setup writes to registered API fields and added safe polling upper limits.
- Corrected all adapter description translations.

### 0.0.7

- Corrected state roles for timestamps, version information and the numeric bus ID

### 0.0.6

- Added live temperatures, presets, valve position, calculated power and radio diagnostics
- Added setup, consumption and error history data
- Added permission-checked setup writes and timer management
- Added Home Server information, adaptive polling and sequential HTTP long polling
- Added configurable polling intervals

[Older changelog entries](https://github.com/TheBam1990/ioBroker.clage-dsx/blob/master/CHANGELOG_OLD.md)

## License

Copyright (c) 2026 TheBam <elektrobam@gmx.de>

MIT License. See [LICENSE](https://github.com/TheBam1990/ioBroker.clage-dsx/blob/master/LICENSE).