---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ecovacs-deebot/README.md
title: Ecovacs Deebot-Adapter für ioBroker
hash: 713ZW7GDu30w1y02dO7S5QJvaboY7I2w0irmkat0788=
---
![Logo](../../../en/adapterref/iobroker.ecovacs-deebot/admin/ecovacs-deebot.png)

![stabile Version](http://iobroker.live/badges/ecovacs-deebot-stable.svg)
![Letzte Version](http://img.shields.io/npm/v/iobroker.ecovacs-deebot.svg)
![Anzahl der Installationen](http://iobroker.live/badges/ecovacs-deebot-installed.svg)
![Anzahl der monatlichen Downloads](https://img.shields.io/npm/dm/iobroker.ecovacs-deebot.svg)
![Anzahl der Downloads](https://img.shields.io/npm/dt/iobroker.ecovacs-deebot.svg)

# Ecovacs Deebot-Adapter für ioBroker
[![github-workflow](https://github.com/mrbungle64/iobroker.ecovacs-deebot/actions/workflows/node.js.yml/badge.svg)](https://github.com/mrbungle64/iobroker.ecovacs-deebot)

Dieser Adapter verwendet die [ecovacs-deebot.js](https://github.com/mrbungle64/ecovacs-deebot.js)-Bibliothek.

## Merkmale
### Grundfunktionen
* Reinigungsfunktionen (z. B. automatische, Bereichs- und benutzerdefinierte Bereichsreinigung) und verschiedene andere Grundfunktionen (z. B. Ton abspielen, Verbrauchsmaterialien zurücksetzen, Position ändern)
* Informationen abrufen (z. B. Akkustand, Reinigungsprotokoll, Verbrauchsmaterialstatus, Reinigungs- und Ladestatus) und verschiedene andere erweiterte Informationen (z. B. Ladeposition, kartenbezogene Informationen)
* Stellen Sie die Saugleistung, den Wasserstand und andere grundlegende Einstellungen sowie verschiedene erweiterte Einstellungen ein (z. B. kontinuierliche Reinigung, Nicht-Stören-Modus, Lautstärke, AIVI/TrueDetect 3D).
* Abrufen von Karteninformationen, einschließlich Flächen, virtuellen Grenzen und Wischverbotszonen, auch während des Reinigungsprozesses (z. B. aktuelle Position und Fläche)
* Laden des aktuellen Kartenbildes

### Erweiterte Funktionen (nur ioBroker-Adapter)
* Speichern und erstellen Sie vollständige Sätze virtueller Grenzen und No-Mop-Zonen
* Informationen zu Datum und Uhrzeit der letzten Präsenz für jeden einzelnen Bereich
* Einige Funktionen beim Zurückkehren zur Ladestation oder beim Betreten/Verlassen des Bereichs
* Speichern Sie den zuletzt verwendeten benutzerdefinierten Bereich und führen Sie die gespeicherten Bereiche erneut aus
* Leise Anfahrreinigungs- und Go-to-Position-Funktionen
* Legen Sie individuelle Bereichsnamen fest

### Wichtige Notizen
* Einige Funktionen (z. B. „Silent Approach“) sind nur für einige Modelle verfügbar (meist aktuelle Modelle)
* und einige sind noch experimentell (z. B. „Laden des aktuellen Kartenbildes“, Umgang mit Sätzen virtueller Grenzen)
* Die Funktionalität des Adapters ist nicht für alle Modelle gewährleistet (siehe unten)

## Modelle
### Unterstützte Modelle
Die folgenden Modelle besitze ich selbst und werden daher sehr weithin unterstützt:

* Deebot OZMO 920/950
* Deebot OZMO T8 AIVI
* Deebot X1 Turbo
* Airbot Z1

### Andere Modelle
Die folgenden Modelle sollten ordnungsgemäß oder zumindest teilweise funktionieren.
Ihre Funktionsfähigkeit ist entweder bereits bekannt oder sie sind diesen Modellen technisch ähnlich.
Dennoch kann die Funktionalität teilweise eingeschränkt sein.

Ich versuche einen möglichst großen Funktionsumfang zu erreichen, entscheide dies aber von Fall zu Fall je nach Komplexität und diversen anderen Kriterien.
Ein Anspruch auf volle Funktionalität besteht selbstverständlich nicht.

#### Ecovacs Deebot
* Deebot N8-Serie
* Deebot T8-Serie
* Deebot T9-Serie
* Deebot T10-Serie
* Deebot T20-Serie
* Deebot X1-Serie
* Deebot X2-Serie

#### Yeedi
* Yeedi k650
* Yeedi 2 Hybrid
* Yeedi-Vac-Hybrid
* yeedi vac max
* Yeedi vac 2 pro
* Yeedi Wischstation

**Hinweis**: Alle diese Listen sind möglicherweise nicht vollständig

### Legacy-Modelle (wird bald eingestellt)
Ältere Modelle, die XML für den Datentransport nutzen (z. B. Deebot OZMO 930, Deebot 900/901), funktionieren größtenteils noch, der Support für diese Modelle wird jedoch früher oder später eingestellt.

Weitere Informationen finden Sie unter [diese Readme-Datei](https://github.com/mrbungle64/ecovacs-deebot.js#legacy-models-soon-to-be-discontinued).

## Installation
### Voraussetzungen
Um diesen Adapter verwenden zu können, muss [ioBroker](iobroker.net) bereits installiert sein.

Die mindestens erforderliche Version von Node.js ist 16.x.

### Optionale Voraussetzungen
Dieser Adapter verwendet die [Knoten-Leinwand](https://www.npmjs.com/package/canvas)-Bibliothek für einige kartenbezogene Funktionen, die möglicherweise die Installation einiger zusätzlicher Pakete erfordern.

Die Installation von Canvas ist optional und für Modelle ohne Kartenfunktionalität nicht notwendig, für den vollen Funktionsumfang installieren Sie bitte die folgenden Pakete.

Für Debian-basierte Linux-Systeme sollten die folgenden Befehle ausgeführt werden:

```bash
sudo apt-get update
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

Möglicherweise ist ein Neustart erforderlich, bevor der nächste Befehl ausgeführt wird

```bash
npm install canvas --unsafe-perm=true
```

Anweisungen für andere Systeme finden Sie unter https://www.npmjs.com/package/canvas#compiling

## FAQ
Häufig gestellte Fragen finden Sie unter [Hier](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/FAQ)

## Verwendung
Informationen zur Verwendung dieses Adapters finden Sie unter [Hier](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki)

### Zustände
Informationen zu den Bundesländern finden Sie unter [Hier](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/States-%28EN%29) (Englisch) und [Hier](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/Datenpunkte-%28DE%29) (Deutsch).

## Bekannte Probleme
* Die Funktion „Verschieben“ variiert von Modell zu Modell und ist daher nicht universell implementiert
* Die Generierung von Kartenbildern ist auf 32-Bit-Systemen nicht stabil
* und es funktioniert immer noch nicht richtig mit der Deebot X1-Serie und anderen aktuellen Modellen

## Haftungsausschluss
Ich stehe in keiner Verbindung zu Ecovacs Robotics Co., Ltd. oder yeedi Technology Limited.

## Changelog

### 1.4.15 (alpha)
* Breaking change: Bump minimum required version of Node.js to 18.x
* Improvements and optimizations

### 1.4.14
* Breaking change: Bump minimum required version of Node.js to 16.x
* Bumped ecovacs-deebot.js to 0.9.6 (alpha)
* Many improvements for AIRBOT Z1 and Z1 Air Quality Monitor
* and also several improvements for the T20 and X2 series
* Bumped max number of devices to 20
* Added Australia, the United Arab Emirates and "Other countries" as "country"
* Bumped some dependencies
* Some further improvements and optimizations

### 1.4.13 (latest stable)
* Several improvements and optimizations for X1 series (e.g. for the cleaning station and mopping functions)
* Added Air Freshener life span component
* Some further improvements and optimizations

### 1.4.12
* Bumped ecovacs-deebot.js to 0.9.2 (beta)
* Spot area related functions for models with native "goToPosition" function (from the Video Manager):
  * Implemented "goToCalculatedCenterPosition" function
  * Implemented "silentApproach" cleaning
* Some further improvements and optimizations

### 1.4.11
* Bumped ecovacs-deebot.js to 0.9.2 (alpha)
* Added channel for the auto empty station (incl. dust bag full)
* Added state for changing the scrubbing pattern (OZMO Pro)
* Added option to save the used go to position values
* Added function to also save the current deebot position as a "goToPosition"
* Automatically set the last time dustbox removed when the dust bag has been emptied by the auto empty station
* Some further improvements and some fixes

### 1.4.10
* Bumped ecovacs-deebot.js to 0.9.1
* Added channel with information about the last cleaned spot area
* Implemented "markForNextSpotAreaCleaning" function

### 1.4.9
* Bumped ecovacs-deebot.js to 0.9.1-beta.3
* Several improvements for T9 based models (e.g. N8/T9/T10/X1)
* Implemented option for automatic download of the last cleaning image
* The generated base64 map image will also be stored to the filesystem now
* Some further improvements and some fixes

### 1.4.8
* Breaking change: Bumped minimum required version of Node.js to 14.x
* Bumped ecovacs-deebot.js to 0.9.0-beta.2
* Bumped several other dependencies

### 1.4.7
* Bumped ecovacs-deebot.js to 0.8.3-beta.2 (Hotfix XMPP devices)

### 1.4.6
* Added option for native "goToPosition" function (e.g. Deebot OZMO T8 AIVI)
* Some improvements and fixes

### 1.4.5
* Added states for time and cleaned area since last dustbox removal
* Added button for manually trigger dustbox removal
* Removed some options from settings
* Some other changes to settings
* Bumped ecovacs-deebot.js to the latest beta version
* Initial Support for yeedi accounts
* and also for a few models
  * yeedi k650
  * yeedi 2 hybrid
  * yeedi vac hybrid
  * yeedi mop station

### 1.4.4
* Bumped ecovacs-deebot.js to 0.8.2
* Bugfix for non 950 type models with mopping system (e.g. OZMO 930)
* Some minor improvements

### 1.4.3
* Bumped ecovacs-deebot.js to the latest beta version
* Improved last time presence functionality
* Added state for Clean Preference (e.g. T8/T9 series)
* Added state for the last 20 errors
* Added state for cleaning schedule (read-only)
* Some further improvements and some fixes

### 1.4.2
* Bumped ecovacs-deebot.js to 0.8.1 (beta)
* Added states for cleaning cloth reminder and auto-boost suction (e.g. OZMO 920/950, T8/T9 series)
* Added states for mopping type and scrubbing type (models with OZMO Pro mopping system)
* Added option to choose between "pause" and "stop" for "PauseBeforeDockingChargingStation..." functionality
* Some further improvements

### 1.4.1
* Bumped ecovacs-deebot.js to 0.8.0
* Improved "lastTimePresence" functionality
* Added option to reset the vacuum power (cleanSpeed) to standard on return
* Added option to keep modified spot area names (pre-selection on non 950 type models)
* Added states for current used custom and spot areas (currentUsedSpotAreas and customUsedCustomAreaValues)
* Handle error code 110 ("NoDustBox: Dust Bin Not installed")
* Bumped some dependencies

### 1.4.0
* Bumped ecovacs-deebot.js to 0.8.0 (beta)
* Implemented last time presence function (still experimental)
* Implemented "cleanCount" (permanent clean count) function (T8/T9/X1 series)
* Implemented "trueDetect" (enable/disable) function (T8/T9/X1 series)
* Added "unitCare" to consumables (T8/T9/X1 series)
* Added Deebot X1 series
* Some improvements and fixes

### 0.0.1 - 1.3.4
* [Changelog archive](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/Changelog-(archive))

## License

MIT License

Copyright (c) 2024 Sascha Hölzel <mrb1232@posteo.de>

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