---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.emby/README.md
title: ioBroker.emby
hash: MROTHJDTdk8ju4arLWJfWpDbjAxU+5KpcaEXIyXf0A4=
---
![логотип](../../../en/adapterref/iobroker.emby/admin/emby.png)

![Статус сборки](https://travis-ci.org/thewhobox/ioBroker.emby.svg?branch=master)
![Количество установок](http://iobroker.live/badges/emby-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.emby.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.emby.svg)
![NPM](https://nodei.co/npm/iobroker.emby.png?downloads=true)

# IoBroker.emby
Этот адаптер позволит вам подключиться к вашему серверу Emby и управлять им.

Пожалуйста, следуйте инструкциям, чтобы убедиться, что адаптер работает правильно, и вы можете видеть все устройства.

## Шаги
1. Установите адаптер от Github

2. Отредактируйте настройки и введите IP, ApiKey и, возможно, некоторые идентификаторы устройств, которые вы хотите игнорировать.

```IP **with** Port => 192.168.0.100:8096```

3. Сохраните и перезапустите адаптер.

4. Чтобы увидеть первые предметы, вам нужно открыть Emby Client, чтобы получить некоторые данные.

```The Adapter will not get Data if **no** client is open.```

## Объекты
### Информация
| Команда | Описание | Информация |
| ------------- | ------------- | ------------- |
| x.info.deviceName | Показывает имя устройства | |
| x.info.userName | Показывает имя пользователя, вошедшего в систему на устройстве | |
| x.info.supportedCommands | Список поддерживаемых команд | |

### Средства массовой информации
| Команда | Описание | Информация |
| ------------- | ------------- | ------------- |
| x.media.description | Описание показанного файла. | |
| x.media.isMuted | Если СМИ отключены. | Не все устройства поддерживают это и будут ложными. |
| x.media.state | Состояние СМИ. | играет, остановился, простаивает |
| x.media.title | Название показанного файла. | |
| x.media.type | Тип показанного файла. | Эпизод, Кино, Аудио, Нет и т. Д. |
| x.media.seasonName | Название сезона | Только если .media.type - это Эпизод, иначе он будет пустым. |
| x.media.seriesName | Название серии | Только если .media.type - это Эпизод, иначе он будет пустым. |

### Команды
| Команда | Описание | Информация |
| ------------- | ------------- | ------------- |
| x.command.dialog | Показать диалог на выбранном устройстве. | Например: Header \ | Некоторый текст (если заголовок не указан, ioBroker будет Header) |
| x.command.goHome | Посылает команду на выбранное устройство, которое возвращается на главный экран | |
| x.command.message | Показать сообщение на выбранном устройстве в течение 5 секунд. | |
| x.command.play | Играет медиа | Только если СМИ приостановлены |
| x.command.pause | Пауза Медиа | Только если медиа играет |
| x.command.toggleplay | Toggles Playstate | играть / пауза |
| x.command.mute | Отключение устройства | |
| x.command.unmute | Включить звук устройства | |
| x.command.togglemute | Отключение звука устройства | |
| x.command.volume | Устанавливает громкость выбранного устройства. | Не работает на большинстве устройств, так как не контролирует громкость телевизора. |

## Changelog

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

Copyright (c) 2019 thewhobox

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