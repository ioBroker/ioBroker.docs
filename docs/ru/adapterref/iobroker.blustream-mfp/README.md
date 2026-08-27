---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.blustream-mfp/README.md
title: ioBroker.blustream-mfp
hash: GOE2l5vKMvW0cK2w1FaUos8IlQIlEMoNwepUG5JLe4M=
---
# IoBroker.blustream-mfp

![Версия NPM](https://img.shields.io/npm/v/iobroker.blustream-mfp.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.blustream-mfp.svg)
![Количество установок](https://iobroker.live/badges/blustream-mfp-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/blustream-mfp-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.blustream-mfp.png?downloads=true)

**Тесты:** ![Тестирование и выпуск](https://github.com/AlanSRU/ioBroker.blustream-mfp/workflows/Test%20and%20Release/badge.svg)

## Адаптер Blustream AV Switcher для ioBroker
Управляйте AV-микшерами Blustream серий AMF/MFP/WMF через последовательный интерфейс RS232 или IP/Telnet-соединение.

### Поддерживаемые устройства
| Модель | Описание | Подключение |
|-------|-------------|------------|
| **AMF42AU** | Усовершенствованный многоформатный коммутатор 4x2 | IP (Telnet) |
| **MFP62** | Многоформатный презентационный коммутатор 6x2 4K | IP (Telnet) |
| **MFP72** | Многоформатный презентационный коммутатор 4x2 | RS232 / IP |
| **MFP112** | Многоформатный презентационный коммутатор 5x2 с поддержкой HDBaseT | IP (Telnet) |
| **WMF51** | Беспроводной медиапрезентер | IP (Telnet) |
| **WMF72** | Беспроводной медиапрезентер с двумя дисплеями | IP (Telnet) |
| **C66 / C88** | Матрица HDBaseT 6x6 / 8x8 для подрядчиков | RS232 / IP |

**Расширенный функционал (v0.5.3) — маршрутизация, включение вывода, PoC и предустановки:**

| Семейство | Модели | Тип |
|--------|--------|------|
| Подрядчик C (CSC) | C44-KIT, C44CS-KIT, C66CS, C88CS | Матрица HDBaseT |
| ХМХЛ | HMXL42ARC, HMXL44CS, HMXL44ARC, HMXL66ARC, HMXL88ARC, HMXL88-V2 | HDBaseT-матрица |
| HMX 18G | HMX44-18G-KIT, HMX88-18G | Матрица HDBaseT 3.0 |
| Платина (PLA) | PLA88CS, PLA88ARC-V2, PLA88L-V2 | Матрица HDBaseT |
| Pro / Custom-Pro | PRO48HBT70(CS), PRO88HBT70CS, PRO88HDMI-V2, PRO16HBT70CS, CUSTOMPRO-HUB, CUSTOMPRO-HUB16 | Матрица HDBaseT (до 16x16 / модульная) |
| CMX (HDMI) | CMX42CS, CMX44CS-V2, CMX44AB, CMX88CS, CMX88AB | HDMI-матрица |
| MX (HDMI) | MX22AB-8K, MX44AB-V2 | HDMI-матрица |
| SW-коммутаторы | SW41HDBT, SW41AB-V2, SW41AB-8K, SW42DA, SW21AB-V2, SW21AB-V3 | HDMI / HDBaseT коммутатор |
| Видеостена / Многооконный режим | MX44VW, MX44AVW, MV41 | режим/маршрутизация/рамка/MV-аудио + выбор входа HDMI/VGA |
| USB / KVM | MX44KVM | Маршрутизация USB хост↔устройство + предустановки |

Эти семейства также получают **управление EDID** (все матрицы), **управление CEC** (HMX-18G, SW41HDBT) и **аудио** (аудиоматрица HMX-18G; встраивание/отключение звука Pro-Matrix). Аудио CMX/MX следует за видеовыходом (отдельного управления нет). **Обратная связь по состоянию (считывание) анализируется** для каждого семейства фиксированной ширины — маршрутизация, разрешение вывода, PoC, CEC, EDID, аудиоматрица, сеть, режим видеостены и мастер-аудио SW42DA Dante — на основе реальных захватов устройства. MX44KVM имеет собственный формат ответа, из которого считываются маршрутизация хоста, режимы GPIO и каскадирование USB (его сетевая таблица не считывается). Единственное исключение — **MV41**, заголовки STATUS которого не имеют разделителей столбцов. Пока не поддерживаются: **AMF41W** (отдельный API командной строки Linux), **MFP31** и **SW12USB** (документация отсутствует); расширенные функции PIP/поворота экрана MX44AVW и MV41 являются предварительными. См. `MODEL-EXPANSION-PLAN.md`.

Для получения дополнительной информации о продукции Blustream посетите [Блустрим](https://www.blustream.co.uk/).

## Установка
Установите адаптер через административный интерфейс ioBroker (Адаптеры → найдите "blustream").

## Конфигурация
### Настройки подключения
Адаптер поддерживает два типа подключения:

#### IP-соединение (Телнет)
- **IP-адрес**: IP-адрес вашего устройства Blustream.
- **Порт**: TCP-порт (по умолчанию: 23 для Telnet)
- **Согласование Telnet IAC**: Включите, если ваше устройство использует согласование протокола Telnet.

#### Последовательное соединение RS232
- **Последовательный порт**: Путь к последовательному устройству (например, `/dev/ttyUSB0` в Linux, `COM3` в Windows)
- **Скорость передачи данных**: скорость последовательной связи (обычно 57600 для серии МФУ)

### Модель устройства
Выберите конкретную модель вашего устройства Blustream из выпадающего списка. Адаптер автоматически настроит доступные состояния и элементы управления в соответствии с возможностями выбранной модели.

### Опрос
- **Интервал опроса**: Как часто запрашивать у устройства информацию о состоянии (в миллисекундах, по умолчанию: 30000)
- **Интервал переподключения**: Время между попытками переподключения в случае потери соединения (в миллисекундах, по умолчанию: 10000)

## Штаты и контроль
Адаптер динамически создает состояния в зависимости от выбранной модели устройства. К распространенным состояниям относятся:

### Информация (`info.*`)
- `info.connection` - Состояние подключения устройства
- `info.model` - Идентификатор модели устройства

### Команды (`commands.*`)
- `commands.raw` - Отправлять необработанные команды на устройство
- `commands.getStatus` - Запрос текущего состояния устройства

### Управление выводом (`output.*`)
- `output.X.source` - Выберите источник входных данных для выходных данных X
- `output.X.enabled` - Включить/отключить вывод X
- `output.X.videoMute` - Отключает звук на выходе X

### Аудио (`audio.*`)
- `audio.volume` - Уровень общей громкости
- `audio.mute` - Полное отключение звука

### Управление системой (`system.*`)
- `system.power` - Включение/выключение питания
- `system.beep` - Включить/выключить звуковой сигнал кнопки
— И многое другое в зависимости от модели устройства...

### Сетевые настройки (`network.*`)
- `network.dhcp` - Включение/отключение DHCP
- `network.ip` - IP-адрес устройства
- `network.gateway` - Адрес шлюза
- `network.subnet` - Маска подсети

## Характеристики по моделям
| Характеристики | AMF42AU | MFP62 | MFP72 | MFP112 | WMF51 | WMF72 | C66 | C88 |
|---------|---------|-------|-------|--------|-------|-------|-----|-----|
| Сетевой контроль | Да | Да | - | Да | Да | Да | Да | Да |
| Управление по RS232 | - | - | Да | - | - | - | Да | Да |
| Матричная маршрутизация | - | - | - | - | - | - | Да | Да |
| Контроль CEC | Да | - | - | - | - | - | - | - |
| Микрофон | Да | Да | - | - | - | - | - | - |
| Предустановки | Да | - | - | - | - | - | Да | Да |
| Управление изображением | Да | - | - | - | - | - | - | - |
| Управление по Wi-Fi | - | - | - | - | Да | Да | - | - |
| Многооконный режим | - | - | - | - | Да | Да | - | - |
| HDBaseT | - | - | - | Да | - | - | Да | Да |
| PoC (на каждый выход) | - | - | - | - | - | - | Да | Да |

## Поиск неисправностей
### Проблемы с подключением
1. **Сбой подключения по IP-адресу**: Проверьте IP-адрес и порт. Убедитесь, что соединение не блокируется брандмауэром. Попробуйте отключить согласование Telnet IAC, если ваше устройство его не поддерживает.

2. **Сбой подключения RS232**: Проверьте путь к последовательному порту и скорость передачи данных. Убедитесь, что у вас есть права доступа к последовательному порту (в Linux добавьте своего пользователя в группу `dialout`).

3. **Команды не работают**: Некоторые устройства требуют небольшой задержки между командами. Адаптер обрабатывает это автоматически с помощью очереди команд.

### Режим отладки
Включите отладочное логирование в административной панели ioBroker, чтобы просмотреть подробную информацию о взаимодействии с устройством:

1. Перейдите в раздел «Экземпляры».
2. Щелкните по экземпляру адаптера.
3. Установите уровень логирования на "отладочный".

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 0.5.3 (2026-08-03)
* (Alan Paris) Added support for 39 further Blustream models, taking the total to 47: the HDBaseT matrices (C-series and C-CS, HMXL, HMX-18G, PLA/Platinum, Pro and Custom-Pro, up to 16x16), the HDMI matrices (CMX/MX), the SW-series HDMI and HDBaseT switchers, the video-wall and multi-view processors (MX44VW, MX44AVW, MV41) and the MX44KVM USB/KVM matrix
* (Alan Paris) Routing, output enable, PoC and preset recall now follow each model's own command form, so the differing firmware families (spaced `OUT 01 FR 04` versus `OUT01FR04`, the three PoC verbs, single-output switches without an output index) are each addressed correctly
* (Alan Paris) Added per-input EDID management on all matrices, CEC actions on the HMX-18G and SW41HDBT, the HMX-18G audio matrix, Pro-Matrix audio embedding, video-wall mode and bezel compensation, and USB routing on the MX44KVM
* (Alan Paris) Device status read-back is now parsed per model family from the fixed-width STATUS/INSTA/OUTSTA/CTRLSTA/AUDSTA tables, matching columns by header name so power, routing, output enable, PoC, CEC, EDID, audio, network and video-wall values are reflected in the states. Unrecognised tables are ignored rather than guessed at
* (Alan Paris) Added the device command references and the captured status replies used to build the parser under `protocols/`, plus unit tests that replay every capture
* (Alan Paris) Pre-release review fixes: EDID commands now use each model's own spacing (the CMX/MX matrices document only the unspaced form); command confirmations naming an output the model does not have no longer create a stray state; status replies whose divider is prefixed by the device prompt (MX44VW/MX44AVW) no longer stall the command queue or grow the captured-response buffer without limit; a status column reported as `N/A` now leaves its state untouched instead of writing "off"; and stopping the instance no longer schedules a reconnect after shutdown

### 0.5.2 (2026-08-03)
* (Alan Paris) Fixed the state tree keeping the previous model's controls after the device model was changed: the internal model-change check compared the model against a value the adapter had just overwritten, so the cleanup never ran. An MFP112 configured after the default MFP72, for example, was left without the HDBaseT input on `output.N.source`
* (Alan Paris) Existing instances repair themselves on first start after the update: a new `info.stateSchema` state records the layout version of the state tree, and the tree is rebuilt once when it is out of date. State values are repopulated by the next device poll. Note that the rebuild recreates the objects, so any per-state history/logging settings on the adapter's states have to be reapplied
* (Alan Paris) The WiFi password is no longer stored in clear text in `info.lastSent` or written to the debug log when it is set
* (Alan Paris) Device responses reporting an output number the configured model does not have (including an echo of the route-all command) no longer create a stray output state
* (Alan Paris) Corrected the documented state list and the per-model feature table in the README, and added the missing `system` parent object

### 0.5.1 (2026-07-16)
* (Alan Paris) Every state object now defines a default (`def`) value, so states have a defined initial value before the first device poll
* (Alan Paris) Admin config: all device-model descriptions and option labels are now translatable and provided in all 11 ioBroker languages

### 0.5.0 (2026-07-16)
* (Alan Paris) Added support for the Blustream C66 (6x6) and C88 (8x8) Contractor HDBaseT matrices: crosspoint routing across up to 8 outputs, route-all (`output.allSource`), per-output enable, per-output PoC, and 9 presets
* (Alan Paris) Added a dedicated parser for the C66/C88 fixed-width STATUS/OUTSTA tables and the `[SUCCESS]`/`[FAIL]` command confirmations, so routing, enable, PoC and network states reflect the device
* (Alan Paris) Scaler, resolution and audio states are no longer created for the C66/C88 crosspoint matrices (they have no scaler/audio path), so the object tree only exposes controls the device actually implements
* (Alan Paris) Added `protocols/c66.txt` documenting the C66/C88 RS-232 / Telnet command set (verified against FW V1.0.1d)

### 0.4.2 (2026-07-04)
* (Alan Paris) WiFi password state is now write-only (`read: false`) so the value cannot be read back from the object tree once set
* (Alan Paris) Removed the accidentally committed npm pack artifact (`.tgz`) from the repository

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 Alan Paris <alan.paris@scottish.rugby>

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