---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.twinkly/README.md
title: ioBroker.twinkly
hash: NeaLj4EuJTdrK+PZyNzW0zSgaTV7E5ZftXt0jEvJWCM=
---
![Логотип](../../../en/adapterref/iobroker.twinkly/admin/twinkly.png)

![Количество установок (последние)](http://iobroker.live/badges/twinkly-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/twinkly-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.twinkly.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.twinkly.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/patrickbs96/ioBroker.twinkly?branch=master&svg=true)
![Всего предупреждений](https://img.shields.io/lgtm/alerts/g/patrickbs96/ioBroker.twinkly.svg?logo=lgtm&logoWidth=18)
![Известные уязвимости](https://snyk.io/test/github/patrickbs96/ioBroker.twinkly/badge.svg)

# IoBroker.twinkly
[![Тестирование и выпуск] (https://github.com/patrickbs96/ioBroker.twinkly/workflows/Test%20and%20Release/badge.svg)](https://github.com/patrickbs96/ioBroker.twinkly/actions?query=workflow%3A%22Test+and+Release%22++) [![CodeQL] (https://github.com/patrickbs96/ioBroker.twinkly/workflows/CodeQL/badge.svg)](https://github.com/patrickbs96/ioBroker.twinkly/actions?query=workflow%3ACodeQL)

## Адаптер twinkly для ioBroker
Адаптер для связи с [Мерцающие огни](https://www.twinkly.com/).

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

## Настройки
Доступны следующие настройки: ![Настройки администратора](../../../en/adapterref/iobroker.twinkly/img/admin.png)

В таблицу вы можете добавить все источники света Twinkly, которыми вы хотите управлять.

| Колонка | Описание |
|--------------|-----------------------------------------------------------------------------------------------------------------|
| `Enabled` | Должен ли доступ к этому соединению |
| `IP Address` | IP-адрес Twinkly Lights |
| `Mode On` | Какой `ledMode` следует активировать, когда состояние `on` включено.<br/> Цвет, Эффект, Фильм, Список воспроизведения или последний режим |
| `Режим включен` | Какой `ledMode` должен быть активирован, когда включено состояние `on`.<br/> Цвет, Эффект, Фильм, Список воспроизведения или последний режим |

Следующие дополнительные состояния создаются для каждого устройства при включении флажка:

* Информация об устройстве
* MQTT
* Статус сети

Доступны следующие состояния:

| государство | Доступно для записи | Описание |
|---------------|--------------------|---------------------------------------------------------------------------------------------------------------------------------|
| `connected` | :х: | Устройство подключено |
| `firmware` | :х: | Версия прошивки |
| `ledBri` | :heavy_check_mark: | Яркость (отключить управление с -1) |
| `ledColor` | :heavy_check_mark: | Цвет светодиодов, HSV/RGB(W)/HEX (`Color`) |
| `ledConfig` | :heavy_check_mark: | Конфигурация светодиодов |
| `ledEffect` | :heavy_check_mark: | Эффекты (`Effect`) |
| `ledLayout` | :heavy_check_mark: | Расположение светодиодов (отключено для дальнейшего тестирования) |
| `ledMode` | :heavy_check_mark: | Режим: Фильм, Цвет, Эффект, Список воспроизведения, Выкл., В реальном времени (пока не поддерживается), Демонстрация |
| `ledMovie` | :heavy_check_mark: | Активный фильм. Если в список воспроизведения добавлено несколько фильмов, их можно выбрать здесь. (`Movie`) |
| `ledPlaylist` | :heavy_check_mark: | Активный вход в плейлист, переключение между фильмами. (`Playlist`) |
| `ledSat` | :heavy_check_mark: | Насыщенность 0-100 (отключить управление с -1) |
| `mqtt` | :heavy_check_mark: | MQTT-соединение |
| `name` | :heavy_check_mark: | Имя |
| `network` | :х: | Сетевая информация |
| `on` | :heavy_check_mark: | Переключатель включения/выключения |
| `paused` | :heavy_check_mark: | Приостановите подключение к Twinkly, чтобы вы могли внести изменения в приложение. В противном случае вы можете потерять соединение во время работы в App |
| `timer` | :heavy_check_mark: | Обновите таймер |
| `таймер` | :heavy_check_mark: | Обновите таймер |

[Информация о частном API](https://xled-docs.readthedocs.io/en/latest/) [Pavol Babinčák](https://github.com/scrool)

## Известные вопросы
* Максимальная длина названия фильма — 15 символов.

## Примеры кода
### Загрузить фильм
```
sendTo('twinkly.0', 'uploadMovie', {
    connection: 'Fenster',
    movie: {
        frames: [
            [{"r":221,"g":0,"b":85},{"r":221,"g":0,"b":85}, ...],
            [{"r":221,"g":0,"b":85},{"r":221,"g":0,"b":85}, ...],
            ...
        ],
        delay: 250
    }
});
```

### Загрузить фильм шаблона
Загрузите готовый фильм.

- 0: мерцание сине-белого цвета
- 1: Мерцание Рождества-Зеленый-Красный

```
sendTo('twinkly.0', 'uploadTemplateMovie', {
    connection: 'Fenster',
    index: 0,1
});
```

<!--

### Отправить кадр в реальном времени
```
sendTo('twinkly.0', 'sendrealtimeframe', {
    connection: 'Fenster',
    frame: [{"r":221,"g":0,"b":85},{"r":221,"g":0,"b":85}, ...]
});
```

-->

### Создать рамку определенного цвета
Возвращает полный кадр в одном цвете.
Отправляя цвета в свойстве `colors`, вы получаете возвращаемый массив кадров.

```
sendTo('twinkly.0', 'generateFrame', {
    connection: 'Fenster',
    color : '#dd0055' // or {r: 221, g: 0, b: 85}
}, response => {
    // [{"r":221,"g":0,"b":85},{"r":221,"g":0,"b":85}, ...]
    ...
});

sendTo('twinkly.0', 'generateFrame', {
    connection: 'Fenster',
    colors : ['#dd0055', ...] // or [{r: 221, g: 0, b: 85}, ...]
}, response => {
    // [[{"r":221,"g":0,"b":85},{"r":221,"g":0,"b":85}, ...], ..]
    ...
});
```

## Changelog
<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* Fixed polling (ledBri, ledSat)

### 1.0.5 (2022-10-16)
* Fixed error when changing active movie (#173)

### 1.0.4 (2022-10-15)
* Upload Movies
* Upload Generated Movies
* --Send Realtime Frame
* Generate Full Frame in one color (create own frames)
* Update deprecated states to fw 2.6.6
* Update twinkly API Issues from Sentry

### 1.0.3 (2022-07-31)
* Add Online-Status to object-view
* Ignore `*.uid` values, unknown in which release they are available (IOBROKER-TWINKLY-1Q)

### 1.0.2 (2022-07-07)
* Add new values `details.uid` and `details.group.uid` fw >= 2.8.4, fwFamily=G (IOBROKER-TWINKLY-1G, IOBROKER-TWINKLY-1N)

### 1.0.1 (2022-07-05)
* Remove deprecated values from mode

### 1.0.0 (2022-07-03)
* Change refresh logic after State-Change
* Added depcrecated logic to remove states when no longer filled with data from api
* Check new and deprecated values from api response to update state information

### 0.3.1 (2022-07-02)
* Update translations logic i18n

## License
MIT License

Copyright (c) 2022 patrickbs96 <patrickbsimon96@gmail.com>

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