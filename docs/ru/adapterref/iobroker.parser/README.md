---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.parser/README.md
title: адаптер парсера ioBroker
hash: FGppS76zclw9eA0vJc7+VFSafTTQph3XnzQ4ZjBovJ4=
---
![Логотип](../../../en/adapterref/iobroker.parser/admin/parser.png)

![Количество установок](http://iobroker.live/badges/parser-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.parser.svg)
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.parser/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/parser/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.parser.svg)

# адаптер парсера ioBroker

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

Этот адаптер анализирует данные, полученные по URL-адресу или из файла, используя регулярные выражения. Для каждого правила, настроенного в параметрах этого адаптера, будет создано состояние в разделе`parser.<instance number>` и заполнены и обновлены с использованием проанализированной информации.

## Настройки

### 1. Интервал опроса по умолчанию

Если для записи в таблице конфигурации не указано индивидуальное значение интервала опроса (столбец: "Интервал"), будет использоваться значение интервала опроса по умолчанию. Интервал указывается в миллисекундах и определяет, как часто читается ссылка или файл и обновляются состояния.

**Примечание:** Не используйте слишком большой интервал опроса, особенно для URL-адресов веб-сайтов. Например, если вы хотите получить цену своих акций с определенного веб-сайта, вам, вероятно, подойдет интервал всего в 24 часа (= 86400000 мс), если вы не занимаетесь внутридневной торговлей. Если вы попытаетесь получить данные с определенных URL-адресов слишком часто, веб-сайт может заблокировать вас и внести в черный список сервера. Поэтому, пожалуйста, используйте интервал опроса с осторожностью.

### 2. Истекло время ожидания запроса.

Укажите, как долго адаптер ожидает HTTP-ответа при выполнении запросов к веб-сайту.

### 3. Задержка между запросами

Укажите, какое время адаптер ожидает между отправкой HTTP-запросов при выполнении удаленных запросов. Это полезно при получении данных с медленных хостов или по медленным соединениям, чтобы избежать перегрузки ни одного из них. Ноль (по умолчанию) означает отсутствие задержки.

Эта задержка применяется к каждому хосту отдельно. Если удаленные запросы настроены на получение данных с нескольких удаленных хостов, то запросы к каждому хосту будут выполняться параллельно.

Задержка — это минимальное значение между инициированием каждого запроса. То есть, если чтение запроса занимает больше времени, чем заданное значение задержки, следующий запрос начнётся сразу после завершения чтения.

### 4. Принимать недействительные сертификаты.

Укажите, принимаются или отклоняются самоподписанные/недействительные SSL/TLS-сертификаты при выполнении HTTPS-запросов.

### 5. Используйте небезопасный HTTP-парсер.

Укажите, что следует использовать небезопасный HTTP-парсер, принимающий недопустимые HTTP-заголовки. Это может обеспечить совместимость с несоответствующими стандартам реализациями HTTP. Использование небезопасного парсера следует избегать.

### 6. Таблица

Нажмите кнопку «Плюс», чтобы добавить новую запись в таблицу.

**Примечание по производительности:** Если вы введете один и тот же URL-адрес или имя файла несколько раз в разные строки таблицы, и если значения столбца «Интервал» одинаковы, содержимое URL-адреса или имени файла будет получено только **один раз** и кэшировано для обработки нескольких строк таблицы, соответствующих URL/имени файла и интервалу. Это позволяет применять несколько регулярных выражений (следовательно, несколько строк таблицы) к одному URL-адресу или имени файла без необходимости многократного получения данных из источника.

**Поля таблицы:**

