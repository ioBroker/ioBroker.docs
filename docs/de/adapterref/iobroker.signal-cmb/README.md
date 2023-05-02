---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.signal-cmb/README.md
title: ioBroker.signal-cmb
hash: PZVkglcc7BEgZVqVzLkmFoR8CwxHW8xJR5P+i6DkWfY=
---
![Logo](../../../en/adapterref/iobroker.signal-cmb/admin/signal-cmb.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.signal-cmb.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.signal-cmb.svg)
![NPM](https://nodei.co/npm/iobroker.signal-cmb.png?downloads=true)

# IoBroker.signal-cmb
**Tests**: [![Test und Freigabe](https://github.com/necotec/ioBroker.signal-cmb/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/necotec/ioBroker.signal-cmb/actions/workflows/test-and-release.yml)

## Signal-cmb-Adapter für ioBroker
Dank des kostenlosen [CallMeBot](https://www.callmebot.com/blog/free-api-signal-send-messages/)-Dienstes können Sie mit diesem Adapter Signalnachrichten an sich selbst oder eine andere Nummer senden.

**Hinweis** : *Die kostenlose API ist nur für den persönlichen Gebrauch bestimmt!*

### Aufbau
*Folgende Dokumentation wurde von [callmebot](https://www.callmebot.com/blog/free-api-signal-send-messages/) Seite kopiert.*

Sie müssen den API-Schlüssel vom Bot abrufen, bevor Sie die API verwenden:

- Fügen Sie die Telefonnummer des CallMeBot zu Ihren Telefonkontakten hinzu (benennen Sie sie nach Belieben). Die aktuelle Telefonnummer finden Sie hier: https://www.callmebot.com/blog/free-api-signal-send-messages/
- Senden Sie diese Nachricht &quot;Ich erlaube Callmebot, mir Nachrichten zu senden&quot; (auf Englisch) an den neu erstellten Kontakt (natürlich mit Signal).<br>

Wenn Sie eine GUID im &quot;Test-Link&quot; erhalten, können Sie diese GUID anstelle Ihrer Telefonnummer im Adapter verwenden. Sie können auch senden<br> erneut die Meldung `I allow callmebot to send me messages`. Normalerweise sollten Sie jetzt Ihre Telefonnummer im Link sehen und Sie können Ihre Telefonnummer im Adapter verwenden.

- Warten Sie, bis Sie die Meldung „API für Ihre Telefonnummer aktiviert“ erhalten. Ihr APIKEY ist 123123` vom Bot. Da sich dies noch im Beta-Test befindet, kann die Aktivierung bis zu 2 Minuten dauern.
- Die Signalnachricht vom Bot enthält den API-Schlüssel, der zum Senden von Nachrichten über die API erforderlich ist.
- Sie können jetzt den API KEY in der ioBroker-Konfiguration verwenden.

Beispiel: ![Beispiel](../../../en/adapterref/iobroker.signal-cmb/img/signal.jpg)

### Verwendung
Es gibt zwei Möglichkeiten, eine Nachricht zu senden: ACHTUNG! Es wurde festgestellt, dass CallMeBot beim Senden mehrerer Nachrichten innerhalb einer Sekunde einen Benutzer für 15 Minuten sperrt. Daher sollte darauf geachtet werden, dass nur eine Nachricht pro Sekunde gesendet wird.

- über `signal-cmb.0.sendMessage`. Schreiben Sie einfach einen Text in diesen Zustand und die Nachricht wird an die Standardnummer gesendet, die im Einstellungsdialog konfiguriert wurde.
- per Nachricht vom Javascript-Adapter:

```
sendTo('signal-cmb.0', 'send', {
    text: 'My message',
    phone: '+491234567890' // optional, if empty the message will be sent to the default configured number
});
```

![Blockartig](../../../en/adapterref/iobroker.signal-cmb/img/blockly-signal.png)

### Emojis
Um Emojis zu senden, müssen Sie Ihrer Nachricht einige **'Codes'** hinzufügen. Alle verfügbaren Codes finden Sie hier: https://www.callmebot.com/uncategorized/list-of-urlencoded-unicode-emoticons-emojis/

### Verfügbare Emojis
Die folgenden Emojis werden offiziell von CallMeBot unterstützt:

|Code|Emojie|
|%F0%9F%98%80|![grinsend](../../../en/adapterref/iobroker.signal-cmb/img/emojies/01_grinning.png)|
|%F0%9F%98%83|![grinsende große Augen](../../../en/adapterref/iobroker.signal-cmb/img/emojies/02_grinning_big_eyes.png)|
|%F0%9F%98%84|![grinsende lächelnde Augen](../../../en/adapterref/iobroker.signal-cmb/img/emojies/03_grinning_smiling_eyes.png)|
|%F0%9F%98%81|![strahlende Augen](../../../en/adapterref/iobroker.signal-cmb/img/emojies/04_beaming_smiling_eyes.png)|
|%F0%9F%98%86|![grinsendes spritzendes Gesicht](../../../en/adapterref/iobroker.signal-cmb/img/emojies/05_grinning_squinting_face.png)|
|%F0%9F%98%85|![grinsend](../../../en/adapterref/iobroker.signal-cmb/img/emojies/06_grinning_sweat.png)|
|%F0%9F%A4%A3|![sich lachend auf dem Boden wälzen](../../../en/adapterref/iobroker.signal-cmb/img/emojies/07_rolling_on_the_floor_laughing.png)|
|%F0%9F%A4%A3|![Gesicht mit Freudentränen](../../../en/adapterref/iobroker.signal-cmb/img/emojies/08_face_with_tears_of_joy.png)|
|%F0%9F%98%82|![leicht lächelndes Gesicht](../../../en/adapterref/iobroker.signal-cmb/img/emojies/09_slightly_smiling_face.png)|
|%F0%9F%99%82|![umgedrehtes Gesicht](../../../en/adapterref/iobroker.signal-cmb/img/emojies/10_upside_down_face.png)|
|%F0%9F%98%89|![zwinkerndes Gesicht](../../../en/adapterref/iobroker.signal-cmb/img/emojies/11_winking_face.png)|
|%F0%9F%98%8A|![lächelndes Gesicht mit lächelnden Augen](../../../en/adapterref/iobroker.signal-cmb/img/emojies/12_smiling_face_with_smiling_eyes.png)|
|%F0%9F%98%87|![lächelndes Gesicht mit Heiligenschein](../../../en/adapterref/iobroker.signal-cmb/img/emojies/13_smiling_face_with_halo.png)|
|%F0%9F%98%87|![lächelndes Gesicht mit Heiligenschein](../../../en/adapterref/iobroker.signal-cmb/img/emojies/13_smiling_face_with_halo.png)|

#### Verwenden Sie Emojis
Um ein Emojie zu verwenden, müssen Sie den Code des Emojies in Ihren Text einfügen, den Sie senden möchten.

![Emojis einfügen](../../../en/adapterref/iobroker.signal-cmb/img/add_emojies.png)

Der **signal-cmb** Adapter URLencode diesen Code und Sie sehen in Ihrem Signal Messenger auf Ihrem Telefon das Emojie.

![Emojie-Signal-Messenger](../../../en/adapterref/iobroker.signal-cmb/img/emojie_signal_mesenger.png)

## **IN ARBEIT**
* Einige Änderungen vorgenommen
* Habe noch ein paar Änderungen vorgenommen

-->

### 0.3.1 (28.12.22)
* (derAlff) 'package.json' aktualisiert, um eine minimale Version von NodeJS zu verwenden
* (derAlff) Beschreibung zur Konfiguration von CallMeBot in 'index_m.html' aktualisiert
* (derAlff) Aktualisierter Konfigurationstext mit dem GUID-Problem in README

### 0.2.3 (08.12.22)
* (derAlff) Unterstützung für 'encoded newline' in Strings hinzugefügt
* (derAlff) Aktualisierte README

### 0.2.2 (07.12.22)
* (derAlff) Versionswechsel für NPM

### 0.2.1 (07.12.22)
* (derAlff) Versionswechsel für NPM

### 0.2.0 (07.12.22)
* (derAlff) Unterstützung für Emojis hinzugefügt
* (derAlff) Informationen zu Emojis in README hinzugefügt
* (derAlff) Telefonnummer in README/Konfiguration durch Link zur tatsächlichen Telefonnummer auf der CallMeBot-Website ersetzt

### 0.1.7 (16.02.22)
* (derAlff) Versionswechsel für NPM

### 0.1.6 (2022-01-22)
* (derAlff) Veröffentlicht auf npm
* (derAlff) Aktualisierte README.md
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
* (derAlff) Version getestet und laufende Version 0.1.0

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