---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.openweathermap/README.md
title: ioBroker.openweathermap
hash: KqS96qVOvaFO5plNp1uz68xyYBPYgrCYbC5hVGI/1/k=
---
![Logo](../../../en/adapterref/iobroker.openweathermap/admin/openweathermap.svg)

![Anzahl der Installationen](http://iobroker.live/badges/openweathermap-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.openweathermap.svg)
![Test und Freigabe](https://github.com/ioBroker/ioBroker.openweathermap/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/openweathermap/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.openweathermap.svg)

# ioBroker.openweathermap

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Ruft die 5-Tage-Wettervorhersage von [https://openweathermap.org/](https://github.com/ioBroker/ioBroker.openweathermap/blob/master/openweathermap.org) ab.

Sie benötigen einen API-Schlüssel, um auf die Daten zuzugreifen. Den API-Schlüssel erhalten Sie kostenlos nach der Registrierung [hier](https://home.openweathermap.org/api_keys) .

<!--
	### **WORK IN PROGRESS**
-->

## Changelog
### 2.0.1 (2026-09-08)
* (@GermanBluefox) The weather widget is now shown as a live preview in the admin configuration too

### 2.0.0 (2026-08-16)
* (@JDCodes) Added feels_like temperature, visibility and the day name (long and short) as text
* (@JDCodes) Daily rain and snow are now totals and not averages
* (@JDCodes) Fixed NaN for rain and snow
* (@GermanBluefox) Minimal supported Node.js version is now 22
* (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now

### 1.4.0 (2025-08-03)
* (@tt-tom17) Added wind direction as text

### 1.3.0 (2025-05-21)
* (bluefox) Widget was completely ported to TypeScript
* (bluefox) Backend was completely ported to TypeScript

### 1.2.0 (2024-07-23)
* (bluefox) Widget was partly ported to TypeScript

[Older changelogs can be found there](https://github.com/ioBroker/ioBroker.openweathermap/blob/master/CHANGELOG_OLD.md)

## License

The MIT License (MIT)

Copyright (c) 2018-2026 bluefox <dogafox@gmail.com>

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