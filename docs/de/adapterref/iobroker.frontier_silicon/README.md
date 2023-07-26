---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.frontier_silicon/README.md
title: ioBroker.frontier_silicon
hash: MJqNdJKLA52Jw8Ivs+83/4BbOJL2n/cJjLjidlmlS1I=
---
# IoBroker.frontier_silicon
![Logo](../../../en/adapterref/iobroker.frontier_silicon/admin/radio.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.frontier_silicon.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.frontier_silicon.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/frontier_silicon-installed.svg)
![Anzahl Installationen (stabil)](http://iobroker.live/badges/frontier_silicon-stable.svg)
![NPM](https://nodei.co/npm/iobroker.frontier_silicon.png?downloads=true)

## IoBroker-Adapter für Frontier SmartRadio
**Tests:** ![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.frontier_silicon/workflows/Test%20and%20Release/badge.svg)

## Die Info
Bietet Unterstützung für Mediaplayer, Internetradios und SmartRadios, die mit einem Frontier Silicon-Chipsatz ausgestattet sind, der FSAPI verwendet.

HINWEIS: Dieser Adapter wurde zur Wartung an iobroker-community-adapters übertragen. Daher werden geplante Funktionen (siehe unten) nicht implementiert. In Zukunft werden nur noch wichtige Fehlerbehebungen und Abhängigkeitsaktualisierungen veröffentlicht. PRs mit Fehlerbehebungen oder Funktionserweiterungen sind jedoch immer willkommen.

VERÖFFENTLICHUNGSHINWEISE: Version 0.1.x enthält einige wichtige Änderungen:

- node>=14, js-contoller>=4 und admin>=5 erforderlich

Aktualisieren Sie Ihren ioBroker mindestens auf diese Softwareversion, wenn Sie diesen Adapter verwenden möchten

- PIN-Verschlüsselung und Gültigkeitsprüfung aller Parameter in der Konfigurationsoberfläche

Wenn Sie diesen Adapter von einer früheren Version aktualisieren, anstatt ihn neu zu installieren, startet der Adapter nicht, selbst wenn Ihre PIN in Ihrer Konfiguration korrekt ist und nicht geändert wurde. Um dies zu beheben, geben Sie einfach dieselbe vorherige PIN noch einmal in die Konfigurations-Benutzeroberfläche ein, speichern Sie sie und schließen Sie die Konfigurations-Benutzeroberfläche, um den Adapter neu zu starten. Dies ist natürlich nur einmal beim ersten Start nach dem Update notwendig.

- Der Typ von „frontier_silicon.X.modes.selectPreset“ wurde von „string“ in „number“ geändert.

Wenn Sie diesen Adapter von einer früheren Version aktualisieren, anstatt ihn neu zu installieren, finden Sie möglicherweise Warnungen im ioBroker-Protokoll wie: `State value to set for "frontier_silicon.0.modes.selectPreset" has to be type "string" but received type "number"` Um dies zu verhindern, besteht die einfachste Lösung darin, den Adapter auf der Registerkarte „Instanzen“ zu stoppen Löschen Sie bei ioBroker den Objektbaum in der Registerkarte „Objekte“ vollständig und starten Sie anschließend den Adapter neu. Dies ist natürlich nur einmal nach dem Update notwendig und entfällt bei einer Neuinstallation.

- Synchronisierung von Strom-, Lautstärke- und Stummschaltungszuständen mit der UNDOK-App

Die Synchronisierung mit der UNDOK-App bedeutet hierbei, dass durch die UNDOK-App geänderte Power-, Lautstärke- und Stummschaltungseinstellungen nun auch in den Zuständen dieses Adapters aktualisiert werden. Aufgrund der Einschränkungen des FSAPI-Protokolls ist die Statussynchronisierung der UNDOK-App mit dem Adapter immer noch unzuverlässig und erfolgt nicht sofort, sondern nur dann, wenn z.B. Eine Voreinstellung oder ein Modus wird mit der UNDOK-App geändert.

## Merkmale
### Implementierte Funktionen
- Stromschalter
- Modusauswahl
- Voreinstellungsauswahl
- Benachrichtigungen für mehrere Staaten
- Lautstärkeregelung
- Benachrichtigungen

### Geplante Funktionen
- Automatische Erkennung
- Mehr Staaten
- Übersetzungen
- Mehr Ausnahmebehandlung
- Saubererer Code
- Multiroom-Funktionen

### Nicht geplante Funktionen
- Systeminformationen ändern

### Bekannte Fehler und Einschränkungen
- Für die Voreinstellungserkennung muss der Media Player eingeschaltet sein
- Aufgrund von Einschränkungen des FSAPI-Protokolls ist der Parallelbetrieb mit der UNDOK-App nicht zuverlässig und wird daher nicht unterstützt. Verwendung auf eigene Gefahr.

## Dokumentation
Mit diesem Adapter können Sie Internetradios und Mediaplayer steuern, die auf Frontier Silicon-Chipsätzen basieren. Viele Geräte lassen sich über [UNDOK](https://support.undok.net) sollte funktionieren. Getestete Geräte stammen von [Revo](https://revo.co.uk/de/products/), [Sangean](https://www.sangean.eu/products/all_product.asp), [Hama](https ://de.hama.com/produkte/audio-hifi/digitalradio) und [SilverCrest](https://www.lidl.de) steuern, andere sollten auch funktionieren.

Nach der Installation müssen IP und PIN des Geräts im Konfigurationsdialog eingegeben werden. Wenn das Radio nach dem Einschalten über die UNDOK-App oder diesen Adapter kein DAB wiedergibt, versuchen Sie es erneut mit aktivierter Option „DAB startet ohne Ton“.

Wenn der Adapter zum ersten Mal startet, sammelt er Informationen über das Gerät. Dazu muss es alle Modi durchschalten. Während der Überprüfung der Einstellungen wird das Gerät für einige Sekunden stummgeschaltet, um störende Geräusche zu vermeiden.

Während der Adapter die Einstellungen des Geräts liest, werden ioBroker-Objekte und -Zustände erstellt. Zustände können schreibgeschützt (`ro`) oder schreibgeschützt (`rw`) sein *ok, schreibgeschützt für Schaltflächen ist auch möglich*.

- Audio

  Grundlegende Audioeinstellungen. Noch keine Equalizer-Steuerung implementiert.

  - maxVolume („number, ro“)

    Die maximale Lautstärke ist wählbar

  - mute (`boolean, rw`)

    `true` wenn das Gerät stummgeschaltet ist, `false`andernfalls

  - Lautstärke („Zahl, rw“)
  - Kontrolle
    - VolumeDown und VolumeUp

    Ein-/ oder verringert die Lautstärke um 1

- Gerät

  - FriendlyName (`text, rw`)
  - Leistung („boolean, rw“)
  - radioId („test, ro“)

    Ich vermute, dass dies der MAC des Geräts ist

  - Version („text, ro“)

    Softwareversion

  - webfsapi („text, ro“)

    Die Adresse der API

- die Info

  - Verbindung („boolean, ro“)

    Verbindungsanzeige für den Adapter

- Medien

  - Zustand („Nummer, rw“)

    Gültige Werte sind:

    - 0: Pause
    - 1: Spielen

  - Kontrolle

    - nächste
    - plausibel
    - spielen
    - vorherige

  Nehmen Sie die folgenden Namen nicht zu ernst. Das Radio nutzt sie in verschiedenen Modi unterschiedlich.

  - Album („text, ro“)
  - Künstler („text, ro“)
  - Grafik („text, ro“)

    Verwenden Sie diese URL, um ein Albumcover oder das Logo eines Senders zu erhalten.

  - Name („Text, ro“)
  - Text („text, ro“)
  - Titel („text, ro“)

- Modi

  - readPresets

    Liest alle Voreinstellungen erneut

  - selectPreset („number, rw“)

    Wird verwendet, um eine Voreinstellung abzurufen oder auszuwählen. Seien Sie gewarnt, dass der Adapter vermutet, dass dieser Wert nicht von der API gelesen werden kann.

  - ausgewählt (`number, rw`)

    Zeigt den ausgewählten Modus an oder wählt ihn aus. Auch wählbar über `modes.{number}.switchTo`

  - `{Nummer}`

    - id („text, ro“)

      Der Name dieses Modus

    - Schlüssel („Nummer, ro“)

      Der Index dieses Modus. Entspricht `mode.{number}` aus dem Objektbaum und kann in `modes.selected` geschrieben werden.

    - wählbar („boolean, ro“)

      `true` ob dieser Modus manuell ausgewählt werden kann.

    - streambar („boolean, ro“)

      Nur auf Multiroom-fähigen Geräten vorhanden. `true` ob dieser Modus als Quelle für mehrere Multiroom-Geräte verwendet werden kann.

    - wechseln zu

      Wählt diesen Modus aus.

    - Voreinstellungen

      - verfügbar (`boolean, ro`)

        Zeigt an, ob Voreinstellungen für diesen Modus verfügbar sind

      - `{Nummer}`

        Der Index dieser Voreinstellung. Entspricht `mode.*.presets.{number}.key`.

        - Taste

          Der Index dieser Voreinstellung. Entspricht `mode.*.presets.{number}` aus dem Objektbaum und kann in `modes.selectPreset` geschrieben werden.

        - Name („Text, ro“)

          Der Name dieser Voreinstellung

        - wechseln zu

          Wählt diese Voreinstellung und den entsprechenden Modus aus.

Bitte beachten Sie, dass Sie manchmal zwischen „Knopfdruck“ und „Werteinstellung“ wählen können. Nutzen Sie das, was für Sie bequemer ist.

## Rechtliche Hinweise
Frontier, Frontier Silicon, SmartRadio, UNDOK und zugehörige Logos sind Marken oder eingetragene Marken von Frontier Smart Technologies Limited [https://www.frontiersmart.com](https://www.frontiersmart.com)

Alle anderen Marken sind Eigentum ihrer jeweiligen Inhaber.

Die Autoren werden in keiner Weise von Frontier Smart Technologies Limited oder damit verbundenen Tochtergesellschaften, Logos oder Marken unterstützt oder sind mit ihnen verbunden.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

- (pdbjjens) Breaking Change: node>=14, js-contoller>=4 and admin>=5 required
- (pdbjjens) Breaking Change: PIN encryption and validity check of all parameters in config UI
- (pdbjjens) Breaking Change: Type of `frontier_silicon.X.modes.selectPreset` changed from "string" to  "number"
- (pdbjjens) Change: Validity check of all parameters in config UI
- (pdbjjens) Change: Re-establish session if network connection is lost
- (pdbjjens) New: Synchronization of power, volume and mute states with the UNDOK App

### 0.1.0 (2023-07-15)

- (pdbjjens) Breaking Changes: node>=14, js-contoller>=4 and admin>=5 required
- (pdbjjens) New: json config UI
- (pdbjjens) New: Re-establish session if network connection is lost
- (pdbjjens) New: Remove obsolete unit testing
- (pdbjjens) Fix: Prevent crashes if radio device is not reachable

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