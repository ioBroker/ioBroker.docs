---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.text2command/README.md
title: ioBroker.text2command
hash: KdgJJMB/L5sM7ERy03ey1OqgDxxzrtCv7SeZqoEp3eI=
---
![Логотип](../../../en/adapterref/iobroker.text2command/admin/text2command.png)

![Количество установок](http://iobroker.live/badges/text2command-stable.svg)
![НПМ-версия](http://img.shields.io/npm/v/iobroker.text2command.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.text2command.svg)
![Тесты](https://travis-ci.org/ioBroker/ioBroker.text2command.svg?branch=master)
![НПМ](https://nodei.co/npm/iobroker.text2command.png?downloads=true)

# IoBroker.text2command
## Описание
Этот адаптер может преобразовывать обычные предложения, например `Switch light in kitchen on`, в конкретную команду и устанавливать состояние `adapter.0.device.kitchenLight` в `true`.

Этот адаптер не имеет смысла активировать автономно. Его следует использовать с другими адаптерами, такими как Telegram или приложение для Android **`iobroker.vis`**.

## Использование
Чтобы выполнить команду, запишите состояние **`text2command.<INSTANCE>.text`** с предложением. Вы всегда получите ответ в `text2command.<INSTANCE>.response`.

Если вы определите **Ответ на идентификатор**, ответ также будет записан в этом идентификаторе. Это необходимо, например, для осознать, что голос подтверждает.

Вы можете отправить сообщение через `sendTo` из JavaScript. Ответ придет в ответном сообщении:

```
sendTo('text2command', 'Switch light in kitchen on', function (err, response) {
    console.log('Response is: ' + response);
});
```

Можно использовать регулярные выражения, например: `/^light\son|^lamp\son/`. Регулярные выражения всегда нечувствительны к регистру.

Чтобы использовать «Включение/выключение по функции», вам следует позаботиться о функциях.

Ключевые слова работают следующим образом:

- пробел разделяет ключевые слова
- все ключевые слова должны присутствовать в предложении, чтобы активировать правило: например, ключевое слово "включить свет" будет срабатывать при выполнении "включить свет", "включить свет повсюду" и не срабатывать при "включить", "включить свет" .
- одно ключевое слово может иметь множество форм. Варианты ключевого слова должны быть разделены знаком «/». Например, ключевые слова: «включи/сделай/включи свет/правда» сработают: «включи свет», «включи свет».
- если ключевое слово может встречаться во многих падежах (ном, род, винительный падеж, множественное число, ...), все они должны быть указаны как варианты, например: `включить свет/включить свет`.

Следующие функции будут интерпретироваться как

`enum.functions`:

**`enum.functions.light`** (Лихт | Свет):

- роли - `level.dimmer`
- роли - `switch.light`

**`enum.functions.backlight`** (Белеухтунг | Подсветка):

- роли - `level.backlight`
- роли - `switch.backlight`

**`enum.functions.blinds/shutter`** (Rollladen | Жалюзи/окна)

- роли - `level.blind`
- роли - `switch.blind`

**`enum.functions.curtain`** (Переход | Шторы)

- роли - `level.curtain`
- роли - `switch.curtain`

**`enum.functions.heating`** (Heizung | Отопление/Подогрев)

- роли - `level.temperature`
- роли - `switch.temperature`

**`enum.functions.music`** (Музыка | Музыка)

- роли - `button.play`
- роли - `button.stop` / `button.pause`

**`enum.functions.alarm/security`** (Аварийная сигнализация / Тревога | Охрана)

- роли - `switch.security`

**`enum.functions.lock`** (Замок / Замок | Замок)

- роли - `switch.open`
- роли - `switch.lock`

Поддерживаются следующие комнаты:

| ключевое слово в фразе | Возможные enum.rooms на английском языке | на немецком | на русском |
|-----------------------|---------------------------------|--------------------------|------------------|
| повсюду | повсюду | - | - |
| жить | гостиная | вонзиммер | зал |
| спальня | спальня/спальня | шлафциммер | спальня |
| ванна | ванная/ванна | бадециммер/плохой | ванна |
| работа/офис | офис | арбайтциммер | кабинет |
| дети/ребенок/ясли | питомник | детский сад | детский |
| гостевой туалет/гостевой шкаф | гость | gästewc | гостевой туалет |
| туалет/гардероб | туалет | туалет | туалет |
| этаж/вход | пол | диель/банда/флюр | коридор/прихожая |
| кухня | кухня | куче/куче | кухня |
| балкон/терраса/патио | терраса | балкон/терраса | терраса/балкон |
| столовая | столовая | эсциммер | столовая |
| гараж | гараж | гараж | гараж |
| лестница | лестницы | трепе/треппенхаус | лестница |
| сад | сад | сад | сад |
| двор/двор | суд | хоф | двор |
| комната для гостей | комната для гостей | гестезиммер | гостевая |
| чердак | чердак | спикер | кладовка |
| крыша | крыша | дахштуль | крыша |
| терминал | терминал | аншлюсраум | сени |
| умывальная | туалет | васраум | прачечная |
| тепловая комната | тепловая комната | помещение с отоплением/центральное помещение | котельная |
| лачуга | лачуга | шуппен/шойне | сарай |
| летний домик | беседка | садовый дом | теплица |

Вы можете использовать шаблоны в подтверждениях:

- `%s`: значение
- `%u`: единица измерения
- `%n`: имя (планируется!)
- `{objectId}`: здесь будет размещено состояние этого идентификатора объекта. Фактически, это будут те же привязки, которые поддерживаются [iobroker.vis](https://github.com/ioBroker/ioBroker.vis#bindings-of-objects), за исключением специальных привязок.

Поддерживаются следующие команды:

### Который сейчас час?
Ответ: 14:56 (текущее время)

### Как вас зовут?
Ответ настраивается. По умолчанию: `My name is Alpha`.

### Какая температура на улице?
Пользователь должен указать идентификатор штата, где считывать наружную температуру.
Ответ настраивается. По умолчанию: `Outside temperature is %s %u` **`%s`** будет заменен температурой, округленной до целого числа. **`%u`** будет заменен единицами этого состояния или единицами измерения температуры системы.

### Какова внутренняя температура?
Пользователь должен указать идентификатор штата, где можно считать внутреннюю температуру.
Ответ настраивается. По умолчанию: `Inside temperature is %s %u` **`%s`** будет заменен температурой, округленной до целого числа. **`%u`** будет заменен единицами этого состояния или единицами измерения температуры системы.

### Включение/выключение по функции
Эта команда считывает информацию из перечислений. Он использует `enum.functions` для определения типа устройства (например, свет, сигнализация, музыка) и `enum.rooms` для определения названия комнаты.

Пример на немецком языке: ![Перечисления](../../../en/adapterref/iobroker.text2command/img/enums.png).

Ключевые слова для включения: *включить*, например. `switch rear light in bath on`

Ключевые слова для отключения: *выключить*, например. `switch light in living room off`

При желании ответ будет сгенерирован автоматически: `Switch off %function% in %room%`, где `%function%` и `%room%` будут заменены найденным типом и местоположением устройства.

Команда также принимает числовое значение. Он имеет приоритет, например. в команде `switch light off in living room on 15%` свет будет установлен на 15%, а не в состоянии *выключено*.

Вы можете определить комнату по умолчанию в []. Например. `switch the light on[sleepingroom]`

### Открытие/закрытие жалюзи
Эта команда считывает информацию из перечислений. Он использует **`enum.functions.blind`** для поиска типа жалюзи или ставен и **`enum.rooms`** для определения названия комнаты.

Ключевые слова для поднятия блайндов: *жалюзи вверх*, например. `set blinds up in sleeping room`

Ключевые слова для опускания блайндов: *жалюзи опущены*, например. `move blinds down in office`

Вы можете указать точное положение жалюзи в процентах, например. `move blinds to 40 percent in office`

При желании ответ будет сгенерирован автоматически: ` in %room%`, где %room% будет заменен найденным типом и местоположением устройства.

### Включить/выключить что-нибудь
Пользователь должен указать идентификатор состояния устройства, которым необходимо управлять, и значение, которое необходимо записать.

Вам следует создать правило для каждой позиции (например, для `on` и для `off`).

Ответ настраивается. По умолчанию: `Switched on`.

Например.:

- `Деактивировать сигнал тревоги`, Идентификатор объекта: `hm-rpc.0.alarm`, Значение: `false`, Ответ: `Тревога деактивирована/Деактивирована`. В этом случае ответ будет рандомизирован между *Тревога деактивирована* и *Деактивирована*.
- «Активировать сигнализацию», Идентификатор объекта: «hm-rpc.0.alarm», Значение: «true», Ответ: «Тревога активирована/Активирована/Готово». В этом случае ответ будет рандомизирован между *Тревога активирована*, *Активирована* и *Готово*.

*Деактивировать* должно быть первым в списке, поскольку он длиннее.

Вы можете использовать значения с плавающей запятой в командах управления. Если в тексте присутствует какое-либо числовое значение, оно будет использоваться в качестве управляющего значения, а предопределенное значение будет игнорироваться.

НАПРИМЕР. для правила:

- `Установить уровень освещенности`, Идентификатор объекта: `hm-rpc.0.light.STATE`, Значение: `10`, Ответ: `Уровень установлен на %s%`.

Если команда имеет вид `Set light level to 50%`, то в `hm-rpc.0.light.STATE` будет записано 50 и ответ будет `Level set to 50%`.

Если команда имеет вид `Set light level`, то в `hm-rpc.0.light.STATE` будет записано 10, а ответ будет `Level set to 10%`.

### Спросить о чем-нибудь
Пользователь должен указать идентификатор состояния устройства, значение которого будет считываться.
Этот шаблон ответит информацией из какого-либо штата.

Например.:

- `окна открыты`, идентификатор объекта: `javascript.0.countOpenedWindows`, подтверждение: `фактическое количество открытых окон: %s`
- `температура в спальне`, идентификатор объекта: `hm-rpc.0.sleepingRoomSensor.TEMPERATURE`, подтверждение: `фактическая температура в спальне составляет %s %u/%s %u`. В этом случае ответ будет рандомизирован между *Фактическая температура в спальной комнате: %s %u* и *%s %u*.

### Отправить текст в штат
Вы можете написать некоторый текст в состояние. Пользователь должен указать идентификатор состояния, чтобы записать в него текст.

Например. правило: `email [to] wife`, Идентификатор объекта: `javascript.0.emailToWife`, Подтверждение: `Email sent` Текст: `Send email to my wife: I will be late`. Адаптер ищет последнее слово из ключевых слов (в данном случае `wife`), извлекает текст из следующего слова (в данном случае `I will be late`) и записывает этот текст в `javascript.0.emailToWife`.
Слово `to` не требуется для срабатывания правила, но будет удалено из текста.

### Ты молодец (Просто ради удовольствия)
Ответ настраивается. По умолчанию: `Thank you` или `You are welcome`.

### Спасибо (просто ради удовольствия)
Ответ настраивается. По умолчанию: `No problem` или `You are welcome`.

### Создать ответ
Вы можете сгенерировать ответ с привязкой {objectId} в подтверждении. Используется для Алексы.

Например.:

- `окна открыты`, Подтверждение: `Фактические открытые окна {javascript.0.countOpenedWindows}`
- `температура в спальне`, Подтверждение: `Фактическая температура в спальне равна {t: hm-rpc.0.sleepingRoomSensor.TEMPERATURE; Math.round(t)}/{hm-rpc.0.sleepingRoomSensor.TEMPERATURE; round(1)} степень`. В этом случае ответ будет рандомизирован между *Фактическая температура в спальне <ЗНАЧЕНИЕ>* и *<ЗНАЧЕНИЕ>*.

Подробнее о привязках можно прочитать здесь: (Привязки объектов)[https://github.com/ioBroker/ioBroker.vis#bindings-of-objects]

Кроме того, вы можете узнать время до настоящего момента, используя `{hm-rpc.0.light.STATE.lc;dateinterval}` (2 минуты и 12 секунд) или `{hm-rpc.0.light.STATE.lc;dateinterval(true)}` (2 минуты и 12 секунд **назад**).

## Внешние правила с JavaScript
Существует возможность использовать движок JavaScript для обработки команд в `text2command`.
Для этого вам необходимо указать какое-то состояние в «Идентификаторе состояния процессора» (Дополнительные настройки) и прослушивать это состояние в каком-нибудь JS или Blockly-скрипте.
Вы можете создать какое-то состояние вручную в администраторе или в скрипте. Скрипт обработки может выглядеть так:

```
createState("textProcessor", '', function () {
    // text2command writes the value with ack=false. Change "any" is important too, to process repeated commands.
    on({id: "javascript.0.textProcessor", ack: false, change: 'any'}, function (obj) {
         var task = JSON.parse(obj.state.val);
         // value looks like
         // {
         //     "command":      "text to process", // command that was received by text2command
         //     "language":     "en",              // language in command or system language
         //     "withLanguage": false              // indicator if language was defined in command (true) or used default language (false)
         // }
         // response to text2command with ack=true
         if (task.command === 'switch light on') {
            setState("hm-rpc.0.light", true);
            setState("javascript.0.textProcessor", 'light is on', true);
         } else {
            // let it process with predefined rules
            setState("javascript.0.textProcessor", '', true);
         }
    });
});
```

Установите в настройках `text2command` **Идентификатор состояния процессора** как *`javascript.0.textProcessor`*, чтобы этот пример работал.

Во-первых, команда будет обработана с помощью вашего javascript, и если javascript ответит «» или не ответит в течение заранее определенного времени (по умолчанию 1 секунда), команда будет обработана по правилам.

### Опция: запись в ответ по каждой команде
Если это активировано каждой командой (независимо от того, пришел ли запрос через состояние или sendTo), `text2command.X.response` будет записан вместе с ответом.

# Делать
- на русском языке отвечают мужчины и женщины.

<!-- Заполнитель следующей версии (в начале строки):

### **РАБОТА В ПРОГРЕССЕ** -->

## Changelog
### 3.0.3 (2023-12-18)
* (bluefox) Corrected GUI

### 3.0.2 (2023-02-27)
* (bluefox) Corrected link from admin

### 3.0.1 (2023-02-21)
* (bluefox) Corrected many GUI errors

### 2.3.1 (2023-02-03)
* (bluefox) Migrated GUI to v5

### 2.2.2 (2022-06-17)
* (Apollon77) Fix crash cases reported by Sentry

### 2.2.1 (2022-02-21)
* (bluefox) Checked the existence of `sayit` instance before output
* (bluefox) Added the decimal places settings to temperature  
* (bluefox) Added the second object ID to user queries
* (bluefox) Added the option: "No negative answer"

### 2.1.6 (2022-02-16)
* (bluefox) Corrected GUI

### 2.1.4 (2022-02-16)
* (bluefox) Some errors will be caught at start

### 2.1.2 (2022-02-13)
* (bluefox) Updated GUI.
* (bluefox) Updated releaser

### 2.1.1 (2021-06-15)
* (PeterVoronov) Corrected usage of regex

### 2.1.0 (2021-05-24)
* (bluefox) Updated GUI.

### 2.0.7 (2020-12-12)
* (Apollon77) Prevent crash case (Sentry IOBROKER-TEXT2COMMAND-J)

### 2.0.6 (2020-12-03)
* (Apollon77) Prevent crash case (Sentry IOBROKER-TEXT2COMMAND-D, IOBROKER-TEXT2COMMAND-C)

### 2.0.5 (2020-09-5)
* (bluefox) Updated the select ID dialog.

### 2.0.3 (2020-07-14)
* (bluefox) Fixed GUI errors

### 2.0.2 (2020-07-13)
* (bluefox) Fixed GUI errors

### 2.0.1 (2020-07-08)
* (bluefox) Fixed select ID dialog

### 2.0.0 (2020-07-06)
* (bluefox) New GUI

### 1.3.1 (2019-07-18)
* (unltdnetworx) changed copyright year to 2019, according to issue #41
* (unltdnetworx) additional words for blinds and functions in english and german
* (unltdnetworx) fixed typo

### 1.3.0 (2019-07-18)
* (bluefox) Using the defined language by words

### 1.2.5 (2019-02-12)
* (unltdnetworx) description in german corrected
* (unltdnetworx) added percent to true/false rules

### 1.2.4 (2018-05-05)
* (Apollon77) Fix

### 1.2.3 (2018-05-01)
* (bluefox) Support of bindings in answer {objId}

### 1.2.0 (2018-04-23)
* (bluefox) Support of Admin3 (but not materialize style)

### 1.1.7 (2018-04-04)
* (bluefox) The parsing error was fixed

### 1.1.6 (2017-10-05)
* (bluefox) Check if units are undefined

### 1.1.5 (2017-08-14)
* (bluefox) Support of iobroker.pro

### 1.1.4 (2017-03-27)
* (bluefox) translations

### 1.1.3 (2016-08-30)
* (bluefox) russian translations

### 1.1.2 (2016-08-29)
* (bluefox) fix the russian temperature text
* (bluefox) extend rule "control device" with option 0/1
* (bluefox) use by control of devices min/max values if set

### 1.1.1 (2016-08-19)
* (bluefox) add additional info for external text processor

### 1.1.0 (2016-08-16)
* (bluefox) add text processor state ID

### 1.0.2 (2016-07-22)
* (bluefox) fix error with detection of numeric values

### 1.0.1 (2016-06-01)
* (bluefox) fix: send text command

### 1.0.0 (2016-05-05)
* (bluefox) replace special chars in input text: #'"$&/\!?.,;:(){}^

### 0.1.10 (2016-03-20)
* (bluefox) fix double pronunciation of some answers

### 0.1.9 (2016-03-20)
* (bluefox) ignore spaces

### 0.1.8 (2016-03-15)
* (bluefox) fix error with enums

### 0.1.7 (2016-03-12)
* (bluefox) implement "say something"

### 0.1.6 (2016-02-24)
* (bluefox) fix temperature

### 0.1.5 (2016-02-23)
* (bluefox) fix russian outputs

### 0.1.4 (2016-02-22)
* (bluefox) fix russian outputs

### 0.1.3 (2016-02-21)

* (bluefox) round temperature in answers

### 0.1.2 (2016-02-21)
* (bluefox) implement russian time

### 0.1.1 (2016-02-19)
* (bluefox) check invalid commands

### 0.1.0 (2016-02-19)
* (bluefox) fix problem with controlling of channels
* (bluefox) enable write JSON as argument

### 0.0.3 (2016-02-14)
* (bluefox) remove unused files

### 0.0.2 (2016-02-10)
* (bluefox) extend readme

### 0.0.1 (2016-02-09)
* (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2014-2023, bluefox <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