- **_Название_** - название государства, которое создается в рамках`parser.<instance number>` Пробелы не допускаются. Можно использовать точки.`.` в качестве разделителя для создания подпапок. Пример:`Shares.Microsoft.Current` приведет к`parser.<instance number>.Shares.Microsoft.Current` .
- **_URL или имя файла_** — это либо URL-адрес веб-сайта, либо путь к файлу, информацию из которого мы хотим получить. Примеры.`https://darksky.net/forecast/48.1371,11.5754/si24/de` (информация о погоде в Мюнхене), или`/opt/iobroker/test/testdata.txt` (файл из ioBroker).
- **_RegEx_** — регулярное выражение, как извлечь данные из ссылки. Существует хороший сервис для тестирования регулярных выражений: [regex101](https://regex101.com/) . Например:`temp swip">(-?\d+)˚<` для строки выше.
- **_Item_** (нем. "Num") - регулярное выражение, которое может найти (соответствовать) нескольким записям. С помощью этой опции вы можете указать, какое совпадение будет выбрано. 0 = первое совпадение, 1 = второе совпадение, 2 = третье совпадение и т. д. По умолчанию - 0 (первое совпадение).
- **_Роль_** - одна из ролей:
  - Пользователь определяет свою роль через _администратора_ .
  - температура - значение равно температуре
  - Значение — это число (например, диммер).
  - жалюзи - значение представляет собой положение жалюзи
  - переключатель — значение указывает на положение переключателя (истина/ложь).
  - кнопка - значением является кнопка
  - индикатор - логический индикатор
- **_Тип_** — тип переменной, выбираемый из выпадающего меню.
- **_Единица измерения_** — необязательно: единица измерения суммы, добавляемой к записи о состоянии. Например:`°C` ,`€` ,`GB` , и т. д.
- **_Старый_** — Если эта функция активирована, состояние _не_ будет обновляться, если значение не может быть прочитано или найдено в указанной дате (URL или файле), поэтому в этом случае будет сохранено прежнее значение.
- **_Замена_** - Необязательно: замените URL-адрес или имя файла. Этот заменяющий URL-адрес/имя файла будет использован, если URL-адрес/имя файла из первого столбца недоступны.
- **_Коэффициент/смещение_** (только для номеров типа) — позволяет изменять полученные данные перед их установкой в состояние:
  - _Вычисленное значение_ = _извлеченное значение_ \* коэффициент + смещение, чтобы немедленно внести изменения в значение.
- **_Интервал_** — интервал опроса в миллисекундах (мс). Если поле пустое или равно 0, будет использоваться интервал опроса по умолчанию. Дополнительную информацию см. выше.

## Пример настроек

| Имя                    | URL или имя файла                                      | Регекс                               | Роль         | Тип        | Единица | Интервал |
| ---------------------- | :----------------------------------------------------- | :----------------------------------- | ------------ | ---------- | ------- | -------- |
| температураМюнхен      | `https://darksky.net/forecast/48.1371,11.5754/si24/de` | `temp swip">(-?\d+)˚<`               | температура  | число      | °С      | 180000   |
| форумБег               | `http://forum.iobroker.net/`                           | `Forum`                              | индикатор    | логический |         | 60000    |
| облачный запуск        | `https://iobroker.net/`                                | `Privacy Notice`                     | индикатор    | логический |         | 60000    |
| температура процессора | `/sys/devices/virtual/thermal/thermal_zone0/temp`      | `(.*)`                               | температура  | число      | °С      | 30000    |
| stockPrice.Visa        | `https://www.finanzen.net/aktien/visa-aktie`           | `\d{0,3},\d{2}(?=<span>EUR<\/span>)` | ценить       | число      | €       | 86400000 |
| kleinanzeigen          | `https://www.ebay-kleinanzeigen.de/s-iobroker/k0`      | `data-href="(.*?).">`                | по умолчанию | нить       |         | 600000   |

_Примечание:_ При применении регулярных выражений к полученным данным URL/файла все переносы строк будут заменены пробелами для обеспечения возможности многострочного поиска.

## О регулярных выражениях (RegExp)

Регулярные выражения — это мощный инструмент для анализа и извлечения определенных данных из строк, и, что еще важнее, они позволяют извлекать определенные значения/текст из заданной строки (например, из HTML-кода веб-страницы или текста из файла) путем применения правил.

Для логических типов регулярное выражение довольно простое. Для числовых типов число следует обозначать скобками.`()` Например, чтобы извлечь число из _значения "Температура составляет 5°C",_ следует использовать` (\d+)` выражение.

Дополнительная информация о RegExp:

- [Документация MDN/Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
- [regex101: онлайн-инструмент для создания и тестирования регулярных выражений.](https://regex101.com/)

### Примеры

- `.at` соответствует любой трехсимвольной строке, заканчивающейся на`at` , включая`hat` ,`cat` , и`bat` .
- `[hc]at` матчи`hat` и`cat` .
- `[^b]at` соответствует всем строкам, найденным по .at, кроме`bat` .
- `[^hc]at` соответствует всем строкам, найденным с помощью .at, кроме`hat` и`cat` .
- `^[hc]at` матчи`hat` и`cat` , но только в начале строки или блока.
- `[hc]at$` матчи`hat` и`cat` , но только в конце строки или линии.
- `\[.\]` соответствует любому отдельному символу, окруженному`[` и`]` поскольку скобки экранированы, например:`[a]` и`[b]` .
- `s.\*` соответствует символу s, за которым следует ноль или более символов, например:`s` и`saw` и`seed` .
- `[hc]+at` матчи`hat` ,`cat` ,`hhat` ,`chat` ,`hcat` ,`cchchat` и так далее, но не`at` .
- `[hc]?at` матчи`hat` ,`cat` , и`at` .
- `[hc]\*at` матчи`hat` ,`cat` ,`hhat` ,`chat` ,`hcat` ,`cchchat` ,`at` , и так далее.
- `cat|dog` матчи`cat` или`dog` .
- `(\d+)` - получить число из строки
- `now (\w+)` позже - получите слово между`now` и`later`

### Другие полезные выражения

- `(-?\d+)` Получить число (как отрицательное, так и положительное).
- `[+-]?([0-9]+.?[0-9]|.[0-9]+)` получить число с десятичными знаками (и`.` (в качестве десятичного разделителя)
- `[+-]?([0-9]+,?[0-9]|,[0-9]+)` получить число с десятичными знаками (и`,` (в качестве десятичного разделителя)

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

Ценности могут иметь коды качества:

- 0 - ОК
- 0x82 — URL-адрес или файл не могут быть прочитаны.
- 0x44 — Числовое или строковое значение не найдено в тексте

## Запуск

Кроме интервала опроса, разбор конкретных правил может быть запущен путем записи пустого значения.`false` ,`0` , '' - зависит от типа государства) к государству с`false` Флаг подтверждения. В этом случае значение будет считано из URL/файла и немедленно обработано.

Вы также можете отправить сообщение адаптеру с помощью`sendTo` команда:

```Javascript
sendTo("parser.0", "trigger", "temperatureMunich" /* name of rule, or parser.0.temperatureMunich */, result => {
    console.log(JSON.stringify(result)); // {"value": 10, "error": null}
});
```

## Поддерживать

1. Общие вопросы: [форум ioBroker](https://forum.iobroker.net/) . Для пользователей, говорящих на немецком языке: см. [тему на форуме ioBroker «Parser-Adapter»](https://forum.iobroker.net/topic/4494/adapter-parser-regex) .
2. В случае возникновения каких-либо проблем, пожалуйста, ознакомьтесь с информацией [на GitHub в разделе "Проблемы" адаптера ioBroker Parser Adapter](https://github.com/ioBroker/ioBroker.parser/issues) .

<!--
	### **WORK IN PROGRESS**
-->

## Changelog
### 4.0.1 (2026-08-03)
* (@GermanBluefox) Migrated for admin 8

### 3.1.0 (2026-04-13)
* (bluefox) Updated dependencies
* (TA2k) Fixed disabled rules still being polled when sharing an interval
* (bluefox) Fixed possible problems
* (bluefox) Added possibility to use CRON as an interval

### 3.0.0 (2026-03-03)
* (bluefox) Migrated the new NPM token
* (bluefox) Migrated to TypeScript
* (bluefox) Added parsing of states, ioBroker files and logs
* (bluefox) Fixing position marking in the test dialog
* (bluefox) Added mobile view
* (bluefox) Minimal Node.js version is now 20
* (bluefox) Added export import via CSV file

### 2.3.1 (2025-03-24)
* (bluefox) Migrated the admin GUI to TypeScript

### 2.2.4 (2024-08-26)
* (bluefox) updated packages
* (bluefox) corrected a problem with the creation of rule

### 2.2.2 (2024-07-14)
* (bluefox) GUI was migrated for admin v7

### 2.1.0 (2023-12-14)
* (mcm1957) Only node 16 and higher is supported

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

Copyright (c) 2017-2026 bluefox <dogafox@gmail.com>

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