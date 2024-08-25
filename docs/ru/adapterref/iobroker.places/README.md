---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.places/README.md
title: ioBroker.places
hash: hjIkwB4JXT8fYW0UgWnjmkRHGf8xKpfjWJTof7ce7Ro=
---
![Логотип](../../../en/adapterref/iobroker.places/admin/places.png)

![Количество установок](http://iobroker.live/badges/places-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.places.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.places.svg)

# IoBroker.places
![Тестируйте и выпускайте](https://github.com/iobroker-community-adapters/ioBroker.places/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/places/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

## Описание
Это адаптер ioBroker для обработки сообщений с информацией о местоположении, которые должны как минимум содержать имя пользователя, геопозицию и отметку времени.
Адаптеры анализируют, находится ли информация о местоположении в радиусе конфигурации местоположения ioBroker или в других местах.

## Конфигурация
Существует только одно обязательное значение конфигурации: радиус (метры), который будет использоваться для определения текущего местоположения пользователя.
Расположение ioBroker используется для идентификации пользователей, находящихся «дома», другие места могут быть добавлены как часть конфигурации.

* **Радиус** (_mandatory_) должен быть радиусом в метрах, используемым для проверки того, находится ли пользователь в определенном месте (дома или в другом месте).
* **Имя для дома** можно использовать для установки пользовательского имени для дома.
* **Ключ Google Maps API** будет использоваться для включения геокодирования. Отсутствующий ключ API будет извлечен из настроенного экземпляра vis-map (если он доступен) при открытии страницы конфигурации.
* **Геокодирование Google Maps** можно активировать, чтобы получить реальный адрес и высоту для указанного географического положения.
* **Места** — это гибкий список, содержащий настраиваемые места, где каждое место должно иметь допустимые значения имени, широты и долготы.
* **Пользователи** — гибкий список, содержащий сопоставления пользователей.

## Использование
Чтобы обработать обновление местоположения, просто отправьте сообщение, используя следующий синтаксис:

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

## Структура возвращаемых сообщений
Следующий блок показывает, как выглядят ответные сообщения. Для каждого значения дерево объектов ioBroker имеет соответствующее состояние.

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
Добавьте специальные службы **xyz** в **Белый список для служб**.

### 2. Настройте мобильные приложения OwnTracks
Измените режим на **HTTP Private** и используйте следующий адрес в качестве **Host**: https://iobroker.pro/service/custom_xyz/<user-app-key>

### 3. Настройте iobroker.places
На вкладке Интеграция необходимо выбрать экземпляр облачного адаптера и **xyz** в качестве сервиса. Адаптер прослушивает входящие запросы к сервису и запускает обработку.

## Пример: Telegram + ioBroker.telegram + ioBroker.places
### 1. Настройте iobroker.telegram
Включите параметр **хранить необработанные запросы**.

### 2. Создать скрипт (ioBroker.javascript)
Создайте короткий скрипт с подпиской на необработанный запрос, например. из **telegram.0.communicate.requestRaw** и отправить новый объект запроса на iobroker.places (или его экземпляр):

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
Реализация частично основана на dschaedls [ioBroker.geofency](https://github.com/ioBroker/ioBroker.geofency). Логотип был взят из [Free Icons PNG](http://www.freeiconspng.com/images/maps-icon) и была изменена, чтобы иметь прозрачный фон.

## Changelog
### 1.1.2 (2022-04-17)
* (Apollon77) Fix personsAtHome and anybodyAtHome states

### 1.1.1 (2022-03-29)
* (Apollon77) Allow (again?) to consume external subscribed state value independently of ack flag

### 1.1.0 (2022-03-25)
* (Basgo) Correctly set ack flag
* (Apollon77) Add Sentry for crash reporting

### 1.0.0 (2020-08-16)
* (bluefox) Updated packages
* (bluefox) Refactoring

### 0.7.0 (2019-01-12)
* (BasGo) Added compact mode, replaced integration of iobroker.cloud with iobroker.iot

### 0.6.2 (2018-12-06)
* (bluefox) Error with blockly was fixed

### 0.6.1
* (BasGo) Added handling for invalid route details

### 0.6.0
* (BasGo) Changed implementation to use promises
* (BasGo) Added route details for driving home

### 0.5.1
* (BasGo) Extended help texts

### 0.5.0
* (BasGo) Added optional subscription for cloud adapter

### 0.4.2
* (BasGo) UI fixes

### 0.4.1
* (BasGo) Configuration dialog extended

### 0.4.0
* (BasGo) Google Maps can be used for configuration
* (BasGo) Geocoding can be activated

### 0.3.0
* (BasGo) Added user mappings

### 0.2.3
* (BasGo) Optimized state handling
* (BasGo) Added option to clear array

### 0.2.2
* (BasGo) Added check for newer entries

### 0.2.1
* (BasGo) Extended configuration

### 0.2.0
* (BasGo) Materialized admin page

### 0.1.1
* (BasGo) Fixed some smaller issues

### 0.1.0
* (BasGo) Initial release

## License

This adapter is licensed under the [MIT License](../blob/master/LICENSE) which is part of this repository.

Copyright (c) 2018-2022 BasGo <basgo@gmx.de>
