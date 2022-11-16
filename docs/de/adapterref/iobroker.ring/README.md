---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ring/README.md
title: Ringadapter
hash: BVIA7BeS5PgjNWVxnjPjl5RqQbirM8xg7AS2/9pSL8c=
---
![Logo](../../../en/adapterref/iobroker.ring/admin/ring.png)

![Travis CI-Build-Status](https://travis-ci.org/iobroker-community-adapters/ioBroker.ring.svg?branch=master)
![AppVeyor-Build-Status](https://ci.appveyor.com/api/projects/status/github/iobroker-community-adapters/ioBroker.ring?branch=master&svg=true)
![Anzahl der Installationen](http://iobroker.live/badges/ring-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.ring.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ring.svg)
![NPM](https://nodei.co/npm/iobroker.ring.png?downloads=true)

# Ringadapter
Benötigt Admin v4 und `node 16.x`.

Der Ring-Adapter funktioniert mit Ring-Geräten wie der Ring Video Doorbell und der Ring Cam und zeigt an, ob jemand an der Tür klingelt oder ob eine Bewegung erkannt wird. Die Ring Video Doorbell oder Cam sendet einen Videostream, wenn eine Bewegung oder Türklingel erkannt wird.

## Installation & Konfiguration
Nach der Installation des Adapters müssen Sie Ihre E-Mail und Ihr Passwort Ihres [ring.com](https://ring.com) Kontos und einen Token eingeben. Ring erfordert jetzt die Verwendung von Zwei-Faktor-Authentifizierung (2fa) für alle Konten. Um das Token zu erhalten, gehen Sie bitte wie folgt auf Ihrer Shell vor.

```
npx -p ring-client-api ring-auth-cli
```

oder

```
# Unix
cd /opt/iobroker/node_modules/iobroker.ring/
npm i ring-client-api

cd /opt/iobroker/node_modules/iobroker.ring/node_modules/ring-client-api
node ring-auth-cli
```

Sie können spezielle Variablen für Ihren Livestream und Snapshot-Pfad und Dateinamen verwenden. Diese Variablen werden durch einen Zähler, einen Zeitstempel, eine Ring-ID oder eine Ringart ersetzt.

* `%d`: Unix-Zeitstempel. Beispiel: `test_%d -> test_1588331430061`
* `%i`: ID Ihres Ringgeräts: Beispiel: `test_%i -> test_234567890`
* `%n`: Zähler seit Start der Ringinstanz. Beispiel: `test_%n -> test_1`
* `%k`: Art Ihres Klingelgeräts: Beispiel: `test_%k -> test_doorbell`

### FAQ
#### Ich erhalte keine Ereignisse, Schnappschüsse und Videos zu Bewegungen oder erkannten Personen
Herzlichen Glückwunsch, es ist sehr wahrscheinlich, dass Ihr aktueller Token von Ring auf eine schwarze Liste gesetzt wurde, wodurch Ihnen die Push-Benachrichtigung verweigert wird, die Sie benötigen.
Der beste Weg, dies zu beheben, besteht darin, alle vorherigen Browser/Adapter-Tokens auf der Ring-Website zu entfernen und ein neues Token für den Adapter zu generieren.

Damit dieser Adapter richtig auf Ereignisse reagieren kann, muss Ring die Push-Benachrichtigung an den verwendeten [Ring-API-Client](https://github.com/dgreif/ring) senden, damit dieser Adapter darauf reagieren kann. Die Logik in diesem Adapter wurde mehrfach überprüft und funktioniert für viele Benutzer. Wenn Sie also Probleme mit fehlenden Ereignissen haben, ist es unwahrscheinlich, dass dieser Adapter schuld ist.

### V3 Breaking Changes umschreiben
1. Die Gerätenamen wurden um ihre Beschreibung erweitert (z.B. von `Gerät 1234567`

   zu `Device 1234567 ("Floodlight Garden")`)

2. Snapshot/Livestream-Daten befinden sich jetzt in einem entsprechenden Kanal, der die anderen Datenpunkte enthält.
3. Das Schnappschuss-/Livestream-Objekt wurde vom Typ „Meta“ in den Zustand „Datei“ geändert.
4. Ereignisse (Bewegung, Ding usw.) befinden sich jetzt in einem entsprechenden Kanal.
5. Da `ring-api` die Unterstützung für Knoten vor `v16.x` einstellt, benötigt dieser Adapter `node v16.x` oder `node v18.x`
6. Aktive Aktualisierungen werden auf einmal alle 2 Stunden reduziert, da wir auf Ereignisse hören/reagieren.

### SIP (vor Version 3.x)
Sie können die SIP-Informationen für eine SIP-Videokonferenz mit Ihrem SIP-Client verwenden.
Der Adapter stellt nicht alle Ringgeräte bereit, da die verwendete API nicht alle Ringgeräte enthält.

Sie können zum Beispiel den Blink SIP-Client auf [http://icanblink.com/](http://icanblink.com/) verwenden. Um das Video zum Laufen zu bringen, gehen Sie in Blinks Einstellungen und wechseln Sie unter „Konten“ auf die Registerkarte „Medien“ und deaktivieren Sie „Audio und Video verschlüsseln“ unter „RTP-Optionen“. Achtung, die SIP-Informationen verfallen nach ein paar Sekunden! Hoffentlich kann ich bald einen Videostream unterstützen. Leider hat [ring.com](https://ring.com) keine offizielle API, die diese Funktion unterstützt.
Wenn Sie die `livestream request`-Taste drücken, erhalten Sie neue SIP-Informationen zum Aufbau einer SIP-Videoanrufsitzung.
Wenn Sie die [ring.com](https://ring.com)-Cloud verwenden, finden Sie unter Verlauf einen http-Link zu Ihrem letzten Bewegungs- / Türklingel-Aufzeichnungsvideo.

### Skripte in `package.json`
Mehrere npm-Skripte sind für Ihre Bequemlichkeit vordefiniert. Sie können sie mit `npm run <scriptname>` ausführen.

| Skriptname | Beschreibung |
| `build:ts` | Kompilieren Sie die TypeScript-Quellen. |
| `watch:ts` | Kompilieren Sie die TypeScript-Quellen und achten Sie auf Änderungen. |
| `watch` | Abkürzung für `npm run watch:ts` |
| `test:ts` | Führt die Tests aus, die Sie in `*.test.ts`-Dateien definiert haben. |
| `test:package` | Stellt sicher, dass Ihre `package.json` und `io-package.json` gültig sind. |
| `test:unit` | Testet den Start des Adapters mit Einheitentests (schnell, erfordert aber möglicherweise Modul-Mocks, um zu funktionieren). |
| `test:integration` | Testet den Adapterstart mit einer tatsächlichen Instanz von ioBroker. |
| `test` | Führt einen minimalen Testlauf für Paketdateien und Ihre Tests durch. |
| `check` | Führt eine Typprüfung Ihres Codes durch (ohne etwas zu kompilieren). |
| `coverage` | Generiert Codeabdeckung mit Ihren Testdateien. |
| `lint` | Führt `ESLint` aus, um Ihren Code auf Formatierungsfehler und potenzielle Fehler zu überprüfen. |
| `lint` | Führt `ESLint` aus, um Ihren Code auf Formatierungsfehler und potenzielle Fehler zu überprüfen. |
| `release` | Erstellt eine neue Version, siehe [`@alcalzone/release-script`](https://github.com/AlCalzone/release-script#usage) für weitere Details. |

### Schreibtests
Wenn es richtig gemacht wird, ist das Testen von Code von unschätzbarem Wert, da es Ihnen das Vertrauen gibt, Ihren Code zu ändern, während Sie genau wissen, ob und wann etwas kaputt geht. Eine gute Lektüre zum Thema testgetriebene Entwicklung ist https://hackernoon.com/introduction-to-test-driven-development-tdd-61a13bc92d92.
Das Schreiben von Tests vor dem Code mag zunächst seltsam erscheinen, hat aber ganz klare Vorteile.

Die Vorlage bietet Ihnen grundlegende Tests für die Start- und Paketdateien des Adapters.
Es wird empfohlen, dass Sie dem Mix Ihre eigenen Tests hinzufügen.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 3.1.7 (2022-10-28)

* (theimo1221) Update Packages

### 3.1.6 (2022-10-28)

* (theimo1221) Inline subscription instead of properties for Event observer

### 3.1.5 (2022-10-16)

* (theimo1221) Update Packages

### 3.1.4 (2022-10-16)

* (theimo1221) #376 Handling when reconnect fails

### 3.1.3 (2022-10-04)

* (theimo1221) Update Packages

### 3.1.2 (2022-09-22)

* (theimo1221) Update Packages
* (theimo1221) Fix an issue with floodlight control

### 3.1.1 (2022-08-11)

* (theimo1221) Improve Doorbell Event Logging

### 3.1.0 (2022-08-04)

* (bluefox) Allowed to be used with node.js 18

### 3.0.5 (2022-07-05)

* (theimo1221) Improve Log Message on failed Snapshots during event handling
* (theimo1221) Add Support for doorbell oyster

### 3.0.4 (2022-06-17)

* (theimo1221) Fix Edge Case resulting in lamps being permanently on

### 3.0.3 (2022-06-16)

* (theimo1221) Implement location mode

### 3.0.1 (2022-06-08)

* (bluefox) Changed the russian translations

### 3.0.0-beta.13 (2022-05-30)

* (theimo1221) Prevent missing of events, due to socket drop within ring-api-client
* (theimo1221) Improve device logging readability

### 3.0.0-beta.12 (2022-05-28)

* (theimo1221) Fix error in beta.11 in regard to new installations
* (theimo1221) Harden Event Handling to prevent rare permanent busy occasions
* (theimo1221) Add support for doorbell device `doorbell_graham_cracker`

### 3.0.0-beta.11 (2022-05-24)

* (theimo1221) Add processing of new token provided by ring.

### 3.0.0-beta.10 (2022-05-24)

* (theimo1221) Add `lpd_v4` Doorbell

### 3.0.0-beta.9 (2022-05-21)

* (theimo1221) For stability reasons, perform an active refresh every 2 hours.

### 3.0.0-beta.8 (2022-05-17)

* (theimo1221) Fix writing to iobroker-data/files folder (thx to Apollon)

### 3.0.0-beta.7 (2022-05-16)

* (theimo1221) Prevent Crashes on unsupported devices

### 3.0.0-beta.6 (2022-05-16)

* (theimo1221) Record more events (without recording twice)
* (theimo1221) Improve snapshot deleting for initial snapshot after restart

### 3.0.0-beta.5 (2022-05-14)

* (theimo1221) Prevent crashes during installation by clearer enforcing of node 16

### 3.0.0-beta.4 (2022-05-14)

* (theimo1221) Changes in io-package.json for release workflow

### 3.0.0-beta.3 (2022-05-14)

* (theimo1221) Rewrite V3 (Breaking Changes listed below)
* (theimo1221) Update packages
* (theimo1221) Fix in GitHub release workflow

### 2.0.0-beta.3 (2022-02-08)

* (theimo1221) Fix adapter checker issues

### 2.0.0-beta.0 (2022-02-05)

* (theimo1221) Update packages
* (theimo1221) Add JS-Controller 4.0 dependency
* (theimo1221) On ding --> First take snapshot then livestream

### 1.2.8 (2021-10-14)

* (theimo1221) Update packages

### 1.2.6 (2021-09-05)

* (theimo1221) Update packages
* (theimo1221) Stop adapter on unhandled Error
* (theimo1221) Terminate adapter on invalid ring credentials

### 1.2.4-1 (2021-08-12)

* (theimo1221) Update packages

### 1.2.4-0 (2021-08-07)

* (theimo1221) Refactoring
* (theimo1221) Update packages

### 1.2.3 (2021-07-30)

* (theimo1221) Update packages
* (theimo1221) Fix compatibility issues with new ring api

### 1.2.2 (2021-05-05)

* (theimo1221) Update packages due to security patches

### 1.2.1 (2021-04-09)

* (theimo1221) Bump version

### 1.2.0 (2021-04-08)

* (theimo1221) Add new device type spotlightw as doorbell
* (theimo1221) Update dependencies (ringapi, node-schedule, etc.)

### 1.1.6-3 (2021-03-29)

* (theimo1221) Fix typo preventing Livestream recordings after motion detection
* (theimo1221) Reduce Levels of Log Messages, to not spam iobroker Log

### 1.1.6-2 (2021-03-29)

* (theimo1221) Fixing some Issues while saving snapshots and place Snapshots within 'iobroker-data' Folder.

### 1.1.6-1 (2021-03-26)

* (theimo1221) Support for Floodlight V2
* (theimo1221) Control Floodlight by Switch

### 1.1.5 (04.11.2020)

* (Stübi) Add floodlight

### 1.1.4 (23.05.2020)

* (Stübi) Add new libraries

### 1.1.3 (06.05.2020)

* (Stübi) Fixed error of missing objects

### 1.1.2 (02.05.2020)

* (Stübi) Fixed health info like missing battery status (Issue #22, Issue #25)
* (Stübi) Change error handling
* (Stübi) Providing Stick Up Cam (BETA)
* (Stübi) Using variables in the filename of the livestream or snapshot

### 1.1.1 (02.05.2020)

* (Stübi) Bugfixing
* (Stübi) User can enable/disable external sentry logging

### 1.1.0 (01.05.2020)

* (Stübi) Node 10 is now required, Node 12 recommended. If you use Node 8 or less, the adapter will stop immediately.
* (Stübi) Tested with js-controller 3. I recommend using js-controller 3 or higher because of sentry logging and more
  features in the future
* (Stübi) Snapshot link will be shown as https or http in state (Issue #18)
* (Stübi) Livestream link added and a request button added to get new livestream
* (Stübi) Old snapshots and livestreams can be deleted on the filesystem
* (Stübi) Sentry logging added
* (Stübi) Small improvements and bugfixing
* (Stübi) Add a Two-Factor Auth (2fa) description (Issue #14, Issue #13, Issue #19)

### 1.0.7 (24.12.2019)

* (Stübi) Bugfixing

### 1.0.6 (20.12.2019)

* (Stübi) Bugfixing: Login with username and password changed
* (Stübi) New feature (BETA): Now you can make snapshots in jpg and a livestream in mp4 format. Unfortunately the
  snapshot / livestream does not work always!

### 1.0.5 (18.04.2019)

* (Stübi) Bugfixing
* (Stübi) Using new API. With this API livestreaming and snapshots are possible (work still in progress and not
  supported in this version)
* (Stübi) Fixed an error with js-controller 2.0. You need at least this version with js-controller 2.0
* (Stübi) two face authentication

### 1.0.4 (17.04.2019)

* (Stübi) Bugfixing for Ring Pro

### 1.0.3 (09.03.2019)

* (Stübi) Major change! I had to change the used ring.com API to an other API. The old one did not work anymore. For
  this reason, a lot has to be redesigned.

### 1.0.2 (01.02.2019)

* (Stübi) More debug information

### 1.0.1 (05.01.2019)

* (Stübi) Support js-controller compact mode

### 1.0.0 (04.01.2018)

* (Stübi) Add camera device. For this reason, the device name changed from doorbot to doorbell.

### 0.1.3 (20.12.2018)

* (Stübi) Update error handling

### 0.1.2 (17.12.2018)

* (Stübi) Update error handling

### 0.1.1 (15.12.2018)

* (Stübi) Improvements

### 0.1.0 (14.12.2018)

* (Stübi) First Version

## License

MIT License

Copyright (c) 2018-2022 Thorsten <thorsten@stueben.de> / <https://github.com/schmupu>

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