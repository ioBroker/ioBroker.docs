---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.unifi-protect/README.md
title: ioBroker.unifi-protect
hash: w7zo2bNe6JcYU812u6HwTJcS0GsV17BV7u9LbcNJcNs=
---
![Logo](../../../en/adapterref/iobroker.unifi-protect/admin/unifi-protect.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.unifi-protect.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.unifi-protect.svg)
![Anzahl der Installationen (neueste)](http://iobroker.live/badges/unifi-protect-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/unifi-protect-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/peterbaumert/iobroker.unifi-protect.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/peterbaumert/ioBroker.unifi-protect/badge.svg)
![NPM](https://nodei.co/npm/iobroker.unifi-protect.png?downloads=true)

# IoBroker.unifi-protect
**Dieser Adapter verwendet den Dienst [Sentry.io](https://sentry.io), um mir als Entwickler automatisch Ausnahmen und Codefehler sowie neue Geräteschemas zu melden.** Weitere Details siehe unten!

## Unifi-Protect-Adapter für ioBroker
Stellt eine Verbindung zum Unifi Protect Controller her und zieht alle Daten von hinzugefügten Kameras.

Standard Ports falls nicht selbst geändert:

 - Cloud Key Plus Gen2: 7443
 -UDM Pro: 443

## Beispiele für getThumbnail und getSnapshot
```
// Settings
const path = '/opt/iobroker/tmp/temp.jpg';
const threshold = 50;

// Send to Telegram ( or what you prefer )
function sendImage(path) {
    sendTo('telegram.0', path);
}

//Trigger Script
on({ id: 'unifi-protect.0.motions.lastMotion.thumbnail', change: "ne" }, function () {
    const thumb = getState('unifi-protect.0.motions.lastMotion.thumbnail'/*thumbnail*/).val;
    const end = getState('unifi-protect.0.motions.lastMotion.end'/*thumbnail*/).val;
    const cameraid = getState('unifi-protect.0.motions.lastMotion.camera'/*thumbnail*/).val;
    const score = getState('unifi-protect.0.motions.lastMotion.score'/*thumbnail*/).val;
    if (score < threshold) { return; }
    // if Event has ended send the Thumbnail otherwise get current Snapshot
    if (end != null) {
        sendTo('unifi-protect.0', 'getThumbnail', { "thumbnail": thumb, "path": path }, function (res) {
            sendImage(path);
        });
    } else {
        sendTo('unifi-protect.0', 'getSnapshot', { "cameraid": cameraid, "path": path }, function (res) {
            sendImage(path);
        });
    }
});
```

```
sendTo('unifi-protect.0', 'getSnapshot', { "cameraid": "5e4a861c01d12503870003f9", "path": path }, function (res) {
    sendImage(path);
});
```

## Was ist Sentry.io und was wird an die Server dieser Firma gemeldet?
Sentry.io ist ein Dienst für Entwickler, um sich einen Überblick über Fehler in ihren Anwendungen zu verschaffen. Und genau das ist in diesem Adapter umgesetzt.

Wenn der Adapter abstürzt oder ein anderer Codefehler auftritt, wird diese Fehlermeldung, die auch im ioBroker-Protokoll erscheint, an Sentry übermittelt. Wenn Sie der iobroker GmbH erlaubt haben, Diagnosedaten zu sammeln, dann ist auch Ihre Installations-ID (dies ist nur eine eindeutige ID **ohne** zusätzliche Informationen über Sie, E-Mail, Name oder ähnliches) enthalten. Dadurch kann Sentry Fehler gruppieren und anzeigen, wie viele einzelne Benutzer von einem solchen Fehler betroffen sind. All dies hilft mir, fehlerfreie Adapter bereitzustellen, die im Grunde nie abstürzen.

## **IN ARBEIT**
* Aktualisierungen der Abhängigkeiten
* Erste Implementierung von Echtzeit-Updates api
* lastMotion, lastRing, lcdMessage und smartDetectZone in realTimeEvents
* (Scrounger) Schaltfläche zum Erstellen eines manuellen Schnappschusses hinzugefügt
* (Scrounger) Datenpunkte für Echtzeitereignisse für jede Kamera hinzugefügt
* (Scrounger) Schnappschuss und Vorschaubild für Echtzeitereignisse hinzugefügt (base64-Bilder)
* (Scrounger) Miniaturbild für Liste der Bewegungsereignisse hinzugefügt (Base64-Bilder)
* (Scrounger) kleines Vorschaubild für Liste von Bewegungsereignissen und Echtzeitereignissen hinzugefügt (Base64-Bilder)
* (Scrounger) Kameraname für Liste von Bewegungsereignissen hinzugefügt

### 0.0.12 (2021-03-14)
* Intelligente Erkennungen hinzugefügt
* Einige LastMotion-Sachen behoben
* UnifiOs-Unterstützung für CloudKey hinzugefügt

### 0.0.11 (2020-02-27)
* Die Admin-Oberfläche wurde ein wenig geändert
* Beschreibung für Hafen hinzugefügt
* UDM Pro beschreibbare Status behoben

### 0.0.10 (2020-02-26)
* travis ci für Integrationstests behoben
* Verwenden Sie tatsächlich die letzte x-Bewegungseinstellung

### 0.0.9 (2020-02-21)
* lastMotion der Kamera wird nur bei Bedarf aktualisiert
* erste UDM-Integrationen, das Ändern von Einstellungen funktioniert noch nicht

### 0.0.8 (2020-02-17)
* Bewegungsereignisse optional gemacht (Letzte Bewegung wird immer gespeichert)
* Intervall und "letzte x Sekunden der Bewegungen" einstellbar gemacht
* Alte Bewegungen richtig löschen

### 0.0.7 (2020-02-09)
* Bewegungsereignisse kontinuierlich aktualisieren
* geänderte Datenstruktur
* lastMotion Datapoint zu jeder Kamera hinzugefügt

### 0.0.6 (2020-02-08)
* Einige Einstellungen änderbar machen (Name, osdSettings.*, recordingSettings.mode, ledSettings.isEnabled)

### 0.0.5 (2020-02-07)
* neues Logo
* Datenpunkte für Bewegungsereignisse hinzugefügt

### 0.0.4 (2020-02-05)
* Release-Script-Test und einige Readme-Änderungen

### 0.0.3 (03.02.2020)
* (Peter Baumert) erster Arbeits-RLS auf npm

### 0.0.1
* (Peter Baumert) Erstveröffentlichung

## Code-Nutzung
Der Code in [protect_api](./protect_api) wird meistens von [hjdhjds homebridge-unifi-protect](https://github.com/hjdhjd/homebridge-unifi-protect).
Vielen Dank für die Bereitstellung dieses Codes. Seine Codes-Lizenz finden Sie in [hier](https://github.com/hjdhjd/homebridge-unifi-protect/blob/master/LICENSE.md).

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ## **WORK IN PROGRESS**
-->

## License
MIT License

Copyright (c) 2020-2022 Peter Baumert

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