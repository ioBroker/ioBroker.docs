---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.signal-cmb/README.md
title: ioBroker.signal-cmb
hash: z8ko8/wZBLuqpA4NrhvLfQJ/89LtGyxY9JDC6wI4g4c=
---
![Logo](../../../en/adapterref/iobroker.signal-cmb/admin/signal-cmb.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.signal-cmb.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.signal-cmb.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/ioBroker/iobroker.signal-cmb.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/ioBroker/ioBroker.signal-cmb/badge.svg)
![NPM](https://nodei.co/npm/iobroker.signal-cmb.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/ioBroker/ioBroker.signal-cmb/master.svg)

# IoBroker.signal-cmb
-->

-->

**Tests**: [![Test und Freigabe](https://github.com/necotec/ioBroker.signal-cmb/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/necotec/ioBroker.signal-cmb/actions/workflows/test-and-release.yml)

## Signal-cmb-Adapter für ioBroker
Dank des kostenlosen [CallMeBot](https://www.callmebot.com/blog/free-api-signal-send-messages/)-Dienstes können Sie mit diesem Adapter Signalnachrichten an sich selbst oder an eine andere Nummer senden.

**Hinweis** : *Die kostenlose API ist nur für den persönlichen Gebrauch bestimmt!*

### Aufbau
*Folgende Dokumentation wurde von [callmebot](https://www.callmebot.com/blog/free-api-signal-send-messages/) Seite kopiert.*

Sie müssen den API-Schlüssel vom Bot abrufen, bevor Sie die API verwenden:

- Fügen Sie die Telefonnummer **+34 603 21 25 97** zu Ihren Telefonkontakten hinzu. (Nennen Sie es, wie Sie möchten.)
- Senden Sie diese Nachricht „Ich erlaube Callmebot, mir Nachrichten zu senden“ (auf Englisch) an den neu erstellten Kontakt (natürlich mit Signal).
- Warten Sie, bis Sie die Meldung „API aktiviert für Ihre Telefonnummer“ erhalten. Ihr APIKEY ist 123123` vom Bot. Da sich dies noch im Beta-Test befindet, kann die Aktivierung bis zu 2 Minuten dauern.
- Die Signalnachricht vom Bot enthält den API-Schlüssel, der zum Senden von Nachrichten über die API erforderlich ist.
- Sie können jetzt den API KEY in der ioBroker-Konfiguration verwenden.

Beispiel: ![Beispiel](../../../en/adapterref/iobroker.signal-cmb/img/signal.jpg)

### Verwendungszweck
Es gibt zwei Möglichkeiten, eine Nachricht zu senden:

- über `signal-cmb.0.sendMessage`. Schreiben Sie einfach einen Text in diesen Zustand und die Nachricht wird an die Standardnummer gesendet, die im Einstellungsdialog konfiguriert wurde.
- per Nachricht vom Javascript-Adapter:

```
sendTo('signal-cmb.0', 'send', {
    text: 'My message',
    phone: '+491234567890' // optional, if empty the message will be sent to the default configured number
});
```

![Blockartig](../../../en/adapterref/iobroker.signal-cmb/img/blockly-signal.png)

## **IN ARBEIT**
* Einige Änderungen vorgenommen
* Habe noch ein paar Änderungen vorgenommen

-->

### 0.1.7 (16.02.22)
* (derAlff) Versionswechsel für NPM

### 0.1.6 (2022-01-22)
* (derAlff) Veröffentlicht auf npm
* (derAlff) README.md aktualisiert
* (derAlff) Übersetzte Beschreibung in io-package.json
* (derAlff) ConnectionType auf Cloud geändert
* (derAlff) Nativer Teil geändert

### 0.1.5 (2022-01-22)
* (derAlff) Blockly-Problem behoben

### 0.1.4 (2022-01-22)
* (derAlff) io-package.json und package.json aktualisiert.
* (derAlff) „messagebox“ hinzugefügt: true to io-package.json.
* (derAlff) Geänderte Telefonnummer in der Admin-Seite.

### 0.1.3 (2022-01-21)
* (derAlff) README.md, io-package.json und package.json aktualisiert

### 0.1.0
* (derAlff) Release getestet und laufende Version 0.1.0

### 0.0.1 (2022-01-21)
* (derAlff) Erstveröffentlichung.

## Machen
* Fügen Sie ein Telefonbuch hinzu
* Mehrere Benutzer hinzufügen (Telefonnummern und API-Keys)

## Changelog
<!--
Placeholder for the next version (at the beginning of the line):

## License
MIT License

Copyright (c) 2022 derAlff <derAlff@gmail.com>

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