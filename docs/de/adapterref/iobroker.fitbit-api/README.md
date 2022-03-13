---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.fitbit-api/README.md
title: ioBroker.fitbit
hash: QstE+x5U2KmsGRjHON+ZKYEezYoe46wOa+zHoYySNbA=
---
![Logo](../../../en/adapterref/iobroker.fitbit-api/admin/fitbit-api.png)

![Anzahl der Installationen](http://iobroker.live/badges/fitbit-api-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.fitbit-api.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.fitbit-api.svg)

# IoBroker.fitbit
![Testen und freigeben](https://github.com/iobroker-community-adapters/ioBroker.fitbit-api/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/fitbit-api/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

Dieser Adapter zieht Daten von der Fitbit-API!

## Aufbau
![Schritt 1](../../../en/adapterref/iobroker.fitbit-api/img/step1.png)

Drücken Sie die Schaltfläche "Autorisieren".

Danach könnten Sie aufgefordert werden, Ihre Zugangsdaten erneut einzugeben, oder wenn der Browser-Cache noch die Cookies enthält, könnte dies automatisch erfolgen.

![Schritt 2](../../../en/adapterref/iobroker.fitbit-api/img/step2.png)

![Schritt 3](../../../en/adapterref/iobroker.fitbit-api/img/step3.png)

![Schritt 4](../../../en/adapterref/iobroker.fitbit-api/img/step4.png)

Dann erscheinen `access token` und `refresh token`. Sie sind schreibgeschützt.

Wenn der Vorgang bei Ihnen nicht funktioniert, können Sie versuchen, das Zugriffstoken manuell zu erhalten: https://dev.fitbit.com/apps/oauthinteractivetutorial

## Mehrere Benutzer
Um die Daten für mehrere Benutzer (z. B. Familienmitglieder) zu lesen, müssen Sie die Cookies im Browser löschen und eine zusätzliche Instanz dieses Adapters erstellen.

Wichtig: Wenn Sie die Browser-Cookies nicht löschen, werden Sie mit dem letzten gültigen Benutzer angemeldet.

## Entwicklung
Die API wurde gemäß https://dev.fitbit.com/build/reference/web-api/basics/ implementiert.

## Changelog

### 0.1.1 (2019-11-06)
* (bluefox) initial release

## License
The MIT License (MIT)

Copyright 2019-2022, bluefox <dogafox@gmail.com>

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