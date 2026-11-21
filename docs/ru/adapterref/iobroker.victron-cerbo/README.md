---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.victron-cerbo/README.md
title: ioBroker Victron Cerbo
hash: 4GamJ7PCeP6dCYznEVNNOIiLTjNxS1145UhK0McuAC8=
---
![Логотип](../../../en/adapterref/iobroker.victron-cerbo/admin/victron-cerbo.svg)

![Количество установок](https://iobroker.live/badges/victron-cerbo-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.victron-cerbo.svg)
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.victron-cerbo/workflows/Test%20and%20Release/badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.victron-cerbo.svg)

# ioBroker Victron Cerbo

## Описание

Этот адаптер подключает устройства Victron Cerbo GX к ioBroker через протокол MQTT.

Victron Cerbo GX — это современный центр мониторинга и управления энергетическими системами Victron, включая солнечные зарядные устройства, мониторы батарей, инверторы и другие энергетические компоненты.

## Конфигурация

- **IP** : IP-адрес MQTT-брокера
- **Порт** : Порт брокера MQTT (по умолчанию: 1883)
- **Пользователь/Пароль** : учетные данные для аутентификации MQTT
- **Таймаут клиента** : время ожидания в секундах для подключений MQTT-клиента.

## Веб-интерфейс Сербо

Веб-интерфейс Cerbo (GUI v2, `http://<cerbo>/gui-v2/` Доступ к нему можно получить через ioBroker, после авторизации в ioBroker, а также по протоколу HTTPS или через удаленный доступ к ioBroker:

- **Вкладка в админке** : Адаптер запускает небольшой веб-сервер (по умолчанию). `127.0.0.1:8098`), и администратор (>= 8.2.1) передает вкладку `Victron Cerbo GX` на него под `/proxy/victron-cerbo.0/` Открыть его могут только администраторы. `127.0.0.1` Достаточно, если административная панель запущена на том же хосте, в противном случае выберите адрес, к которому может получить доступ хост административной панели.
- **ioBroker.web** : Выберите веб-экземпляр в настройках, и Cerbo станет доступен по адресу `http://<iobroker>:8082/victron-cerbo.0/`, без собственного порта.

GUI v2 подключается к веб-сокету MQTT в корневом каталоге хоста (`/websocket-mqtt`); адаптер переписывает этот адрес на странице таким образом, чтобы соединение проходило по тому же пути.

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

## Changelog
### 1.0.2 (2026-11-05)
- (copilot) Adapter requires node.js >= 22.19.0 now
- (@GermanBluefox) ioBroker.web can stop the web extension and start it again with new settings instead of restarting itself (`supportsHotReload`, with a version of web that supports it). When it is stopped, the web extension now also closes the connections of GUI v2 to the Cerbo

### 1.0.1 (2026-10-15)
* (@GermanBluefox) Fixed: the keepalive no longer makes the Cerbo publish all values again
* (@GermanBluefox) Unchanged values are not written again

### 1.0.0 (2026-10-14)
* (iobroker-bot) Adapter requires node.js >= 22 now.
* (@GermanBluefox) Added: the web interface of the Cerbo (GUI v2) as a tab in admin (`adminTab.proxy`) and as a web extension of ioBroker.web
* (@GermanBluefox) The port of the own web server for the admin tab is reported to js-controller 8 (`declareUsedResources`, `registerUsedResource`)
* (@GermanBluefox) Added the missing translations, the tests run on Windows and macOS too

### 0.2.1 (2026-04-12)
* (@GermanBluefox) Implemented the tests

### 0.1.0 (2026-04-11)
* (@GermanBluefox) Corrected some states

## License

The MIT License (MIT)

Copyright (c) 2026, Denis Haev <dogafox@gmail.com>

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