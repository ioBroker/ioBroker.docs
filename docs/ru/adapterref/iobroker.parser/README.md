---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.parser/README.md
title: Адаптер парсера ioBroker
hash: oeR9ZtyxUymKo7zcm46fSgTDep+KFOWhVQ2byZA3uNQ=
---
![Логотип](../../../en/adapterref/iobroker.parser/admin/parser.png)

![Количество установок](http://iobroker.live/badges/parser-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.parser.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.parser.svg)

# Адаптер парсера ioBroker
![Тестируйте и выпускайте](https://github.com/ioBroker/ioBroker.parser/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/parser/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

Этот адаптер анализирует данные, полученные по URL-адресу или из файла, с помощью регулярных выражений. Для каждого правила, настроенного в настройках этого адаптера, будет создано состояние в разделе `parser.<instance number>`, которое будет заполнено и обновлено проанализированной информацией.

## Настройки
### 1. Интервал опроса по умолчанию
Это значение интервала опроса по умолчанию будет использоваться, если для записи в таблице конфигурации (столбец: «Интервал») не указано отдельное значение интервала опроса. Интервал указывается в миллисекундах и определяет, как часто считывается ссылка или файл и обновляются состояния.

**Примечание.** Не используйте слишком большой интервал опроса, особенно для URL-адресов веб-сайтов. Например, если вы хотите получить цену своих акций с определенного веб-сайта, вам, вероятно, подойдет интервал всего в 24 часа (= 86400000 мс), если вы не дневной трейдер. Если вы слишком часто пытаетесь получить данные с определенных URL-адресов, веб-сайт может заблокировать вас и добавить в черный список серверов. Поэтому, пожалуйста, используйте интервал опроса с осторожностью.

### 2. Время ожидания запроса
Укажите, как долго адаптер ожидает ответа HTTP при выполнении запросов веб-сайта.

### 3. Задержка между запросами
Укажите, как долго адаптер ожидает между отправкой HTTP-запросов при выполнении удаленных запросов. Полезно при извлечении данных с медленных хостов или по медленным соединениям, чтобы избежать перегрузки любого из них. Ноль (по умолчанию) означает отсутствие задержки.

Эта задержка зависит от хоста. Если удаленные запросы настроены на выборку с нескольких удаленных хостов, запросы к каждому хосту будут выполняться параллельно.

Задержка — это минимальное значение между инициированием каждого запроса. То есть, если для чтения запроса требуется больше времени, чем этот параметр задержки, следующий начнется сразу после завершения чтения.

### 4. Принимать недействительные сертификаты
Укажите, принимаются или отклоняются самозаверяющие/недействительные сертификаты SSL/TLS при выполнении HTTPS-запросов.

### 5. Используйте небезопасный парсер HTTP
Укажите, чтобы использовать небезопасный анализатор HTTP, который принимает недопустимые заголовки HTTP. Это может обеспечить взаимодействие с несовместимыми реализациями HTTP.
Следует избегать использования небезопасного парсера.

### 6. Таблица
Нажмите кнопку «Плюс», чтобы добавить новую запись в таблицу.

**Примечание о производительности.** Если вы введете один и тот же URL-адрес или имя файла более одного раза в разные строки таблицы и если значения в столбце «Интервал» одинаковы, содержимое URL-адреса или имени файла будет извлечено только ** один раз** и кэшируется для обработки нескольких строк таблицы, соответствующих URL/имени файла и интервалу. Это позволяет вам применять несколько регулярных выражений (то есть несколько строк таблицы) к одному URL-адресу или имени файла без необходимости многократного извлечения данных из источника.

**Поля таблицы:**

- ***Name*** - имя состояния, которое создается под `parser.<instance number>`. Пробелы не допускаются. Вы можете использовать точки `.` в качестве разделителя для создания подпапок. Пример: `Shares.Microsoft.Current` приведет к `parser.<instance number>.Shares.Microsoft.Current`.
- ***URL или имя файла*** - либо URL-адрес веб-сайта, либо путь к файлу, информацию о котором мы хотим получить. Примеры `https://darksky.net/forecast/48.1371,11.5754/si24/de` (информация о погоде в Мюнхене) или `/opt/iobroker/test/testdata.txt` (файл из ioBroker).
- ***RegEx*** - регулярное выражение, как извлечь данные из ссылки. Есть хороший сервис для проверки регулярных выражений: [regex101](https://regex101.com/). Например. `temp swip">(-?\d+)˚<` для строки выше.
- ***Item*** (нем. «Num») — регулярное выражение может найти (сопоставить) несколько записей. С помощью этой опции вы можете определить, какое совпадение будет выбрано. 0 = первое совпадение, 1 = второе совпадение, 2 = третье совпадение и т. д. По умолчанию 0 (первое совпадение).
- ***Роль*** - одна из ролей:
    - custom - пользователь определяет себя через *admin* роль
    - температура - значение температуры
    - значение - значение представляет собой число (например, диммер)
    - блайнды - значение блайнда
    - switch - значением является положение переключателя (true/false)
    - кнопка - значение является кнопкой
    - индикатор - логический индикатор
- ***Type*** - тип переменной в выпадающем меню.
- ***Единица*** - Необязательно: единица стоимости, добавленная к записи состояния. Например. `°C`, `€`, `GB` и т. д.
- ***Старый*** - если активировано, состояние *не* будет обновляться, если значение не может быть прочитано или найдено в указанную дату (URL или файл), поэтому в этом случае будет сохранено прежнее значение.
- ***Sub*** - Необязательно: замените URL или имя файла. Этот замещающий URL-адрес/имя файла будет использоваться, если URL-адрес/имя файла из первого столбца недоступен.
- ***Коэффициент/Смещение*** (только для номеров типа "Тип") - позволяет модифицировать полученные данные перед установкой в состояние:
  - *вычисленное значение* = *извлеченное значение* * коэффициент + смещение, чтобы немедленно внести изменения в значение
- ***Interval*** - интервал опроса в мс (миллисекундах). Если пусто или 0, будет использоваться интервал опроса по умолчанию. См. дополнительную информацию выше.

## Примеры настроек
| Имя | URL-адрес или имя файла | регулярное выражение | Роль | Тип | Единица | интервал |
|--------------------|:-------------------------------------------------------------|:-------------------------------------|-------------|---------|------|----------|
| температураМюнхен | `https://darksky.net/forecast/48.1371,11.5754/si24/de` | `temp swip">(-?\d+)˚<` | температура | номер | °С | 180000 |
| облакоБег | `https://iobroker.net/` | `Privacy Notice` | индикатор | логический | | 60000 |
| температура процессора | `/sys/devices/virtual/thermal/thermal_zone0/temp` | `(.*)` | температура | номер | °С | 30000 |
| акцииЦена.Visa | `https://www.finanzen.net/aktien/visa-aktie` | `\d{0,3},\d{2}(?=<span>EUR<\/span>)` | значение | номер | € | 86400000 |
| клейнанцайген | `https://www.ebay-kleinanzeigen.de/s-iobroker/k0` | `data-href="(.*?).">` | по умолчанию | строка | | 600000 |
| клейнанцайген | `https://www.ebay-kleinanzeigen.de/s-iobroker/k0` | `data-href="(.*?).">` | по умолчанию | строка | | 600000 |

*Примечание.* При применении регулярного выражения к извлеченным данным URL/файла все разрывы строк будут заменены пробелами, чтобы обеспечить многострочный поиск.

## О регулярных выражениях (RegExp)
Регулярные выражения — это мощный инструмент для анализа и извлечения определенных данных из строк, и, что более важно, они позволяют извлекать определенные значения/текст из заданной строки (например, из HTML веб-страницы или текста из файла), применяя правила. .

Для логических типов регулярное выражение довольно простое. Для числовых типов следует пометить число скобками — `()`. Например. чтобы извлечь число из *Температура 5°C*, вы должны использовать выражение ` (\d+)`.

Дополнительная информация о RegExp:

  * [Документация MDN/Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
  * [regex101: онлайн-инструмент для создания и тестирования регулярных выражений](https://regex101.com/)

### Примеры
- `.at` соответствует любой строке из трех символов, оканчивающейся на `at`, включая `hat`, `cat` и `bat`.
- `[hc]at` соответствует `hat` и `cat`.
- `[^b]at` соответствует всем строкам, соответствующим .at, кроме `bat`.
- `[^hc]at` соответствует всем строкам, соответствующим .at, кроме `hat` и `cat`.
- `^[hc]at` соответствует `hat` и `cat`, но только в начале строки или строки.
- `[hc]at$` соответствует `hat` и `cat`, но только в конце строки или строки.
- `\[.\]` соответствует любому одиночному символу, окруженному `[` и `]`, поскольку скобки экранированы, например: `[a]` и `[b]`.
- `s.\*` соответствует s, за которым следует ноль или более символов, например: `s` и `saw` и `seed`.
- `[hc]+at` соответствует `hat`, `cat`, `hhat`, `chat`, `hcat`, `cchchat` и так далее, но не `at`.
- `[hc]?at` соответствует `hat`, `cat` и `at`.
- `[hc]\*at` соответствует `hat`, `cat`, `hhat`, `chat`, `hcat`, `cchchat`, `at` и так далее.
- `cat|dog` соответствует `cat` или `dog`.
- `(\d+)` - получить число из строки
- `сейчас (\w+)` позже – получить слово между `сейчас` и `позже`

### Другие полезные выражения
- `(-?\d+)` получить число (как положительное, так и отрицательное)
- `[+-]?([0-9]+.?[0-9]|.[0-9]+)` получить число с десятичными разрядами (и `.` в качестве десятичного разделителя)
- `[+-]?([0-9]+,?[0-9]|,[0-9]+)` получить число с десятичными разрядами (и `,` в качестве десятичного разделителя)

## Пример уведомления
### Телеграмма
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
- 0x44 - Число или строковое значение не найдено в тексте

## Запуск
Дополнительно к интервалу опроса разбор определенных правил может быть инициирован записью пустого значения (`false`, `0`, '' - зависит от типа состояния) в состояние с §§SSSSS_2 §§ флаг подтверждения.
В этом случае значение будет считано из URL/файла и немедленно проанализировано.

Вы также можете отправить сообщение адаптеру с помощью команды `sendTo`:

```Javascript
sendTo("parser.0", "trigger", "temperatureMunich" /* name of rule, or parser.0.temperatureMunich */, result => {
    console.log(JSON.stringify(result)); // {"value": 10, "error": null}
});
```

## Поддерживать
1. Общее: [Форум ioBroker](https://forum.iobroker.net/). Немецкоязычные пользователи: см. [тему форума ioBroker Parser-Adapter](https://forum.iobroker.net/topic/4494/adapter-parser-regex).
2. В случае возникновения каких-либо проблем, пожалуйста, проверьте [адаптер ioBroker Parser: проблемы GitHub] (https://github.com/ioBroker/ioBroker.parser/issues).

<!--

### **В РАБОТЕ** -->

## Changelog
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