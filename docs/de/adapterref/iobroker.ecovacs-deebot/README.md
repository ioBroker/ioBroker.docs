---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ecovacs-deebot/README.md
title: Ecovacs Deebot-Adapter für ioBroker
hash: q3tQ8cRl6EiYIFhtgrt/JK7QCeeVq7XDiC3LHRUQl6s=
---
![Logo](../../../en/adapterref/iobroker.ecovacs-deebot/admin/ecovacs-deebot.png)

![stabile Version](http://iobroker.live/badges/ecovacs-deebot-stable.svg)
![Letzte Version](http://img.shields.io/npm/v/iobroker.ecovacs-deebot.svg)
![Anzahl der Installationen](http://iobroker.live/badges/ecovacs-deebot-installed.svg)
![Anzahl der monatlichen Downloads](https://img.shields.io/npm/dm/iobroker.ecovacs-deebot.svg)
![Anzahl der Downloads](https://img.shields.io/npm/dt/iobroker.ecovacs-deebot.svg)

# Ecovacs Deebot-Adapter für ioBroker
[![github-workflow](https://github.com/mrbungle64/iobroker.ecovacs-deebot/actions/workflows/node.js.yml/badge.svg)](https://github.com/mrbungle64/iobroker.ecovacs-deebot)

Dieser Adapter verwendet die Bibliothek [ecovacs-deebot.js](https://github.com/mrbungle64/ecovacs-deebot.js).

## Merkmale
Einige bemerkenswerte Merkmale sind:

* Grundlegende Reinigungsfunktionen (z. B. automatische Reinigung, Spot-Bereich, benutzerdefinierter Bereich)
* und verschiedene andere Befehle (z. B. Ton abspielen, Verbrauchsmaterialien zurücksetzen, Position verschieben)
* Grundlegende Informationen abrufen (z. B. Akkustand, Reinigungsprotokoll, Verbrauchsmaterial, Reinigungs- und Ladestatus)
* und verschiedene erweiterte Informationen (z. B. Ladeposition, kartenbezogene Informationen, Netzwerkinformationen)
* Informationen während des Reinigungsvorgangs abrufen (z. B. aktuelle Position und aktueller Spotbereich)
* Stellen Sie Vakuumleistung, Wasserstand und andere Grundeinstellungen ein
* Erweiterte Einstellungen festlegen (z. B. Dauerreinigung, Nicht-Stören-Modus, Lautstärke, TrueDetect 3D)
* Speichern Sie den zuletzt verwendeten benutzerdefinierten Bereich und führen Sie die gespeicherten Bereiche erneut aus
* Abrufen von Informationen der Karten inkl. Spotbereiche, virtuelle Grenzen und No-Mop-Zonen
* Löschen, speichern und erstellen Sie einzelne virtuelle Grenzen sowie einen vollständigen Satz virtueller Grenzen
* Informationen über Datum und Uhrzeit der letzten Präsenz für jeden einzelnen Spotbereich
* Einige Funktionen bei der Rückkehr zur Ladestation oder beim Betreten/Verlassen des Spotbereichs
* Funktion zum Laden des aktuellen Kartenbildes
* Legen Sie individuelle Spot-Bereichsnamen fest (in ioBroker)

Bitte beachten Sie: Einige Funktionen sind nur für einige Modelle verfügbar und einige sind noch experimentell

## Modelle
### Vollständig unterstützte Modelle
Die vollständig unterstützten Modelle sind die, die ich selbst besitze:

*Deebot OZMO 920
* Deebot T8 AIVI

### Andere unterstützte Modelle
Diese Modelle sollten ordnungsgemäß oder zumindest teilweise funktionieren.
Sie funktionieren entweder bereits oder sind diesen Modellen technisch ähnlich.
Trotzdem kann die Funktionalität teilweise eingeschränkt sein.

Ich versuche, eine möglichst breite Funktionalität zu erreichen, entscheide dies aber von Fall zu Fall je nach Komplexität und diversen anderen Kriterien.
Es besteht natürlich kein Anspruch auf volle Funktionalität.

#### Ecovacs-Deebot
*Deebot OZMO 950/T5
* Deebot N8-Serie
* Deebot U2-Serie
* Deebot T8-Serie
* Deebot T9-Serie
* Deebot T10-Serie
* Deebot X1-Serie

#### Yeedi (seit Version 1.4.5, noch experimentell)
* yeedi k650
* Yeedi 2-Hybrid
* Yeedi-Vac-Hybrid
* Yeedi-Wischstation

#### Legacy-Modelle (werden bald eingestellt)
Diese Modelle verwenden XML für den Datentransport und auch andere Eigenschaften für Befehle und Ereignisse als die aktuellen Modelle.
Ich benutze auch meinen Slim 2, Deebot 901 und OZMO 930 nicht mehr.

**Der Support für diese Modelle wird daher bald eingestellt**.

* Deebot Slim 2
* Deebot N79-Serie
*Deebot M88
* Debbot 500
* Debot 600/601/605
* Debot 710/711
* Debot 900/901
* Deebot-OZMO 610
* Deebot-OZMO 900/905
*Deebot OZMO 930
*Deebot OZMO Slim 10/11

## Installation
### Voraussetzungen
Um diesen Adapter verwenden zu können, müssen Sie bereits [ioBroker](iobroker.net) installiert haben.

Die erforderliche Mindestversion von Node.js ist 14.x. Es wird empfohlen, Version 14.x oder 16.x zu verwenden

### Optionale Voraussetzungen
Dieser Adapter verwendet die Bibliothek [Knotenleinwand](https://www.npmjs.com/package/canvas) für einige kartenbezogene Funktionen, die möglicherweise die Installation einiger zusätzlicher Pakete erfordern.

Die Installation von Canvas ist optional und bei Modellen ohne Kartenfunktionalität nicht notwendig, für vollen Funktionsumfang installieren Sie bitte die folgenden Pakete.

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
Häufig gestellte Fragen finden Sie unter [hier](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/FAQ)

## Verwendungszweck
Informationen zur Verwendung dieses Adapters finden Sie in [hier](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki)

### Zustände
Informationen zu den Bundesländern finden Sie in [hier](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/States-%28EN%29) (Englisch) und [hier](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/Datenpunkte-%28DE%29) (Deutsch)

## Bekannte Probleme
* Die Generierung von Kartenbildern ist derzeit auf 32-Bit-Systemen nicht stabil
* Die "Edge"-Funktion funktioniert nicht mit Deebot U2 (startet stattdessen die automatische Reinigung)
* Die "Verschieben"-Funktionen funktionieren nicht mit Deebot OZMO T8 AIVI (und möglicherweise auch mit einigen anderen Modellen)
* Einige „cleaninglog“-Zustände sind bei der T9-Serie leer („last20Logs“, „lastCleaningDate“ und „lastCleaningMapImageURL“)
* Die Generierung von Kartenbildern funktioniert mit der Deebot X1-Serie nicht richtig

## Haftungsausschluss
Ich bin in keiner Weise mit ECOVACS verbunden.

## Changelog

### 1.4.8 (latest beta)
* Breaking change: Bumped minimum required version of Node.js to 14.x
* Bumped ecovacs-deebot.js to 0.9.0-beta.2
* Bumped several other dependencies

### 1.4.7
* Bumped ecovacs-deebot.js to 0.8.3-beta.2 (Hotfix XMPP devices)

### 1.4.6
* Added option for native goToPosition function (e.g. Deebot OZMO T8 AIVI)
* Some improvements and fixes

### 1.4.5
* Added states for time and cleaned area since last dustbox removal
* Added button for manually trigger dustbox removal
* Removed some options from settings
* Some other changes to settings
* Bumped ecovacs-deebot.js to latest beta
* Initial Support for yeedi login (experimental)
* and also for a few models (experimental)
  * yeedi k650
  * yeedi 2 hybrid
  * yeedi vac hybrid
  * yeedi mop station

### 1.4.4 (latest stable)
* Bumped ecovacs-deebot.js to 0.8.2
* Bugfix for non 950 type models with mopping system (e.g. OZMO 930)
* Some minor improvements

### 1.4.3
* Bumped ecovacs-deebot.js to latest beta
* Improved last time presence functionality
* Added state for Clean Preference (e.g. T8/T9 series)
* Added state for the last 20 errors
* Added state for cleaning schedule (read-only)
* Some further improvements and some fixes

### 1.4.2
* Bumped ecovacs-deebot.js to 0.8.1 (beta)
* Added states for cleaning cloth reminder and auto-boost suction (e.g. OZMO 920/950, T8/T9 series)
* Added states for mopping type and scrubbing type (models with OZMO Pro mopping system)
* Added option to choose between 'pause' and 'stop' for 'PauseBeforeDockingChargingStation...' functionality
* Some further improvements

### 1.4.1
* Bumped ecovacs-deebot.js to 0.8.0
* Improved last time presence functionality
* Added option to reset the vacuum power (cleanSpeed) to standard on return
* Added option to keep modified spot area names (pre-selection on non 950 type models)
* Added states for current used custom and spot areas (currentUsedSpotAreas and customUsedCustomAreaValues)
* Handle error code 110 ("NoDustBox: Dust Bin Not installed")
* Bumped some dependencies

### 1.4.0
* Bumped ecovacs-deebot.js to 0.8.0 (beta)
* Implemented last time presence function (still experimental)
* Implemented cleanCount (permanent clean count) function (T8/T9/X1 series)
* Implemented trueDetect (enable/disable) function (T8/T9/X1 series)
* Added unit care to consumables (T8/T9/X1 series)
* Added Deebot X1 series
* Some improvements and fixes

### 1.3.4
* Bumped ecovacs-deebot.js to 0.7.2 (beta)
* Implemented some experimental functions for auto empty stations
* Some refactoring

### 1.3.3
* Bumped ecovacs-deebot.js to 0.7.1 (incl. fix for CVE-2022-0155)

### 1.3.2
* Bumped follow-redirects to 1.14.7 (fix for CVE-2022-0155) and some other dependencies
* Added N8 PRO+

### 1.3.1
* Fix the cleaning functions for the Deebot 710 series

### 1.3.0
* Breaking change: The minimum required version of Node.js is now 12.x
* Using library version 0.7.0 (beta)
* Some improvements for newer models (e.g. T9 series)
* Some other improvements and fixes

### 0.0.1 - 1.2.4
* [Changelog archive](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/Changelog-(archive))

## License

MIT License

Copyright (c) 2022 Sascha Hölzel <mrb1232@posteo.de>

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