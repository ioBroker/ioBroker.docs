---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.melcloudhome/README.md
title: ioBroker.melcloudhome
hash: 21TbeszQSADnW1idYUMC8ZjSoPhUTv8cP5+f/aUKdB4=
---
![Логотип](../../../en/adapterref/iobroker.melcloudhome/admin/melcloudhome.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.melcloudhome.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.melcloudhome.svg)
![Количество установок](https://iobroker.live/badges/melcloudhome-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/melcloudhome-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.melcloudhome.png?downloads=true)
![Тестирование и выпуск](https://github.com/konrad2002/ioBroker.melcloudhome/workflows/Test%20and%20Release/badge.svg)

# ioBroker.melcloudhome

## адаптер melcloudhome для ioBroker

Этот адаптер подключает [ioBroker](https://www.iobroker.net/) к облачной платформе [**MELCloud Home**](https://melcloudhome.com/) и позволяет считывать данные и управлять кондиционерами Mitsubishi Electric типа «воздух-воздух» (климат-система) и «воздух-вода» (тепловой насос).

### Отказ от ответственности

Это независимый адаптер, созданный сообществом. Он **не разработан, не одобрен и не поддерживается корпорацией Mitsubishi Electric** . «Mitsubishi Electric» и «MELCloud Home» являются товарными знаками соответствующих владельцев и используются здесь только для описания совместимости. Использование этого адаптера и облачного сервиса MELCloud Home регулируется собственными условиями обслуживания Mitsubishi Electric; используйте его на свой страх и риск.

### Кредиты

Интеграция API MELCloud Home (процесс авторизации, REST-конечные точки, протокол WebSocket в реальном времени) была реализована на основе обратной разработки библиотеки Python [aiomelcloudhome](https://github.com/erwindouna/aiomelcloudhome) от [erwindouna](https://github.com/erwindouna) . Этот адаптер представляет собой независимую реализацию на TypeScript и не связан с этим проектом.

## Функции

- Войдите в систему, используя свою учетную запись MELCloud Home (имя пользователя/пароль), включая полный процесс авторизации OAuth2/PKCE + Cognito, используемый официальным приложением.
- Циклический опрос всех зданий/единиц с настраиваемым интервалом.
- Дополнительные обновления в режиме реального времени через WebSocket MELCloud Home, применяемые между опросами.
- Автоматически создает объекты ioBroker для каждого сеанса связи «воздух-воздух» (`ata`) и воздух-вода (`atw`) устройство, найденное в вашей учетной записи, включая его возможности и информацию о режимах защиты от замерзания/перегрева/праздничных дней.
- Управляйте состоянием устройства непосредственно из ioBroker (питание, режим работы, целевая температура, скорость вращения вентилятора, положение лопастей, режим ожидания и многое другое), записывая данные в соответствующие состояния.
- Сессия OAuth сохраняется внутри системы, поэтому адаптеру не нужно повторно входить в систему при каждом перезапуске.

## Конфигурация

Откройте настройки экземпляра и заполните следующие поля:

| Параметр                                                                | Описание                                                                                                                                                          |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Имя пользователя (электронная почта) домашней директории MELCloud**   | Адрес электронной почты, который вы используете для входа в приложение MELCloud Home.                                                                             |
| **Пароль для домашней директории MELCloud**                             | Пароль от вашей учетной записи MELCloud Home. Хранится в зашифрованном виде в конфигурации адаптера.                                                              |
| **Интервал опроса (секунды)**                                           | Как часто следует получать полное состояние из API MELCloud Home (минимум 15 секунд).                                                                             |
| **Используйте обновления WebSocket в реальном времени между опросами.** | Если эта функция включена, изменения состояния устройства передаются в ioBroker сразу после получения сообщения от MELCloud Home, в дополнение к обычному опросу. |

## Дерево объектов

Для каждого здания в вашей учетной записи адаптер создает:

```
<buildingId>.ata.<unitId>.<state>              Air-to-Air unit states (power, operationMode, setTemperature, ...)
<buildingId>.ata.<unitId>.capabilities.*        Read-only unit capabilities
<buildingId>.ata.<unitId>.frostProtection.*     Read-only frost protection status
<buildingId>.ata.<unitId>.overheatProtection.*  Read-only overheat protection status
<buildingId>.ata.<unitId>.holidayMode.*         Read-only holiday mode status
<buildingId>.atw.<unitId>.<state>              Air-to-Water unit states (power, zone temperatures, ...)
```

Состояния, отмеченные как доступные для записи в дереве объектов, можно изменять для управления соответствующим устройством; все остальные состояния обновляются автоматически из MELCloud Home.

## Известные ограничения

- Защита от замерзания, защита от перегрева и режим отпуска в настоящее время доступны только для чтения (информационные).
- Данные об энергопотреблении/телеметрии и тенденции изменения температуры наружного воздуха пока (ещё) не доступны.
- Состояния переопределения режима расхода/температуры ATW (`setHeatFlowTemperatureZone1/2`, `setCoolFlowTemperatureZone1/2` Фактически, эти значения доступны только для записи: API никогда не сообщает о них, поэтому они не отражают фактическое состояние устройства.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.3.2 (2026-10-25)

- (konrad2002) handle auth timeout

### 0.3.1 (2026-08-26)

- (konrad2002) fix invalid types for rssi

### 0.3.0 (2026-08-26)

- (konrad2002) use valid ioBroker roles matching declared common.type
- (konrad2002) use folders instead of channels for buildings and unit categories

### 0.2.2 (2026-08-26)

- (konrad2002) fix release notes not correctly translated ._.

### 0.2.1 (2026-08-26)

- (konrad2002) fix release pipeline

### 0.2.0 (2026-08-26)

- (konrad2002) no unreleased changes yet

### 0.1.0 (2026-08-25)

- (konrad2002) first working version: MELCloud Home login, polling, realtime WebSocket updates and control for Air-to-Air and Air-to-Water units

### 0.0.2 (2026-08-25)

- (konrad2002) fix connection issues

### 0.0.1 (2026-08-25)

- (konrad2002) initial release

## License

MIT License

Copyright (c) 2026 konrad2002 <konrad@swimresults.de>

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