---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.twinkly/README.md
title: ioBroker.twinkly
hash: muvjgdJqz/RLycKgQ8P0DO+c2lrqdMKvsGrhqZ1728g=
---
![Логотип](../../../en/adapterref/iobroker.twinkly/admin/twinkly.png)

![Количество установок (последние)](http://iobroker.live/badges/twinkly-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/twinkly-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.twinkly.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.twinkly.svg)
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
|--------------|---------------------------------------------------------------------------------------------------------------------------------|
| `Enabled` | Должен ли доступ к этому соединению |
| `IP Address` | IP-адрес Twinkly Lights |
| `Mode On` | Какой `ledMode` следует активировать, когда состояние `on` включено.<br/> Цвет, Эффект, Кино, Реактивная музыка, Список воспроизведения или Последний режим |
| `Режим включен` | Какой `ledMode` должен быть активирован, когда включено состояние `on`.<br/> Цвет, Эффект, Кино, Реактивная музыка, Список воспроизведения или Последний режим |

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
| `ledMode` | :heavy_check_mark: | Режим: Цвет, Эффект, Кино, Реактивная музыка, Список воспроизведения, Выкл., В реальном времени (пока не поддерживается), Демонстрация |
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
    connection : 'Fenster',
    frames     : [
        [{"r":221,"g":0,"b":85},{"r":221,"g":0,"b":85}, ...],
        [{"r":221,"g":0,"b":85},{"r":221,"g":0,"b":85}, ...],
        ...
    ],
    delay : 250
});
```

### Загрузить фильм шаблона
Загрузите готовый фильм.

- 0: мерцание сине-белого цвета
- 1: Мерцание Рождества-Зеленый-Красный

```
sendTo('twinkly.0', 'uploadTemplateMovie', {
    connection : 'Fenster',
    template   : 1
});

```

### Загрузить фильм с мерцанием
```
sendTo('twinkly.0', 'uploadTwinkleMovie', {
    connection  : 'Fenster',
    baseColor   : '#00873f', // or {r: 0, g: 135, b: 62}
    secondColor : '#c30F15'  // or {r: 195, g: 15, b: 22}
});
```

<!--

### Отправить кадр в реальном времени
```
sendTo('twinkly.0', 'sendrealtimeframe', {
    connection : 'Fenster',
    frame      : [{"r":221,"g":0,"b":85},{"r":221,"g":0,"b":85}, ...]
});
```

-->

### Создать рамку определенного цвета
Возвращает полный кадр в одном цвете.
Отправляя цвета в свойстве `colors`, вы получаете возвращаемый массив кадров.

```
sendTo('twinkly.0', 'generateFrame', {
    connection : 'Fenster',
    color      : '#dd0055' // or {r: 221, g: 0, b: 85}
});
response => {
    // [{"r":221,"g":0,"b":85},{"r":221,"g":0,"b":85}, ...]
    ...
}

sendTo('twinkly.0', 'generateFrame', {
    connection : 'Fenster',
    colors     : ['#dd0055', ...] // or [{r: 221, g: 0, b: 85}, ...]
});
response => {
    // [[{"r":221,"g":0,"b":85},{"r":221,"g":0,"b":85}, ...], ..]
    ...
}
```

## Changelog
<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 1.0.10 (2022-12-05)
* Add sendTo message `uploadTwinkleMovie` to upload a twinkle movie with own colors
* Update Release Integration in Github Actions and Sentry

### 1.0.9 (2022-11-27)
* Now detects if Twinkly is in a group (firmware >= 2.8.3). If so, the group can only be controlled by the master, the states from the slave are read-only.

### 1.0.8 (2022-11-26)
* Add `musicreactive` Mode
* Add Ukrainian translation
* Rework how objects are created, objects are now created after first connect after startup and updated after a firmware update

### 1.0.7 (2022-11-19)
* Fixed deprecated messages from Sentry with api-validations
* Automatic switch mode had an error with playlists. Playlist item could never be selected.

### 1.0.6 (2022-11-19)
* Fixed polling (ledBri, ledSat)
* Added Connection-Info

### 1.0.5 (2022-10-16)
* Fixed error when changing active movie (#173)

### 1.0.4 (2022-10-15)
* Upload Movies
* Upload Generated Movies
* --Send Realtime Frame
* Generate Full Frame in one color (create own frames)
* Update deprecated states to fw 2.6.6
* Update twinkly API Issues from Sentry

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