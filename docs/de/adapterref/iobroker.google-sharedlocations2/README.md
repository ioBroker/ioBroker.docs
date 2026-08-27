---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.google-sharedlocations2/README.md
title: ioBroker.google-sharedlocations2
hash: DTkZ92AZjg2X5mWJoJQzvZyBBenXVOdUKxa/c9+Qqi8=
---
![Logo](../../../en/adapterref/iobroker.google-sharedlocations2/admin/google-sharedlocations2.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.google-sharedlocations2.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.google-sharedlocations2.svg)
![Anzahl der Installationen](https://iobroker.live/badges/google-sharedlocations2-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/google-sharedlocations2-stable.svg)
![NPM](https://nodei.co/npm/iobroker.google-sharedlocations2.png?downloads=true)

# IoBroker.google-sharedlocations2
**Tests:** ![Test und Freigabe](https://github.com/Garfonso/ioBroker.google-sharedlocations2/workflows/Test%20and%20Release/badge.svg)

## Google-sharedlocations2-Adapter für ioBroker
Teilen Sie Ihren Standort mit ioBroker über Google Maps. Erstellen Sie hierfür ein separates Google-Konto, also ein Konto speziell für Ihre ioBroker-Installation. Verwenden Sie NICHT Ihr privates Konto.

### Konfiguration
In den Konfigurationseinstellungen können Sie die Anmeldedaten des Google-Kontos eingeben, das Sie für ioBroker erstellt haben. Der Adapter erledigt dann alles Weitere für Sie. Geben Sie **NICHT** Ihre **persönlichen** Kontodaten ein.

Teilen Sie anschließend Ihren Standort von Ihrem Mobilgerät (und Ihrem Konto) mit diesem ioBroker-Google-Konto. Der Adapter liest den geteilten Standort und erstellt in ioBroker für jede Person, die ihren Standort mit dem Google-Konto teilt, einen entsprechenden Status.

Sie können das Abfrageintervall konfigurieren. Werte unter einer Minute werden jedoch ignoriert, um eine Blockierung durch Google zu vermeiden.

Falls Sie Benutzername und Passwort nicht eingeben möchten, ist dies möglich; lesen Sie dazu [unten](#use-a-cookie).

### Einen Cookie verwenden
Manchmal treten Anmeldeprobleme auf. Da der Adapter lediglich einen Browser öffnet und versucht, sich anzumelden (da er aber mehr oder weniger „blind“ vorgeht und auf bereits vorhandene Informationen angewiesen ist), kann dies fehlschlagen, und ich kann in diesem Fall wenig tun. Gelegentlich erhalten Sie eine Warnung bezüglich einer erneuten Anmeldung. Manchmal müssen Sie sich mit einem zweiten Faktor erneut anmelden. Sollten Sie auf ein solches Problem stoßen, kopieren Sie einen gültigen Cookie für google.com in den Zustand `google-sharedlocations2.0.info.currentCookies` von einem echten Browser.

Sie können Benutzername und Passwort in der Konfiguration sogar leer lassen, und der Adapter wird dann versuchen, diesen Cookie so gut wie möglich aufrechtzuerhalten (ähnlich wie meine Abspaltung des alten google-sharedlocations-Adapters), ohne jemals zu versuchen, sich anzumelden (aber die gelegentliche Verwendung des Browsers zum Laden der gesamten Seite scheint zu helfen, angemeldet zu bleiben).

Dieses Produkt steht in keiner Verbindung zu Google. Die Nutzung dieses Adapters kann gegen die Nutzungsbedingungen von Google verstoßen. Die Nutzung erfolgt auf eigene Gefahr.

Urheberrecht und Markenrecht von Google sind Eigentum von Google.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.4.0 (2026-07-03)
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.
* (Garfonso) minor fixes and improvements.
* (Garfonso/Claude) added self heal if wrong chrome version is installed (e.g. after update of puppeteer).

### 0.3.6 (2026-04-25)
* (Garfonso) somehow the old improve cookie call does not work anymore (since switch to fetch). Don't see why. -> So we just run the browser once a day.
* (Garfonso) Login with browser no tries to clear cookies in browser, if normal login does not work.

### 0.3.5 (2026-04-22)
* (Garfonso) resize logo.

### 0.3.4 (2026-04-22)
* (Garfonso) replaced axios dependency. Tried to make login more robust.

### 0.3.3 (2026-02-17)
* (Garfonso) if deleting cookies, also delete cookies in Browser to force login with username & password.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2026 Garfonso <garfonso@mobo.info>

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