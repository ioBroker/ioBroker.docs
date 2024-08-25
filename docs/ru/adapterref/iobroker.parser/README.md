---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.parser/README.md
title: Адаптер парсера ioBroker
hash: Le4c+UayImhSKld1ia2TKTckHZUsW4qw9xKSC9LG2fk=
---
![Логотип](../../../en/adapterref/iobroker.parser/admin/parser.png)

![Количество установок](http://iobroker.live/badges/parser-stable.svg)
![НПМ-версия](http://img.shields.io/npm/v/iobroker.parser.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.parser.svg)

# Адаптер парсера ioBroker
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.parser/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/parser/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются начиная с js-controller 3.0.

Этот адаптер анализирует данные, полученные по URL-адресу или из файла, с помощью регулярных выражений. Для каждого правила, настроенного в настройках этого адаптера, состояние будет создано в разделе `parser.<instance number>` и заполнено и обновлено проанализированной информацией.

## Настройки
### 1. Интервал опроса по умолчанию
Это значение интервала опроса по умолчанию будет использоваться, если для записи в таблице конфигурации (столбец: «Интервал») не указано индивидуальное значение интервала опроса. Интервал измеряется в миллисекундах и определяет, как часто читается ссылка или файл и обновляются состояния.

**Примечание.** Не используйте слишком агрессивный интервал опроса, особенно для URL-адресов веб-сайтов. Например, если вы хотите получить цену ваших акций с определенного веб-сайта, вам, вероятно, подойдет интервал всего в 24 часа (= 86400000 мс), если вы не дневной трейдер. Если вы слишком часто пытаетесь получить данные с определенных URL-адресов, веб-сайт может заблокировать вас и внести в черный список сервера. Поэтому, пожалуйста, используйте интервал опроса с осторожностью.

### 2. Тайм-аут запроса
Укажите, как долго адаптер ожидает ответа HTTP при выполнении запросов к веб-сайту.

### 3. Задержка между запросами
Укажите, как долго адаптер ожидает между выполнением HTTP-запросов при выполнении удаленных запросов. Полезно при получении данных с медленных хостов или через медленные соединения, чтобы избежать перегрузки любого из них. Ноль (по умолчанию) означает отсутствие задержки.

Эта задержка зависит от каждого хоста. Если удаленные запросы настроены на получение данных с нескольких удаленных хостов, каждый хост будет запрашиваться параллельно.

Задержка — это минимальное значение между инициированием каждого запроса. То есть, если чтение запроса занимает больше времени, чем этот параметр задержки, следующий запрос начнется сразу после завершения чтения.

### 4. Примите недействительные сертификаты
Укажите, принимаются или отклоняются самоподписанные/недействительные сертификаты SSL/TLS при выполнении HTTPS-запросов.

### 5. Используйте небезопасный HTTP-парсер
Укажите использование небезопасного анализатора HTTP, который принимает недопустимые заголовки HTTP. Это может обеспечить совместимость с несоответствующими реализациями HTTP.
Следует избегать использования небезопасного парсера.

### 6. Таблица
Нажмите кнопку «Плюс», чтобы добавить новую запись в таблицу.

**Примечание по производительности.** Если вы введете один и тот же URL-адрес или имя файла более одного раза в разные строки таблицы и если значения столбца «Интервал» одинаковы, будет получено только содержимое URL-адреса или имени файла ** один раз** и кэшируется для обработки нескольких строк таблицы, соответствующих URL/имени файла и интервалу. Это позволяет вам применять несколько регулярных выражений (то есть несколько строк таблицы) к одному URL-адресу или имени файла без необходимости многократного получения данных из источника.

**Поля таблицы:**

- **_Name_** - имя состояния, которое создается под `parser.<номер экземпляра>`. Пробелы не допускаются. Вы можете использовать точки `.` в качестве разделителя для создания подпапок. Пример: `Shares.Microsoft.Current` приведет к `parser.<номер экземпляра>.Shares.Microsoft.Current`.
- **_URL или имя файла_** — либо URL-адрес веб-сайта, либо путь к файлу, информацию о котором мы хотим получить. Примеры `https://darksky.net/forecast/48.1371,11.5754/si24/de` (информация о погоде в Мюнхене) или `/opt/iobroker/test/testdata.txt` (файл из ioBroker).
- **_RegEx_** — регулярное выражение, как извлечь данные из ссылки. Существует хороший сервис для проверки регулярных выражений: [regex101](https://regex101.com/). Например. `temp swip">(-?\d+)˚<` для строки выше.
- **_Item_** (нем. «Num») — регулярное выражение может найти (сопоставить) несколько записей. С помощью этой опции вы можете определить, какой матч выбрать. 0 = первое совпадение, 1 = второе совпадение, 2 = третье совпадение и т. д. По умолчанию установлено значение 0 (первое совпадение).
- **_Роль_** - одна из ролей:
    - custom - пользователь определяет через _admin_ роль
    - температура - значение представляет собой температуру
    - значение - значение представляет собой число (например, диммер)
    - блайнды - значение представляет собой блайнд-позицию
    - переключатель - значение представляет собой положение переключателя (истина/ложь)
    - button - значение представляет собой кнопку
    - индикатор - логический индикатор
- **_Type_** — тип переменной в раскрывающемся меню.
- **_Unit_** — Необязательно: единица измерения значения, добавленного к записи состояния. Например. `°C`, `€`, `GB` и т. д.
- **_Old_** — если активировано, состояние _не_ будет обновляться, если значение не может быть прочитано или найдено в предоставленной дате (URL-адресе или файле), поэтому в этом случае оно сохранит прежнее значение.
- **_Subs_** – Необязательно: замените URL-адрес или имя файла. Этот замещающий URL-адрес/имя файла будет использоваться, если URL-адрес/имя файла первого столбца недоступен.
- **_Factor/Offset_** (только для чисел типа «Тип») — позволяет модифицировать полученные данные до их перевода в состояние:
  - _расчетное значение_ = _извлеченное значение_ \* коэффициент + смещение, чтобы немедленно внести изменения в значение.
- **_Interval_** — интервал опроса в мс (миллисекундах). Если поле пусто или равно 0, будет использоваться интервал опроса по умолчанию. Дополнительную информацию см. выше.

## Пример настроек
| Имя | URL-адрес или имя файла | регулярное выражение | Роль | Тип | Единица | Интервал |
| ----------------- | :----------------------------------------------------- | :----------------------------------- | ----------- | ------- | ---- | -------- |
| температураМюнхен | `https://darksky.net/forecast/48.1371,11.5754/si24/de` | `temp swip">(-?\d+)˚<` | температура | номер | °С | 180000 |
| облакоБег | `https://iobroker.net/` | `Privacy Notice` | индикатор | логическое | | 60000 |
| температура процессора | `/sys/devices/virtual/thermal/thermal_zone0/temp` | `(.*)` | температура | номер | °С | 30000 |
| акцииЦена.Виза | `https://www.finanzen.net/aktien/visa-aktie` | `\d{0,3},\d{2}(?=<span>EUR<\/span>)` | ценность | номер | € | 86400000 |
| клейнанцейген | `https://www.ebay-kleinanzeigen.de/s-iobroker/k0` | `data-href="(.*?).">` | по умолчанию | строка | | 600000 |
| клейнанцейген | `https://www.ebay-kleinanzeigen.de/s-iobroker/k0` | `data-href="(.*?).">` | по умолчанию | строка | | 600000 |

*Примечание.* При применении регулярного выражения к полученным данным URL/файла все разрывы строк будут заменены пробелами, чтобы обеспечить возможность многострочного поиска.

## О регулярных выражениях (RegExp)
Регулярные выражения — это мощный инструмент для анализа и извлечения определенных данных из строк, и что еще более важно: они позволяют извлекать определенные значения/текст из заданной строки (например, из HTML-кода веб-страницы или текста из файла), применяя правила. .

Для логических типов регулярное выражение довольно простое. Для числовых типов следует обозначать число скобками — `()`. Например. чтобы извлечь число из *Температура 5°C*, вам следует использовать выражение ` (\d+)`.

Дополнительная информация о RegExp:

- [Документация MDN/Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
- [regex101: онлайн-инструмент для создания и проверки регулярных выражений](https://regex101.com/)

### Примеры
- `.at` соответствует любой трехсимвольной строке, заканчивающейся на `at`, включая `hat`, `cat` и `bat`.
- `[hc]at` соответствует `hat` и `cat`.
- `[^b]at` соответствует всем строкам, соответствующим .at, кроме `bat`.
- `[^hc]at` соответствует всем строкам, соответствующим .at, кроме `hat` и `cat`.
- `^[hc]at` соответствует `hat` и `cat`, но только в начале строки или строки.
- `[hc]at$` соответствует `hat` и `cat`, но только в конце строки или строки.
- `\[.\]` соответствует любому одиночному символу, заключенному в `[` и `]`, поскольку скобки экранированы, например: `[a]` и `[b]`.
- `s.\*` соответствует s, за которым следует ноль или более символов, например: `s`, `saw` и `seed`.
- `[hc]+at` соответствует `hat`, `cat`, `hhat`, `chat`, `hcat`, `cchchat` и т. д., но не `at`.
- `[hc]?at` соответствует `hat`, `cat` и `at`.
- `[hc]\*at` соответствует `hat`, `cat`, `hhat`, `chat`, `hcat`, `cchchat`, `at` и т. д.
- `cat|dog` соответствует `cat` или `dog`.
- `(\d+)` - получить число из строки
- `сейчас (\w+)` позже - получить слово между `сейчас` и `позже`

### Другие полезные выражения
- `(-?\d+)` получить число (как отрицательные, так и положительные числа)
- `[+-]?([0-9]+.?[0-9]|.[0-9]+)` получить число с десятичными знаками (и `.` в качестве десятичного разделителя)
- `[+-]?([0-9]+,?[0-9]|,[0-9]+)` получить число с десятичными знаками (и `,` в качестве десятичного разделителя)

## Пример уведомления
### Телеграм
```Javascript
on("parser.0.kleinanzeigen", (obj) => {
    sendTo("telegram.0", {
        text: "https://www.ebay-kleinanzeigen.de" + obj.state.val,
    });
});
```

## Коды качества
Значения могут иметь коды качества:

- 0 - ОК
- 0x82 - URL-адрес или файл не могут быть прочитаны.
- 0x44 - Числовое или строковое значение не найдено в тексте.

## Запуск
Дополнительно к интервалу опроса синтаксический анализ конкретных правил может быть запущен записью пустого значения (`false`, `0`, '' - зависит от типа состояния) в состояние с §§SSSSS_2 §§ флаг подтверждения.
В этом случае значение будет прочитано из URL/файла и немедленно проанализировано.

Вы также можете отправить сообщение адаптеру с помощью команды `sendTo`:

```Javascript
sendTo("parser.0", "trigger", "temperatureMunich" /* name of rule, or parser.0.temperatureMunich */, result => {
    console.log(JSON.stringify(result)); // {"value": 10, "error": null}
});
```

## Поддерживать
1. Общие сведения: [Форум ioBroker](https://forum.iobroker.net/). Немецкоязычные пользователи: см. [тему форума ioBroker Parser-Adapter](https://forum.iobroker.net/topic/4494/adapter-parser-regex).
2. В случае возникновения каких-либо проблем ознакомьтесь с [Адаптером синтаксического анализатора ioBroker: проблемы с GitHub](https://github.com/ioBroker/ioBroker.parser/issues).

<!--

### **РАБОТА В ПРОГРЕССЕ** -->

## Changelog
### 2.0.7 (2023-10-25)
* (TA2k) added the user agent to prevent timeout blocking
* (bluefox) Added a configurable userAgent option

### 2.0.5 (2023-06-19)
* (bluefox) The result could be an array of values

### 2.0.3 (2023-04-02)
* (bluefox) Corrected subscription on too many objects

### 2.0.2 (2023-04-01)
* (bluefox) Added possibility to trigger the parsing by writing of empty value to the state

### 2.0.1 (2023-03-31)
* (bluefox) Updated timestamp of non changed values

### 2.0.0 (2023-03-29)
* (TA2k) added translations
* (bluefox) Migrated GUI to admin v6

### 1.3.2 (2022-12-09)
* (Apollon77) In error cases return error as string

### 1.3.1 (2022-11-09)
* (raintonr) added delay option for slow connections
* (bluefox) added compact mode

### 1.2.1 (2022-09-15)
* (Apollon77) Always use raw response and not try to parse it

### 1.2.0 (2022-09-12)
* (Apollon77) Allow specifying if self-signed/invalid SSL certificates are ignored or not (default is to ignore as till now)
* (Apollon77) Allow specifying if an "insecure HTTP parser" is used which also enables HTTP implementations that are not compliant to specifications
* (Apollon77) Allow specifying the HTTP request timeout

### 1.1.8 (2022-06-27)
* (Apollon77) Check that a link is configured

### 1.1.7 (2022-06-16)
* (Apollon77) Fix potential crash cases reported by Sentry

### 1.1.6 (2022-05-28)
* (Apollon77) Set method to "GET" when requesting URLs

### 1.1.5 (2022-04-19)
* (Apollon77) Ignore objects without configuration for parser and log it

### 1.1.4 (2022-03-21)
* (Apollon77) Fixed a crash case reported by Sentry

### 1.1.3 (2022-03-20)
* (Apollon77) if regex did not match set defined replacement value (or null)

### 1.1.2 (2022-03-09)
* (Apollon77) Fix initialization of new parser objects

### 1.1.1 (2022-03-07)
* IMPORTANT: js-controller 2.0 is required at least now!
* (Apollon77) ignore self signed ssl certificates
* (Apollon77) make sure object changes do not block further updates of values
* (Apollon77) Add Sentry to get crash reports

### 1.0.7 (2018-10-08)
* (bluefox) Comma will be replaced automatically by point for the offset and for the factor

### 1.0.6 (2018-09-22)
* (bluefox) fix parser

### 1.0.5 (2018-08-30)
* (bluefox) Multi-line search allowed

### 1.0.2 (2018-08-06)
* (bluefox) Iterations in regex were corrected

### 1.0.1 (2017-12-10)
* (bluefox) Added additional option: old value

### 1.0.0 (2017-05-19)
* (bluefox) Allow setting the number of found items

### 0.2.2 (2017-04-03)
* (Apollon77) fix handling of multiple fields for one URL

### 0.2.1 (2017-02-24)
* (bluefox) fix error with timestamp

### 0.2.0 (2017-02-01)
* (bluefox) Add visual test

### 0.1.1 (2017-01-30)
* (bluefox) move to a common group

### 0.0.1 (2017-01-16)
* (bluefox) initial commit

## License
The MIT License (MIT)

Copyright (c) 2017-2023 bluefox <dogafox@gmail.com>

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
