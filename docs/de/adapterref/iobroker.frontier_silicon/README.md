---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.frontier_silicon/README.md
title: ioBroker.frontier_silicon
hash: NcLY7C7E+81OQd7XM6P1bLyzXy9bA0pAuWeNFAogifY=
---
# IoBroker.frontier_silicon
![Logo](../../../en/adapterref/iobroker.frontier_silicon/admin/radio.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.frontier_silicon.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.frontier_silicon.svg)
![Anzahl der Installationen (neueste)](http://iobroker.live/badges/frontier_silicon-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/frontier_silicon-stable.svg)
![NPM](https://nodei.co/npm/iobroker.frontier_silicon.png?downloads=true)

## IoBroker-Adapter für Frontier SmartRadio
**Tests:** ![Testen und freigeben](https://github.com/iobroker-community-adapters/ioBroker.frontier_silicon/workflows/Test%20and%20Release/badge.svg)

## Die Info
Bietet Unterstützung für Mediaplayer, Internetradios und SmartRadios, die mit einem Frontier Silicon-Chipsatz mit FSAPI ausgestattet sind.

HINWEIS: Dieser Adapter wurde zur Wartung an iobroker-community-adapters übertragen. Daher werden geplante Funktionen (siehe unten) nicht implementiert. In Zukunft werden nur noch wichtige Fehlerbehebungen und Abhängigkeitsaktualisierungen veröffentlicht. PRs mit Fehlerbehebungen oder Funktionserweiterungen sind jedoch immer willkommen.

## Merkmale
### Implementierte Funktionen
- Stromschalter
- Modusauswahl
- Preset-Auswahl
- Benachrichtigungen für mehrere Staaten
- Lautstärkeregelung
- Benachrichtigungen

### Geplante Funktionen
- Automatische Erkennung
- Mehr Staaten
- Übersetzungen
- Mehr Ausnahmebehandlung
- Cleaner-Code
- Mehrraumfunktionen

### Nicht geplante Funktionen
- Systeminformationen ändern

### Bekannte Fehler
- Der Mediaplayer muss für die Suche nach Voreinstellungen eingeschaltet sein
- Keine Benachrichtigungen nach einiger Zeit

## Dokumentation
Mit diesem Adapter können Sie Internetradios und Mediaplayer steuern, die auf Frontier Silicon-Chipsätzen basieren. Viele Geräte lassen sich über [Undok](https://www.frontiersmart.com/undok) sollte funktionieren. Getestete Geräte stammen von [Revo](https://revo.co.uk/de/products/), [Sangean](https://www.sangean.eu/products/all_product.asp) und [SilverCrest](https://www.silvercrest-multiroom.de/produkte/produktuebersicht/) steuern, andere sollten auch funktionieren.

Nach der Installation müssen IP und PIN des Geräts im Konfigurationsdialog eingegeben werden. Wenn das Radio nach dem Einschalten über Undok oder diesen Adapter kein DAB spielt, versuchen Sie es mit aktiviertem "DAB startet ohne Ton".

Wenn der Adapter zum ersten Mal gestartet wird, sammelt er Informationen über das Gerät. Dazu muss er alle Modi durchschalten. Während der Überprüfung der Einstellungen wird das Gerät für einige Sekunden stumm geschaltet, um störende Geräusche zu vermeiden.

Während der Adapter die Einstellung des Geräts liest, werden Objekte und Zustände erstellt. Zustände können schreibgeschützt (`ro`) oder schreibgeschützt (`rw`) sein *ok, schreibgeschützt für Schaltflächen ist auch möglich*.

- Ton

  Grundlegende Audioeinstellungen. Noch keine Equalizer-Steuerung implementiert.

  - maxVolume (`number, ro`)

    Die maximale Lautstärke wählbar

  - stumm (`boolean, rw`)

    `true` wenn das Gerät stummgeschaltet ist, `false`sonst

  - Lautstärke (`number, rw`)
  - Kontrolle
    - lauter und lauter

    In-/ oder verringert die Lautstärke um 1

- Gerät

  - friendlyName (`text, rw`)
  - Macht (`boolean, rw`)
  - radioId (`test, ro`)

    Meine Vermutung ist, dass dies die MAC des Geräts ist

  - version (`text, ro`)

    Softwareversion

  - webfsapi (`text, ro`)

    Die Adresse der API

- die Info

  - Verbindung (`boolean, ro`)

    Verbindungsanzeige für den Adapter

- Medien

  - Zustand (`Nummer, rw`)

    Gültige Werte sind:

    - 0: Pause
    - 1: Spielen

  - Kontrolle

    - nächste
    - Pause
    - spielen
    - vorherige

  Nehmen Sie die folgenden Namen nicht zu ernst. Das Radio verwendet sie in verschiedenen Modi unterschiedlich.

  - album (`text, ro`)
  - Künstler (`text, ro`)
  - Grafik (`text, ro`)

    Verwenden Sie diese URL, um ein Albumcover oder das Logo eines Senders zu erhalten.

  - Name (`text, ro`)
  - text (`text, ro`)
  - Titel (`text, ro`)

- Modi

  - Voreinstellungen lesen

    Liest alle Voreinstellungen erneut ein

  - selectPreset (`number, rw`)

    Wird verwendet, um eine Voreinstellung zu erhalten oder auszuwählen. Seien Sie gewarnt, dass der Adapter rät, da dieser Wert nicht von der API gelesen werden kann.

  - ausgewählt (`number, rw`)

    Zeigt den ausgewählten Modus an oder wählt ihn aus. Kann auch über `modes.{number}.switchTo` ausgewählt werden

  - `{Zahl}`

    - id (`text, ro`)

      Der Name dieses Modus

    - Schlüssel (`Nummer, ro`)

      Der Index dieses Modus. Entspricht `mode.{number}` aus dem Objektbaum und kann in `modes.selected` geschrieben werden.

    - wählbar (`boolean, ro`)

      `true` wenn dieser Modus manuell ausgewählt werden kann.

    - streambar (`boolean, ro`)

      Nur auf Multiroom-fähigen Geräten vorhanden. `true` ob dieser Modus als Quelle für mehrere Multiroom-Geräte genutzt werden kann.

    - wechseln zu

      Wählt diesen Modus aus.

    - Voreinstellungen

      - verfügbar (`boolean, ro`)

        Zeigt an, ob Voreinstellungen für diesen Modus verfügbar sind

      - `{Zahl}`

        Der Index dieser Voreinstellung. Entspricht `mode.*.presets.{number}.key`.

        - Taste

          Der Index dieser Voreinstellung. Entspricht `mode.*.presets.{number}` aus dem Objektbaum und kann in `modes.selectPreset` geschrieben werden.

        - Name (`text, ro`)

          Der Name dieser Voreinstellung

        - wechseln zu

          Wählt dieses Preset und den entsprechenden Modus aus.

Bitte beachten Sie, dass Sie manchmal zwischen „Knopfdruck“ oder „Wert setzen“ wählen können. Verwenden Sie, was für Sie bequemer ist.

## Rechtliche Hinweise
Frontier, Frontier Silicon, SmartRadio und zugehörige Logos sind Warenzeichen oder eingetragene Warenzeichen von Frontier Smart Technologies Limited [https://www.frontiersmart.com](https://www.frontiersmart.com)

Alle anderen Warenzeichen sind Eigentum ihrer jeweiligen Inhaber.

Die Autoren werden in keiner Weise von Frontier Smart Technologies Limited oder verbundenen Tochtergesellschaften, Logos oder Warenzeichen unterstützt oder sind mit ihnen verbunden.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

- (pdbjjens) Breaking Changes: node>=14, js-contoller>=4 and admin>=5 required
- (pdbjjens) New: json config UI

### 0.0.11 (2023-03-30) 2023 maintenance release

- (pdbjjens) New: Transfer of adapter to community
- (pdbjjens) New: Updated dependencies
- (pdbjjens) New: Use adapter-dev instead of gulp translate
- (pdbjjens) Fix: Prevent js-controller >=3.2.x warnings regarding non-existent objects and typeErrors

### 0.0.10 (2020-11-29)

- Translations

### 0.0.9

- (halloamt) Selected preset can be read now. The adapter guesses a little but this seems to work.

- (halloamt) Nicer readme
- (halloamt) (Hopefully) more robust session handling.
- (halloamt) Long polling should work more reliably
- (halloamt) Sleep timers are cleared on `onUnload`

### 0.0.7 und 0.0.8

- (halloamt) Formal but neccessary stuff for ioBroker

### 0.0.6

- (halloamt) Nothing really, small stuff for npm

### 0.0.5

- (halloamt) Media state controls

- (halloamt) Bugfixes

### 0.0.4

- (halloamt) Media and volume control buttons

- (halloamt) Bugfixes

### 0.0.3

- (halloamt) Get notifications from the radio

- (halloamt) Change volume / mute

### 0.0.1

- (halloamt) initial release
- (halloamt) Change mode
- (halloamt) Select Preset

## License

MIT License

Copyright (c) 2023 halloamt <iobroker@halloserv.de>

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