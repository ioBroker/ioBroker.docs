---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.hikvision-alarmserver/README.md
title: ioBroker.hikvision-тревожный сервер
hash: z4bWsccAq81OoH3wJSHVUjcPMdJoHpYRUiVyoPw9AAA=
---
![Логотип](../../../en/adapterref/iobroker.hikvision-alarmserver/admin/hikvision-alarmserver.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.hikvision-alarmserver.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.hikvision-alarmserver.svg)
![Количество установок](https://iobroker.live/badges/hikvision-alarmserver-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/hikvision-alarmserver-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.hikvision-alarmserver.png?downloads=true)

# IoBroker.hikvision-alarmserver
**Тесты:** ![Тестируйте и выпускайте](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/workflows/Test%20and%20Release/badge.svg)

## Адаптер Hikvision Alarm Server для ioBroker
Адаптер для приема сигналов тревоги/событий, отправленных с камер Hikvision.

Протестировано с моделями Hikvision:

- ДС-2CD2043G2-I
- ДС-2CD2143G2-I
- ДС-2DE2A404IW-DE3
- DS-2DE3A404IW-DE/W

Сообщения об успехах/неудачах/ошибках приветствуются, если у вас есть модель, которой нет в этом списке.

## Использование
Экземпляр адаптера создает логическое состояние для каждой сообщаемой комбинации типа камеры/события. Камеры идентифицируются по MAC-адресу (ограничено информацией, предоставленной камерой).

Похоже, что камеры повторяют события каждую секунду, когда эти события все еще действительны, но не отправляется сообщение для их очистки. По этой причине адаптер автоматически удаляет события, о которых не сообщалось повторно более 5 секунд.

## Конфигурация
### IoБрокер
#### Сеть
В конфигурации адаптера выберите свободный порт для прослушивания адаптером (по умолчанию 8089).

#### Тайм-аут тревоги
Большинство устройств сигнализируют об *активной* тревоге, постоянно отправляя предупреждающие сообщения. Эти устройства никогда не отправляют сообщение *inactive*. Поэтому адаптер предполагает, что тревога сброшена, если сообщение не получено в течение заданного периода времени. Укажите этот период здесь (по умолчанию 5000 мс).

#### Дерево каналов
Некоторые камеры (например, с несколькими датчиками) сообщают о нескольких каналах (не путать с каналами ioBroker). Чтобы различать события между каждым из каналов камеры, отметьте соответствующую опцию.

Для определенных типов событий (например, обнаружение поля, пересечение линии и т. д.) некоторые камеры могут идентифицировать цели обнаружения движения (например, человек, транспортное средство и т. д.). Чтобы создать состояние для каждой из этих целей для каждого применимого типа события, установите соответствующий флажок.

#### Отправить
Некоторые типы полученных событий имеют простое логическое значение включения/выключения (длительность, VMD и т. д.). Для этих простых событий достаточно установить соответствующее состояние в дереве объектов ioBroker.

Однако некоторые полученные события включают двоичные данные, такие как изображения, которые нецелесообразно постоянно хранить в дереве объектов ioBroker. Более изящный механизм обработки таких событий заключается в использовании встроенной системы обмена сообщениями ioBroker, которая позволяет передавать объекты сообщений между адаптерами.

Хотя эта функция предназначена в основном для изображений, также поддерживается отправка, запускаемая простыми частями XML.

Точное отправленное сообщение можно настроить в полях `Send to message...`. Эти поля оцениваются с помощью объекта JavaScript `Function` и имеют две доступные переменные: `ctx` (объект контекста события — см. ниже), а в случае частей изображения необработанный буфер доступен в §§SSSSS_3§ §.

##### Пример 1: Отправка текстового оповещения о каждом событии, полученном через Telegram
Если был реализован адаптер Telegram, в секции `XML event parts` можно было бы установить следующие параметры:

* Отправить экземпляр для XML: `telegram.0`
* Отправить в команду для XML: оставьте пустым
* Отправить в сообщение для XML: обратные кавычки являются частью настроенного значения - `` `Получено ${ctx.eventType} от ${ctx.deviceName}` ``

##### Пример 2: Отправка изображений через Telegram
Если был реализован адаптер Telegram, в секции `Image event parts` можно было бы установить следующие параметры:

* Отправить экземпляр для изображений: `telegram.0`
* Отправить в команду для изображений: оставьте пустым
* Отправить в сообщение для изображений: `{ text: imageBuffer, type: 'photo' }`

##### Пример 3: Отправка изображений на пользовательский Javascript
Более сложный пример — отправить каждый полученный буфер изображения пользовательскому скрипту, работающему внутри адаптера Javascript:

* Отправить на имя экземпляра: `javascript.0`
* Отправьте команду: `toScript` (это не пример - требуется литеральная строка).
* Отправить в сообщение: `{ скрипт: 'script.js.myImageHandler', сообщение: 'myImageReceiver', данные: {устройство: ctx.device, изображение: imageBuffer} }`

Внутри адаптера Javascript (экземпляр ноль) создайте сценарий с именем `myImageHandler` и добавьте следующий код:

```javascript
onMessage('myImageReceiver', (data, cb) => {
  // data.device holds mac address of device (colons stripped).
  // data.image holds raw image buffer.
  ...
  cb();
});
```

##### Объект контекста события
Контекст события `ctx` имеет следующие свойства:

- `макадрес`
- `тип события`
- `цель обнаружения`
- `название канала`
- `device` - MAC-адрес без кавычек (для согласованности с сетевыми инструментами).
- `deviceName` - имя хоста, полученное из сетевых инструментов или копии `device`, если оно не найдено.
- `stateId` - идентификатор состояния, которое вызывает это событие.
- `eventLogged` – логическое значение, указывающее, что состояние было активировано должным образом. Всегда должно быть правдой.
- `xml` - Проанализированные XML-данные.
- `ts` - объект JavaScript `Date`, созданный из `dateTime` в сообщении о событии (или время получения события, если оно недоступно).
- `periodPath` - Папка файловой системы, в которой в данный момент сохраняются части событий (меняется каждый день).
- `fileBase` - Префикс для всех сохраненных частей из текущего сообщения.
- `files` - массив, содержащий имена файлов (включая полный путь) всех файлов, выгруженных как часть обработки текущего сообщения.

#### Сохранение данных события
Если выбрано событие XML и/или данные изображения хранятся в локальной файловой системе в разделе `iobroker-data/hikvision-alarmserver.<instance>`.

*Внимание!* Эти файлы в настоящее время не очищены и не заархивированы, поэтому используйте их с осторожностью или примените для этого внешнюю стратегию.

### На камеру
Посетите страницу конфигурации вашей камеры (камер) и определите параметры IP/хоста и порта ioBroker:

![Опции сервера тревог](../../../en/adapterref/iobroker.hikvision-alarmserver/docs/images/alarm-server-options.png)

Убедитесь, что привязка событий, о которых вы хотите сообщить в ioBroker, включает «Уведомить центр наблюдения». Например:

![Параметры обнаружения движения](../../../en/adapterref/iobroker.hikvision-alarmserver/docs/images/motion-detection-options.png)

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 0.1.0 (2023-01-24)
-   (Robin Rainton) Added configuration for alarm timeout ([#16](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/issues/16)).
-   (Robin Rainton) Fixed multipart message handling for line crossing/field detection, etc ([#18](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/issues/18)).
-   (Robin Rainton) Optionally save XML/images & send events using `sendTo` to other adapters ([#20](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/issues/20) & [#26](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/issues/26)).
-   (Robin Rainton) Added info.connection state ([#22](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/issues/22)).
-   (Robin Rainton) Handle cases where `TargetRect` is specified in decimals between zero & one ([#24](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/issues/24)).

### 0.0.7 (2022-12-29)
-   (Robin Rainton) Add bind address option ([#9](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/issues/9)).
-   (Robin Rainton) Try to derive device names from net-tools. Optionally use channelName from devices ([#10](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/issues/10)).

### 0.0.6 (2022-12-13)
-   (Robin Rainton) Handle multipart message payload ([#5](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/issues/5)).
-   (Robin Rainton) Handle payloads without XML declaration ([#7](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/issues/7).)

### 0.0.5 (2022-12-10)
-   (Robin Rainton) Drop colons from device IDs.

### 0.0.2
-   (Robin Rainton) initial release.

## License
MIT License

Copyright (c) 2022-2023 Robin Rainton <robin@rainton.com>

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