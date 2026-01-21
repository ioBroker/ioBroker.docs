---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.reolink/README.md
title: ioBroker.reolink
hash: 50y3ZeJ3MS1dkRKIpyBd3FY/d1+0pNHJpsSoWBp/fKA=
---
![Logo](../../../en/adapterref/iobroker.reolink/admin/reolink.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.reolink.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.reolink.svg)
![Anzahl der Installationen](https://iobroker.live/badges/reolink-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/reolink-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/aendue/iobroker.reolink.svg)
![NPM](https://nodei.co/npm/iobroker.reolink.png?downloads=true)

# IoBroker.reolink
**Tests:** ![Test und Freigabe](https://github.com/aendue/ioBroker.reolink/workflows/Test%20and%20Release/badge.svg)

## Reolink-Adapter für ioBroker
Adapter für die ioBroker-Plattform zum Abrufen von [Reolink-Kamera](https://reolink.com/)-Informationen.

Generell unterstützen alle neueren Reolink-Kameras API-Befehle. Sie unterscheiden sich lediglich in den unterstützten Befehlen.

Noch ein Hinweis zum Passwort: Testen Sie es mit und ohne URI-Kodierung, wenn Ihr Passwort nur ein Sonderzeichen enthält. Verwenden Sie für dieselbe Sicherheit besser kein Sonderzeichen und stattdessen ein längeres Passwort. Überprüfen Sie unter http://cam.ip.add.ress/api.cgi?cmd=GetDevInfo&channel=0&user=username&password=yoursecurity, ob Ihre Zugangsdaten funktionieren.

Falls Sie einen bestimmten API-Befehl einbeziehen möchten, lassen Sie es mich einfach wissen.

## Implementierte Funktionen
### SATZ
- PTZ-Steuerung / PTZ-Wächter
- Push-Benachrichtigung
- Autofokus einstellen

Werte: 0,1

- IR-Licht einstellen

Werte: Auto, Aus

- LED-Licht einstellen
- E-Mail-Benachrichtigung einrichten

Werte: 0, 1

- Audio-Alarm abspielen
- Zoomfokus

Funktionen können durch Ändern der Zustände von reolink.<Instanze>.settings ausgelöst werden.

 ### ERHALTEN
- Geräteinformationen
- PTZ-Informationen
- Laufwerksinformationen
- Netzwerkinformationen
- Bewegungserkennung
- Autofokus
- Momentaufnahme
- Infrarotlicht
- LED-Licht
- E-Mail-Benachrichtigung

### Push-Benachrichtigungseinstellungen
Push-Benachrichtigungen auf ein Telefon werden nur dann bereitgestellt, wenn folgende Bedingungen erfüllt sind:

- Der Schalter für Push-Benachrichtigungen im Adapter ist eingeschaltet.
- Bei NVRs sind sowohl der globale Schalter als auch der Kanalschalter eingeschaltet.
- Die Push-Benachrichtigung in der Reolink-App dieses Telefons ist aktiviert.

Die Push-Benachrichtigungen in der Reolink-App funktionieren unabhängig von den Adaptereinstellungen. Sie sind auch unabhängig von den Einstellungen anderer mit derselben Kamera verbundener Smartphones. Reolink ermöglicht Ihnen so, Push-Benachrichtigungen für jedes Smartphone einzeln zu deaktivieren. Das bedeutet, dass die Deaktivierung von Push-Benachrichtigungen über iobroker die entsprechende Option in der App nicht beeinflusst.

### Beispielhafte Verwendung von get image:
```js
sendTo("reolink.0",{action: "snap"}, function(result){
    sendTo("matrix-org.0",{file:result});
});
```

// Der Inhalt von **result** ist JSON:

```json
{ "type": "image/png","base64": "iVBORw....askldfj" }
```

Für Telegram funktioniert dies.

```js
sendTo("reolink.0",{action: "snap"}, function(result){
    const buffer =Buffer.from(result.base64, "base64");
    sendTo('telegram.0', {
        text: buffer,
        type: "photo",
        caption: 'the image'
    });
});
```

## Bekannte funktionierende Kameras (Firmware aus dem Jahr 2023)
- RLC-420-5MP
- E1 Outdoor
- E1 Zoom
- RLC-522
- RLC-810A
- RLC-823A
- Duo 3 PoE

## Bekannte *NICHT* funktionierende Kameras
- E1 Pro
- Argus 4 (möglicherweise funktionieren alle Argus-Geräte nicht)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.3.0 (2025-12-20)
* (agross) AiCfg config
* (oelison) bump some libs #202
* (bluefox) migration to ts
* (bot) revoking classic token #204
* (oelison) state changes from info log to debug #206

### 1.2.3 (2025-06-30)
* (oelison) settings email notification #170
* (oelison) testing node.js 24 #172

### 1.2.2 (2025-05-01)
* (oelison) update readme #141 #155
* (oelison) supress errors with axios timeout #154

### 1.2.1 (2025-02-09)
* (oelison) set some errors to debug logs

### 1.2.0 (2025-02-07)
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