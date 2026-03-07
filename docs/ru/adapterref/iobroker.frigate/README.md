---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.frigate/README.md
title: ioBroker.frigate
hash: 3WrCVv9K/OwVM2kqsLUcAYh8lE3u7uYbapGYnDpFkZ4=
---
![Логотип](../../../en/adapterref/iobroker.frigate/admin/frigate.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.frigate.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.frigate.svg)
![Количество установок](https://iobroker.live/badges/frigate-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/frigate-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.frigate.png?downloads=true)

# IoBroker.frigate
**Тесты:** ![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.frigate/workflows/Test%20and%20Release/badge.svg)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации и сведений о том, как отключить отправку сообщений об ошибках, см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отправка сообщений Sentry используется начиная с js-controller 3.0.

## Адаптер фрегата для ioBroker
Адаптер для инструмента Frigate [Видео с фрегата](https://frigate.video/)

## Настраивать
— Введите URL-адрес Frigate, например, `localhost:5000` или `192.168.178.2:5000`
- Введите порт MQTT: 1883 в конфигурации фрегата.
- Введите хост или IP-адрес системы iobroker в конфигурации фрегата в разделе

```yaml
mqtt:
    host: ioBrokerIP
    port: ioBrokerPort
```

После запуска Frigate и адаптера в журнале должно отобразиться сообщение о подключении нового клиента.

## Использование
### Статистика
Общая информация о системе и камерах.

### Пульты
`frigate.0.remote.pauseNotifications` - Приостановка уведомления для всех камер.

### События
Последнее мероприятие с информацией до и после.

`frigate.0.events.history` - История последних X событий.

В разделе «История событий» отображается миниатюра события, а также URL-адрес снимка и видеоролика.

### Camera_name
Состояние и настройки камеры.

Изменение состояния позволяет изменить настройки камеры.

[Подробная информация обо всех штатах](https://docs.frigate.video/integrations/mqtt/)

* `frigate.0.camera_name.motion` — Определяет, обнаруживает ли камера camera_name в данный момент движение. Ожидаемые значения: ON и OFF. ПРИМЕЧАНИЕ: После первоначального обнаружения движения значение ON будет установлено до тех пор, пока движение не будет обнаружено в течение mqtt_off_delay секунд (по умолчанию 30).
* `frigate.0.camera_name.person_snapshot` — Публикует кадр в формате JPEG с обнаруженным типом объекта. Если объект больше не обнаруживается, публикуется изображение с наивысшей степенью достоверности или повторно публикуется исходное изображение.

Высоту и обрезку снимков можно настроить в конфигурационном файле.

* `frigate.0.camera_name.history` - История событий камеры.
* `frigate.0.camera_name.remote.notificationText` - пользовательский текст уведомления для камеры.
* `frigate.0.camera_name.remote.notificationMinScore` — пользовательский минимальный балл для уведомлений, отправляемых камерой.
* `frigate.0.camera_name.remote.pauseNotifications` - приостановка уведомлений для камеры.
* `frigate.0.camera_name.remote.ptz` - отправка команд ptz https://docs.frigate.video/integrations/mqtt/#frigatecamera_nameptz

## Уведомления
Адаптер может отправлять снимки и фрагменты событий и обнаружения объектов в экземпляры, такие как `telegram`, `pushover` и `signal-cbm`.

Вы можете указать несколько экземпляров или пользователей для отправки снимков или видеороликов.

В настройках включите уведомления, чтобы получать снимки или видеоролики.

Для участия в мероприятии можно ввести минимальный балл перед отправкой. 0 = Отключено.

Видеоролики отправляются через 5 секунд (в настройках экземпляра) после завершения события.

Вы можете ввести собственный текст уведомления с помощью заполнителя `{{source}} {{type}} erkannt {{status}} {{score}} {{state}}`.

## Интеграция в визуализацию
В визуализацию можно интегрировать снимки экрана и видеоклипы:

Снимок экрана:

— Добавьте строку `img src` и используйте её в качестве идентификатора объекта: `frigate.0.camera_name.person_snapshot`
— Добавьте строку `String img src` и используйте её в качестве идентификатора объекта: `frigate.0.events.history.01.thumbnail`

Видеоролики:

- Добавить `HTML` как HTML:

```html
<video width="100%" height="auto" src="{frigate.0.events.history.01.webclip}" autoplay muted>
</video>
```

Количество человек:

- `frigate.0.camera.person`

Событие с участием человека:

- `frigate.0.events.after.label` = person

## Запуск Docker-контейнера Frigate на другом хосте
Если вы хотите отправлять клипы и снимки через Telegram и другие подобные сервисы на хост iobroker, экземпляр Frigate и экземпляр Telegram (или другой) должны работать на одном хосте, поскольку Frigate использует дисковое пространство для хранения клипов и снимков.

## Обсуждение и вопросы
[https://forum.iobroker.net/topic/64928/frigate-adapter-für-iobroker](https://forum.iobroker.net/topic/64928/frigate-adapter-für-iobroker)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (@GermanBluefox) Code optimizations and refactoring

### 2.0.2 (2026-02-16)
- (@GermanBluefox) Removed gpu_usages

### 2.0.0 (2026-02-16)
- (@GermanBluefox) Adapter was migrated to TypeScript
- (@GermanBluefox) Breaking change: All states with value ON/OFF were changed to boolean true/false
- (@GermanBluefox) Better handling of complex objects and arrays
- (@GermanBluefox) `path_data` is not parsed anymore
- (@GermanBluefox) Added еру possibility to start and manage docker with frigate from the adapter

### 1.4.0 (2026-01-26)

- (mcm1957) Adapter requires node.js 20 as minimum now.
- (TA2k) Remove path_data objects to prevent too many objects generated by the adapter

### 1.3.3 (2026-01-26)

- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now

- (mcm1957) Adapter requires admin 6.17.14 as minimum now.

### 1.3.2 (2025-05-06)

- (TA2k) remove path_data from v0.16
- (TA2k) move clip url from mp4 to m3u8
- (mcm1957) Adapter requires js-controller 5.0.19 as minimum now.
- (mcm1957) Several issues reported by the adapter checker have been fixed.

## License

MIT License

Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2024-2025 TA2k <tombox2020@gmail.com>

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