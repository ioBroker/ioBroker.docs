---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.frigate/README.md
title: ioBroker.frigate
hash: TIq4HqXLvTWUXSkeAmmvZslfBw3HjbMyXxTo/QbfO9Y=
---
![Логотип](../../../en/adapterref/iobroker.frigate/admin/frigate.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.frigate.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.frigate.svg)
![Количество установок](https://iobroker.live/badges/frigate-installed.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/frigate-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.frigate.png?downloads=true)

# IoBroker.frigate
**Тесты:** ![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.frigate/workflows/Test%20and%20Release/badge.svg)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Для получения более подробной информации и информации о том, как отключить отчеты об ошибках, см. [Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются начиная с js-controller 3.0.

##адаптер фрегата для ioBroker
Адаптер для инструмента Фрегат [Видео Фрегата](https://frigate.video/)

## Настраивать
- Введите URL-адрес фрегата, например. локальный хост: 5000 или 192.168.178.2:5000
- Введите порт MQTT: 1883 из конфига фрегата
- Введите хост или IP-адрес системы iobroker в конфигурации фрегата в разделе

```
mqtt:
  host: ioBrokerIP
```

  После запуска Frigate и Адаптера вы должны увидеть в журнале новый подключенный клиент.

## Использование
### Статистика
Общая информация о системе и камерах

### Пульты
`frigate.0.remote.pauseNotifications` Уведомление о паузе для всех камер

### События
Последнее событие с информацией до и после

`frigate.0.events.history` История последних X событий

Событие в истории содержит миниатюру события и URL-адрес снимка и клипа.

### Имя_камеры
Статус и настройки камеры

Изменение состояния Состояние для изменения настроек камеры

[Подробная информация обо всех штатах](https://docs.frigate.video/integrations/mqtt/)

`frigate.0.camera_name.motion`

Определяет ли camera_name движение в данный момент. Ожидаемые значения: ON и OFF. ПРИМЕЧАНИЕ. После первоначального обнаружения движения параметр ВКЛ будет установлен до тех пор, пока движение не будет обнаружено в течение mqtt_off_delay секунд (30 по умолчанию).

`frigate.0.camera_name.person_snapshot`

Публикует кадр в формате JPEG обнаруженного типа объекта. Когда объект больше не обнаруживается, публикуется изображение с наивысшей достоверностью или повторно публикуется исходное изображение.
Высоту и обрезку снимков можно настроить в конфиге.

`frigate.0.camera_name.history` История событий камеры

`frigate.0.camera_name.remote.notificationText` пользовательский текст уведомления для камеры `frigate.0.camera_name.remote.notificationMinScore` минимальный балл пользовательского уведомления для камеры `frigate.0.camera_name.remote.pauseNotifications`уведомление о паузе для камеры

`frigate.0.camera_name.remote.ptz`отправить команды ptz https://docs.frigate.video/integrations/mqtt/#frigatecamera_nameptz

## Уведомления
Адаптер может отправлять снимки и клипы событий и обнаружения объектов в такие экземпляры, как Telegram, Pushover и signal-cbm.

Вы можете указать несколько экземпляров или пользователей для отправки снимков или клипов.

Активируйте уведомление в настройках, чтобы получать снимки или клипы.

Для события можно ввести минимальный балл перед отправкой. 0 = отключено

Клипы отправляются через 5 секунд (настройки экземпляра) после окончания события.

Вы можете ввести собственный текст уведомления с помощью заполнителя `{{source}} {{type}} erkannt {{status}} {{score}} {{state}}`.

## Интеграция в Vis
Вы можете интегрировать снимки и клипы в визу:

Снимок:

Добавьте `String img src` и используйте в качестве идентификатора объекта: `frigate.0.camera_name.person_snapshot`.

Добавьте `String img src` и используйте в качестве идентификатора объекта: `frigate.0.events.history.01.thumbnail`.

Клипы:

Добавьте элемент `HTML` в формате HTML:

```
<video width="100%" height="auto" src="{frigate.0.events.history.01.webclip}" autoplay muted>
</video>
```

Количество человек: frigate.0.camera.person Событие с человеком: frigate.0.events.after.label = person

## Обсуждение и вопросы
[https://forum.iobroker.net/topic/64928/frigate-adapter-für-iobroker](https://forum.iobroker.net/topic/64928/frigate-adapter-für-iobroker)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.1.0 (2024-03-11)

- fix deleting of notification files
- add notification settings

### 1.0.2 (2024-01-29)

- reduce memory usage for clip notifications

### 1.0.1 (2024-01-28)

- fix frigate v12 camera fetching
- fix pushover notifications

### 1.0.0 (2024-01-26)

- New Version with new state structure. Please check you vis and scripts. The new version doesn't need the mqtt adapter and can send directly notification to telegram.

## License

MIT License

Copyright (c) 2024 TA2k <tombox2020@gmail.com>

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