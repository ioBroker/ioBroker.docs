---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.unifi-protect/README.md
title: ioBroker.unifi-protect
hash: RJarW6tFdBgeN6G+OP5I/VbAN/PFZhPFg6qQWtn0h2U=
---
![Logo](../../../en/adapterref/iobroker.unifi-protect/admin/unifi-protect.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.unifi-protect.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.unifi-protect.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/unifi-protect-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/unifi-protect-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/peterbaumert/iobroker.unifi-protect.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/peterbaumert/ioBroker.unifi-protect/badge.svg)
![NPM](https://nodei.co/npm/iobroker.unifi-protect.png?downloads=true)

#ioBroker.unifi-protect
**Dieser Adapter verwendet den Dienst [Sentry.io](https://sentry.io), um mir als Entwickler automatisch Ausnahmen und Codefehler sowie neue Geräteschemata zu melden.** Weitere Details siehe unten!

## Unifi-protect-Adapter für ioBroker
Verbindet sich mit dem Unifi Protect Controller und ruft alle Daten von hinzugefügten Kameras ab.

Standardports, falls nicht selbst geändert:

 - Cloud Key Plus Gen2: 7443
 - UDM Pro: 443

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

## Was ist Sentry.io und was wird an die Server dieses Unternehmens gemeldet?
Sentry.io ist ein Dienst für Entwickler, um sich einen Überblick über Fehler ihrer Anwendungen zu verschaffen. Und genau das ist in diesem Adapter implementiert.

Wenn der Adapter abstürzt oder ein anderer Codefehler auftritt, wird diese Fehlermeldung, die auch im ioBroker-Protokoll angezeigt wird, an Sentry gesendet. Wenn Sie der iobroker GmbH erlaubt haben, Diagnosedaten zu sammeln, dann ist auch Ihre Installations-ID (dies ist nur eine eindeutige ID **ohne** zusätzliche Informationen über Sie, E-Mail, Name oder dergleichen) enthalten. Auf diese Weise kann Sentry Fehler gruppieren und anzeigen, wie viele eindeutige Benutzer von einem solchen Fehler betroffen sind. All dies hilft mir, fehlerfreie Adapter bereitzustellen, die im Grunde nie abstürzen.

## **IN ARBEIT**
* erste Implementierung von Echtzeit-Updates api
* lastMotion, lastRing, lcdMessage und smartDetectZone in realTimeEvents

### 0.0.12 (2021-03-14)
* intelligente Erkennungen hinzugefügt
* einige LastMotion-Sachen behoben
* UnifiOs-Unterstützung für CloudKey hinzugefügt

### 0.0.11 (2020-02-27)
* Admin-Oberfläche ein wenig geändert
* Beschreibung für Port hinzugefügt
* Beschreibbare Zustände von UDM Pro behoben

### 0.0.10 (26.02.2020)
* travis ci für Integrationstests behoben
* tatsächlich letzte x Bewegungseinstellung verwenden

### 0.0.9 (2020-02-21)
* lastMotion der Kamera wird nur bei Bedarf aktualisiert
* erste UDM-Integrationen, Einstellungen ändern funktioniert noch NICHT

### 0.0.8 (2020-02-17)
* Bewegungsereignisse optional gemacht (Letzte Bewegung wird immer gespeichert)
* Intervall und "letzte x Sekunden der Bewegungen" einstellbar gemacht
* alte Bewegungen richtig löschen

### 0.0.7 (2020-02-09)
* Bewegungsereignisse kontinuierlich aktualisieren
* geänderte Datenstruktur
* lastMotion Datapoint zu jeder Kamera hinzugefügt

### 0.0.6 (2020-02-08)
* einige Einstellungen änderbar machen (name, osdSettings.*,recordingSettings.mode, ledSettings.isEnabled)

### 0.0.5 (2020-02-07)
* neues Logo
* Bewegungsereignisdatenpunkte hinzugefügt

### 0.0.4 (2020-02-05)
* Release-Script-Test und einige Readme-Änderungen

### 0.0.3 (03.02.2020)
* (Peter Baumert) erste funktionierende rls auf npm

### 0.0.1
* (Peter Baumert) Erstveröffentlichung

## Code-Verwendung
Der Code in [protect_api](./protect_api) wird hauptsächlich von [hjdhjds homebridge-unifi-protect . kopiert](https://github.com/hjdhjd/homebridge-unifi-protect).
Vielen Dank für die Bereitstellung dieses Codes. Seine Codes-Lizenz finden Sie unter [Hier](https://github.com/hjdhjd/homebridge-unifi-protect/blob/master/LICENSE.md).

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ## **WORK IN PROGRESS**
-->

## License
MIT License

Copyright (c) 2020-2021 Peter Baumert

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