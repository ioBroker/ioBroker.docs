---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.nibeuplink/README.md
title: ioBroker.nibeuplink
hash: bFO4J2oEmtx4GO7FlT9xZuyTC9CdV29rY+k1Hy8OIqQ=
---
# IoBroker.nibeuplink

![NPM-Version](https://img.shields.io/npm/v/iobroker.nibeuplink.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/nibeuplink-stable.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.nibeuplink.svg)
![Anzahl der Installationen](https://iobroker.live/badges/nibeuplink-installed.svg)
![NPM](https://nodei.co/npm/iobroker.nibeuplink.png?downloads=true)

[![Build-Status](https://github.com/sebilm/ioBroker.nibeuplink/workflows/Test%20and%20Release/badge.svg)](https://github.com/sebilm/ioBroker.nibeuplink/actions/workflows/test-and-release.yml)

## Nibeuplink-Adapter für ioBroker
**Die nibeuplink API wurde offiziell eingestellt! Aus diesem Grund wird dieser ioBroker-Adapter nicht weiter entwickelt! Bitte verwenden Sie den myUplink-Adapter!**

Dieser ioBroker-Adapter empfängt Daten von einer Nibe-Wärmepumpe über Nibe Uplink.
Dieser Adapter funktioniert NICHT mit Nibe myUplink! Er funktioniert daher NICHT mit Wärmepumpen der S-Serie wie Nibe VVM S320.

## Verwendung dieses Adapters
1. Sie benötigen eine Nibe-Wärmepumpe – kaufen Sie eine, wenn Sie keine haben ;-)
2. Sie benötigen ein Konto bei Nibe Uplink: https://www.nibeuplink.com/
3. Nach dem Einloggen haben Sie eine URL in dieser Form: https://www.nibeuplink.com/System/XXXXX/Status/Overview
4. Statt XXXXX steht hier eine Zahl. Das ist Ihre System-ID. Diese ID benötigen wir.
5. Gehen Sie zu Nibe Uplink Api: https://api.nibeuplink.com/Account/LogIn und melden Sie sich an
6. Klicken Sie auf „MEINE BEWERBUNGEN“ und dann auf „Bewerbung erstellen“
7. Ausfüllen: Name und Beschreibung können beliebig sein, z.B. ioBroker
8. Die Callback-URL ist wichtig. Sie können https://sebilm.github.io/ioBroker.nibeuplink/nibe.html verwenden.
9. Akzeptieren Sie die NIBE Uplink API Services-Vereinbarung und klicken Sie auf „Anwendung erstellen“
10. Dann erhalten Sie eine Kennung und ein Geheimnis - wir brauchen sie
11. Installieren Sie diesen Adapter in ioBroker
12. Geben Sie auf der Adaptereinstellungsseite die Kennung und das Geheimnis ein.
13. Klicken Sie auf den Link „Klicken Sie hier, um den Authentifizierungscode für NIBE Uplink zu generieren.“
14. Folgen Sie den Anweisungen. Am Ende erhalten Sie Ihren Nibe-Fetcher-Code
15. Kopiere diesen Code und füge ihn in den Adaptereinstellungen bei „Auth Code“ ein.
16. Geben Sie Ihre System-ID aus der Nibe-Uplink-URL ein.
17. Wählen Sie Ihre Sprache.
18. Klicken Sie auf Speichern und Schließen

Wenn Sie (später) einen „400 Bad Request“-Fehler im Protokoll erhalten, müssen Sie einen neuen Authentifizierungscode anfordern – dies gilt auch für die Nummern 13 bis 15 und 18.

## Unterstützung verwalten/schreiben
Anscheinend können Sie nur die auf der folgenden Webseite aufgeführten Parameter ändern:

https://api.nibeuplink.com/docs/v1/Parameters (Abschnitt „Einstellungen“)

Der Parameter „hot_water_boost“ hat die Parameter-ID 48132.

Man kann andere Werte lesen, aber ich glaube nicht, dass man andere Werte schreiben kann. Andere Werte sind hier aufgelistet:

https://github.com/sebilm/ioBroker.nibeuplink/blob/master/nibe-fetcher.js#L41

## Changelog
### 1.3.2 (2024-11-10)
- The nibeuplink API has been officially discontinued! For this reason, this ioBroker adapter will not be developed any further! Please use the myUplink adapter!
- Dependencies have been updated

### 1.3.1 (2023-12-23)
- Bump dependencies

### 1.3.0 (2023-08-27)
- Remove NodeJS 14 support
- Support strings as parameters in the management #241
- Bump dependencies

### 1.2.2 (2023-04-07)
- Bump dependencies

### 1.2.1 (2022-10-03)
- Fix getting data directory

### 1.2.0 (2022-10-02)
- Requires js-controller >= 3.3.22 and admin >= 5.0.0
- Update some files from up-to-date adapter creator
- Bump dependencies

### 1.1.1 - 2022-04-02
- Fix write support (does not send zero) #6 #128
- Bump dependencies

### 1.1.0 - 2022-02-06

- Switch to TypeScript
- Use axios instead of wreck

### 1.0.1 - 2021-12-31

- Fix write support #6

### 1.0.0 - 2021-12-30

- Support to manage Nibe heat pump (write support #6)
  - To manage your Nibe heat pump you must pay for it on Nibe Uplink website!
  - You need to run the new version 30 minutes and then get a new AuthCode in the settings to use it!

### 0.5.3 - 2021-11-21

- Bump dependencies

### 0.5.2 - 2021-07-04

- Change default callback URL to own GitHub Pages
- Bump dependencies

### 0.5.1 - 2021-05-14

- Store 'no current connection error' as empty string, not null
- Bump dependencies

### 0.5.0 - 2021-05-13

- Add new connection types (cloud, poll)
- Set supported node.js versions to >=12.0.0 <17
- Do not log errors immediately after installation

### 0.4.0 - 2020-12-24

- Set required js-controller to >=2.0.0
- Test for Node 8 removed
- Support for compact mode enabled
- Support for more than one unit added
  - There is a new object structure - one level more for the unit.
  - The old objects will be updated if they are found - so don't panic.
  - If you don't need the old objects, you can remove them. They will not be created again.
- Devide by 10 added to external flow temperature
- Hundreds of missing parameters were added
  - The old fallback objects are no longer supported and updated. So check your objects update time.
  - You can remove the old objects. They will not be created again.
- Fallback names for unknown parameters changed (id added at the beginning)
  - The old fallback objects are no longer supported and updated. So check your objects update time.
  - You can remove the old objects. They will not be created again.
  - If you have objects with numbers at the beginning, then these are fallback names. Please email me and I can add them.
- Store session in iobroker data directory
  - After the adapter update you always had to get a new AuthCode and set it in the adapter settings.
  - This is no longer necessary from the next version.
  - But after the update to this version (0.4.0) it is necessary once again.
- Translate object keys of serial number, version and product in english for all languages (section SYSTEM_INFO)
  - The old objects are no longer supported and updated. So check your objects update time.
- Norwegian added
- Code refactoring

### 0.3.0 - 2019-10-31

- Compact mode disabled
- Support for Node 6 removed
- Trim whitespaces from setting parameters
- Bugfix: Customs disabled

### 0.2.2 - 2019-03-24

- Internal clean-up

### 0.2.1 - 2019-03-21

- Dependencies updated
- Fix problem with nodejs 6 and the spread operator and async

### 0.2.0 - 2019-03-16

- Code change to new template
- Support for Compact mode (js-Controller 2.0 Feature) added (#1)
- Translations in settings page
- Type moved from general to climate control

### 0.1.1 - 2019-02-19

- Do not create deprecated sub path objects - only update them if present (if you have them and don't use them, you can delete them)
- info.connection added

### 0.1.0 - 2019-02-17

- Objects tree changed: New, more readable objects added

### 0.0.2 - 2019-02-17

- Language support for objects tree

### 0.0.1 - 2018-12-09

- Initial release

## License

MIT License

Copyright (c) 2024 Sebastian Häßelbarth <seb@sebmail.de>

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