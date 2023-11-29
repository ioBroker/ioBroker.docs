---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.emby/README.md
title: ioBroker.emby
hash: INRdcmfwjy/KRgXm0pGzm0o8bpzqAigeg04Yz3xEbbQ=
---
![Логотип](../../../en/adapterref/iobroker.emby/admin/emby.png)

![Лицензия GitHub](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.emby)
![Загрузки](https://img.shields.io/npm/dm/iobroker.emby.svg)
![Размер репозитория GitHub](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.emby)
![Действия по фиксации GitHub](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.emby)
![GitHub фиксирует с момента последнего выпуска (по дате)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.emby/latest)
![Последний коммит GitHub](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.emby)
![Проблемы с GitHub](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.emby)
![НПМ-версия](http://img.shields.io/npm/v/iobroker.emby.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/emby-stable.svg)
![Количество установок](https://iobroker.live/badges/emby-installed.svg)

# IoBroker.emby
[![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/emby/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br> </br> **Версия:** </br> </br> **Тесты:** </br> [![Тестирование и выпуск] (https://github.com/iobroker-community-adapters/ioBroker.emby/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.emby/actions/workflows/test-and-release.yml) [![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.emby/actions/workflows/codeql.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.emby/actions/workflows/codeql.yml)

<!--

## Sentry **Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Для получения более подробной информации и информации о том, как отключить отчеты об ошибках, см. [Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются начиная с js-controller 3.0.
-->
##EMBY Адаптер для ioBroker
Этот адаптер позволит вам подключиться к вашему серверу Emby и управлять им.

## Кредиты
Этот адаптер был бы невозможен без огромной работы @thewhobox <iobroker@mikegerst.de>, который написал первоначальные версии этого адаптера и передал их организации iobroker-community-adapters.

## Использование
Следуйте инструкциям, чтобы убедиться, что адаптер будет работать правильно и вы сможете видеть все устройства.

1. Отредактируйте настройки и введите IP, ApiKey и, возможно, некоторые идентификаторы устройств, которые вы хотите игнорировать.

```IP **with** Port => 192.168.0.100:8096```

2. Сохраните и перезапустите адаптер.

3. Чтобы увидеть первые элементы, вам нужно будет открыть клиент Emby и получить некоторые данные.

```The Adapter will not get Data if **no** client is open.```

## Объекты
### Информация
| Команда | Описание | Информация |
| ------------- | ------------- | ------------- |
| x.info.имяустройства | Показывает имя устройства | |
| x.info.имя_пользователя | Показывает имя пользователя, вошедшего в систему на устройстве | |
| x.info.supportedCommands | Список поддерживаемых команд | |

### СМИ
| Команда | Описание | Информация |
| ------------- | ------------- | ------------- |
| x.media.описание | Описание показанного файла. | |
| x.media.isMuted | Если звук мультимедиа отключен. | Не все устройства поддерживают это и будет иметь значение False. |
| x.media.state | Состояние СМИ. | игра, пауза, холостой ход |
| x.media.title | Название отображаемого файла. | |
| х.медиа.тип | Тип отображаемого файла. | Эпизод, Фильм, Аудио, Нет и т. д. |
| x.media. SeasonName | Название сезона | Только если .media.type имеет значение Episode, иначе он будет пустым. |
| x.media.seriesName | Название серии | Только если .media.type имеет значение Episode, иначе он будет пустым. |

### Команды
| Команда | Описание | Информация |
| ------------- | ------------- | ------------- |
| x.command.диалог | Показать диалоговое окно на выбранном устройстве. | Например: Заголовок\|Некоторый текст (если заголовок не указан, ioBroker будет заголовком) |
| x.command.goГлавная | Отправляет команду выбранному устройству, которая возвращается на главный экран | |
| x.command.message | Показывать сообщение на выбранном устройстве в течение 5 сек. | |
| x.command.play | Играет Медиа | Только если медиа приостановлено |
| x.command.pause | Пауза Медиа | Только если воспроизводится медиа |
| x.command.toggleplay | Переключает Playstate | воспроизведение/пауза |
| x.command.mute | Отключает звук устройства | |
| x.command.включить звук | Включает звук устройства | |
| x.command.togglemute | Включает отключение звука устройства | |
| x.command.volume | Устанавливает громкость выбранного устройства. | Не работает на большинстве устройств, поскольку не контролирует громкость телевизора. |

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.1.1 (2023-11-20)
-   (mcm1957) Dependencies have been updated.

### 1.1.0 (2023-11-20)
-   (mcm1957) Adapter requires nodejs 16 now.
-   (mcm1957) Adapter has been moved into iobroker-community-adapters oragnization.
-   (thewhobox) An error causing multiple 'undefined' messages has been fixed. [#23]
-   (mcm1957) Dependencies have been updated.

### 1.0.3
* Added more info for playing item

### 1.0.0
* First stable public release
* Added support for Https and Http
* Added Url to Posters
* Added Datapoint for Endtime (hh:mm)

### 0.1.2
* Added more commands

### 0.1.1
* Added delay if you watch mor episodes

### 0.1.0
* Added automatic try reconnect after one minute

### 0.0.4
* added compact mode

### 0.0.3
* added new states, connection state and more improvment

### 0.0.2
* added more states
* added DisplayMessage

### 0.0.1
* Initial version

## License

MIT License

Copyright (c) 2023 iobroker-community-adapters
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