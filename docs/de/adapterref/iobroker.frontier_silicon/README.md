---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.frontier_silicon/README.md
title: ioBroker.frontier_silicon
hash: GbG1WVFNmnP20NTYgjhmSR+JAg31mLSSXtia+8Ho7ic=
---
# IoBroker.frontier_silicon
![Logo](../../../en/adapterref/iobroker.frontier_silicon/admin/radio.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.frontier_silicon.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.frontier_silicon.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/frontier_silicon-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/frontier_silicon-stable.svg)
![NPM](https://nodei.co/npm/iobroker.frontier_silicon.png?downloads=true)

## IoBroker-Adapter für Frontier SmartRadio
**Tests:** ![Testen und Freigeben](https://github.com/iobroker-community-adapters/ioBroker.frontier_silicon/workflows/Test%20and%20Release/badge.svg)

## Info
Bietet Unterstützung für Mediaplayer, Internetradios und SmartRadios, die mit einem Frontier Silicon-Chipsatz mit FSAPI ausgestattet sind.

HINWEIS: Dieser Adapter wurde zur Wartung in die iobroker-community-adapters verschoben. Geplante Funktionen (siehe unten) werden daher nicht implementiert. Zukünftig werden nur noch wichtige Fehlerbehebungen und Abhängigkeitsaktualisierungen veröffentlicht. PRs mit Fehlerbehebungen oder Funktionserweiterungen sind jedoch jederzeit willkommen.

VERSIONSHINWEISE:

Version 0.4.x enthält eine Breaking Change:

- Der Typ von "frontier_silicon.X.media.state" wurde von "number" in "string" und schreibgeschützt geändert

Wenn Sie diesen Adapter von einer früheren Version aktualisieren, anstatt ihn neu zu installieren, finden Sie möglicherweise Warnungen im ioBroker-Protokoll wie: `State value to set for "frontier_silicon.0.media.state" has to be type "number" but received type "string"` Um dies zu verhindern, besteht die einfachste Lösung darin, den Adapter im Instanzen-Tab von ioBroker zu stoppen, den Objektbaum im Objekt-Tab vollständig zu löschen und den Adapter anschließend neu zu starten. Dies ist natürlich nur einmal nach dem Update erforderlich und bei einer sauberen Neuinstallation nicht erforderlich.

Version 0.3.x enthält einige wichtige Änderungen:

- node>=18, js-controller>=5 und admin>=6 erforderlich

Aktualisieren Sie Ihren ioBroker mindestens auf diese Softwareversion, wenn Sie diesen Adapter verwenden möchten

- PIN-Verschlüsselung und Gültigkeitsprüfung aller Parameter in der Konfigurations-UI

Wenn Sie diesen Adapter von einer früheren Version aktualisieren, anstatt ihn neu zu installieren, startet er nicht, selbst wenn Ihre PIN in der Konfiguration korrekt ist und nicht geändert wurde. Um dies zu beheben, geben Sie einfach die gleiche vorherige PIN erneut in die Konfigurationsoberfläche ein, speichern Sie sie und schließen Sie die Konfigurationsoberfläche, um den Adapter neu zu starten. Dies ist natürlich nur einmal nach dem ersten Start nach dem Update erforderlich.

- Der Typ von „frontier_silicon.X.modes.selectPreset“ wurde von „String“ in „Number“ geändert.

Wenn Sie diesen Adapter von einer früheren Version aktualisieren, anstatt ihn neu zu installieren, finden Sie möglicherweise Warnungen im ioBroker-Protokoll wie: `State value to set for "frontier_silicon.0.modes.selectPreset" has to be type "string" but received type "number"` Um dies zu verhindern, besteht die einfachste Lösung darin, den Adapter im Instanzen-Tab von ioBroker zu stoppen, den Objektbaum im Objekt-Tab vollständig zu löschen und den Adapter anschließend neu zu starten. Dies ist natürlich nur einmal nach dem Update erforderlich und bei einer sauberen Neuinstallation nicht erforderlich.

- Synchronisierung der Einschalt-, Lautstärke- und Stummschaltzustände mit der UNDOK-App

Die Synchronisierung mit der UNDOK-App bedeutet, dass die von der UNDOK-App geänderten Einstellungen für Ein/Aus, Lautstärke und Stummschaltung nun auch in den Zuständen dieses Adapters aktualisiert werden. Aufgrund der Einschränkungen des FSAPI-Protokolls ist die Zustandssynchronisierung der UNDOK-App mit dem Adapter weiterhin unzuverlässig und erfolgt nicht sofort, sondern nur, wenn beispielsweise ein Preset oder ein Modus über die UNDOK-App geändert wird.

- Zyklischer Verbindungsversuch statt Deaktivierung des Adapters

Bisher wurde der Adapter nach 10 Verbindungsversuchen beendet, wenn das Gerät aufgrund längerer Netzwerkprobleme wie Router-Neustarts, LAN- oder WLAN-Ausfall nicht erreichbar war. Nun versucht der Adapter nach jedem Sitzungsaktualisierungsintervall erneut, bis das Gerät wieder erreichbar ist. Um Protokolleinträge zu diesen Wiederholungsversuchen zu vermeiden, müssen Sie den Adapter manuell stoppen. Wenn Ihr Netzwerkproblem während des Wiederholungszeitraums behoben ist, starten Sie den Adapter einfach neu.

## Merkmale
### Implementierte Funktionen
Leistungsregelung
- Modusauswahl
- Voreinstellungsauswahl
- Benachrichtigungen für mehrere Staaten
Lautstärkeregelung
Benachrichtigungen
Automatische Erkennung

### Geplante Funktionen
- Weitere Staaten
- Übersetzungen
- Mehr Ausnahmebehandlung
- Saubererer Code
- Multiroom-Funktionen

### Nicht geplante Funktionen
- Ändern der Systeminformationen

### Bekannte Fehler und Einschränkungen
- Der Media Player muss für die Voreinstellungserkennung eingeschaltet sein
- Aufgrund von Einschränkungen des FSAPI-Protokolls ist der Parallelbetrieb mit der UNDOK-App nicht zuverlässig und wird daher nicht unterstützt. Die Nutzung erfolgt auf eigene Gefahr.
- Aufgrund von Einschränkungen des FSAPI-Protokolls sind Radiosendersymbole im DAB+-Modus nicht verfügbar.

## Dokumentation
Mit diesem Adapter können Sie Internetradios und Mediaplayer mit Frontier Silicon-Chipsatz steuern. Viele Geräte lassen sich über [UNDOK](https://support.undok.net) sollte funktionieren. Getestete Geräte stammen von [Revo](https://revo.co.uk/de/products/), [Sangean](https://www.sangean.eu/products/all_product.asp), [Hama](https://de.hama.com/produkte/audio-hifi/digitalradio) und [SilverCrest](https://www.lidl.de) steuern, weitere Geräte sollten ebenfalls funktionieren.

Nach der Installation müssen die IP-Adresse und PIN des Geräts im Konfigurationsdialog eingegeben werden. Sollte das Radio nach dem Einschalten über die UNDOK App oder diesen Adapter kein DAB spielen, versuchen Sie es erneut mit aktivierter Option "DAB startet ohne Ton".

Beim ersten Start sammelt der Adapter Informationen über das Gerät. Dazu muss er alle Modi durchlaufen. Während der Überprüfung der Einstellungen wird das Gerät für einige Sekunden stummgeschaltet, um störende Geräusche zu vermeiden.

Während der Adapter die Geräteeinstellungen liest, werden ioBroker-Objekte und -Zustände erstellt. Zustände können schreibgeschützt (`ro`) oder schreibgeschützt (`rw`) sein. *ok, schreibgeschützte Schaltflächen sind auch möglich*.

- Audio

Grundlegende Audioeinstellungen. Noch keine Equalizer-Steuerung implementiert.

- maxVolume (`Zahl, ro`)

Die maximal wählbare Lautstärke

- stumm (`boolean, rw`)

`true` wenn das Gerät stummgeschaltet ist, `false` andernfalls

- Volumen (`Nummer, rw`)
  - Kontrolle
- Lautstärke runter und Lautstärke hoch

Erhöht oder verringert die Lautstärke um 1

- Gerät

- friendlyName (`string, rw`)
- Leistung (`boolean, rw`)
- radioId (`string, ro`)

Ich vermute, dass dies die MAC des Geräts ist

- Version (`string, ro`)

Softwareversion

- webfsapi (`string, ro`)

Die Adresse der API

- Infos

- Verbindung (`boolean, ro`)

Verbindungsanzeige für den Adapter

- Medien

- Status (`string, ro`)

Gültige Werte sind:

- 0: „Leerlauf“
- 1: „PUFFERUNG“
- 2: „SPIELEN“
- 3: „PAUSED“
- 4: „Neupufferung“
- 5: „FEHLER“
- 6: „GESTOPPT“
- 7: „ERROR_POPUP“

- Steuerung (`boolean, wo`)

- 0: „STOP“
- 1: „SPIELEN“
- 2: „PAUSE“
- 3: „WEITER“
- 4: „VORHERIGE“

Nehmen Sie die folgenden Namen nicht zu ernst. Das Radio verwendet sie in verschiedenen Modi unterschiedlich.

- Album (`string, ro`)
- Künstler (`string, ro`)
- Grafik (`string, ro`)

Verwenden Sie diese URL, um ein Albumcover oder das Logo eines Senders zu erhalten.

- Name (`string, ro`)
- Zeichenfolge (`string, ro`)
- Titel (`string, ro`)

- Modi

- readPresets (`boolean, wo`)

Liest alle Voreinstellungen erneut

- selectPreset (`Nummer, wo`)

Wird verwendet, um eine Voreinstellung abzurufen oder auszuwählen.
Beachten Sie, dass der Adapter rät, da dieser Wert nicht aus der API gelesen werden kann.

- ausgewählt (`Nummer, rw`)

Zeigt den gewählten Modus an bzw. wählt ihn aus. Kann auch über `modes.{number}.switchTo` ausgewählt werden.

- ausgewählt (`string, ro`)

Gibt die Bezeichnung des ausgewählten Modus an.

- `{Nummer}`

- id (`string, ro`)

Der Name dieses Modus

- Schlüssel (`Nummer, ro`)

Der Index dieses Modus. Entspricht `mode.{number}` aus dem Objektbaum und kann in `modes.selected` geschrieben werden.

- wählbar (`boolean, ro`)

`true`, wenn dieser Modus manuell ausgewählt werden kann.

- streambar (`boolean, ro`)

Nur auf Multiroom-fähigen Geräten vorhanden. `true`, wenn dieser Modus als Quelle für mehrere Multiroom-Geräte verwendet werden kann.

- switchTo (`boolean, wo`)

Wählt diesen Modus aus.

- Voreinstellungen

- verfügbar (`boolean, ro`)

Zeigt an, ob Voreinstellungen für diesen Modus verfügbar sind

- `{Nummer}`

Der Index dieser Voreinstellung. Entspricht `mode.*.presets.{number}.key`.

- Schlüssel (`Nummer, ro`)

Der Index dieser Voreinstellung. Entspricht `mode.*.presets.{number}` aus dem Objektbaum und kann in `modes.selectPreset` geschrieben werden.

- Name (`string, ro`)

Der Name dieser Voreinstellung

- Rückruf (`boolean, wo`)

Wählt diese Voreinstellung und den entsprechenden Modus aus.

Bitte beachten Sie, dass Sie manchmal zwischen „Knopfdruck“ und „Werteinstellung“ wählen können. Nutzen Sie die Option, die für Sie bequemer ist.

## Rechtliche Hinweise
Frontier, Frontier Silicon, SmartRadio, UNDOK und zugehörige Logos sind Marken oder eingetragene Marken von Frontier Smart Technologies Limited [https://www.frontiersmart.com](https://www.frontiersmart.com)

Alle anderen Marken sind Eigentum ihrer jeweiligen Inhaber.

Die Autoren werden in keiner Weise von Frontier Smart Technologies Limited oder zugehörigen Tochtergesellschaften, Logos oder Marken unterstützt oder sind mit diesen verbunden.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

- (pdbjjens) Change: node>=20, js-controller>=7 and admin>=7 required

### 0.4.0 (2025-02-01) - 2025H1 maintenance release

- (pdbjjens) Change: media state changed from number to string and readonly (#241)
- (pdbjjens) New: Added media control function "stop" (#241)
- (pdbjjens) New: Optimizations for responsive design (#244)
- (pdbjjens) Change: Migration to ESLint 9 (#253)
- (pdbjjens) Fix: Added button state acknowledgement
- (pdbjjens) Fix: Prevent warning on adapter stop

### 0.3.0 (2024-08-27) - 2024H2 maintenance release

- (pdbjjens) Change: node>=18, js-contoller>=5 and admin>=6 required
- (pdbjjens) Change: Removed .npmignore
- (pdbjjens) Change: Cyclic connection retry instead of disabling the adapter (#191)
- (pdbjjens) New: Updated dependencies
- (pdbjjens) Fix: Replace deprecated method "deleteChannel" by "delObject" (#224)

### 0.2.0 (2024-01-28)

- (pdbjjens) Change: Increase minor version number

### 0.1.2 (2024-01-26) - 2024 maintenance release

- (pdbjjens) Change: node>=16, js-contoller>=4 and admin>=5 required
- (pdbjjens) New: Optionally display PIN code and limit to 4 digits in config GUI
- (pdbjjens) Updated dependencies

### 0.1.1 (2023-07-26)

- (pdbjjens) Breaking Change: node>=14, js-contoller>=4 and admin>=5 required
- (pdbjjens) Breaking Change: PIN encryption and validity check of all parameters in config UI
- (pdbjjens) Breaking Change: Type of `frontier_silicon.X.modes.selectPreset` changed from "string" to  "number"
- (pdbjjens) Change: Validity check of all parameters in config UI
- (pdbjjens) Change: Re-establish session if network connection is lost
- (pdbjjens) New: Synchronization of power, volume and mute states with the UNDOK App

## License

MIT License

Copyright (c) 2025 halloamt <iobroker@halloserv.de> & IoBroker-Community

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