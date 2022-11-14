---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.unifi-protect/README.md
title: ioBroker.unifi-защита
hash: w7zo2bNe6JcYU812u6HwTJcS0GsV17BV7u9LbcNJcNs=
---
![Логотип](../../../en/adapterref/iobroker.unifi-protect/admin/unifi-protect.png)

![версия NPM](http://img.shields.io/npm/v/iobroker.unifi-protect.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.unifi-protect.svg)
![Количество установок (последние)](http://iobroker.live/badges/unifi-protect-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/unifi-protect-stable.svg)
![Статус зависимости](https://img.shields.io/david/peterbaumert/iobroker.unifi-protect.svg)
![Известные уязвимости](https://snyk.io/test/github/peterbaumert/ioBroker.unifi-protect/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.unifi-protect.png?downloads=true)

# IoBroker.unifi-защита
**Этот адаптер использует службу [Sentry.io](https://sentry.io), чтобы автоматически сообщать мне как разработчику об исключениях и ошибках кода, а также о новых схемах устройств.** Подробнее см. ниже!

## Адаптер unifi-protect для ioBroker
Подключается к контроллеру Unifi Protect и извлекает все данные с добавленных камер.

Стандартные порты, если не изменены самостоятельно:

 - Облачный ключ Plus Gen2: 7443
 - УДМ Про: 443

## Примеры для getThumbnail и getSnapshot
```
// Settings
const path = '/opt/iobroker/tmp/temp.jpg';
const threshold = 50;

// Send to Telegram ( or what you prefer )
function sendImage(path) {
    sendTo('telegram.0', path);
}

//Trigger Script
on({ id: 'unifi-protect.0.motions.lastMotion.thumbnail', change: "ne" }, function () {
    const thumb = getState('unifi-protect.0.motions.lastMotion.thumbnail'/*thumbnail*/).val;
    const end = getState('unifi-protect.0.motions.lastMotion.end'/*thumbnail*/).val;
    const cameraid = getState('unifi-protect.0.motions.lastMotion.camera'/*thumbnail*/).val;
    const score = getState('unifi-protect.0.motions.lastMotion.score'/*thumbnail*/).val;
    if (score < threshold) { return; }
    // if Event has ended send the Thumbnail otherwise get current Snapshot
    if (end != null) {
        sendTo('unifi-protect.0', 'getThumbnail', { "thumbnail": thumb, "path": path }, function (res) {
            sendImage(path);
        });
    } else {
        sendTo('unifi-protect.0', 'getSnapshot', { "cameraid": cameraid, "path": path }, function (res) {
            sendImage(path);
        });
    }
});
```

```
sendTo('unifi-protect.0', 'getSnapshot', { "cameraid": "5e4a861c01d12503870003f9", "path": path }, function (res) {
    sendImage(path);
});
```

## Что такое Sentry.io и что передается на серверы этой компании?
Sentry.io — это сервис для разработчиков, позволяющий получить обзор ошибок их приложений. И именно это реализовано в данном адаптере.

Когда адаптер выходит из строя или возникает другая ошибка кода, это сообщение об ошибке, которое также появляется в журнале ioBroker, отправляется в Sentry. Когда вы разрешаете iobroker GmbH собирать диагностические данные, также включается ваш идентификатор установки (это просто уникальный идентификатор **без** какой-либо дополнительной информации о вас, электронной почте, имени и т. д.). Это позволяет Sentry группировать ошибки и показывать, сколько уникальных пользователей затронуто такой ошибкой. Все это помогает мне создавать безошибочные адаптеры, которые практически никогда не дают сбоев.

## **РАБОТА В ПРОЦЕССЕ**
* обновления зависимостей
* первая реализация API обновлений в реальном времени
* lastMotion, lastRing, lcdMessage и smartDetectZone в realTimeEvents
* (Scrounger) Добавлена кнопка для ручного снимка
* (Scrounger) точки данных событий в реальном времени для каждой добавленной камеры
* (Scrounger) добавлен снимок и миниатюра для событий в реальном времени (изображения base64)
* Добавлено миниатюрное изображение (Scrounger) для списка событий движения (изображения base64)
* (Scrounger) добавлено небольшое миниатюрное изображение для списка событий движения и событий в реальном времени (изображения base64)
* Добавлено имя камеры (Scrounger) для списка событий движения

### 0.0.12 (14 марта 2021 г.)
* добавлены умные обнаружения
* Исправлены некоторые вещи lastMotion
* добавлена поддержка UnifiOs для CloudKey

### 0.0.11 (27 февраля 2020 г.)
* немного изменен интерфейс администратора
* добавлено описание порта
* исправлено состояние записи UDM Pro

### 0.0.10 (26 февраля 2020 г.)
* исправлен travis ci для интеграционных тестов
* на самом деле использовать настройку последнего x движения

### 0.0.9 (21 февраля 2020 г.)
* lastMotion камеры обновляется только при необходимости
* первые интеграции UDM, изменение настроек еще НЕ работает

### 0.0.8 (2020-02-17)
* сделал события движения необязательными (последнее движение всегда сохраняется)
* сделан регулируемый интервал и "последние x секунд движений"
* правильно удалить старые движения

### 0.0.7 (09.02.2020)
* постоянно обновлять события движения
* изменена структура данных
* добавлена точка данных lastMotion для каждой камеры

### 0.0.6 (08.02.2020)
* сделать некоторые настройки изменяемыми (имя, osdSettings.*, recordSettings.mode, ledSettings.isEnabled)

### 0.0.5 (2020-02-07)
* новый логотип
* добавлены точки данных событий движения

### 0.0.4 (05.02.2020)
* тест релиз-скрипта и некоторые изменения Readme

### 0.0.3 (03.02.2020)
* (Питер Баумерт) первый работающий rls на npm

### 0.0.1
* (Питер Баумерт) первоначальный выпуск

## Использование кода
Код в [Protect_api](./protect_api) в основном скопирован из [hjdhjd's homebridge-unifi-protect](https://github.com/hjdhjd/homebridge-unifi-protect).
Большое спасибо за предоставление этого кода. Его коды лицензии вы можете найти [здесь](https://github.com/hjdhjd/homebridge-unifi-protect/blob/master/LICENSE.md).

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ## **WORK IN PROGRESS**
-->

## License
MIT License

Copyright (c) 2020-2022 Peter Baumert

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