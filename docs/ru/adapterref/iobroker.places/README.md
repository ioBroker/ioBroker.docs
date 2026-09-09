---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.places/README.md
title: ioBroker.places
hash: 57DoirkdYT8+yDIFkRkP0yThBtsTRyiG5BNo5eWz1Qw=
---
![Логотип](../../../en/adapterref/iobroker.places/admin/places.png)

![Количество установок](http://iobroker.live/badges/places-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.places.svg)
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.places/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/places/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.places.svg)

# ioBroker.places

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

## Описание

Это адаптер ioBroker для обработки сообщений с информацией о местоположении, которые должны содержать как минимум данные о пользователе, геолокацию и метку времени. Адаптер анализирует, находится ли информация о местоположении в радиусе вокруг конфигурации местоположения ioBroker или, при необходимости, в других местах.

## Конфигурация

Обязательным параметром конфигурации является только один: радиус (в метрах), который будет использоваться для определения текущего местоположения пользователя. Местоположение ioBroker используется для определения того, что пользователь находится «дома», другие места могут быть добавлены в процессе настройки.

- **Радиус** ( _обязательно_ ) должен быть радиусом в метрах, используемым для проверки того, находится ли пользователь в определенном месте (дома или в заданном месте).
- **Функция «Название для дома»** позволяет задать собственное название для места жительства.
- Для включения геокодирования будет использоваться **ключ API Google Maps** . Отсутствующий ключ API будет получен из настроенного экземпляра vis-map (если он доступен) при открытии страницы конфигурации.
- Функция **геокодирования в Google Maps** позволяет получить реальный адрес и высоту над уровнем моря для заданной географической точки.
- **Places** — это гибкий список, содержащий пользовательские места, где каждое место должно иметь допустимые значения для имени, широты и долготы.
- **Users** — это гибкий список, содержащий сопоставления пользователей.

## Использование

Для обработки обновления местоположения просто отправьте сообщение, используя следующий синтаксис:

```
// send a message to all instances of places adapter
sendTo('places', {
        user:       "Name of person", 
        latitude:   50.9576191, 
        longitude:  6.8272409, 
        timestamp:  1520932471
});

// send a message to a specific instance of places adapter adapter
sendTo('places.0', {
        user:       "Name of person", 
        latitude:   50.9576191, 
        longitude:  6.8272409, 
        timestamp:  1520932471
});

// send a message to a specific instance and define a callback
sendTo('places.0', {
        user:       "Name of person", 
        latitude:   50.9576191, 
        longitude:  6.8272409, 
        timestamp:  1520932471
}, function (res) { log(JSON.stringify(res)); });
```

## Структура для возвращаемых сообщений

В следующем блоке показано, как выглядят ответные сообщения. Для каждого значения дерево объектов ioBroker имеет соответствующее состояние.

```
{
    "user":         "Name of person",       // name of person (may have been replaced by user mapping)
    "latitude":     50.9576191,
    "longitude":    6.8272409,
    "timestamp":    1520932471000,
    "date":         "2018-03-13 10:14:31",  // date extracted from timestamp
    "atHome":       false,                  // true if inside the configured radius around ioBroker
    "homeDistance": 104898,                 // distance in meters between position and ioBroker
    "name":         "",                     // name of place found within the configuration
    "address":      "",                     // readable address (if geocoding is active)
    "elevation":    "",                     // elevation in meters (if geocoding is active)
}
```

## Пример: OwnTracks + ioBroker.iot + ioBroker.places

### 1. Настройте iobroker.iot

Добавьте пользовательские сервисы **xyz** в **белый список сервисов** .

### 2. Настройка мобильных приложений OwnTracks

Измените режим на **HTTP Private** и используйте следующий адрес в качестве **хоста** : <https://iobroker.pro/service/custom_xyz/><user-app-key>

### 3. Настройте iobroker.places

На вкладке «Интеграция» необходимо выбрать экземпляр облачного адаптера и **xyz** в качестве сервиса. Адаптер будет прослушивать входящие запросы к сервису и запускать их обработку.

## Пример: Telegram + ioBroker.telegram + ioBroker.places

### 1. Настройте iobroker.telegram

Включите опцию для **сохранения необработанных запросов** .

### 2. Создайте скрипт (ioBroker.javascript)

Создайте небольшой скрипт с подпиской на необработанный запрос, например, от **telegram.0.communicate.requestRaw** , и отправьте новый объект запроса в iobroker.places (или его экземпляр):

```
on({id: "telegram.0.communicate.requestRaw", change: "ne"}, function (obj) {
    var data = JSON.parse(obj.newState.val);
    if (data.from && data.location) {
        sendTo('places.0', {
            user: data.from.first_name, 
            latitude: data.location.latitude, 
            longitude: data.location.longitude, 
            timestamp: data.date
        }, function (res) { log('places analyzed telegram position as: ' + JSON.stringify(res)); });
    }
});
```

## Кредиты

Реализация частично основана на адаптере dschaedls [ioBroker.geofency](https://github.com/ioBroker/ioBroker.geofency) . Логотип взят из [Free Icons PNG](http://www.freeiconspng.com/images/maps-icon) и модифицирован таким образом, чтобы иметь прозрачный фон.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 1.4.0 (2026-03-24)
- (copilot) Adapter requires admin >= 7.7.22 now
- (raintonr) Don't zero out elevation when geocoding if it was provided (#290). 
- (mcm1957) Dependencies have been updated

### 1.3.0 (2025-05-13)
* (TicoM1) Defaultvalue for state `personsAtHome` has been corrected.
* (mcm1957) Adapter requires node.js >= 20, js-controller >= 6.0.11 and admin >=7.4.10 now.
* (mcm1957) Several issues reported by repository checker have been fixed.
* (mcm1957) Dependencies have been updated

### 1.2.0 (2024-04-25)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.1.2 (2022-04-17)
* (Apollon77) Fix personsAtHome and anybodyAtHome states

### 1.1.1 (2022-03-29)
* (Apollon77) Allow (again?) to consume external subscribed state value independently of ack flag

## License

The MIT License (MIT)


Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2018-2022 BasGo <basgo@gmx.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.