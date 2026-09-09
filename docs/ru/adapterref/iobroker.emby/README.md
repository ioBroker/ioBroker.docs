---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.emby/README.md
title: ioBroker.emby
hash: xU+R3riE+Sv4vrLF/hIzNfMFj0WJ+cWJLcKIUN9Hng0=
---
![Логотип](../../../en/adapterref/iobroker.emby/admin/emby.png)

![Лицензия GitHub](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.emby)
![Загрузки](https://img.shields.io/npm/dm/iobroker.emby.svg)
![размер репозитория GitHub](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.emby)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/emby/svg-badge.svg)
![активность коммитов на GitHub](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.emby)
![Количество коммитов на GitHub с момента последнего релиза (по дате)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.emby/latest)
![Последний коммит на GitHub](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.emby)
![Проблемы на GitHub](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.emby)
![Версия NPM](http://img.shields.io/npm/v/iobroker.emby.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/emby-stable.svg)
![Количество установок](https://iobroker.live/badges/emby-installed.svg)
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.emby/actions/workflows/test-and-release.yml/badge.svg)
![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.emby/actions/workflows/codeql.yml/badge.svg)

# ioBroker.emby

</br>
**Version:** </br>
</br>
**Tests:** </br>

<!--
## Sentry
**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.**
For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.
-->

## Адаптер EMBY для ioBroker

Этот адаптер позволит вам подключиться к вашему серверу Emby и управлять им.

## Кредиты

Этот адаптер не был бы возможен без огромной работы @thewhobox <iobroker@mikegerst.de> , который написал первоначальные версии этого адаптера и передал его организации iobroker-community-adapters.

## Использование

Пожалуйста, выполните следующие шаги, чтобы убедиться, что адаптер работает правильно и вы видите все устройства.

1. Отредактируйте настройки и введите IP-адрес, ApiKey и, возможно, несколько идентификаторов устройств, которые вы хотите игнорировать.

`IP **with** Port => 192.168.0.100:8096`

2. Сохраните изменения и перезапустите адаптер.

3. Чтобы увидеть первые элементы, вам потребуется открыть клиент Emby и получить некоторые данные.

`The Adapter will not get Data if **no** client is open.`

## Объекты

### Информация

| Командование             | Описание                                                        | Информация |
| ------------------------ | --------------------------------------------------------------- | ---------- |
| x.info.deviceName        | Отображает название устройства.                                 |            |
| x.info.userName          | Отображает имя пользователя, вошедшего в систему на устройстве. |            |
| x.info.supportedCommands | Список поддерживаемых команд                                    |            |

### СМИ

| Командование        | Описание                      | Информация                                                                           |
| ------------------- | ----------------------------- | ------------------------------------------------------------------------------------ |
| x.media.description | Описание отображаемого файла. |                                                                                      |
| x.media.isMuted     | Если звук отключен.           | Не все устройства поддерживают это, и в этом случае значение будет ложным.           |
| x.media.state       | Состояние СМИ.                | игра, пауза, бездействие                                                             |
| x.media.title       | Название отображаемого файла. |                                                                                      |
| x.media.type        | Тип отображаемого файла.      | Эпизод, Фильм, Аудио, Нет и т. д.                                                    |
| x.media.seasonName  | Название времени года         | Только если .media.type имеет значение Episode, в противном случае оно будет пустым. |
| x.media.seriesName  | Название сериала              | Только если .media.type имеет значение Episode, в противном случае оно будет пустым. |

### Команды

| Командование         | Описание                                                                       | Информация                                                                                            |
| -------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| x.command.dialog     | Отобразить диалоговое окно на выбранном устройстве.                            | Например: Заголовок\|Некоторый текст (если заголовок не указан, ioBroker будет иметь значение Header) |
| x.command.goHome     | Отправляет команду выбранному устройству, которое вернет вас на главный экран. |                                                                                                       |
| x.command.message    | Отобразить сообщение на выбранном устройстве в течение 5 секунд.               |                                                                                                       |
| x.command.play       | Plays Media                                                                    | Только если показ медиаконтента приостановлен.                                                        |
| x.command.pause      | Пауза медиафайлов                                                              | Только если СМИ играют                                                                                |
| x.command.toggleplay | Переключатели состояния игры                                                   | воспроизведение/пауза                                                                                 |
| x.command.mute       | Отключает звук устройства                                                      |                                                                                                       |
| x.command.unmute     | Включает звук устройства                                                       |                                                                                                       |
| x.command.togglemute | Включает/выключает звук устройства                                             |                                                                                                       |
| x.command.volume     | Устанавливает громкость выбранного устройства.                                 | Не работает на большинстве устройств, поскольку не регулирует громкость телевизора.                   |

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 1.3.0 (2026-03-03)
- (mcm1957) Adapter requires node.js >= 20 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (mcm1957) Dependencies have been updated

### 1.2.0 (2024-04-14)

* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.1.1 (2023-11-20)
-   (mcm1957) Dependencies have been updated.

### 1.1.0 (2023-11-20)
-   (mcm1957) Adapter requires nodejs 16 now.
-   (mcm1957) Adapter has been moved into iobroker-community-adapters oragnization.
-   (thewhobox) An error causing multiple 'undefined' messages has been fixed. [#23]
-   (mcm1957) Dependencies have been updated.

### 1.0.3
* Added more info for playing item

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.emby/blob/master/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2020-2023 thewhobox

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