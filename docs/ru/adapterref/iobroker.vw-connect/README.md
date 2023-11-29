---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vw-connect/README.md
title: ioBroker.vw-connect
hash: FUWYi45Z5HYY4colpKrhNV+BolMJv/MIyIn1c4N/dUU=
---
![Логотип](../../../en/adapterref/iobroker.vw-connect/admin/vw-connect.png)

![НПМ-версия](http://img.shields.io/npm/v/iobroker.vw-connect.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vw-connect.svg)
![Статус зависимости](https://img.shields.io/david/ta2k/iobroker.vw-connect.svg)
![Известные уязвимости](https://snyk.io/test/github/ta2k/ioBroker.vw-connect/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.vw-connect.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/ta2k/ioBroker.vw-connect/master.svg)

# IoBroker.vw-connect
## Адаптер vw-connect для ioBroker
Адаптер для VW We Connect, We Connect ID, We Charge, myAudi, Skoda Connect, Seat Connect и We Connect Go

Пожалуйста, обновите вашу систему на узле 10.
<https://forum.iobroker.net/topic/22867/how-to-node-js-f%C3%BCr-iobroker-richtig-updaten>

## Использование
Используйте состояние под дистанционным управлением, чтобы управлять своим автомобилем удаленно.
Обычное обновление — это интервал опроса для получения данных из облака VAG. Принудительное обновление предназначено для автомобилей, не являющихся электромобилями, для обеспечения принудительного обновления. Это число ограничено VAG до тех пор, пока автомобиль не включится снова.
Данные о поездке доступны только для автомобилей, не являющихся электромобилями.

Вы можете установить температуру климата в .climater.settings.targetTemperature.content.

## Обсуждение и вопросы
<https://forum.iobroker.net/topic/26438/test-adapter-vw-connect-für-vw-id-audi-seat-skoda>

## Поля статуса Объяснение
### Список записей
```

```

## Changelog

### 0.0.65

- Fix Cupra login

### 0.0.63

- Fix VW/Skoda etron login

### 0.0.62

- Fix Audi etron login

### 0.0.61

- Fix ID login

### 0.0.60

- Minor improvements. WeCharge Minimum interval is now 15 minutes

### 0.0.55

- fix id status update

### 0.0.51

- fix audi etron login

### 0.0.48

- fix login, fix audi update, add limit for wallbox

### 0.0.43

- increase refresh token timeouts

### 0.0.42

- fix skoda login

### 0.0.40

- add climate v3 for newer cars. Add Powerpass and Seat Elli

### 0.0.39

- fix id login

### 0.0.36

- add Skoda Enyaq support

### 0.0.35

- add nodeJS v10 compatibility

### 0.0.34

- add auto accept of new privacy consent

### 0.0.32

- correct selection of last recent trips

### 0.0.31

- enable multiple selection of trip types

### 0.0.30

- fix mutiple car problem, add VWv2 mode at the moment there is no different between VW and VWv2

### 0.0.29

- fix skoda refreshToken, smaller improvements

### 0.0.26

- bugfixes

### 0.0.25

- add we charge

### 0.0.24

- add remote state update

### 0.0.23

- add Seat and new climatisation v2

### 0.0.22

- calculate outside temperatur in °C also for Skoda and Audi

### 0.0.21

- add remotes for id

### 0.0.20

- fix audi login, add ID login

### 0.0.19

- save status objects in state by id instead of consecutive numbers

### 0.0.18

- fix battery status for 2020 models

### 0.0.17

- add support for 2020 models

### 0.0.16

- fix js.controller 3 problems

### 0.0.11

- fix audi bug with multiple vehicles
- hide status update error if feature is not available

## License

MIT License

Copyright (c) 2019 ta2k <tombox2020@gmail.com>

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