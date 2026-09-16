---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.heos/README.md
title: ioBroker.heos
hash: mbV2UYF6gDlLGjFs3rWtlbbHSw0cDuEDOz7Rr073IwA=
---
![Логотип](../../../en/adapterref/iobroker.heos/admin/heos.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.heos.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.heos.svg)
![Количество установок (последние)](http://iobroker.live/badges/heos-installed.svg)
![Количество установок (стабильных)](http://iobroker.live/badges/heos-stable.svg)
![Статус зависимости](https://img.shields.io/david/withstu/iobroker.heos.svg)
![Известные уязвимости](https://snyk.io/test/github/withstu/ioBroker.heos/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.heos.png?downloads=true)

# ioBroker.heos

Этот адаптер позволяет управлять HEOS из ioBroker.

## Отказ от ответственности

HEOS, DENON и Marantz являются товарными знаками D\&M Holdings Inc. Разработчики данного модуля никоим образом не поддерживают и не связаны с D\&M Holdings Inc., а также с какими-либо связанными с ней дочерними компаниями, логотипами или товарными знаками.

## Ссылка

Используемый API HEOS описан здесь: <https://rn.dmglobal.com/euheos/HEOS_CLI_ProtocolSpecification_2021.pdf>

## Требования к сети

Протокол SSDP используется для поиска игроков. UPnP требует многоадресного доступа к адресу 239.255.255.250:1900 вместе с соответствующими сообщениями IGMP. Порт источника для приема сообщений SSDP можно настроить в параметрах адаптера (по умолчанию используется значение по умолчанию).`0` (Это означает, что порт выбирается автоматически). Дополнительная информация: <https://support.denon.com/app/answers/detail/a_id/4717/~/network-requirements-for-heos> Для доступа к API плееров HEOS адаптер использует этот порт.`1255` .

## Конфигурация

- **Автовоспроизведение** : Автоматически воспроизводит музыку после подключения плеера или включения звука. Может быть настроено глобально в конфигурации. Если включено глобально, вы можете отключить его для конкретного плеера с помощью параметра состояния.`auto_play` .
- **Область действия команды** : определяет, к каким игрокам применяется команда.`scope/[cmd]` Состояние команды, на которое отправляется сообщение, может быть отправлено всем игрокам, всем ведущим игрокам или всем PID-идентификаторам в состоянии, разделенном запятыми:`heos.0.command_scope_pid`
- **Функция отключения звука на основе регулярного выражения** : В настройках можно активировать функцию отключения звука плеера на основе совпадения с регулярным выражением в информации о песне. Это можно использовать для автоматического отключения рекламы. Например, для Spotify можно использовать следующее регулярное выражение:`spotify:ad:|Advertisement` .
- **ignore\_broadcast\_cmd** : Этот параметр состояния проигрывателя определяет, должен ли проигрыватель игнорировать команды, отправляемые всем проигрывателям, например, player/set\_mute\&state=on, или нажатие кнопки воспроизведения для предустановок/плейлистов.

## Государства и их значение

### Командное государство

Управлять плеером HEOS можно с помощью различных состояний плеера. Для более продвинутого управления плеерами можно использовать состояние команды. С одной стороны, существует одно глобальное состояние команды (heos.0.command) для управления всем адаптером или несколькими плеерами одной командой. С другой стороны, существует состояние команды для каждого плеера отдельно.

#### Состояние команды HEOS (heos.0.command)

- `system/connect` Попробуйте подключиться к HEOS.
- `system/disconnect` Отключитесь от HEOS
- `system/reconnect` Отключите и подключите
- `system/load_sources` Перезагрузить источники
- `system/reboot` Перезагрузите подключенный плеер.
- `system/reboot_all` Перезагрузите всех игроков.
- `group/set_group?pid=<pid1>,<pid2>,...` : Установить группу со списком идентификаторов игроков, например`group/set_group?pid=12345678,12345679` .
- `group/set_group?pid=<pid1>` : Удалить существующую группу, например, "group/set\_group?pid=12345678"
- `group/ungroup_all` Удалить все группы
- `group/group_all` Объедините всех игроков в одну группу.
- `player/[cmd]` Отправьте команду всем игрокам. Например: player/set\_mute\&state=on
- `leader/[cmd]` Отправьте команду всем ведущим игрокам. Например: leader/set\_mute\&state=on
- `scope/[cmd]` : Отправьте команду в указанную область видимости всем игрокам, игрокам, указанным в начале списка, или игрокам с идентификаторами, разделенными запятыми, в поле scope\_pids.
- `...` Все остальные команды пытаются отправить в HEOS (подробности см. в PDF-файле с описанием API HEOS).

#### Состояние команды игрока (heos.0.players.123456789.command)

Примечание: Возможно использование нескольких команд, если они разделены символом вертикальной черты, например: set\_volume\&level=20|play\_preset\&preset=1

- `set_volume?level=0|1|..|100` Установите громкость проигрывателя.
- `set_play_state?state=play|pause|stop` : Установить состояние игрока
- `set_play_mode?repeat=on_all|on_one|off&shuffle=on|off` Установите режим повтора и перемешивания.
- `set_mute?state=on|off` : Отключить звук у плеера
- `volume_down?step=1..10` : Меньший объем
- `volume_up?step=1..10` : Увеличьте громкость
- `play_next` : Воспроизвести далее
- `play_previous` : Воспроизвести предыдущую запись
- `play_preset?preset=1|2|..|n` : Воспроизвести предустановку n
- `play_stream?url=url_path` : Воспроизвести URL-поток
- `add_to_queue?sid=1025&aid=4&cid=[CID]` Воспроизвести плейлист с \[CID] на плеере (подсказки: 1 – воспроизвести сейчас; 2 – воспроизвести следующий; 3 – добавить в конец; 4 – заменить и воспроизвести)

### Пресеты и плейлисты

Каждый источник, например, предустановки/избранное или плейлисты, находится в папке состояния источников.`heos.0.sources` Ваши пресеты/избранное можно найти в подпапке с ID 1028, а плейлисты — в подпапке с ID 1025. Изначально адаптер не создает ваши индивидуальные пресеты и плейлисты, поскольку для запуска обновления необходимо установить следующие состояния в значение true:

- Предустановки/Избранное:`heos.0.sources.1028.browse`
- Плейлисты:`heos.0.sources.1025.browse` После этого адаптер создает состояния для предустановок или плейлистов, чтобы вы могли легко воспроизводить предустановку на всех плеерах.

### Извлечение цвета изображения

В версии 1.7.6 основные цвета обложки песни извлекаются и сохраняются в трех новых состояниях проигрывателя:

- **current\_image\_color\_palette** : Основные цвета, выбранные с помощью node-vibrant.
- **current\_image\_color\_background** : Цвет с наибольшим количеством элементов на изображении. Может использоваться в качестве фонового цвета для элементов управления проигрывателя в VIS.
- **current\_image\_color\_foreground** : Цвет, занимающий второе место по численности на изображении и обладающий хорошим контрастом по отношению к цвету фона. Может использоваться в качестве цвета текста для элементов управления проигрывателя в VIS.

## Искать

Функция перемотки работает не на всех источниках. Spotify и Amazon Music поддерживают перемотку.

## СкажиЭто

[Адаптер SayIt](https://github.com/ioBroker/ioBroker.sayit) поддерживается.

![Сайит](docs/media/sayit.png)![Sayit Config](../../../en/adapterref/iobroker.heos/docs/media/sayit-config.png)

## Материальный пользовательский интерфейс

Поддерживается [адаптер Material UI](https://github.com/ioBroker/ioBroker.material) .

![Материал](../../../en/adapterref/iobroker.heos/docs/media/material-ui.png)

## ВИС

### Установка

- Создайте следующие строковые состояния:
  - 0\_userdata.0.heos.queue\_pid
  - 0\_userdata.0.heos.queue\_html
  - 0\_userdata.0.heos.browse\_result\_html

### Вид игрока

- Откройте файл: [player\_view.json](https://github.com/withstu/ioBroker.heos/blob/main/docs/vis/views/player_view.json)
- Замените 123456789 на PID игрока.
- Импортируйте представление в VIS

![Вид игрока](../../../en/adapterref/iobroker.heos/docs/media/player-view.png)

### Предустановки

- Нажмите кнопку`heos.0.sources.1028.browse` для загрузки предустановок
- Откройте файл: [presets\_view.json](https://github.com/withstu/ioBroker.heos/blob/main/docs/vis/views/presets_view.json)
- Импортируйте представление в VIS

![Конфигурация предустановок](docs/media/presets-config.png)![Предустановки](../../../en/adapterref/iobroker.heos/docs/media/presets.png)

### Очередь

- Виджет очереди: [queue\_player\_widget.json](https://github.com/withstu/ioBroker.heos/blob/main/docs/vis/views/queue_player_widget.json)
- Просмотр очереди: [queue\_view.json](https://github.com/withstu/ioBroker.heos/blob/main/docs/vis/views/queue_view.json)
- Скрипт генерации HTML-очереди: [queue.js](https://github.com/withstu/ioBroker.heos/blob/main/docs/vis/scripts/queue.js)

![Виджет очереди](../../../en/adapterref/iobroker.heos/docs/media/queue-widget.png)

### Просмотреть источники

- Виджет просмотра: [browse\_player\_widget.json](https://github.com/withstu/ioBroker.heos/blob/main/docs/vis/views/browse_player_widget.json)
- Просмотр: [browse\_view.json](https://github.com/withstu/ioBroker.heos/blob/main/docs/vis/views/browse_view.json)
- Скрипт генерации HTML-кода для просмотра: [browser.js](https://github.com/withstu/ioBroker.heos/blob/main/docs/vis/scripts/browse.js)

![Просмотреть виджет](docs/media/browse-widget.png)![Просмотрите источники](docs/media/browse-sources.png)![Просмотрите меню на TuneIn](../../../en/adapterref/iobroker.heos/docs/media/browse-tunein.png)

В качестве альтернативы можно использовать скрипт от Uhula: <https://forum.iobroker.net/post/498779>

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 3.2.2 (2026-08-19)
* (withstu) Fix repository checker findings

### 3.2.1 (2026-08-19)
* (withstu) Package update
* (withstu) Improve number casting

### 3.2.0 (2026-08-12)
* (withstu) add flag to disable SSDP discovery
* (withstu) fixing iobroker checks

### 3.1.0 (2026-07-28)
* (withstu) improve error handling for sign in if webservice unreachable

### 3.0.5 (2026-07-28)
* (copilot) Adapter requires node.js >= 22 now
* (withstu) improve error handling for sign in if webservice unreachable

[Older changelogs can be found there](https://github.com/withstu/ioBroker.heos/blob/main/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025-2026 withstu <withstu@gmx.de>

derived from https://forum.iobroker.net/topic/10420/vorlage-denon-heos-script by Uwe Uhula
TTS derived from https://github.com/ioBroker/ioBroker.sonos

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