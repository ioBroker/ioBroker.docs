---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.device-monitoring/README.md
title: ioBroker.device-monitoring
hash: YUOJQix1fj45AU2xxaeXsrh/JtljYPWcEFUc0SlmZ90=
---
![Логотип](../../../en/adapterref/iobroker.device-monitoring/admin/device-monitoring.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.device-monitoring.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.device-monitoring.svg)
![Количество установок](https://iobroker.live/badges/device-monitoring-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/device-monitoring-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.device-monitoring.png?downloads=true)
![Тестирование и выпуск](https://github.com/BenAhrdt/ioBroker.device-monitoring/workflows/Test%20and%20Release/badge.svg)

# ioBroker.device-monitoring

## Адаптер мониторинга устройств для ioBroker

Отслеживает состояние заданных вами устройств и собирает предупреждения и оповещения.

<img width="1037" height="899" alt="image" src="https://github.com/user-attachments/assets/8ae6d145-90eb-437f-89b5-ce823d63f210" />

## Стандартные категории вывода

Стандартные категории выходных данных отображаются следующим образом:

| Событие                                                | Категория |
| ------------------------------------------------------ | --------- |
| Достигнут предел предупреждения                        | `warnung` |
| Достигнут предельный уровень срабатывания сигнализации | `alarm`   |
| Таймаут обновления источника                           | `alarm`   |
| Источник отсутствует или недействителен.               | `warnung` |
| В штате возобновилась нормальная работа.               | `info`    |

## Уровни уведомления по штатам

Это дает возможность отклониться от стандартного уведомления (например, временно).

Каждое контролируемое состояние имеет шесть состояний уровня записи. `devices.<deviceId>.<stateId>.level`:

| Состояние      | Событие                                                      |
| -------------- | ------------------------------------------------------------ |
| `warning`      | Достигнут предел предупреждения                              |
| `alarm`        | Достигнут предельный уровень срабатывания сигнализации       |
| `timeout`      | Таймаут обновления источника                                 |
| `invalid`      | Идентификатор источника отсутствует или удален               |
| `invalidValue` | Источник существует, но предоставляет недопустимое значение. |
| `recovered`    | В штате возобновилась нормальная работа.                     |

Каждый уровень состояния принимает следующие значения:

| Ценить               | Значение                                                          |
| -------------------- | ----------------------------------------------------------------- |
| `0` — Стандарт       | Используйте стандартную категорию уведомлений мероприятия.        |
| `1` - Неполноценный  | Подавить это событие                                              |
| `2` — Информация     | Отправьте информацию о мероприятии вместе с... `info` категория    |
| `3` - Предупреждение | Отправьте информацию о мероприятии вместе с... `warnung` категория |
| `4` - Тревога        | Отправьте информацию о мероприятии вместе с... `alarm` категория   |

Адаптер принимает распознанные значения от `0` к `4` путем записи выбранного значения обратно. `ack = true`.

## `info.message` состояние

Только для чтения `info.message` Состояние содержит JSON-строку с последним событием уведомления. Каждое новое событие заменяет предыдущее; это состояние не является историей. События записываются сюда даже при отправке уведомлений через `notify` отключено. Уровень установлен на `Disabled` полностью подавляет это событие.

Объект JSON содержит следующие поля:

| Поле                     | Описание                                                                                                                                         |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `type`                   | Исходный тип события: `warning`, `alarm`, `timeout`, `invalidSource`, `invalidValue` или `recovered`; повторяющиеся сводки использовать `summary` |
| `category`               | Категория выходных уведомлений после применения уровня: `info`, `warnung` или `alarm`                                                             |
| `title`                  | Отображаемый заголовок уведомления                                                                                                               |
| `message`                | Отображенное уведомление                                                                                                                         |
| `deviceId`, `deviceName` | Идентификатор устройства и отображаемое имя                                                                                                      |
| `stateId`, `stateName`   | Идентификатор контролируемого состояния и отображаемое имя                                                                                       |
| `function`               | Имя настроенной функции мониторинга; пустое значение, если функция не назначена.                                                                 |
| `sourceId`               | Идентификатор исходного штата                                                                                                                    |
| `remark`                 | Заданное примечание для контролируемого состояния                                                                                                |
| `value`, `unit`          | Текущее значение источника и его единица измерения                                                                                               |
| `previousValue`          | Предыдущее числовое значение для предупреждения или сигнала тревоги, основанного на изменениях; для других событий опускается.                   |
| `triggeredAt`            | Время события в формате Unix-метки времени в миллисекундах                                                                                       |
| `lastUpdate`             | Время последнего обновления источника в формате Unix-метки времени в миллисекундах, или `null`                                                   |
| `timeoutMinutes`         | Заданная длительность тайм-аута; отображается только при наступлении тайм-аута.                                                                  |

Он `type` При изменении категории уведомления на уровень поле сохраняет свой исходный тип события. `info.message` государство признано (`ack = true`) с помощью адаптера.

## Повторяющиеся напоминания

В разделе «Уведомления» можно включить повторяющиеся напоминания. Расписание настраивается с помощью селектора Cron, и выбранный элемент `info`, `warnung` или `alarm` Категория используется для сводки. В каждое запланированное время адаптер проверяет все отслеживаемые состояния и отправляет одну сводку для каждого текущего ненормального состояния. `warning`, `alarm`, `timeout`, `invalid` или `invalidValue` Если все состояния в норме, напоминание не отправляется. Если адаптер запускается после запланированного начала сбора данных, но при этом заданная продолжительность сбора данных еще не истекла, пропущенное начало сбора данных восстанавливается с исходным временем окончания. Сводная информация хранится в `info.message` содержит только `type`, `category`, `title` и `message`.

## Ограничить время ответа

Предупреждения и срабатывания сигнализации могут дополнительно иметь время отклика в минутах. Соответствующий статус и уведомление активируются только тогда, когда нарушение лимита продолжается в течение заданного периода времени. Если значение возвращается к норме раньше, предупреждение или сигнал тревоги не генерируются. Адаптер планирует активацию на точное время, а не ждет периодического обновления. Начало ожидающего нарушения сохраняется ниже экспертных данных контролируемого состояния и сохраняется после перезапуска адаптера. Если состояние источника изменяется во время остановки адаптера и остается активным при перезапуске, изменение синхронизируется и может быть добавлено в активную коллекцию уведомлений.

Шаблоны предупреждающих и тревожных сообщений могут использовать `{{warningResponseTime}}` и `{{alarmResponseTime}}` Каждый заполнитель содержит необязательный локализованный суффикс, например: ` (Ansprechzeit 5 Minuten)` и пустое значение, если не задано положительное время отклика. Также предоставляются предупреждающие и тревожные сообщения, основанные на изменениях. `{{previousValue}}` и `{{changeFrom}}`; последний представляет собой необязательный локализованный суффикс, например, ` (vorheriger Wert: 1 °C)` Для других типов событий это поле пустое. По умолчанию суффикс предыдущего значения добавляется в самый конец сообщения, например: `... ({{remark}}){{warningResponseTime}}{{changeFrom}}`.

Недопустимые источники и недопустимые значения используют глобальную переменную. `invalidResponseTimeSeconds` Параметр (по умолчанию: 10 секунд). Недействительный статус и соответствующее уведомление становятся активными только по истечении этого времени; установите его значение равным `0` для немедленной активации. Шаблоны с недопустимым источником и недопустимым значением могут использовать `{{invalidResponseTime}}` для локализованного суффикса времени отклика.

### Пример

`http://192.168.0.222:8081/#tab-objects/select/device-monitoring.0.info.message`

```

{
  "type": "timeout",
  "category": "alarm",
  "title": "Aktualisierungs-Timeout: Timmerflotte Schlafzimmer - Temperatur",
  "deviceId": "device_002",
  "deviceName": "Timmerflotte Schlafzimmer",
  "stateId": "timmerflotte_schlafzimmer",
  "stateName": "Temperatur",
  "sourceId": "lorawan.0.bridge.devices.70c0cc1b11042a812825444dc65d04f5.sensor.schlafzimmer_timmerflotte_temperatur",
  "remark": "",
  "value": 21.39,
  "unit": "°C",
  "triggeredAt": 1790071578722,
  "lastUpdate": 1790071509083,
  "timeoutMinutes": 1,
  "message": "Der State Temperatur vom Gerät Timmerflotte Schlafzimmer hat sich mindestens 1 Minuten nicht gemeldet. Letzte Aktualisierung: 2026-09-22 12:05:09.083"
}

```

### Используйте уровни уведомлений в менеджере уведомлений.

<img width="797" height="331" alt="image" src="https://github.com/user-attachments/assets/1772680b-68ab-45d3-947e-4d43610c92b4" />

### Используйте уровни уведомлений в скриптах (Blockly).

<img width="1232" height="725" alt="image" src="https://github.com/user-attachments/assets/2d1229ec-ed2b-4974-9625-3be823a8f392" />

### Результат (Пример)

<img width="591" height="1280" alt="image" src="https://github.com/user-attachments/assets/f6c94e61-a233-4c17-8792-f898b34e80e3" />

### Вики адаптера

[Ссылка на вики-страницу адаптера](https://github.com/BenAhrdt/ioBroker.device-monitoring/wiki)

## Ссылка на форум ioBroker

[https://forum.iobroker.net/test-adapter-device-monitoring](https://forum.iobroker.net/topic/85477/test-adapter-device-monitoring?_=1791737589435)

## Сотрудничество

Адаптер был разработан в сотрудничестве с Йоргом Фрёнером.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (BenAhrdt) Use the adapter-managed timeout while waiting for pending operations during shutdown.

### 0.0.48 (2026-11-01)
* (BenAhrdt) Keep the adapter configuration unchanged when it is only opened and render notification previews instead of their JavaScript expressions.

### 0.0.47 (2026-10-29)
* (BenAhrdt) Limit configuration rebuilds and monitoring refreshes to affected devices and states to reduce database and Device Manager load.

### 0.0.46 (2026-10-29)
* (BenAhrdt) Wait for running asynchronous state and object operations before adapter shutdown.
* (BenAhrdt) Handle asynchronous event and timer errors to prevent unhandled database rejections.
* (BenAhrdt) Return structured errors from Device Manager actions and allow longer state-form saves, preventing silent backend timeouts.

### 0.0.45 (2026-10-14)
* (BenAhrdt) Rebuild card details on startup, ignore rapid source duplicates, and display sub-second intervals as `<1s`.

### 0.0.44 (2026-10-14)
* (BenAhrdt) Rebuild device-card details during the initial refresh even when the current source event is an already processed acknowledgement duplicate.

## License
MIT License

Copyright (c) 2026 BenAhrdt <github@ben-schmidt.net>

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