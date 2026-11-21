---
chapters: {"pages":{"en/adapterref/iobroker.faikout/README.md":{"title":{"en":"ioBroker.faikout"},"content":"en/adapterref/iobroker.faikout/README.md"},"en/adapterref/iobroker.faikout/vis-templates/README.md":{"title":{"en":"vis templates for ioBroker.faikout"},"content":"en/adapterref/iobroker.faikout/vis-templates/README.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.faikout/README.md
title: ioBroker.faikout
hash: tAkGEwvU31TCWSWTUtUhXAqkqZWQA09NLt0PoVWavZk=
---
![Логотип](../../../en/adapterref/iobroker.faikout/admin/faikout.png)

# ioBroker.faikout

Подключайте кондиционеры Daikin, оснащенные модулем [faikout](https://codeberg.org/RevK/ESP32-Faikout) , к ioBroker — исключительно через MQTT, полностью локально, без облака и без API от поставщика.

Адаптер поставляется **со своим собственным MQTT-брокером** . Вы просто настраиваете модули faikout на него, и всё; никакого отдельного брокера, никакого дополнительного оборудования. `mqtt` экземпляр адаптера и отсутствие помех для уже используемых вами настроек MQTT.

## Зачем нужен специальный адаптер?

Модуль faikout также эмулирует старый локальный HTTP API Daikin, поэтому его можно использовать с `daikin` адаптер. Однако по протоколу MQTT он предоставляет значительно больше возможностей — в частности, значения, которые HTTP API вообще не предоставляет:

| Ценить                                                 | HTTP (`daikin` адаптер) | MQTT (этот адаптер) |
| ------------------------------------------------------ | ----------------------- | ------------------- |
| Влажность воздуха в помещении                          | не сообщается           | да                  |
| Счетчики энергии (общая / отопление / охлаждение)      | не сообщается           | да                  |
| Потребляемая мощность в данный момент                  | не сообщается           | да                  |
| Скорость компрессора                                   | указано как 0           | да                  |
| скорость вентилятора                                   | не сообщается           | да                  |
| Температура хладагента                                 | не сообщается           | да                  |
| Ограничение спроса, угол наклона жалюзи, предустановки | не сообщается           | да                  |
| Диагностика Wi-Fi и устройств                          | только версия           | да                  |

## Точки данных создаются динамически.

Модуль faikout публикует поле только тогда, когда подключенный кондиционер действительно его поддерживает, а его собственные настройки могут скрывать другие поля. Поэтому **фиксированного списка полей нет** : адаптер создает именно те точки данных, которые получает, и молча пропускает остальные. Два устройства разных моделей вполне могут иметь разные деревья объектов.

Поля, которые адаптер еще не знает, все равно создаются, при этом тип определяется значением, и это отмечается в журнале.

Объекты сгруппированы по устройствам:

- `<device>.control.*` — доступны для записи: мощность, режим, целевая температура, вентилятор, качание, предустановка, по требованию, экономичный, мощный, комфорт, стример, датчик, светодиод, тихий, увлажнение. `selectedMode` Это режим работы без выключения: во время работы устройства он равен `mode` В выключенном состоянии он сохраняет последний установленный режим (взятый из собственного состояния модуля). Запись этого режима отправляет его и включает устройство.
- `mode`, `fan`, `swing` и `preset` Это текст, который модуль произносит. Каждый имеет цифровой аналог (`modeNum`, `fanNum`, `swingNum`, `presetNum`) с `common.states` такой как `{0: "off", 1: "heat_cool", 2: "cool", 3: "heat", 4: "dry", 5: "fan_only"}` Для Lovelace и других инструментов, которые ожидают числовые значения. Оба параметра доступны для записи и означают одно и то же: команда в любом из них отправляет ровно одну команду модулю (в виде текста); оба параметра устанавливаются с помощью `ack=true` Когда модуль подтвердит это. Числа фиксируются; новые значения из будущей прошивки добавляются.
- `<device>.status.*` — Показания: температура, влажность, энергия, мощность, скорость компрессора и вентилятора.
- `<device>.info.*` — Диагностика устройства: IP-адрес, сигнал Wi-Fi, время работы, прошивка

## Настраивать

1. Установите адаптер и откройте конфигурацию экземпляра.
2. Выберите порт брокера (по умолчанию). `1888`). Не должно возникать конфликтов с другим MQTT-брокером. При желании можно указать имя пользователя и пароль; если оставить поле имени пользователя пустым, будут приниматься неаутентифицированные соединения, что обычно происходит в домашней сети.
3. Откройте веб-интерфейс каждого модуля faikout, перейдите в **«Настройки» → «Основные»** и установите **хост MQTT** на `<ioBroker IP>:<port>` Модуль переподключается самостоятельно.

### Запуск ioBroker в Docker

Порт брокера должен быть опубликован контейнером, иначе модули не смогут к нему получить доступ. Добавьте сопоставление портов для настроенного порта.

### Настройки модуля для полного набора точек данных

То, что может отображать адаптер, зависит от настроек модуля faikout (веб-интерфейс, **Настройки** ; большинство из них находятся в разделе **«Расширенные** настройки»; в более старых версиях прошивки они пишутся без точки, например). `haenable`, `nohumidity` Вот наиболее важные из них:

| Параметр                                                                                                                | Требуемое значение               | Эффект                                                                                                                                                                                                                                                                                                                             |
| ----------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Хост MQTT** (базовый)                                                                                                 | `<ioBroker IP>:<port>`           | Подключает модуль к брокеру адаптера.                                                                                                                                                                                                                                                                                              |
| `ha.enable` («Домашний помощник»)                                                                                       | **включено** (по умолчанию)      | Модуль публикует список материалов для чтения (`state/<name>`) **только** пока эта функция включена. Выключено означает: только диагностика, нет отображения температуры, энергии, режима и т. д. — в этом случае адаптер регистрирует предупреждение.                                                                            |
| `ha.fanrpm`                                                                                                             | на (рекомендуется)               | скорость вентилятора `status.fanfreq` Вместо Гц (по умолчанию: Гц, один знак после запятой) используется частота вращения (об/мин). Адаптер определяет устройство самостоятельно (на основе обнаружения модуля в Home Assistant) и устанавливает для него соответствующее состояние; частота вращения (об/мин) просто более точная. |
| `ha.comprpm`                                                                                                            | на (рекомендуется)               | Скорость компрессора `status.comp` В оборотах в минуту вместо Гц (по умолчанию: Гц). Также определяется автоматически.                                                                                                                                                                                                              |
| `ha.switches`                                                                                                           | на                               | Добавляет `autoe` (главный переключатель собственной автоматизации модуля) к показаниям.                                                                                                                                                                                                                                            |
| `no.hvacaction`                                                                                                         | **выкл** (по умолчанию включено) | Добавляет `action` — что именно делает устройство (обогрев, охлаждение, режим ожидания…).                                                                                                                                                                                                                                           |
| `no.humidity`                                                                                                           | выключено (по умолчанию)         | Влажность `hum` Включайте его только в том случае, если устройство не имеет датчика влажности.                                                                                                                                                                                                                                      |
| `no.demand`                                                                                                             | выключено (по умолчанию)         | Лимит спроса `demand`.                                                                                                                                                                                                                                                                                                             |
| `no.led`                                                                                                                | **выкл** (по умолчанию включено) | Управление светодиодами — только если светодиод на дисплее устройства можно переключать.                                                                                                                                                                                                                                           |
| `no.humidify`                                                                                                           | выкл (по умолчанию включено)     | Управление увлажнителем — только для устройств, оснащенных увлажнителем.                                                                                                                                                                                                                                                           |
| другой `no.*` (`econo`, `powerful`, `comfort`, `streamer`, `quiet`, `sensor`, `swingv`, `swingh`, `flap`, `antifreeze`) | выключено (по умолчанию)         | Каждая из них скрывает соответствующую функцию. Включайте только те функции, которых действительно не хватает вашему устройству.                                                                                                                                                                                                   |
| `livestatus`                                                                                                            | на (рекомендуется)               | Сообщения поступают немедленно, а не каждый день. `reporting` секунд, см. ниже.                                                                                                                                                                                                                                                     |
| `reporting`                                                                                                             | 60 (по умолчанию)                | Интервал периодического отчета в секундах.                                                                                                                                                                                                                                                                                         |

Для отображения счетчиков энергии, потребляемой мощности, скорости компрессора и вентилятора, температуры хладагента и наружного воздуха настройка не требуется: модуль считывает эти данные с устройства самостоятельно. Отображение этих данных зависит только от модели — устройство, которое не отображает значение, просто не имеет соответствующих данных.

### Более быстрая обратная связь

В стандартной комплектации модуль сообщает о своем состоянии каждые 60 секунд. `reporting` (настройка), поэтому команда подтверждается только в следующем отчете — ожидайте ответа в течение минуты. Включение `livestatus` В **дополнительных** настройках модуля это позволяет получать отчеты немедленно.

### Настройки, которые кондиционер не принимает

Модуль отправляет настройку на кондиционер и считывает её обратно. Если после нескольких циклов устройство по-прежнему сообщает своё старое значение (`s21.tries` (по умолчанию 10), модуль отменяет изменение, снова отображает значение единицы измерения и публикует отклоненные поля. `error/<name>/failed-set` До этого момента модуль уже отображает запрошенное значение, поэтому создается впечатление, что что-то его сбросило.

Адаптер регистрирует это как предупреждение (`… the air conditioner did not accept demand=90 …`) и сохраняет последний отказ в `<device>.info.failedSet` в формате JSON с запрошенными значениями и временем: `{"time":"2026-11-05T14:40:51.085Z","settings":{"demand":90}}` В этой ситуации сам адаптер ничего не отправляет.

Известный случай: **управление спросом** (`control.demand` Некоторые устройства подтверждают команду, но продолжают сообщать о 100 % — это наблюдается на устройствах, в которых до сих пор установлен собственный Wi-Fi адаптер Daikin. Модуль может передавать только процентное значение; режимы приложения Daikin (выкл. / автоматический / фиксированный) не входят в возможности интерфейса S21. Режим Econo включается только во время работы устройства.

### Lovelace, детектор типов и другие инструменты, которые ожидают числовые значения.

Модуль озвучивает текст (`mode` =`"cool"`), а текстовые состояния остаются основной формой для скриптов, визуальных элементов и карточек устройств. Однако Lovelace преобразует ключи `common.states` При записи данных о климате это преобразуется в числа; при использовании текстовых ключей это дает... `NaN` и команда потеряна. Используйте числовые аналоги в `<device>.control.*` для таких инструментов:

| Состояние   | Роль                        | Ценности                                                                                              |
| ----------- | --------------------------- | ----------------------------------------------------------------------------------------------------- |
| `modeNum`   | `level.mode.airconditioner` | 0 выключено, 1 обогрев/охлаждение, 2 охлаждение, 3 обогрев, 4 сушка, 5 только вентилятор              |
| `fanNum`    | `level.mode.fan`            | 0 авто, 1 ночь, 2 низкий, 3 низкий/средний, 4 средний, 5 средний/высокий, 6 высокий                   |
| `swingNum`  | `level.mode.swing`          | 0 выключено, 1 включено, 2 вертикальное, 3 горизонтальное, 4 оба, 5 комфорт, 6 горизонтальный комфорт |
| `presetNum` | `level.mode`                | 0 дома, 1 эко, 2 буст                                                                                 |

Эти роли позволяют детектору типов обнаруживать их как часть кондиционера. Письмо `2`, `"2"` или этикетка `"cool"` к `modeNum` отправляет одну команду `cool` к модулю; `modeNum` и `mode` оба имеют `ack=true` Когда модуль подтвердит это. Значение, выходящее за пределы списка, отбрасывается с предупреждением в журнале. Аналогичные объекты создаются с первым отчетом модуля после обновления.

## Визуализация (шаблоны визуализации)

Папка[`vis-templates/`](https://github.com/SmarthomeElektroniker/ioBroker.faikout/blob/main/vis-templates/) Содержит готовые представления **vis 1** для двух устройств: общий обзор, одна страница с подробной информацией по каждому устройству с элементами управления, история энергопотребления и представление для телефона. Они используют только точки данных. `faikout.0` и виджеты этого адаптера — никаких скриптов, никаких других адаптеров. Инструкции по импорту: [vis-templates/README.md](/#/docs/adapterref/iobroker.faikout/vis-templates/README.md) .

## Торговая марка и связь с проектом по разработке аппаратного обеспечения.

_Faikout_ — зарегистрированная торговая марка компании Andrews & Arnold Ltd. Данный адаптер является независимым программным обеспечением и не связан с компанией Andrews & Arnold Ltd или авторами [ESP32-Faikout,](https://codeberg.org/RevK/ESP32-Faikout) а также не поддерживается ими. Название используется исключительно для указания того, с каким оборудованием взаимодействует адаптер.

Исходный код аппаратного проекта не включен. Адаптер был написан с нуля для работы с интерфейсом MQTT; имена полей и списки значений обязательно совпадают, поскольку это предписывает протокол. Аппаратный проект распространяется под лицензией GPL, а данный адаптер — под лицензией MIT — это отдельные работы, взаимодействующие по сетевому протоколу.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.2.1 (2026-11-19)
- `control.swing` / `swingNum`: new value `H+C` (`horizontalComfort`, number 6) for comfort mode with
  horizontal swing. Comfort is a mode of the vertical louvres; the swing selector (e.g. in Lovelace) can now
  combine it with horizontal swing. Needs Faikout firmware with `H+C` support; older firmware reports `C`
  during comfort and treats a written `H+C` as `off`.
- Renamed modules (issue #6): after changing the hostname of a module, the adapter kept the old name in memory
  until the next restart and, once its objects were deleted, logged `State "...consumption..." has no existing
  object` every hour. The module is now recognised by its hardware ID (`info.id`): the old name is no longer
  updated, its consumption counters (today, month, JSON series) continue under the new name, and its objects
  stay untouched until you delete them (SmarthomeElektroniker)
- Deleted objects are noticed while the adapter runs: a deleted device is dropped, a deleted state or branch is
  created again before the next write; states are no longer written to objects that do not exist
  (SmarthomeElektroniker)
- Dev dependency `@iobroker/testing` 6.3.2 (SmarthomeElektroniker)

### 0.2.0 (2026-11-13)
- Numeric twins of the text control states: `control.modeNum`, `fanNum`, `swingNum` and `presetNum` with
  `common.states` (`{0: "off", 1: "heat_cool", ...}`) and the roles `level.mode.airconditioner`,
  `level.mode.fan`, `level.mode.swing` and `level.mode`, for Lovelace and the type detector (forum thread
  85668). Both forms are writable; a command on either sends exactly one command to the module, both are set
  with `ack=true` when the module confirms. Text states, vis widgets and device cards are unchanged.

### 0.1.0 (2026-11-12)
- Device manager support (`@iobroker/dm-utils`): one card per air conditioner in the admin tab "Devices"
  with the running operation (mode, current action, room/target/outside temperature, fan speed, humidity,
  power, energy today), one WiFi symbol for connection and signal (four levels plus dBm, crossed out
  when the module is disconnected), warning when the unit does not respond.
  On/off is a toggle in the status line that follows the state live and asks for confirmation. Mode (without
  "off", shows the last mode while the unit is off), target temperature (slider) and fan speed (Auto, Quiet and
  five level bars) can be changed directly on the card, also while the unit is off; choosing a mode switches the
  unit on. Everything is on the card itself, there is no separate control dialog. All controls write the
  `control.*` states, so commands take the usual path. No configuration actions on the cards.
- New state `control.selectedMode` (see above). German name of the outside temperature with "ß".

### 0.0.19 (2026-11-10)
- A setting the air conditioner does not accept (module message `error/<name>/failed-set`, e.g. demand control) is
  logged as a clear warning instead of the bare payload, and the last rejection is stored in the new state
  `info.failedSet` (requested values and time). Other module errors are logged with their topic (`comms`, …).
- Much lower CPU and database load (issue #5): states are only written when their value changes (unchanged values are
  refreshed every 5 minutes so their timestamp stays current), the hourly JSON series only at the change of hour, the
  daily/monthly series only when their content changes, and the meter readings in the device object at the change of
  hour, after a rebase, every 10 minutes at most and on shutdown – instead of everything on every module message.

### 0.0.18 (2026-10-25)
- VIS widgets: fixed rendering in the vis runtime – the widgets showed nothing and logged `missing ) after argument list`.
  They now subscribe the data points of their device themselves (vis only subscribed the device object), so values
  and states are shown and kept up to date. Energy history: works with vis 1 (`getStates`), shows a fixed range
  (last 24 hours / 31 days / 12 months) and formats numbers in the VIS language.
- VIS widgets: the accent colour follows the mode again (heating orange, cooling blue, off grey) – jQuery 1.11 in vis 1
  cannot set CSS custom properties with `.css()`, so it always stayed blue.
- New: vis templates (`vis-templates/`) – overview, detail page per unit, energy and phone view.

## License

MIT License

Copyright (c) 2026 Immanuel <github@freitag.online>

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