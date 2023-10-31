![Logo](admin/parser.png)
# ioBroker parser adapter

![Number of Installations](http://iobroker.live/badges/parser-installed.svg)
![Number of Installations](http://iobroker.live/badges/parser-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.parser.svg)](https://www.npmjs.com/package/iobroker.parser)

![Test and Release](https://github.com/ioBroker/ioBroker.parser/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/parser/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.parser.svg)](https://www.npmjs.com/package/iobroker.parser)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

This adapter parses data received via URL or from a file, by using regular expressions. For each rule being configured in the settings of this adapter, a state will be created under `parser.<instance number>` and filled and updated with the parsed information.

## Settings
### 1. Default poll interval
This default poll interval value will be used if no individual poll interval value is specified for an entry in the configuration table (column: "Interval"). The interval is in milliseconds and defines how often the link or file is being read and the states are being updated.

**Note:**
Do not use a too aggressive poll interval especially for website URLs. For example, if you want to retrieve the price of your shares from a certain website, you probably should be good with an interval of just every 24 hours (= 86400000 ms), if you are not a day trader. If you try to retrieve data from certain URLs too often, the website may ban you and put you on a server blacklist. So please use the poll interval with care.

### 2. Request timeout
Specify how long the adapter waits for an HTTP response when doing website queries

### 3. Delay between requests
Specify how long the adapter waits between making HTTP requests when performing remote queries. Useful when retrieving data from slow hosts or over slow connections to avoid overloading either one. Zero (default) means no delay.

This delay is on a per-host basis. If remote queries are configured to fetch from multiple remote hosts, each host will be queried in parallel.

The delay is a minimum value between initiating each request. I.e., if a query takes longer than this delay parameter to be read, the next will start instantly the read completes.

### 4. Accept invalid certificates
Specify if self-signed/invalid SSL/TLS certificates are accepted or declined when doing HTTPS requests

### 5. Use insecure HTTP parser
Specify to use an insecure HTTP parser that accepts invalid HTTP headers. This may allow interoperability with non-conformance HTTP implementations.
Using the insecure parser should be avoided.

### 6. Table
Click the "Plus" button to add a new entry to the table.

**Performance Note:**
If you enter the same URL or filename more than once into different table rows, and if the values of the column "Interval" are the same, the content of the URL or filename will be retrieved only **once** and cached for processing multiple table rows matching URL/filename and Interval. This allows you to apply multiple regex (so multiple table rows) to a single URL or filename, without the need of retrieving the data multiple times from the source.

**Table fields:**

- **_Name_** - name of state that is being created under `parser.<instance number>`. Spaces are not allowed. You can use dots `.` as separator to create sub folders. Example: `Shares.Microsoft.Current` will result in `parser.<instance number>.Shares.Microsoft.Current`.
- **_URL or file name_** - either a URL of a website or the path to a file of which we want to retrieve information. Examples `https://darksky.net/forecast/48.1371,11.5754/si24/de` (weather information Munich), or `/opt/iobroker/test/testdata.txt` (file from within ioBroker).
- **_RegEx_** - regular expression, how to extract data from a link. There is a good service to test regula expressions: [regex101](https://regex101.com/). E.g. `temp swip">(-?\d+)˚<` for the line above.
- **_Item_** (German: "Num") - a regex can find (match) multiple entries. With this option you can define which match to be chosen. 0 = first match, 1 = second match, 2 = third match, etc. Default is 0 (first match).
- **_Role_** - one of the roles:
    - custom - user defines itself via _admin_ the role
    - temperature - the value is temperature
    - value - the value is a number (e.g. dimmer)
    - blinds - the value is a blind position
    - switch - the value is switch position (true/false)
    - button - the value is a button
    - indicator - boolean indicator
- **_Type_** - the type of variable per the pull-down menu.
- **_Unit_** - Optional: unit of the value added to the state entry. E.g. `°C`, `€`, `GB`, etc.
- **_Old_** - If activated, the state will _not_ be updated if the value cannot be read or found in the provided date (URL or file), so it will keep the former value in this case.
- **_Subs_** - Optional: substitute URL or file name. This substitute URL/filename will be used if the URL/file name of the first column is not available.
- **_Factor/Offset_** (for "Type" numbers only) - allows to modify the retrieved data prior to set into the state:
  -   _calculated value_ = _extracted value_ \* factor + offset , to make immediately modifications of value
- **_Interval_** - poll interval in ms (milliseconds). If blank or 0, the default poll interval will be used. Please see further information above.

## Sample settings

| Name              | URL or file name                                       | RegEx                                | Role        | Type    | Unit | Interval |
| ----------------- | :----------------------------------------------------- | :----------------------------------- | ----------- | ------- | ---- | -------- |
| temperatureMunich | `https://darksky.net/forecast/48.1371,11.5754/si24/de` | `temp swip">(-?\d+)˚<`               | temperature | number  | °C   | 180000   |
| forumRunning      | `http://forum.iobroker.net/`                           | `Forum`                              | indicator   | boolean |      | 60000    |
| cloudRunning      | `https://iobroker.net/`                                | `Privacy Notice`                     | indicator   | boolean |      | 60000    |
| cpuTemperature    | `/sys/devices/virtual/thermal/thermal_zone0/temp`      | `(.*)`                               | temperature | number  | °C   | 30000    |
| stockPrice.Visa   | `https://www.finanzen.net/aktien/visa-aktie`           | `\d{0,3},\d{2}(?=<span>EUR<\/span>)` | value       | number  | €    | 86400000 |
| kleinanzeigen     | `https://www.ebay-kleinanzeigen.de/s-iobroker/k0`      | `data-href="(.*?).">`                | default     | string  |      | 600000   |

*Note:* While applying regex to the retrieved URL/file data, all line breaks will be replaced with spaces to allow multi-line search.

## About Regular expressions (RegExp)
Regular expressions are a powerful tool to parse and extract certain data from strings, and even more important: it allows to extract certain values/text from a given string (like from the HTML of a webpage, or text from a file) by applying rules.

For boolean types, the regex is rather simple. For numeric types, you should mark the number with brackets - `()`. E.g. to extract the number from *The temperature is 5°C* you should use ` (\d+)` expression.

Further information on RegExp:
-   [MDN/Mozilla Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
-   [regex101: online tool to create and test regular expressions](https://regex101.com/)

### Examples
- `.at` matches any three-character string ending with `at`, including `hat`, `cat`, and `bat`.
- `[hc]at` matches `hat` and `cat`.
- `[^b]at` matches all strings matched by .at except `bat`.
- `[^hc]at` matches all strings matched by .at other than `hat` and `cat`.
- `^[hc]at` matches `hat` and `cat`, but only at the beginning of the string or line.
- `[hc]at$` matches `hat` and `cat`, but only at the end of the string or line.
- `\[.\]` matches any single character surrounded by `[` and `]` since the brackets are escaped, for example: `[a]` and `[b]`.
- `s.\*` matches s followed by zero or more characters, for example: `s` and `saw` and `seed`.
- `[hc]+at` matches `hat`, `cat`, `hhat`, `chat`, `hcat`, `cchchat`, and so on, but not `at`.
- `[hc]?at` matches `hat`, `cat`, and `at`.
- `[hc]\*at` matches `hat`, `cat`, `hhat`, `chat`, `hcat`, `cchchat`, `at`, and so on.
- `cat|dog` matches `cat` or `dog`.
- `(\d+)` - get the number from string
- `now (\w+)` later - get the word between `now` and `later`

### Other useful expressions
- `(-?\d+)` get number (both negative and positive numbers)
- `[+-]?([0-9]+.?[0-9]|.[0-9]+)` get a number with decimal places (and `.` as decimal separator)
- `[+-]?([0-9]+,?[0-9]|,[0-9]+)` get a number with decimal places (and `,` as decimal separator)

## Notification Example
### Telegram
```Javascript
on("parser.0.kleinanzeigen", (obj) => {
    sendTo("telegram.0", {
        text: "https://www.ebay-kleinanzeigen.de" + obj.state.val,
    });
});
```

## Quality codes
Values can have quality codes:
- 0 - OK
- 0x82 - The URL or file cannot be read.
- 0x44 - Number or string value not found in the text

## Triggering
Additionally, to the polling interval, the parsing of specific rules can be triggered by writing of empty value (`false`, `0`, '' - depends on the type of state) to the state with `false` acknowledge flag.
In this case, the value will be read from the URL/file and parsed immediately.

You can also send a message to adapter with `sendTo` command:
```Javascript
sendTo("parser.0", "trigger", "temperatureMunich" /* name of rule, or parser.0.temperatureMunich */, result => {
    console.log(JSON.stringify(result)); // {"value": 10, "error": null}
});
```

## Support
1. General: [ioBroker Forum](https://forum.iobroker.net/). German-speaking users: see [ioBroker forum thread Parser-Adapter](https://forum.iobroker.net/topic/4494/adapter-parser-regex).
2. In case of any issues, please check out [ioBroker Parser Adapter: GitHub Issues](https://github.com/ioBroker/ioBroker.parser/issues).

<!--
	### **WORK IN PROGRESS**
-->
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
