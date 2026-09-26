---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.wmswebcontrol/README.md
title: ioBroker.wmswebcontrol
hash: M3eMRHlBL7ZyhvGMZvSdMMlX93FSac/aj93vzSA/M+o=
---
![Логотип](../../../en/adapterref/iobroker.wmswebcontrol/admin/wmswebcontrol.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.wmswebcontrol.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.wmswebcontrol.svg)
![Количество установок (последние)](https://iobroker.live/badges/wmswebcontrol-installed.svg)
![Количество установок (стабильных)](https://iobroker.live/badges/wmswebcontrol-stable.svg)
![Статус зависимости](https://img.shields.io/david/TA2k/iobroker.wmswebcontrol.svg)
![НПМ](https://nodei.co/npm/iobroker.wmswebcontrol.png?downloads=true)
![Тестирование и выпуск](https://github.com/TA2k/ioBroker.wmswebcontrol/workflows/Test%20and%20Release/badge.svg)

# ioBroker.wmswebcontrol

## Адаптер wmswebcontrol для ioBroker

Адаптер для веб-контроллера Warema WMS

## Настраивать

Адаптер поддерживает два способа подключения и отдает предпочтение локальному:

- **Локальный (рекомендуется):** адаптер автоматически находит контроллер WMS в локальной сети ( **автоматическое обнаружение** , включено по умолчанию). Сканирование выполняется в фоновом режиме и не задерживает запуск. Обнаруженный IP-адрес записывается обратно в поле **«Локальный IP»** , поэтому последующие запуски пропускают сканирование. Вы также можете ввести IP-адрес контроллера непосредственно в поле **«Локальный IP»** . Локальный статус проверяется каждые 15 секунд (по умолчанию 15). Для **доступа** к локальному API контроллера не требуется авторизация, и этот путь продолжает работать даже при недоступности облака Warema или его IoT-хаба.
- **Облако:** введите ваше **имя пользователя** и **пароль** Warema. Используется в качестве резервного варианта, когда контроллер недоступен в локальной сети, а также для поиска контроллера, если локальный путь не настроен.

Можно настроить оба варианта: адаптер управляет контроллером локально, когда он доступен, и переключается на облако в противном случае. Переключение на облако используется только для учетной записи с одним контроллером (в противном случае локальный контроллер не может быть сопоставлен с конкретным).

## Использование

### Локальный режим (commonCommand)

Когда контроллер становится доступен, адаптер устанавливает соединение. `local.*` дерево из своей конфигурации. Каждое управляемое действие устройства отображается как его собственное состояние:

- `local.<device>.position` - целевое положение 0–100 % (возможно изменение; приводы навеса/ролика/ламелей).
- `local.<device>.valance` - целевое положение отдельного привода карданного вала, если таковой имеется (с возможностью записи).
- `local.<device>.slatAngle` - целевой угол наклона ламелей, диапазон для каждого устройства (можно записывать, только для жалюзи).
- `local.<device>.dimming` - Яркость 0–100 % для диммируемых светильников (с возможностью записи).
- `local.<device>.light` /`.load` /`.switch` - Кнопка включения/выключения (с возможностью записи).
- `local.<device>.stop` - Кнопка, останавливает текущее движение (можно записывать).
- `local.<device>.identify` - кнопка, идентифицирует устройство (доступна для записи).
- `local.<device>.drivingCause` /`.heartbeatError` /`.blocking` - статус (только для чтения).
- `local.scenes.<scene>` - кнопка, запускает сцену (доступна для записи).

Точный набор состояний для каждого устройства зависит от действий, которые контроллер для него сообщает.

### Облачный режим (устаревший)

Если доступен только облачный путь, адаптер предоставляет доступ к устройствам, сценам и каналам контроллера. Для управления каналом измените... `*Convert` значения, например:

`wmswebcontrol.0.Markise+XXXX.setting0Convert`

`wmswebcontrol.0.LED+XXXXXXX.setting1Convert`

`wmswebcontrol.0.Markise.setting2Convert`

## Changelog

### 1.0.0 (2026-09-23)

- add local commonCommand control (IP or auto-discovery), preferred over the cloud with a
  cloud fallback
- expose every controllable action per device in the `local.*` tree (position, valance,
  slat angle, dimming, switch, stop, identify) plus scenes
- use axios for all HTTP calls, drop @esm2cjs/got
- resolve service endpoints from the discovery service

### 0.1.4 (2025-01-27)

- ignore certificate errors

### 0.1.3 (2024-10-26)

- fix login

### 0.1.2

- Bugfixes

### 0.0.3

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