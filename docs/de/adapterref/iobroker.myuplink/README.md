---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.myuplink/README.md
title: ioBroker.myuplink
hash: FUesn9bNELv4MJOxaed5prn9MNSB85YuwkWRxt57Lec=
---
# IoBroker.myuplink

![NPM-Version](https://img.shields.io/npm/v/iobroker.myuplink.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/myuplink-stable.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.myuplink.svg)
![Anzahl der Installationen](https://iobroker.live/badges/myuplink-installed.svg)
![NPM](https://nodei.co/npm/iobroker.myuplink.png?downloads=true)

[![Build-Status](https://github.com/sebilm/ioBroker.myuplink/workflows/Test%20and%20Release/badge.svg)](https://github.com/sebilm/ioBroker.myuplink/actions/workflows/test-and-release.yml)

## Myuplink.com-Adapter für ioBroker
Dieser ioBroker-Adapter empfängt Daten von myUplink.com.

## Verwendung dieses Adapters
1. Sie benötigen eine kompatible Wärmepumpe von NIBE, AIT, Cetetherm, ClimateMaster, Contura, CTA, CTC, Enertech Global oder Høiax – kaufen Sie eine, wenn Sie keine haben ;-)
2. Sie benötigen ein Konto bei myUplink: https://myuplink.com
3. Gehen Sie zu myUplink Api: https://dev.myuplink.com/ und melden Sie sich an
4. Klicken Sie auf „Anwendungen“ und dann auf „Neue Anwendung erstellen“.
5. Füllen Sie Folgendes aus: Name und Beschreibung können alles sein, z. B. ioBroker
6. Die Rückruf-URL ist wichtig für den Autorisierungscode-Gewährungsfluss. Sie können https://sebilm.github.io/ioBroker.myuplink/myuplink.html verwenden
7. Akzeptieren Sie die myUplink API Services-Vereinbarung und klicken Sie auf „Erstellen“.
8. Dann erhalten Sie einen Identifikator und ein Geheimnis – wir brauchen sie
9. Installieren Sie diesen Adapter in ioBroker
10. Geben Sie auf der Seite mit den Adaptereinstellungen die Kennung und das Geheimnis ein.
11. Wählen Sie Ihre Sprache und alle anderen Einstellungen.
12. Klicken Sie auf Speichern und schließen

Jedes Gerät verfügt über ein Objekt im Objektbaum namens `setData`. Sie können ein JSON-Objekt des Formulars eingeben

```json
{
    "12345": "42",
    "23456": "1"
}
```

in diesem Objekt. Dadurch ist es möglich, mehrere Datenpunkte gleichzeitig an die API zu senden und zu ändern.
Es kann auch verwendet werden, um Datenpunkte zu ändern, die nicht von der API gesendet werden.

## Changelog

### 0.6.0 (2024-01-28)

-   The setData object has been added

### 0.5.0 (2024-01-14)

-   Parameter IDs and categories have been added for a few heat pumps

### 0.4.1 (2024-01-13)

-   In object IDs, all characters that are not officially supported are now replaced by an underscore
-   The roles of the data objects have been improved
-   The logging of token data (in log level silly) has been removed
-   Dependencies have been updated

### 0.4.0 (2023-12-31)

-   New options for renaming IDs have been added #5
-   Options are deactivated if checkboxes are not checked

### 0.3.0 (2023-12-29)

-   Support for setting parameter values has been added (must be paid for at myuplink.com) #4
-   Authorization Code Grant Flow settings have been moved to new Extended tab
-   Password control will be used for Secret and Auth Code

### 0.2.1 (2023-12-28)

-   All responsive sizes have been added to jsonConfig
-   More error logging have been added

### 0.2.0 (2023-12-28)

-   Settings page have been changed from materialize to jsonConfig
-   Dependencies have been updated

### 0.1.0 (2023-12-25)

-   Initial release

## License

MIT License

Copyright (c) 2024 Sebastian Häßelbarth <seb@sebmail.de>

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