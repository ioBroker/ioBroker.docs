---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.doorbird/README.md
title: ioBroker.doorbird
hash: Jlghr+gNACm+PPoFxlgOpj+XfCjqgLA3P2T+i8aIt5Y=
---
![Logo](../../../en/adapterref/iobroker.doorbird/admin/doorbird.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.doorbird.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.doorbird.svg)
![GitHub](https://img.shields.io/github/license/iobroker-community-adapters/iobroker.doorbird?style=flat-square)
![GitHub-Repo-Größe](https://img.shields.io/github/repo-size/iobroker-community-adapters/iobroker.doorbird?logo=github&style=flat-square)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/iobroker.doorbird?logo=github&style=flat-square)
![Letzter GitHub-Commit](https://img.shields.io/github/last-commit/iobroker-community-adapters/iobroker.doorbird?logo=github&style=flat-square)
![GitHub-Probleme](https://img.shields.io/github/issues/iobroker-community-adapters/iobroker.doorbird?logo=github&style=flat-square)
![NPM](https://nodei.co/npm/iobroker.doorbird.png?downloads=true)
![Beta](https://img.shields.io/npm/v/iobroker.doorbird.svg?color=red&label=beta)
![Stabil](http://iobroker.live/badges/doorbird-stable.svg)
![Installiert](http://iobroker.live/badges/doorbird-installed.svg)

# IoBroker.doorbird
![Testen und Freigeben](https://github.com/iobroker-community-adapters/ioBroker.doorbird/workflows/Test%20and%20Release/badge.svg)

## Versionen
## Was ist Doorbird?
DoorBird ist eine Türsprechanlage, die sowohl als Türklingel als auch als Sicherheitssystem fungiert. Das Produkt wird an der Außenseite eines Hauses angebracht, wo sich normalerweise eine Türklingel befindet, und verfügt über einen Klingelknopf mit einer darüber angebrachten Kamera.

## Konfiguration
1. Geben Sie die IP ein, auf der der Adapter auf Ereignisse vom Doorbird-Gerät warten soll.

(Dies ist normalerweise die IP Ihres ioBroker-Hosts.)
Der Adapter versucht, das Feld mit der korrekten IP-Adresse vorab auszufüllen. Sollte die vorab eingetragene IP-Adresse nicht mit der Ihres ioBroker-Hosts übereinstimmen, ändern Sie sie bitte in die korrekte IP-Adresse.

2. Der Port ist voreingestellt auf `8100`. Sie können ihn ändern, wenn der Port bereits von einem anderen Dienst verwendet wird.

Versuchen Sie einfach, den Adapter mit diesem Port zu starten. Sollte der Port nicht verfügbar sein, erhalten Sie beim Starten des Adapters eine Fehlermeldung. Kehren Sie dann einfach hierher zurück und ändern Sie den Port.

3. Geben Sie die IP Ihres Doorbird-Geräts ein. Klicken Sie dazu auf das Suchsymbol links neben dem Eingabefeld. Anschließend erscheint oben im Konfigurationsbildschirm eine Meldung. Sie haben nun 60 Sekunden Zeit, die Klingeltaste an Ihrem Doorbird-Gerät zu drücken. Der Adapter versucht, die IP zu erkennen und alle Felder automatisch auszufüllen.
4. Die Geräte-ID (NICHT IP!) Ihres Doorbird.
5. Der Benutzername, der über die Berechtigungen **API-Operator** und **Immer beobachten** auf dem Doorbird-Gerät verfügen muss.
6. Das Passwort für den in Feld 5 eingegebenen Benutzernamen.

![Screenshot](../../../en/adapterref/iobroker.doorbird/img/configscreen.png)

Nachdem Sie alle erforderlichen Informationen in den Konfigurationsdialog eingegeben haben, klicken Sie auf „Speichern & Schließen“.
Der Adapter sollte nun neu gestartet werden, und Sie sind startklar!

## Zugriff auf die Momentaufnahmen von Bewegung und Türklingel
Verwenden Sie die folgende URL, um den aktuellen Snapshot abzurufen:

```
http://<ioBroker-IP>:<Port>/files/doorbird.<instance>.Doorbell<number>_1.jpg
http://<ioBroker-IP>:<Port>/files/doorbird.<instance>.Motion_1.jpg
```

oder (wenn Redis nicht verwendet wird)

```
/opt/iobroker/iobroker-data/files/doorbird.<instance>/Doorbell<number>_1.jpg
```

#### Beispiel:
`http://192.168.0.2:8081/files/doorbird.0/Doorbell1_1.jpg`

### Snapshot per Telegramm senden
#### Beispiel
js-controller 5 erforderlich

```js
setState('doorbird.0.TakeSnapshot', true);
onFile('doorbird.0', 'TakeSnapshot_1.jpg', true, (id, fileName, size, fileData, mimeType) => {
    sendTo('telegram.0', {
        text: fileData,
        type: 'photo'
    });
});
```

## Kompatible Geräte
| Gerät | Hardwareversion | Firmwareversion |
| -------------------------------- | ---------------- | ---------------- |
| DoorBird Video-Türstation D10x | 1.00 und höher | 000099 und höher |
| DoorBird Video-Türstation D20x | 1.00 und höher | 000099 und höher |
| DoorBird Video-Türstation D21x | 1.00 und höher | 000108 und höher |
| BirdGuard B10x | 1.00 und höher | 000099 und höher |
| DoorBird Video-Türstation D11x | 1.00 und höher | 000130 und höher |
| DoorBird Mini-Dome-Kamera A1131 | 1.00 und höher | 000148 und höher |

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 3.0.0 (2025-03-03)

NodeJS >= 20.x and js-controller >= 6 is required

- (@klein0r) Migrated to json config
- (@klein0r) Updated documentation and dependencies

### 2.0.0 (2024-09-02)

- (Schmakus) update dependencies

### 1.7.0 (2024-08-23)

- (Schmakus) Dependencies have been updated

### 1.6.0 (2024-07-02)

- (mcm1957) Adapter requires node.js >= 18 and Admin >=6 now
- (mcm1957) Dependencies have been updated

### 1.5.0 (2024-03-01)

- (Schmakus) update dependencies

## License

The MIT License (MIT)

Copyright (c) 2025 iobroker-community-adapters <>

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