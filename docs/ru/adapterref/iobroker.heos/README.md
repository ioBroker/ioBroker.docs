---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.heos/README.md
title: ioBroker.heos
hash: +hjK3Ue0UTEq7DAn+u3QyfM/S4vt79Vc1I3osWbejIc=
---
![Логотип](../../../en/adapterref/iobroker.heos/admin/heos.png)

![версия NPM](http://img.shields.io/npm/v/iobroker.heos.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.heos.svg)
![Количество установок (последние)](http://iobroker.live/badges/heos-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/heos-stable.svg)
![Статус зависимости](https://img.shields.io/david/withstu/iobroker.heos.svg)
![Известные уязвимости](https://snyk.io/test/github/withstu/ioBroker.heos/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.heos.png?downloads=true)

# IoBroker.heos
Адаптер позволяет управлять HEOS от ioBroker.

## Отказ от ответственности
HEOS, DENON и Marantz являются товарными знаками D&M Holdings Inc.
Разработчики этого модуля никоим образом не одобрены и не связаны с D&M Holdings Inc. или какими-либо связанными дочерними компаниями, логотипами или товарными знаками.

## Ссылка
Используемый API HEOS задокументирован здесь: https://rn.dmglobal.com/euheos/HEOS_CLI_ProtocolSpecification_2021.pdf

## Требования к сети
Для поиска игроков используется протокол SSDP. UPnP требует многоадресного доступа к 239.255.255.250:1900 вместе с соответствующими сообщениями IGMP. Исходный порт для получения сообщений SSDP можно настроить в настройках адаптера (настройка по умолчанию — ```0``` означает, что порт выбирается автоматически). Дополнительные сведения: https://support.denon.com/app/answers/detail/a_id/4717/~/network-requirements-for-heos Для доступа API к проигрывателям HEOS адаптер использует порт ```1255``` .

## Конфигурация
* **AutoPlay**: автоматическое воспроизведение музыки после подключения плеера или при включении звука. Можно настроить глобально в конфигурации. Если он включен глобально, вы можете отключить его для одного конкретного игрока с состоянием ```auto_play```.
* **Область действия команды**: определяет, каким игрокам будет отправлена команда ```scope/[cmd]``` состояния команды. Его можно отправить всем игрокам, всем ведущим игрокам или всем PID в состоянии, разделенном запятыми: ```heos.0.command_scope_pid```
* **Отключить регулярное выражение**:

В конфигурации вы можете активировать функцию отключения звука проигрывателя на основе совпадения регулярного выражения с информацией о песне. Это можно использовать для автоматического отключения рекламы. Например, для Spotify вы можете использовать следующее регулярное выражение: ```spotify:ad:|Advertisement```.

* **ignore_broadcast_cmd**: Это состояние игрока настраивает, должен ли игрок игнорировать команды для всех игроков, например. player/set_mute&state=on или нажатие кнопки воспроизведения для пресетов/списков воспроизведения

## Состояния и их значения
### Состояние команды
Проигрыватель HEOS может управляться различными состояниями проигрывателя. Чтобы управлять игроками более продвинутым способом, вы можете использовать командное состояние. С одной стороны, есть одно глобальное состояние команды (heos.0.command) для управления всем адаптером или несколькими игроками с помощью одной команды. С другой стороны, есть командное состояние для каждого игрока.

#### Состояние команды HEOS (heos.0.command)
* ```system/connect```: попытаться подключиться к HEOS
* ```system/disconnect```: отключиться от HEOS.
* ```system/reconnect```: отключить и подключить
* ```system/load_sources```: Перезагрузить исходники
* ```system/reboot```: перезагрузить подключенный плеер
* ```system/reboot_all```: перезагрузить всех игроков
* ```group/set_group?pid=<pid1>,<pid2>,...```: Установить группу со списком идентификаторов игроков, например. ```группа/set_group?pid=12345678,12345679```.
* ```group/set_group?pid=<pid1>```: Удалить существующую группу, например. "группа/set_group?pid=12345678"
* ```group/ungroup_all```: Удалить все группы
* ```group/group_all```: Объединить всех игроков в одну группу.
* ```player/[cmd]```: отправить команду всем игрокам. например player/set_mute&state=on
* ```leader/[cmd]```: отправить команду всем ведущим игрокам. например лидер/set_mute&state=on
* ```scope/[cmd]```: отправить команду в настроенную область действия всем игрокам, ведущим игрокам или идентификаторам игроков, разделенным запятыми, в scope_pids.
* ```...```: все остальные команды пытаются отправить в HEOS (подробности см. в PDF-файле HEOS API)

#### Состояние команды игрока (heos.0.players.123456789.command)
Примечание. Возможны несколько команд, если они разделены вертикальной чертой, например. set_volume&level=20|play_preset&preset=1

* ```set_volume?level=0|1|..|100```: установить громкость плеера
* ```set_play_state?state=play|pause|stop```: Установить состояние игрока
* ```set_play_mode?repeat=on_all|on_one|off&shuffle=on|off```: Установить режим повтора и случайного воспроизведения.
* ```set_mute?state=on|off```: Отключить звук игрока
* ```volume_down?step=1..10```: Уменьшить громкость
* ```volume_up?step=1..10```: Увеличить громкость
* ```play_next```: Воспроизвести следующее
* ```play_previous```: Воспроизвести предыдущий
* ```play_preset?preset=1|2|..|n```: Воспроизвести пресет n
* ```play_stream?url=url_path```: Воспроизведение URL-потока
* ```add_to_queue?sid=1025&aid=4&cid=[CID]```: Воспроизвести плейлист с [CID] на плеере (помощь: 1 – воспроизвести сейчас; 2 – воспроизвести дальше; 3 – добавить в конец; 4 – заменить и играть)

### Пресеты и плейлисты
Каждый источник, например. пресеты/избранные или списки воспроизведения находятся в папке исходного состояния (```heos.0.sources```). Вы можете найти свои пресеты/фавориты в подпапке с идентификатором 1028 и списки воспроизведения в подпапке с идентификатором 1025. Первоначально адаптер не создает ваши индивидуальные пресеты и списки воспроизведения, потому что вы должны инициировать обновление, установив следующие состояния к истине:

- Предустановки/Избранное: ```heos.0.sources.1028.browse```
- Плейлисты: ```heos.0.sources.1025.browse```

После этого адаптер создает состояния для пресетов или списков воспроизведения, чтобы вы могли легко воспроизводить пресет на всех проигрывателях.

### Извлечение цвета изображения
В версии 1.7.6 основные цвета обложки песни извлекаются и сохраняются в трех новых состояниях игрока:

* **current_image_color_palette**: яркие цвета, выбранные узлом-яркостью.
* **current_image_color_background**: Цвет с наибольшей плотностью изображения. Может использоваться в качестве цвета фона для элементов управления плеером в VIS.
* **current_image_color_foreground**: цвет со второй по величине плотностью на изображении и хорошим контрастом для чтения по отношению к фоновому цвету. Может использоваться как цвет текста для элементов управления плеером в VIS.

## Искать
Функция поиска работает не на всех источниках. Spotify и Amazon Music поддерживают поиск.

## Скажи это
[Адаптер SayIt](https://github.com/ioBroker/ioBroker.sayit) поддерживается.

![Скажи это](docs/media/sayit.png) ![Саит Конфиг](../../../en/adapterref/iobroker.heos/docs/media/sayit-config.png)

## Материал пользовательского интерфейса
[Адаптер интерфейса материала](https://github.com/ioBroker/ioBroker.material) поддерживается.

![Материал](../../../en/adapterref/iobroker.heos/docs/media/material-ui.png)

## ВИС
### Монтаж
* Создайте следующие строковые состояния:
    * 0_userdata.0.heos.queue_pid
    * 0_userdata.0.heos.queue_html
    * 0_userdata.0.heos.browse_result_html

### Просмотр игрока
* Откройте файл: [player_view.json](docs/vis/views/player_view.json)
* Замените 123456789 на идентификатор игрока
* Импорт вида в VIS

![Вид игрока](../../../en/adapterref/iobroker.heos/docs/media/player-view.png)

### Пресеты
* Нажмите кнопку «heos.0.sources.1028.browse», чтобы загрузить пресеты.
* Откройте файл: [presets_view.json](docs/vis/views/presets_view.json)
* Импорт вида в VIS

![Конфигурация пресетов](docs/media/presets-config.png) ![Пресеты](../../../en/adapterref/iobroker.heos/docs/media/presets.png)

### Очередь
* Виджет очереди: [queue_player_widget.json](docs/vis/views/queue_player_widget.json)
* Представление очереди: [queue_view.json](docs/vis/views/queue_view.json)
* Скрипт генерации HTML очереди: [queue.js](docs/vis/scripts/queue.js)

![Виджет очереди](../../../en/adapterref/iobroker.heos/docs/media/queue-widget.png)

### Просмотр источников
* Виджет просмотра: [browse_player_widget.json](docs/vis/views/browse_player_widget.json)
* Обзор просмотра: [browse_view.json](docs/vis/views/browse_view.json)
* Просмотрите скрипт генерации HTML: [browse.js](docs/vis/scripts/browse.js)

![Обзор виджета](docs/media/browse-widget.png) ![Просмотр источников](docs/media/browse-sources.png) ![Просмотр мелодии](../../../en/adapterref/iobroker.heos/docs/media/browse-tunein.png)

Альтернативно можно использовать скрипт от Uhula: https://forum.iobroker.net/post/498779

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (withstu) optimize error handling

### 1.12.1 (2023-02-26)
* (withstu) optimize leader election

### 1.12.0 (2023-02-25)
* (withstu) optimize scope handling
* (withstu) switch to HEOS default cmd delimiter
* (withstu) add configuration to prefer list of IPs for adapter connection
* (withstu) optimize error handling

### 1.11.4 (2022-11-04)
* (withstu) improve play all button in browse feature

### 1.11.3 (2022-11-04)
* (withstu) update some dependencies
* (withstu) improve failure handling
* (withstu) improve play all button in browse feature

### 1.11.2 (2022-10-16)
* (withstu) adopt to new adapter structure

### 1.11.1 (2022-10-16)
* (withstu) fix release

### 1.11.0 (2022-10-16)
* (withstu) improve player failure detection
* (withstu) fix bug in regex mute
* (withstu) fix upnp NaN warning #192

### 1.10.0 (2022-06-16)
* (foxriver76) fix default value of `sid` (closes #174)

### 1.9.2 (2022-01-22)
* (withstu) add volume lock

### 1.9.1 (2021-08-17)
* (withstu) fix type issues
* (withstu) fix roles and repeat state

### 1.9.0 (2021-07-27)
* (stephanritscher) add option to configure udp source port

### 1.8.6 (2021-06-13)
* (withstu) test fixed pipeline

### 1.8.4 (2021-06-13)
* (withstu) improve stability

### 1.8.3 (2021-05-13)
* (withstu) fix upnp values on failure

### 1.8.2 (2021-05-12)
* (withstu) BREAKING: add queue paging
* (withstu) BREAKING: volume_max -> volume_limit
* (foxriver76) Fix type issues and some more minor changes

### 1.8.1 (2021-05-07)
* (withstu) fix reboot loop

### 1.8.0 (2021-04-24)
* (withstu) add reboot on failure configuration

### 1.7.9 (2021-04-07)
* (withstu) fix reboot
* (withstu) add power state

### 1.7.8 (2021-04-05)
* (withstu) add reboot

### 1.7.7 (2021-02-25)
* (withstu) add creation of missing version state

### 1.7.6 (2021-02-24)
* (withstu) add image color extraction

### 1.7.5 (2021-02-12)
* (withstu) add bit depth

### 1.7.4 (2021-02-01)
* (withstu) fix upnp init bug

### 1.7.3 (2021-02-01)
* (withstu) add upnp module and support bitrate, audio format and sample rate

### 1.7.2 (2021-01-30)
* (withstu) fix seek in groups

### 1.7.1 (2021-01-30)
* (withstu) add seek

### 1.7.0 (2021-01-29)
* (withstu) reboot not responding players
* (withstu) delete old presets and playlists

### 1.6.2 (2021-01-02)
* (withstu) fix "user not logged in" handling

### 1.6.1 (2020-11-25)
* (withstu) clear timeout and interval on unload; fix roles; remove sleep in tts module

### 1.6.0 (2020-11-22)
* (withstu) add regex mute

### 1.5.6 (2020-11-22)
* (withstu) add source images & optimize auto play

### 1.5.5 (2020-11-01)
* (withstu) update some packages and add sources event

### 1.5.4 (2020-10-24)
* (withstu) ignore invalid now playing responses

### 1.5.3 (2020-10-18)
* (withstu) minor improvements related to auto play feature

### 1.5.2 (2020-10-11)
* (withstu) improve tts stop method

### 1.5.1 (2020-10-11)
* (withstu) improve tts and don't update queue during tts

### 1.5.0 (2020-10-10)
* (withstu) add tts support and maximum volume

### 1.4.0 (2020-10-10)
* (withstu) add more play and queue settings
* (withstu) bugfixing for invalid heos responses (empty player name)

### 1.3.4 (2020-10-04)
* (withstu) remove sorting and available filter and fix browse play

### 1.3.3 (2020-10-04)
* (withstu) fix previous page button in browse feature

### 1.3.2 (2020-10-04)
* (withstu) fix preset sorting

### 1.3.1 (2020-10-03)
* (withstu) add back button to browse feature

### 1.3.0 (2020-10-03)
* (withstu) add queue and some browse improvements

### 1.2.4 (2020-09-29)
* (withstu) minor bugfix

### 1.2.3 (2020-09-29)
* (withstu) improve browse feature (add pictures and sources view)

### 1.2.2 (2020-09-28)
* (withstu) rename browse command

### 1.2.1 (2020-09-28)
* (withstu) introduce browse_result state

### 1.2.0 (2020-09-27)
* (withstu) Breaking change: restructure playlists/presets (you should delete the devices playlists, presets and sources before installation)

### 1.1.2 (2020-09-26)
* (withstu) log browse parameters

### 1.1.1 (2020-09-26)
* (withstu) add source browse feature (Click the button in the sources. You can find the possible next commands in the log.)

### 1.1.0 (2020-09-26)
* (withstu) encrypt password

### 1.0.1 (2020-09-21)
* (withstu) remove connected state, because it is included in the info channel

### 1.0.0 (2020-09-21)
* (withstu) initial release

## License
MIT License

Copyright (c) 2023 withstu <withstu@gmx.de>

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
