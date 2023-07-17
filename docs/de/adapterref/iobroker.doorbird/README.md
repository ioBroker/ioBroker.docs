---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.doorbird/README.md
title: ioBroker.doorbird
hash: liLpYUbAoBOrKz9+OghjC2kHxQWaJ1omE17aHHuvEng=
---
![Logo](../../../en/adapterref/iobroker.doorbird/admin/doorbird.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.doorbird.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.doorbird.svg)
![Libraries.io-Abhängigkeitsstatus für die neueste Version](https://img.shields.io/librariesio/release/npm/iobroker.doorbird?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/iobroker-community-adapters/iobroker.doorbird?style=flat-square)
![GitHub-Repo-Größe](https://img.shields.io/github/repo-size/iobroker-community-adapters/iobroker.doorbird?logo=github&style=flat-square)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/iobroker.doorbird?logo=github&style=flat-square)
![GitHub letzter Commit](https://img.shields.io/github/last-commit/iobroker-community-adapters/iobroker.doorbird?logo=github&style=flat-square)
![GitHub-Probleme](https://img.shields.io/github/issues/iobroker-community-adapters/iobroker.doorbird?logo=github&style=flat-square)
![NPM](https://nodei.co/npm/iobroker.doorbird.png?downloads=true)
![Beta](https://img.shields.io/npm/v/iobroker.doorbird.svg?color=red&label=beta)
![Stabil](http://iobroker.live/badges/doorbird-stable.svg)
![Eingerichtet](http://iobroker.live/badges/doorbird-installed.svg)

# IoBroker.doorbird
![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.doorbird/workflows/Test%20and%20Release/badge.svg)

## Versionen
## Was ist Doorbird?
DoorBird ist eine Türsprechanlage, die sowohl als Türklingel als auch als Sicherheitssystem fungiert. Das Produkt wird an der Außenseite eines Hauses angebracht, wo sich normalerweise eine Türklingel befindet, und verfügt über einen Türklingeltaster mit einer Kamera darüber.

## Aufbau
1. Geben Sie die IP ein, auf der der Adapter auf Ereignisse vom Doorbird-Gerät hören soll.

(Dies ist normalerweise die IP Ihres ioBroker-Hosts).
Der Adapter versucht, das Feld mit der richtigen IP für Sie vorab auszufüllen. Wenn die vorab ausgefüllte IP nicht die IP Ihres ioBroker-Hosts ist, ändern Sie sie bitte in die richtige IP.

2. Der Port ist auf „8100“ voreingestellt. Sie können ihn ändern, wenn der Port bereits von einem anderen Dienst verwendet wird.

   Versuchen Sie einfach, den Adapter mit diesem Port zu betreiben. Wenn der Port nicht verfügbar ist, erhalten Sie beim Starten des Adapters eine Fehlermeldung. Dann kommen Sie einfach hierher zurück und ändern Sie den Port.

3. Geben Sie die IP Ihres Doorbird-Geräts ein. Sie können auf das „Suchsymbol“ links neben dem Eingabefeld klicken. Nachdem Sie auf das Symbol geklickt haben, wird oben im Konfigurationsbildschirm eine Meldung angezeigt. Jetzt haben Sie 60 Sekunden Zeit, um die Klingeltaste an Ihrem Doorbird-Gerät zu drücken. Der Adapter versucht, die IP zu erkennen und alle Felder für Sie auszufüllen.
4. Die Geräte-ID (NICHT IP!) Ihres Doorbird.
5. Der Benutzername, der über die API-Berechtigung auf dem Doorbird-Gerät verfügen muss.
6. Das Passwort für den in Feld 5 eingegebenen Benutzernamen.

![Bildschirmfoto](../../../en/adapterref/iobroker.doorbird/img/configscreen.png)

Nachdem Sie alle erforderlichen Informationen in den Konfigurationsdialog eingegeben haben, klicken Sie auf „Speichern und schließen“.
Der Adapter sollte jetzt neu starten und Sie können loslegen!

## Zugriff auf die Schnappschüsse von Motion und DoorBell
Verwenden Sie die folgende URL, um den aktuellen Snapshot abzurufen:

```
http://<ioBroker-IP>:<Port>/files/doorbird.<instance>.Doorbell<number>_1.jpg
http://<ioBroker-IP>:<Port>/files/doorbird.<instance>.Motion_1.jpg
```

Beispiel:

```
http://192.168.0.2:8081/files/doorbird.0/Doorbell1_1.jpg
```

## Kompatible Geräte
| Gerät | Hardwareversion | Firmware-Version |
| -------------------------------- | ---------------- | ---------------- |
| DoorBird Video-Türstation D10x | 1,00 und höher | 000099 und höher |
| DoorBird Video-Türstation D20x | 1,00 und höher | 000099 und höher |
| DoorBird Video-Türstation D21x | 1,00 und höher | 000108 und höher |
| BirdGuard B10x | 1,00 und höher | 000099 und höher |
| DoorBird Video-Türstation D11x | 1,00 und höher | 000130 und höher |

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.0.5 (2023-07-05)

-   (Schmakus) Fixed AxiosError (deletion of duplicates) [#55]

### 1.0.4 (2023-07-05)

-   (Schmakus) Interim solution because deletion of duplicate favorites

### 1.0.2 (2023-07-04)

-   (Schmakus) Hotfix because dev-mode was active

### 1.0.1 (2023-07-04)

-   (Schmakus) remove unused packages
-   (Schmakus) added migration from older versions to delete unused snapshot states
-   (Schmakus) some code improvements

### 1.0.0 (2023-07-04)

-   (Schmakus) Re-new with adapter creator
-   (Schmakus) Changed snapshot handling! Find snapshot at ioBroker Files now!
-   (Schmakus) Support take snapshot manually has been added
-   (Schmakus) Support for light-On has been added

## License

The MIT License (MIT)

Copyright (c) 2023 iobroker-community-adapters <>

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