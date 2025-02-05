---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.reolink/README.md
title: ioBroker.reolink
hash: /bm8PbcKUsNovM9dM+o7AdtO37eijmF0pbO4vbW2PaU=
---
![Logo](../../../en/adapterref/iobroker.reolink/admin/reolink_logo.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.reolink.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.reolink.svg)
![Anzahl der Installationen](https://iobroker.live/badges/reolink-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/reolink-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/aendue/iobroker.reolink.svg)
![NPM](https://nodei.co/npm/iobroker.reolink.png?downloads=true)

# IoBroker.reolink
**Tests:** ![Testen und Freigeben](https://github.com/aendue/ioBroker.reolink/workflows/Test%20and%20Release/badge.svg)

## Reolink-Adapter für ioBroker
Adapter für die ioBroker-Plattform zum Abrufen von [Reolink Kamera](https://reolink.com/)-Informationen.

Generell unterstützen alle neueren Reolink-Kameras API-Befehle. Sie unterscheiden sich lediglich in den unterstützten Befehlen.

Eine Erinnerung an das Passwort. Versuchen Sie es mit oder ohne URI-Kodierung, wenn Sie nur ein Sonderzeichen haben. Verwenden Sie für die gleiche Sicherheit besser kein Sonderzeichen und einfach ein längeres Passwort.

Wenn Sie einen bestimmten API-Befehl einbinden möchten, lassen Sie es mich einfach wissen.

## Implementierte Funktionen
### SATZ
PTZ-Steuerung / PTZ-Schutz
- Push-Benachrichtigung
- Autofokus einstellen

Werte: 0,1

- IR-Licht einstellen

Werte: Auto, Aus

- LED-Licht einstellen
- Mail-Benachrichtigung einstellen

Werte: 0, 1

- Audioalarm abspielen
Zoom-Fokus

Funktionen können durch Ändern des Zustands von reolink.<Instanze>.settings ausgelöst werden.

 ### ERHALTEN
Geräteinfo
- PTZ-Informationen
- Laufwerksinformationen
- Netzwerkinfo
Bewegungserkennung
Autofokus
Schnappschuss
IR-Licht
LED-Licht
- Mail-Benachrichtigung

### Beispielverwendung von „Bild abrufen“:
```
sendTo("reolink.0",{action: "snap"}, function(result){
    sendTo("matrix-org.0",{file:result});
});
```

// Inhalt von **Ergebnis** ist JSON:

```
{type:"image/png",base64:"iVBORw....askldfj"}
```

## Bekannte funktionierende Kameras (Firmware aus dem Jahr 2023)
- RLC-420-5MP
- E1 Außenbereich
- RLC-522
- RLC-810A
- RLC-823A
Duo 3 PoE

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (oelison) update disk info
* (oelison) uri enconding is switchable (helps sometimes by one special char)
* (oelison) #28 PTZ check added

### 1.1.2 (2024-09-14)
* (oelison) [#22](https://github.com/aendue/ioBroker.reolink/issues/22) password with some more special chars works now
* (oelison) adapter warnings resolved

### 1.1.1 (2024-08-03)
* (oelison) removed warnings from adapter check
* (olli) added ftp support
* (oelison) channel now distinguishing most requests
* (oelison) [#79](https://github.com/aendue/ioBroker.reolink/issues/79) error messages with more info where

### 1.1.0 (2024-05-16)
* (Nibbels) [#56](https://github.com/aendue/ioBroker.reolink/issues/56) added function to switch scheduled recording on and off
* (Nibbels) [#25](https://github.com/aendue/ioBroker.reolink/issues/25) detach led light from led light mode
* (Nibbels) added setWhiteLedMode function
* (Nibbels) read zoom and focus with POST request (works on RLC-823A v3.1)
* (oelison) removed node 16

### 1.0.3 (2024-01-21)
* (oelison) [#49](https://github.com/aendue/ioBroker.reolink/issues/49)
* (oelison) [#47](https://github.com/aendue/ioBroker.reolink/issues/47)

### 1.0.2 (2023-12-19)
* (oelison) known working cameras added
* (oelison) setIrLights accept "On" now
* (oelison) [#40](https://github.com/aendue/ioBroker.reolink/issues/40)
* (oelison) [#42](https://github.com/aendue/ioBroker.reolink/issues/42)

### 1.0.1 (2023-11-11)
* (oelison) resolve review for latest adapter addition
* (oelison) maybe the last node 16 version
* (oelison) booleans are now false/true and not 0/1

### 0.1.2 (2023-11-03)
* (oelison) ptz patrol added
* (oelison) node 12 tests removed
* (aendue) added getAiState

### 0.1.1 (2022-11-03)
* (aendue) ssl validation included
* (aendue) fixed issue with ack-flag not set
* (aendue) changed datatypes of disk.free and RAW.Email
* (aendue) enabled getAutoFocus again
* (aendue) name change on state EmailNotification (state gets created dynamically now)

### 0.1.0 (2022-10-25)
* (aendue) fixed asynchron functions (Axios Errors)
* (aendue) added getAutoFocus funktion
* (aendue) added getIrLight funktion
* (aendue) added getWhiteLED function
* (aendue) added getMailNotification function
* (aendue) added setMailNotification function
* (aendue) cleanup code

### 0.0.5 (2022-09-28)

* (oelison) guard point (new info)

### 0.0.4 (2022-09-27)

* (oelison) ptz preset tested
* (oelison) change protocol (http/https) possible
* (oelison) led on/off and brightness
* (oelison) push on/off
* (oelison) auto focus on/off
* (oelison) set zoom
* (oelison) play alarm (n times)
* (oelison) motion detection enabled again

### 0.0.3 (2022-09-05)

* (aendue) npm release prepare
* (oelison) ptz preset (untested, missing ptz cam)

### 0.0.2 (2022-09-05)

* (aendue) added languages
* (oelison) added get image function (snap)

### 0.0.1 (2022-07-05)

* (aendue) initial release

## License
MIT License

Copyright (c) 2025 Andy Grundt <andygrundt@gmail.com>

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