---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.wiim/README.md
title: ioBroker.wiim
hash: pfu2j7yodwtNQQwdEcU/cw3xliwnhGLoTD/cIikkpb8=
---
![Логотип](../../../en/adapterref/iobroker.wiim/admin/wiim.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.wiim.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.wiim.svg)
![Количество установок](https://iobroker.live/badges/wiim-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/wiim-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.wiim.png?downloads=true)
![Тестирование и выпуск](https://github.com/KaiIOB/ioBroker.wiim/workflows/Test%20and%20Release/badge.svg)

# ioBroker.wiim

## Адаптер Wiim для ioBroker

Адаптер для доступа к устройствам Wiim/Arylic и другим устройствам, использующим технологию потоковой передачи/мультирум Linkplay.

## поддерживаемые устройства

Адаптер был протестирован со следующими компонентами:

```
Wiim Amp 
Wiim Mini
Arylic up2stream v3
Arylic S10+
Audiocast M5
August WR320B (after firmware upgrade to 4.6.415156.0)
August WS350K
Audio Pro Addon C5A
Müzo Cobblestone
```

Устройства Wiim используют протокол HTTPS, устройства Arylic — протокол HTTP. По крайней мере одна функция (playPromptUrl) работает только с устройствами Arylic с прошивкой >=4.6.415145. В настоящее время реализованы только наиболее важные функции API. Пожалуйста, сообщите мне, если вам понадобятся другие функции.

Информацию об устройствах можно найти здесь:

WiiM: <https://www.wiimhome.com/wiimvibelink/overview> Arylic: <https://www.arylic.com/> Audiocast: <https://audiocast.io/> Примечание: Audicast M5 продается под многими разными брендами, я предполагаю, что все они работают с адаптером. August: <https://augustint.com/> Примечание: модель WR320B, похоже, снята с производства.

## Конфигурация адаптера

```
interval for refresh of player data in seconds: time between two requests for updated data
```

## Состояния и каналы управления

Адаптер автоматически создает состояния для каждого обнаруженного потокового устройства на базе WiiM, Arylic или Linkplay. Состояния делятся на состояния только для чтения метаданных и состояния управления чтением/записью.

### Метаданные и статус (только для чтения)

Эти состояния отражают текущую информацию о воспроизведении и аппаратные метрики, полученные с устройства.

| Удостоверение личности штата | Тип   | Роль           | Единица | Описание                                                                               |
| :--------------------------- | :---- | :------------- | :------ | :------------------------------------------------------------------------------------- |
| `artist`                     | нить  | `media.artist` | -       | Имя исполнителя, чья музыка играет в данный момент.                                    |
| `album`                      | нить  | `media.album`  | -       | Название текущего альбома.                                                             |
| `title`                      | нить  | `media.title`  | -       | Название текущего трека.                                                               |
| `albumArtURI`                | нить  | `media.cover`  | -       | HTTP-URL или URI, указывающий на обложку альбома.                                      |
| `mode`                       | нить  | `media.input`  | -       | Режим работы текущего источника звука (например, Bluetooth, Wi-Fi, линейный вход).     |
| `loop_mode`                  | число | `value`        | -       | Исходные числовые значения, возвращаемые оборудованием в режиме зацикливания/повтора.  |
| `sampleRate`                 | число | `value`        | Гц      | Частота дискретизации звука воспроизводимого в данный момент потока (например, 44100). |
| `bitDepth`                   | число | `value`        | кусочек | Битовая глубина аудиопотока (например, 16 или 24 бита).                                |
| `lastRefresh`                | нить  | `text`         | -       | Отметка времени последнего успешного обновления данных с устройства.                   |

### Управление воспроизведением (чтение/запись)

Используйте эти состояния для управления воспроизведением, маршрутизацией и системными параметрами ваших стримеров.

| Удостоверение личности штата | Тип        | Роль                     | Значения / Диапазон | Описание                                                                                                                                                                                                                           |
| :--------------------------- | :--------- | :----------------------- | :------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Play_Pause`                 | логический | `button`                 | курок               | Переключает режимы воспроизведения и паузы.                                                                                                                                                                                        |
| `next`                       | логический | `button`                 | курок               | Переход к следующему треку в очереди или плейлисте.                                                                                                                                                                                |
| `previous`                   | логический | `button`                 | курок               | Возвращается к предыдущему треку.                                                                                                                                                                                                  |
| `volume`                     | число      | `level.volume`           | `0` к `100` %        | Управляет общей громкостью устройства.                                                                                                                                                                                             |
| `loopmode`                   | число      | `level`                  | `0` к `5`            | Выберите нужный режим в выпадающем списке для повтора и перемешивания:<br>`0` Повторить всё<br>`1` Повторить один раз<br>`2` Перетасовка + Повтор<br>`3`: Перетасовка<br>`4`: Без повтора<br>`5` Перемешать + Повторить один раз |
| `jumptopos`                  | число      | `media.elapsed`          | РС                  | Перемещается в определенную позицию (в миллисекундах) в пределах текущей траектории.                                                                                                                                               |
| `play_preset`                | число      | `media.playid`           | целое число         | Запускает предварительно настроенный любимый слот, сохраненный в приложении WiiM/Arylic.                                                                                                                                           |
| `play_URL`                   | нить       | `media.url`              | строка URL          | Воспроизводит аудиопоток по прямому URL-адресу (например, ссылку на исходный mp3-файл по протоколу HTTP).                                                                                                                          |
| `playPromptUrl`              | нить       | `media.url.announcement` | строка URL          | Воспроизводит мгновенный звуковой сигнал или уведомление (например, для звуковых сигналов/синтеза речи).                                                                                                                           |
| `switchmode`                 | нить       | `media.input`            | режим ввода         | Изменяет активный входной канал вручную.                                                                                                                                                                                           |
| `setShutdown`                | число      | `level.timer`            | секунд              | Устанавливает встроенный таймер сна (в секундах), по истечении которого устройство выключается.                                                                                                                                    |

### Многокомнатная система и синхронизация (чтение/запись)

Управляйте группами устройств и синхронными зонами в нескольких комнатах напрямую.

| Удостоверение личности штата | Тип        | Роль     | Описание                                                                                                                       |
| :--------------------------- | :--------- | :------- | :----------------------------------------------------------------------------------------------------------------------------- |
| `setMaster`                  | нить       | `text`   | Введите целевой IP-адрес, чтобы подключить этот плеер в качестве участника группы многокомнатных подключений.                  |
| `leaveSyncGroup`             | логический | `button` | Приводит к мгновенному выходу устройства из текущей группы синхронизации мультирумов.                                          |
| `multiroom_slave_volume`     | нить       | `text`   | Регулирует относительные смещения громкости для активных многокомнатных экземпляров подчиненных устройств, формат "ip:volume". |
| `multiroom_slave_mute`       | нить       | `text`   | Включает или выключает звук у всех подключенных подчиненных клиентов в синхронизированной группе в формате "ip:0" или "ip:1".  |
| `multiroom_kickout`          | логический | `button` | Исключает предопределенный контекст устройства из активного дерева мультирумов.                                                |

## Changelog
<!-- Placeholder for the next version (at the beginning of the line): ### **WORK IN PROGRESS** -->
### 0.6.1 (2026-10-18)
Migration to seconds instead of ms, corrected bonjour name handling

### 0.6.0 (2026-10-06)
* (KaiIOB) Addition of most API features, code optimization

### 0.5.0 (2026-02-22)
* First release with frequent auto-detection of new streamers in network

### 0.4.3 (2026-02-04)
* corrections based on test feedback, simplyfied streamer detection, simplified state subscription, state roles corrected, r/w of state correted

### 0.4.1
* (KaiIOB) minor correction

For older releases, see CHANGELOG_OLD.md.

## License
MIT License

Copyright (c) 2025-2026 KaiIOB <Kaibrendel@kabelmail.de>

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