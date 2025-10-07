---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.musiccast/README.md
title: ioBroker.musiccast
hash: 077QgmId8Wc6BjXF7/rEBeZs5kRJRzb8K2n380L2S1U=
---
![Logo](../../../en/adapterref/iobroker.musiccast/admin/musiccast.png)

![Anzahl der Installationen](http://iobroker.live/badges/musiccast-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.musiccast.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.musiccast.svg)

# IoBroker.musiccast
**Tests:** ![Testen und Freigeben](https://github.com/foxthefox/ioBroker.musiccast/workflows/Test%20and%20Release/badge.svg)

Adapter für Yamaha MusicCast-Geräte wie WX-010/030, YSP-1600

## Einstellungen
Auf der Admin-Seite können Sie mit dem „+“-Knopf manuell IP-Adresse, Geräte-ID, Typ und Name eingeben.

Drücken Sie die Suchtaste, um die Geräte zu finden. Bei mehreren Geräten müssen Sie die Taste mehrmals drücken, bis alle Geräte gefunden sind. Leider liefert die Suche immer nur ein Objekt zurück, und dies kann jedes Ihrer MusicCast-Geräte sein. Wenn das Ergebnis mit dem bereits in der Tabelle enthaltenen übereinstimmt, müssen Sie die Taste erneut drücken. Manchmal hilft es, zu speichern und die Admin-Seite erneut zu öffnen.

Im unwahrscheinlichen Fall, dass zwei oder mehr Geräte die gleiche ID liefern, ändern Sie eine ID leicht. Andernfalls kann der Adapter nicht zwischen den beiden Geräten unterscheiden.

Wenn Sie die Spielzeit der von Ihnen gehörten Titel aktualisiert sehen möchten, aktivieren Sie das entsprechende Kontrollkästchen. Beachten Sie, dass sich dadurch die Anzahl der Nachrichten erhöht (jede Sekunde für jedes Gerät ein Pingpong-Update).

## Verfügbare Objekte
Folgende Objekte sind derzeit implementiert:

### Basis (Zone)
| Objekt | Wert | einstellbar | Beschreibung |
| ----------------------------- | ------- | :------: | --------------------------------------- |
| {zone}.power | boolean | x | true/false -> EIN/Standby |
| {zone}.zone_b | boolesch | ? | wahr/falsch -> Zielzone ist Zone B |
| {zone}.mute | boolean | x | true/false -> stummgeschaltet/nicht stummgeschaltet |
| {zone}.volume | Wert | x | 0...max (Maximum abhängig vom Gerät) |
| {zone}.act_vol_mode | Text | ? | tatsächliche Lautstärke im dB-Modus |
| {zone}.act_vol_val | Wert | ? | tatsächliche Lautstärke in dB-Wert |
| {zone}.act_vol_unit | Text | - | tatsächliche Lautstärkeeinheit (sollte dB sein) |
| {zone}.act_vol_mode_list | Text | - | tatsächliche Lautstärke in dB-Modi |
| {zone}.input | Text | x | Eingaben abhängig vom Gerät |
| {zone}.input_list | Text | - | mögliche Eingaben |
| {zone}.input_text | Text | - | ausgewählte Eingabe als Text |
| {zone}.sound_program | Text | x | Soundprogramm einstellen |
| {zone}.sound_program_list | Text | - | mögliche Soundprogramme |
| {zone}.surr_decoder_type | Text | ? | Surround-Typ festlegen |
| {zone}.surr_decoder_type_list | Text | - | möglicher Surround-Decoder |
| {zone}.link_control | Text | x | Link-Steuerung festlegen |
| {zone}.link_control_list | Text | - | mögliche Link-Control-Einstellungen |
| {zone}.link_audio_delay | Text | x | Link-Audioverzögerung festlegen |
| {zone}.link_audio_delay_list | Text | - | mögliche Einstellungen für die Audioverzögerung des Links |
| {zone}.clearVoice | boolean | x | klare Sprachsteuerung |
| {zone}.low | Wert | x | Pegel EQ niedrig |
| {zone}.mid | Wert | x | Pegel EQ Mitte |
| {zone}.high | Wert | x | Pegel EQ hoch |
| {zone}.subwoofer_volume | Wert | x | Pegel Subwoofer-Lautstärke |
| {zone}.bass | Wert | x | Pegel Bass |
| {zone}.treble | Wert | x | Pegel treble |
| {zone}.tone_control_mode_list | Text | - | möglicher Tonsteuerungsmodus |
| {zone}.tone_mode | boolesch | ? | Tonsteuerungsmodus |
| {zone}.balance | Wert | x | Level-Balance |
| {zone}.direct | boolean | x | set direct |
| {zone}.pure_direct | boolesch | x | setze pure direct |
| {zone}.enhancer | boolesch | x | Enhancer festlegen |
| {zone}.bass_extension | boolesch | x | Basserweiterung festlegen |
| {zone}.sleep | Wert | x | Sleep-Timer |
| {zone}.disable_flags | boolesch | x | disable_flags setzen |
| {zone}.contents_display | boolesch | x | set content_display |
| {zone}.party_enable | boolesch | x | setze party_enable |
| {zone}.extra_bass | boolesch | x | setze extra_bass |
| {zone}.adaptive_drc | boolesch | x | setze adaptive_drc |
| {zone}.dts_dialogue_control | Wert | x | setze dts_dialogue_control |
| {zone}.adaptive_dsp_level | boolesch | x | setze adaptive_dsp_level |

### Netusb
| Objekt | Wert | einstellbar | Beschreibung |
| ------------------------- | ------- | :------: | -------------------------------------------------- |
| netusb.input | Wert | x | Soll-/Ist-Eingang |
| netusb.playPause | boolesch | x | Wiedergabe/Pause einstellen |
| netusb.playback | Text | - | Status Net Player |
| netusb.stop | boolesch | x | Stopp setzen |
| netusb.auto_stop | boolean | - | automatisch gestoppt |
| netusb.next | boolean | x | Vorwärts setzen |
| netusb.prev | boolesch | x | Zurückspulen festlegen |
| netusb.shuffle | Boolesch | x | Shuffle umschalten |
| netusb.shuffle_stat | Text | - | Zufallsstatus |
| netusb.repeat | Boolesch | x | Wiederholung umschalten |
| netusb.repeat_stat | Text | - | Wiederholungsstatus |
| netusb.artist | Text | - | Künstlername |
| netusb.album | Text | - | Albumname |
| netusb.track | Text | - | Titelname |
| netusb.albumart_url | Text | - | http-Adresse für Albumcover |
| netusb.albumart_id | Wert | - | Albumcover-ID |
| netusb.play_time | Wert | - | Spielzeit in s |
| netusb.play_queue_type | Text | - | Netusb-Warteschlangentyp |
| netusb.total_time | Wert | - | Gesamtspielzeit in s |
| netusb.recent_info | json | - | Verlauf der abgespielten Elemente |
| netusb.preset_info | json | - | gespeicherte Voreinstellungen/Favoriten |
| netusb.presetrecallnumber | Wert | x | Ruft die # in der Favoritenliste ab |
| netusb.usb_devicetype | Text | - | Typ des angeschlossenen USB-Geräts |
| netusb.attribute | Wert | - | welche Möglichkeiten hat der Dienst, zu dekodieren |
| netusb.recallRecentItem | Wert | x | welche Möglichkeiten hat der Dienst, zu dekodieren |

### System
| Objekt | Wert | einstellbar | Beschreibung |
| ------------------------------------------- | ----- | :------: | ------------------------------------- |
| system.api_version | Wert | - | API-Version |
| system.system_version | Wert | - | Systemversion |
| system.inputs.{service} | Wert | - | verfügbarer Eingabedienst |
| system.inputs.{service}.account_enable | Wert | - | verfügbarer Eingabedienst aktiviert |
| system.inputs.{service}.distribution_enable | Wert | - | verfügbarer Eingabedienst verteilbar |
| system.inputs.{service}.play_info_type | Wert | - | verfügbarer Eingabediensttyp |

### CD-Spieler
| Objekt | Wert | einstellbar | Beschreibung |
| --------------- | ------- | :------: | ------------------------- |
| cd.playPause | Boolesch | x | Wiedergabe/Pause einstellen |
| CD-Wiedergabe | Text | - | Status CD-Player |
| cd.stop | Boolesch | x | Stopp setzen |
| cd.next | boolean | x | Vorwärts setzen |
| cd.prev | Boolesch | x | Zurückspulen festlegen |
| cd.shuffle | Boolesch | x | Zufallswiedergabe umschalten |
| cd.shuffle_stat | Text | - | Zufallswiedergabestatus |
| cd.repeat | Boolesch | x | Wiederholung umschalten |
| cd.repeat_stat | Text | - | Wiederholungsstatus |
| cd.device_stat | Text | - | Gerätestatus |
| cd.playtime | Wert | - | aktuelle Wiedergabezeit |
| cd.totaltime | Wert | - | Gesamtzeit des aktuellen Titels |
| cd.disctime | Wert | - | CD-Gesamtzeit |
| CD-Titelnummer | Wert | - | aktuell wiedergegebener Titel |
| cd.totaltracks | Wert | - | Gesamtzahl der CD-Titel |
| CD-Interpret | Text | - | Künstlername |
| CD-Album | Text | - | Albumname |
| CD-Titel | Text | - | Titelname |

### Tuner
| Objekt | Wert | einstellbar | Beschreibung |
| ------------------------------- | ------- | :------: | -------------------------------- |
| tuner.common_preset_info | Array | - | Voreinstellungsinformationen |
| tuner.am.preset_info | Array | - | Voreingestellte AM-Informationen |
| tuner.fm.preset_info | Array | - | Informationen zu voreingestellten FM-Sendern |
| tuner.dab.preset_info | Array | - | Voreingestellte DAB-Informationen |
| tuner.am.preset | Nummer | x | AM-Voreinstellungsnummer |
| tuner.am.freq | Zahl | x | AM-Frequenz in kHz |
| tuner.am.tuned | Boolesch | - | AM abgestimmt |
| tuner.fm.preset | Nummer | x | FM-Voreinstellungsnummer |
| tuner.fm.freq | Zahl | x | FM-Frequenz in kHz |
| tuner.fm.tuned | Boolesch | - | FM eingestellt |
| tuner.fm.audio_mode | Zeichenfolge | - | FM Mono/Stereo |
| tuner.dab.preset | Nummer | x | DAB-Voreinstellungsnummer |
| tuner.dab.id | Nummer | - | DAB-Sender-ID |
| tuner.dab.status | Zeichenfolge | - | DAB-Status |
| tuner.dab.freq | Nummer | - | DAB-Frequenz |
| tuner.dab.category | Zeichenfolge | - | primär/sekundär |
| tuner.dab.audio_mode | Zeichenfolge | - | DAB Mono/Stereo |
| tuner.dab.bit_rate | Zahl | - | DAB-Bitrate in kpbs |
| tuner.dab.quality | Zahl | - | DAB-Qualität 0-100 |
| tuner.dab.tune_aid | Zahl |    - | DAB-Signalstärke 0-100 |
| tuner.dab.off_air | boolesch | - | DAB off air |
| tuner.dab.dab_plus | boolesch | - | DAB+ |
| tuner.dab.program_type | Zeichenfolge | - | DAB-Programmtyp |
| tuner.dab.ch_label | Zeichenfolge | - | DAB CH-Label |
| tuner.dab.service_label | Zeichenfolge | - | DAB-Servicebezeichnung |
| tuner.dab.dls | Zeichenfolge | - | DAB DLS |
| tuner.dab.ensemble_label | Zeichenfolge | - | DAB-Ensemble-Label |
| tuner.dab.initial_scan_progress | Zahl | - | DAB-Anfangsscan-Fortschritt 0-100 |
| tuner.dab.total_station_num | Nummer | - | DAB-Gesamtsender 0-255 |
| tuner.rds.program_type | Zeichenfolge | - | RDS-Programmtyp |
| tuner.rds.program_service | Zeichenfolge | - | RDS-Programmdienst |
| tuner.rds.radio_text_a | Zeichenfolge | - | RDS-Text A |
| tuner.rds.radio_text_b | Zeichenfolge | - | RDS-Text B |

### Uhr
| Objekt | Wert | einstellbar | Beschreibung |
| ------------------------------- | ------- | :------: | ------------------------------------------ |
| clock.auto_sync | Boolesch | x | Automatische Synchronisierung der Uhr |
| clock.format | Zeichenfolge | x | Uhrformat 12h/24h |
| clock.alarm_on | Boolean | x | Uhralarmstatus ein/aus |
| clock.volume | Zahl | x | Wecklautstärke |
| clock.fade_interval | Zahl | x | Intervall zum Ausblenden des Weckers |
| clock.fade_type | Zahl | x | Wecker-Fade-Typ |
| clock.mode | string | x | Uhralarmmodus eintägig/wöchentlich |
| clock.repeat | boolean | x | Uhralarm wird wiederholt, wenn ein Tag angegeben ist |
| clock.{day}.enable | boolean | x | Gültigkeit der Uhreinstellung |
| clock.{day}.time | string | - | Startzeit des Weckers hhmm 00-23,00-59 |
| clock.{day}.beep | boolean | x | Gültigkeit des Uhrsignaltons |
| clock.{day}.playback_type | Zeichenfolge | - | Wiedergabetyp des Weckers fortsetzen/voreinstellen |
| clock.{day}.resume_input | Zeichenfolge | - | Eingabe-ID für Weckerfortsetzung |
| clock.{day}.preset_type | Zeichenfolge | - | Voreingestellter Weckertyp |
| clock.{day}.preset_num | Nummer | - | Eingabe-ID für voreingestellten Wecker |
| clock.{day}.preset_netusb_input | Zeichenfolge | - | Uhralarm-Netusb-Eingabe-ID |
| clock.{day}.preset_netusb_text | Zeichenfolge | - | Uhralarm-Netusb-Text |
| clock.{day}.preset_tuner_band | Zeichenfolge | - | Tunerband für Wecker |
| clock.{day}.preset_tuner_number | Nummer | - | Wecker-Tunerfrequenz oder Sender-ID |

## Aufgaben
- Unterstützung von Listen
- Änderung der Interaktionswerte auf schöne Benennung
- Schnellvorlauf/Schnellrücklauf für NETUSB/CD
Bluetooth
- Dialogebene

## 1.0.0 WICHTIGE ÄNDERUNGEN
- Die Geräte-ID war zuvor die System-ID, die nicht eindeutig ist. Jetzt wird die Geräte-ID verwendet, was den Objektbaum verändert.
- musiccast API 2.0.0
- Die Gerätesuche kann jetzt mehr als 1 Gerät zurückgeben
- neue Ausgabe für Entwickler im Admin-Panel
- mehr Async/Await
- korrigierte Tests

#### 0.2.2
- Musiccast-API 0.0.14

#### 0.2.1
- Lizenz 2022
- Abhängigkeitskorrektur

#### 0.2.0
- Refactoring mit „Adapter erstellen“
- asynchron/warten

#### 0.1.5
- (Scrounger) Fehlerbehandlung, wenn das Gerät nicht erreichbar ist

#### 0.1.4
- (Scrounger) Korrektur der Typ-Nichtübereinstimmung (Array-Objekt)

#### 0.1.3
- (foxthefox) Text für linkControl/linkAudioDelay/linkAudioQuality hinzugefügt

#### 0.1.2
- (Scrounger) Korrektur der Typ-Nichtübereinstimmung (String Boolean)

#### 0.1.1
- Korrektur für Uhr "oneday"

#### 0.1.0
- Kompaktmodus
- yamaha-yxc-nodejs 0.0.8
- Widget-Update

#### 0.0.9
- adminV3 verwendet values2table und fügt die Schaltfläche wieder hinzu
- Zone 2/3/4 funktioniert jetzt
- erweiterte automatische Tests
- Schaltfläche im Admin zum Sammeln von JSON-Antworten

#### 0.0.8
- automatisches Testupdate
- Vorname auf der Admin-Seite, der im Objekt (Gerät) angezeigt werden soll

#### 0.0.7
- Tuner-Unterstützung
- Uhrenunterstützung (hauptsächlich Informationen)
- Unterstützung von mehr Zonen
- Unterstützung von mc-link
- Einstellen von Min- und Max-Werten entsprechend den Funktionen
- Administrator v3

#### 0.0.6
- Widget-Set passend zu den Objekten und Steuerung
- cd.shuffle_stat Boolean -> Text
- neues netusb.shuffle_stat (Text)
- Statusaktualisierung durch Abonnieren von UDP-Nachrichten
- Schalter zum Aktualisieren der Spielzeitinformationen (Deaktivierung reduziert den Datenverkehr)

#### 0.0.5
- Bereinigung der Admin-Seite
- Verbesserung für die Objekterstellung
- mehr Objekte auf netusb
- mehr Objekte im System
- Unterstützung für CD hinzugefügt

#### 0.0.4
- neue Objekte und Funktionen (Input, Sound_Prog, EQ, ClearVoice)
- Suche/Entdeckung auf der Admin-Seite

#### 0.0.3
- mehr Objekte implementiert

#### 0.0.2
- kleinere Korrekturen

#### 0.0.1
- Erstveröffentlichung mit Einstellung der IP auf der Konfigurationsseite,
- Verfügbare Befehle: Power, Stumm, Lautstärke

## Changelog

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

## License

The MIT License (MIT)

Copyright (c) 2017 - 2025 foxthefox <foxthefox@wysiwis.net>
Copyright (c) 2025 foxthefox <foxthefox@wysiwis.net>