---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.musiccast/README.md
title: ioBroker.musiccast
hash: iZ3ykRyBmaFGepYJir8yZvcltI2taWg89TUadhhCEA4=
---
![Logo](../../../en/adapterref/iobroker.musiccast/admin/musiccast.png)

![Anzahl der Installationen](http://iobroker.live/badges/musiccast-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.musiccast.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.musiccast.svg)
![Test und Freigabe](https://github.com/foxthefox/ioBroker.musiccast/workflows/Test%20and%20Release/badge.svg)

# ioBroker.musiccast

Adapter für Yamaha MusicCast-Geräte wie WX-010/030, YSP-1600

## Einstellungen

Auf der Admin-Seite können Sie über das „+“-Symbol IP-Adresse, Geräte-ID, Typ und Namen manuell hinzufügen. Klicken Sie auf die Suchschaltfläche, um Geräte zu finden. Bei mehreren Geräten müssen Sie die Schaltfläche mehrmals betätigen, bis alle Geräte gefunden wurden. Die Suche liefert leider immer nur ein Objekt, und dies kann jedes Ihrer MusicCast-Geräte sein. Falls das Ergebnis bereits in der Tabelle vorhanden ist, klicken Sie erneut auf die Schaltfläche. Manchmal hilft es, die Seite zu speichern und neu zu öffnen.

Im unwahrscheinlichen Fall, dass zwei oder mehr Geräte dieselbe ID liefern, ändern Sie eine der IDs geringfügig. Andernfalls kann der Adapter die beiden Geräte nicht unterscheiden.

Wenn Sie die Wiedergabezeit der gehörten Titel aktualisiert sehen möchten, aktivieren Sie bitte das entsprechende Kontrollkästchen. Beachten Sie, dass dies die Anzahl der Meldungen erhöht (jede Sekunde für jedes Gerät – ein ständiges Hin und Her der Aktualisierungen).

## verfügbare Objekte

Folgende Objekte sind derzeit implementiert:

### Basis (Zone)

| Objekt                           | Wert            | einstellbar | Beschreibung                                                   |
| -------------------------------- | --------------- | :---------: | -------------------------------------------------------------- |
| {zone}.power                     | boolescher Wert |      X      | wahr/falsch -> EIN/Standby                                     |
| {zone}.zone\_b                   | boolescher Wert |      ?      | wahr/falsch -> Zielzone ist Zone B                             |
| {zone}.mute                      | boolescher Wert |      X      | wahr/falsch -> stummgeschaltet/nicht stummgeschaltet           |
| {zone}.volume                    | Wert            |      X      | 0...max (maximal abhängig vom Gerät)                           |
| {zone}.act\_vol\_mode            | Text            |      ?      | tatsächliche Lautstärke im dB-Modus                            |
| {zone}.act\_vol\_val             | Wert            |      ?      | tatsächliche Lautstärke in dB                                  |
| {zone}.act\_vol\_unit            | Text            |      -      | Tatsächliche Lautstärkeeinheit (sollte dB sein)                |
| {zone}.act\_vol\_mode\_list      | Text            |      -      | tatsächliche Lautstärke in dB-Modi                             |
| {zone}.input                     | Text            |      X      | Eingaben abhängig vom Gerät                                    |
| {zone}.input\_list               | Text            |      -      | mögliche Eingaben                                              |
| {zone}.input\_text               | Text            |      -      | ausgewählte Eingabe als Text                                   |
| {zone}.sound\_program            | Text            |      X      | Soundprogramm einstellen                                       |
| {zone}.sound\_program\_list      | Text            |      -      | mögliche Klangprogramme                                        |
| {zone}.surr\_decoder\_type       | Text            |      ?      | Surround-Typ einstellen                                        |
| {zone}.surr\_decoder\_type\_list | Text            |      -      | möglicher Surround-Decoder                                     |
| {zone}.link\_control             | Text            |      X      | Linksteuerung festlegen                                        |
| {zone}.link\_control\_list       | Text            |      -      | mögliche Link-Steuerungseinstellungen                          |
| {zone}.link\_audio\_delay        | Text            |      X      | Link-Audioverzögerung einstellen                               |
| {zone}.link\_audio\_delay\_list  | Text            |      -      | Mögliche Einstellungen für die Audioverzögerung der Verlinkung |
| {zone}.clearVoice                | boolescher Wert |      X      | klare Sprachsteuerung                                          |
| {zone}.low                       | Wert            |      X      | niedriges EQ-Niveau                                            |
| {zone}.mid                       | Wert            |      X      | Pegel EQ Mitte                                                 |
| {zone}.high                      | Wert            |      X      | hohes EQ-Niveau                                                |
| {zone}.subwoofer\_volume         | Wert            |      X      | Pegel des Subwoofers                                           |
| {zone}.bass                      | Wert            |      X      | Pegel Bass                                                     |
| {zone}.treble                    | Wert            |      X      | Höhenpegel                                                     |
| {zone}.tone\_control\_mode\_list | Text            |      -      | möglicher Tonregelungsmodus                                    |
| {zone}.tone\_mode                | boolescher Wert |      ?      | Tonregelungsmodus                                              |
| {zone}.balance                   | Wert            |      X      | Gleichgewicht                                                  |
| {zone}.direct                    | boolescher Wert |      X      | direkt einstellen                                              |
| {zone}.pure\_direct              | boolescher Wert |      X      | Set Pure Direct                                                |
| {zone}.enhancer                  | boolescher Wert |      X      | Set-Enhancer                                                   |
| {zone}.bass\_extension           | boolescher Wert |      X      | Bass-Erweiterung einstellen                                    |
| {zone}.sleep                     | Wert            |      X      | Schlaftimer                                                    |
| {zone}.disable\_flags            | boolescher Wert |      X      | set disable\_flags                                             |
| {zone}.contents\_display         | boolescher Wert |      X      | set contents\_display                                          |
| {zone}.party\_enable             | boolescher Wert |      X      | set party\_enable                                              |
| {zone}.extra\_bass               | boolescher Wert |      X      | set extra\_bass                                                |
| {zone}.adaptive\_drc             | boolescher Wert |      X      | set adaptive\_drc                                              |
| {zone}.dts\_dialogue\_control    | Wert            |      X      | set dts\_dialogue\_control                                     |
| {zone}.adaptive\_dsp\_level      | boolescher Wert |      X      | set adaptive\_dsp\_level                                       |

### netusb

| Objekt                    | Wert            | einstellbar | Beschreibung                                                            |
| ------------------------- | --------------- | :---------: | ----------------------------------------------------------------------- |
| netusb.input              | Wert            |      X      | Soll-/Ist-Eingang                                                       |
| netusb.playPause          | boolescher Wert |      X      | Wiedergabe/Pause einstellen                                             |
| netusb.playback           | Text            |      -      | Status Net Player                                                       |
| netusb.stop               | boolescher Wert |      X      | Stopp einstellen                                                        |
| netusb.auto\_stop         | boolescher Wert |      -      | automatisch gestoppt                                                    |
| netusb.next               | boolescher Wert |      X      | Vorwärts setzen                                                         |
| netusb.prev               | boolescher Wert |      X      | Zurückspulen einstellen                                                 |
| netusb.shuffle            | boolescher Wert |      X      | Zufallswiedergabe umschalten                                            |
| netusb.shuffle\_stat      | Text            |      -      | Shuffle-Status                                                          |
| netusb.repeat             | boolescher Wert |      X      | Wiederholung umschalten                                                 |
| netusb.repeat\_stat       | Text            |      -      | Wiederholungsstatus                                                     |
| netusb.artist             | Text            |      -      | Künstlername                                                            |
| netusb.album              | Text            |      -      | Albumname                                                               |
| netusb.track              | Text            |      -      | Trackname                                                               |
| netusb.albumart\_url      | Text            |      -      | HTTP-Adresse für Albumcover                                             |
| netusb.albumart\_id       | Wert            |      -      | Albumcover-ID                                                           |
| netusb.play\_time         | Wert            |      -      | Spielzeit in s                                                          |
| netusb.play\_queue\_type  | Text            |      -      | netusb Warteschlangentyp                                                |
| netusb.total\_time        | Wert            |      -      | Gesamtspielzeit in Sekunden                                             |
| netusb.recent\_info       | JSON            |      -      | Spielhistorie                                                           |
| netusb.preset\_info       | JSON            |      -      | gespeicherte Voreinstellungen/Favoriten                                 |
| netusb.presetrecallnumber | Wert            |      X      | Erinnere dich an die Nummer in der Favoritenliste                       |
| netusb.usb\_devicetype    | Text            |      -      | Art des angeschlossenen USB-Geräts                                      |
| netusb.attribute          | Wert            |      -      | welche Möglichkeiten der Dienst bietet, die entschlüsselt werden müssen |
| netusb.recallRecentItem   | Wert            |      X      | welche Possibiolites den Dienst haben, muss entschlüsselt werden        |

### System

| Objekt                                       | Wert | einstellbar | Beschreibung                         |
| -------------------------------------------- | ---- | :---------: | ------------------------------------ |
| system.api\_version                          | Wert |      -      | API-Version                          |
| system.system\_version                       | Wert |      -      | Systemversion                        |
| system.inputs.{service}                      | Wert |      -      | verfügbarer Eingabedienst            |
| system.inputs.{service}.account\_enable      | Wert |      -      | Verfügbarer Eingabedienst aktiviert  |
| system.inputs.{service}.distribution\_enable | Wert |      -      | verfügbarer Eingabedienst verteilbar |
| system.inputs.{service}.play\_info\_type     | Wert |      -      | verfügbarer Eingabediensttyp         |

### CD-Player

| Objekt            | Wert            | einstellbar | Beschreibung                     |
| ----------------- | --------------- | :---------: | -------------------------------- |
| cd.playPause      | boolescher Wert |      X      | Wiedergabe/Pause einstellen      |
| CD-Wiedergabe     | Text            |      -      | Status-CD-Player                 |
| cd.stop           | boolescher Wert |      X      | Stopp einstellen                 |
| cd.next           | boolescher Wert |      X      | Vorwärts setzen                  |
| cd.prev           | boolescher Wert |      X      | Zurückspulen einstellen          |
| CD-Shuffle        | boolescher Wert |      X      | Zufallswiedergabe umschalten     |
| cd.shuffle\_stat  | Text            |      -      | Shuffle-Status                   |
| cd.repeat         | boolescher Wert |      X      | Wiederholung umschalten          |
| cd.repeat\_stat   | Text            |      -      | Wiederholungsstatus              |
| cd.device\_stat   | Text            |      -      | Gerätestatus                     |
| CD-Wiedergabezeit | Wert            |      -      | aktuelle Wiedergabezeit          |
| cd.totaltime      | Wert            |      -      | Gesamtzeit der aktuellen Strecke |
| CD-Disc-Zeit      | Wert            |      -      | Gesamtzeit der CD                |
| CD-Tracknummer    | Wert            |      -      | Der aktuell abgespielte Titel    |
| cd.totaltracks    | Wert            |      -      | Gesamtzahl der CD-Tracks         |
| CD-Künstler       | Text            |      -      | Künstlername                     |
| CD-Album          | Text            |      -      | Albumname                        |
| CD-Track          | Text            |      -      | Trackname                        |

### Tuner

| Objekt                            | Wert            | einstellbar | Beschreibung                      |
| --------------------------------- | --------------- | :---------: | --------------------------------- |
| tuner.common\_preset\_info        | Array           |      -      | Voreingestellte Informationen     |
| tuner.am.preset\_info             | Array           |      -      | Voreingestellte AM-Informationen  |
| tuner.fm.preset\_info             | Array           |      -      | Voreingestellte FM-Informationen  |
| tuner.dab-preset\_info            | Array           |      -      | Voreingestellte DAB-Informationen |
| tuner.am-Voreinstellung           | Nummer          |      X      | AM-Voreinstellungsnummer          |
| tuner.am.freq                     | Nummer          |      X      | AM-Frequenz in kHz                |
| tuner.am.tuned                    | boolescher Wert |      -      | AM-Empfang                        |
| tuner.fm-Voreinstellung           | Nummer          |      X      | FM-Speicherplatznummer            |
| tuner.fm.freq                     | Nummer          |      X      | FM-Frequenz in kHz                |
| tuner.fm.tuned                    | boolescher Wert |      -      | FM-Empfang                        |
| tuner.fm.audio\_mode              | Zeichenkette    |      -      | FM Mono/Stereo                    |
| tuner.dab-preset                  | Nummer          |      X      | DAB-Voreinstellungsnummer         |
| tuner.dab.id                      | Nummer          |      -      | DAB-Senderkennung                 |
| tuner.dab.status                  | Zeichenkette    |      -      | DAB-Status                        |
| tuner.dab.freq                    | Nummer          |      -      | DAB-Frequenz                      |
| tuner.dab-Kategorie               | Zeichenkette    |      -      | primär/sekundär                   |
| tuner.dab.audio\_mode             | Zeichenkette    |      -      | DAB Mono/Stereo                   |
| tuner.dab-Bitrate                 | Nummer          |      -      | DAB-Bitrate in kpbs               |
| tuner.dab.quality                 | Nummer          |      -      | DAB-Qualität 0-100                |
| tuner.dab.tune\_aid               | Nummer          |      -      | DAB-Signalstärke 0-100            |
| tuner.dab.off\_air                | boolescher Wert |      -      | DAB ist nicht terrestrisch.       |
| tuner.dab.dab\_plus               | boolescher Wert |      -      | DAB+                              |
| tuner.dab-Programmtyp             | Zeichenkette    |      -      | DAB-Programmtyp                   |
| tuner.dab.ch\_label               | Zeichenkette    |      -      | DAB CH-Etikett                    |
| tuner.dab.service\_label          | Zeichenkette    |      -      | DAB-Servicelabel                  |
| tuner.dab.dls                     | Zeichenkette    |      -      | DAB DLS                           |
| tuner.dab.ensemble\_label         | Zeichenkette    |      -      | DAB-Ensemble-Label                |
| tuner.dab.initial\_scan\_progress | Nummer          |      -      | DAB-Initialscan-Fortschritt 0-100 |
| tuner.dab.total\_station\_num     | Nummer          |      -      | DAB-Totalstationen 0-255          |
| tuner.rds.program\_type           | Zeichenkette    |      -      | RDS-Programmtyp                   |
| tuner.rds-Programmdienst          | Zeichenkette    |      -      | RDS-Programmdienst                |
| tuner.rds.radio\_text\_a          | Zeichenkette    |      -      | RDS-Text A                        |
| tuner.rds.radio\_text\_b          | Zeichenkette    |      -      | RDS-Text B                        |

### Uhr

| Objekt                            | Wert            | einstellbar | Beschreibung                                       |
| --------------------------------- | --------------- | :---------: | -------------------------------------------------- |
| clock.auto\_sync                  | boolescher Wert |      X      | Automatische Uhrzeitsynchronisierung               |
| Uhrformat                         | Zeichenkette    |      X      | Uhrzeitformat 12h/24h                              |
| Uhr.Alarm\_an                     | boolescher Wert |      X      | Weckerstatus ein/aus                               |
| Uhr.Lautstärke                    | Nummer          |      X      | Lautstärke des Weckers                             |
| clock.fade\_interval              | Nummer          |      X      | Wecker-Ausblendintervall                           |
| clock.fade\_type                  | Nummer          |      X      | Wecker-Überblendungstyp                            |
| Uhrmodus                          | Zeichenkette    |      X      | Weckmodus (täglich/wöchentlich)                    |
| Uhr.wiederholung                  | boolescher Wert |      X      | Weckerwiederholung, wenn ein Tag angegeben ist     |
| clock.{day}.enable                | boolescher Wert |      X      | Gültigkeit der Uhrenkonfiguration                  |
| clock.{day}.time                  | Zeichenkette    |      -      | Startzeit des Weckers hhmm 00-23,00-59             |
| clock.{day}.beep                  | boolescher Wert |      X      | Gültigkeit des Uhrsignals                          |
| clock.{day}.playback\_type        | Zeichenkette    |      -      | Wiedergabe des Weckers: Fortsetzung/Voreinstellung |
| clock.{day}.resume\_input         | Zeichenkette    |      -      | Wecker-Fortsetzungs-Eingabe-ID                     |
| clock.{day}.preset\_type          | Zeichenkette    |      -      | Wecker-Voreinstellungstyp                          |
| clock.{day}.preset\_num           | Nummer          |      -      | Voreinstellung für Wecker, Eingabe-ID              |
| clock.{day}.preset\_netusb\_input | Zeichenkette    |      -      | Wecker-NetUSB-Eingangs-ID                          |
| clock.{day}.preset\_netusb\_text  | Zeichenkette    |      -      | Wecker netusb text                                 |
| clock.{day}.preset\_tuner\_band   | Zeichenkette    |      -      | Uhrwecker-Tunerband                                |
| clock.{day}.preset\_tuner\_number | Nummer          |      -      | Weckerfrequenz oder Senderkennung                  |

## Aufgaben

- Unterstützung von Listen
- Änderung der Interaktionswerte in eine aussagekräftige Benennung
- Fastforward/Fastrewind für NETUSB/CD
- Bluetooth
- Dialogebene

## 1.0.0 WICHTIGE ÄNDERUNGEN

- Die Geräte-ID war zuvor die System-ID, die nicht eindeutig ist. Jetzt wird die Geräte-ID verwendet, wodurch sich die Objektstruktur ändert.
- musiccast API 2.0.0
- Die Gerätesuche kann nun mehr als ein Gerät zurückgeben.
- Neue Ausgabe für Entwickler im Admin-Panel
- mehr async/await
- korrigierte Tests

#### 0.2.2

- musiccast API 0.0.14

#### 0.2.1

- Lizenz 2022
- Abhängigkeitskorrektur

#### 0.2.0

- Refactoring mit "Adapter erstellen"
- async/await

#### 0.1.5

- (Scrounger) Fehlerbehandlung bei nicht erreichbarem Gerät

#### 0.1.4

- (Scrounger) Korrektur eines Typenkonflikts (Array-Objekt)

#### 0.1.3

- (foxthefox) hat das Schreiben für linkControl/linkAudioDelay/linkAudioQuality hinzugefügt.

#### 0.1.2

- (Scrounger) Korrektur eines Typenkonflikts (Zeichenketten-Boolescher Wert)

#### 0.1.1

- Korrektur für Uhr „oneday“

#### 0.1.0

- Kompaktmodus
- yamaha-yxc-nodejs 0.0.8
- Widget-Aktualisierung

#### 0.0.9

- adminV3 verwendet values2table und die Schaltfläche "Hinzufügen" erneut.
- Zone 2/3/4 funktioniert jetzt
- erweiterte automatische Tests
- Schaltfläche im Adminbereich zum Sammeln von JSON-Antworten

#### 0.0.8

- Aktualisierung der automatischen Tests
- Der im Adminbereich angegebene Name soll im Objekt (Gerät) angezeigt werden.

#### 0.0.7

- Tuner-Unterstützung
- Unterstützung für Uhren (hauptsächlich Informationen)
- Unterstützung weiterer Zonen
- Unterstützung von MC-Link
- Festlegung von Minimal- und Maximalwerten gemäß den Merkmalen
- Admin v3

#### 0.0.6

- Widget-Satz, der den Objekten und Steuerelementen entspricht
- cd.shuffle\_stat boolean -> text
- new netusb.shuffle\_stat (text)
- Statusaktualisierung über abonnierte UDP-Nachrichten
- Schalter zum Aktualisieren der Spielzeitinformationen (Deaktivierung reduziert den Datenverkehr)

#### 0.0.5

- Aufräumarbeiten auf der Admin-Seite
- Verbesserung bei der Objekterstellung
- mehr Objekte auf netusb
- mehr Objekte im System
- zusätzliche Unterstützung für CD

#### 0.0.4

- neue Objekte und Funktionen (input, sound\_prog, EQ, clearVoice)
- Suche/Entdeckung auf der Admin-Seite

#### 0.0.3

- mehr Objekte implementiert

#### 0.0.2

- kleinere Korrekturen

#### 0.0.1

- Erste Version mit IP-Einstellung auf der Konfigurationsseite,
- Verfügbare Befehle: Ein/Aus, Stumm, Lautstärke

## Changelog

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 1.2.1

- materialize -> jsonUI

### 1.2.0

- issue #388 dab.freq and dab.bit_rate min=0
- dependency update
- issue #412 dab.preset correction

### 1.1.4

- fixed main.surround_ai
- update devDeps, eslint corrections
- IOB checker corrections

### 1.1.3

- translation with adapter-dev

### 1.1.2

- new version yamahe-yxc library

### 1.1.1

- (scrounger) added datapoint isOnline, used by ioBroker.device-watcher

### 1.1.0 (npm)

- improved testing

### 1.0.8

- error correction add_to_group/remove_from_group

#### 1.0.7

- error correction in link/unlink/distribution

#### 1.0.6

- (scrounger) recallRecentItem added

#### 1.0.5

- usage of new IOB test library

#### 1.0.4

- correction for setting the input ("setInput")

#### 1.0.3

- new datapoint "extra_bass"
- new datapoint "adaptive_drc"
- new datapoint "dts_dialogue_control"
- new datapoint "adaptive_dsp_level"
- these are only read in, most likely they are commands, but the API is unknown

#### 1.0.2

- new datapoint "input_text"

#### 1.0.1

- changed algorithm for developer support

[Older changelogs can be found there](https://github.com/foxthefox/ioBroker.musiccast/blob/master/CHANGELOG_OLD.md)

## License

The MIT License (MIT)

Copyright (c) 2017-2026 foxthefox <foxthefox@wysiwis.net>