---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.musiccast/README.md
title: ioBroker.musiccast
hash: +Y3fTE3nCjE0f9m03KWr9TD02GnweDhdmOqMaSdMScg=
---
![Logo](../../../en/adapterref/iobroker.musiccast/admin/musiccast.png)

![Anzahl der Installationen](http://iobroker.live/badges/musiccast-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.musiccast.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.musiccast.svg)

# IoBroker.musiccast
**Tests:** ![Testen und Freigeben](https://github.com/foxthefox/ioBroker.musiccast/workflows/Test%20and%20Release/badge.svg)

Adapter für Yamaha MusicCast-Geräte wie WX-010/030, YSP-1600

## Einstellungen
Auf der Admin-Seite kann das „+“ zum manuellen Hinzufügen von IP-Adresse, Geräte-ID, Typ und Name verwendet werden.

Drücken Sie die Suchtaste zum Suchen. Wenn Sie mehrere Geräte haben, müssen Sie die Taste mehrmals drücken, bis alle Geräte gefunden wurden. Leider gibt die Suche immer nur ein Objekt zurück und dies kann jedes Ihrer MusicCast-Geräte sein. Wenn die Rückgabe dasselbe ist wie bereits in der Tabelle, müssen Sie die Taste erneut drücken. Manchmal hilft es, zu speichern und die Admin-Seite erneut zu öffnen.

Im unwahrscheinlichen Fall, dass 2 oder mehr Geräte die gleiche ID liefern, ändern Sie eine ID leicht. Sonst kann der Adapter die beiden Geräte nicht unterscheiden.

Wenn Sie die aktualisierte Spielzeit der angehörten Titel sehen möchten, aktivieren Sie das entsprechende Kontrollkästchen. Beachten Sie, dass dadurch die Nachrichtenanzahl erhöht wird (jede Sekunde für jedes Gerät der Pingpong der Aktualisierungen).

## Verfügbare Objekte
Folgende Objekte sind aktuell implementiert:

### Basis (Zone)
|Objekt|Wert|einstellbar|Beschreibung|
|--------|-------|:-:|--------|
|{zone}.power|boolean|x|true/false -> EIN/Standby|
|{zone}.zone_b|boolean|?|true/false -> Zielzone ist Zone B|
|{zone}.mute|boolean|x|true/false -> stummgeschaltet/nicht stummgeschaltet|
|{zone}.volume|value|x|0…max (Maximum abhängig vom Gerät)|
|{zone}.act_vol_mode|text|?|tatsächliche Lautstärke im dB-Modus|
|{zone}.act_vol_val|Wert|?|tatsächliche Lautstärke in dB-Wert|
|{zone}.act_vol_unit|text|-|tatsächliche Lautstärkeeinheit (sollte dB sein)|
|{zone}.act_vol_mode_list|text|-|tatsächliche Lautstärke in dB-Modi|
|{zone}.input|text|x|Eingaben abhängig vom Gerät|
|{zone}.input_list|text|-|mögliche Eingaben|
|{zone}.input_text|text|-|ausgewählte Eingabe als Text|
|{zone}.sound_program|text|x|Soundprogramm festlegen|
|{zone}.sound_program_list|text|-|mögliche Soundprogramme|
|{zone}.surr_decoder_type|text|?|Surround-Typ festlegen|
|{zone}.surr_decoder_type_list|text|-|möglicher Surround-Decoder|
|{zone}.link_control|text|x|Link-Steuerung festlegen|
|{zone}.link_control_list|text|-|mögliche Link-Control-Einstellungen|
|{zone}.link_audio_delay|text|x|Link-Audioverzögerung einstellen|
|{zone}.link_audio_delay_list|text|-|mögliche Einstellungen für die Audioverzögerung beim Link-Link|
|{zone}.clearVoice|boolean|x|clear Sprachsteuerung|
|{zone}.niedrig|Wert|x|Pegel EQ niedrig|
|{zone}.mid|Wert|x|Pegel EQ Mitte|
|{zone}.hoch|Wert|x|Pegel EQ hoch|
|{zone}.subwoofer_volume|Wert|x|Pegel Subwoofer-Lautstärke|
|{zone}.bass|Wert|x|Pegel Bass|
|{zone}.treble|Wert|x|Pegel Höhen|
|{zone}.tone_control_mode_list|text|-|möglicher Klangregelungsmodus|
|{zone}.tone_mode|boolean|?|Klangregelungsmodus|
|{zone}.balance|Wert|x|Level-Balance|
|{zone}.direct|boolean|x|direkt festlegen|
|{zone}.pure_direct|boolean|x|rein direkt festlegen|
|{zone}.enhancer|boolean|x|Enhancer festlegen|
|{zone}.bass_extension|boolean|x|Basserweiterung festlegen|
|{zone}.sleep|Wert|x|Einschlaftimer|
|{zone}.disable_flags|boolean|x|disable_flags setzen|
|{zone}.contents_display|boolean|x|Inhaltsanzeige festlegen|
|{zone}.party_enable|boolean|x|party_enable festlegen|
|{zone}.extra_bass|boolean|x|extra_bass festlegen|
|{zone}.adaptive_drc|boolean|x|adaptive_drc festlegen|
|{zone}.dts_dialogue_control|Wert|x|dts_dialogue_control festlegen|
|{zone}.adaptive_dsp_level|boolean|x|adaptive_dsp_level festlegen|

### Netusb
|Objekt|Wert|einstellbar|Beschreibung|
|--------|-------|:-:|--------|
|netusb.input|Wert|x|Soll-/Tatsächlicher Eingang|
|netusb.playPause|boolean|x|Wiedergabe/Pause festlegen|
|netusb.playback|text|-|Status Net Player|
|netusb.stop|boolean|x|Stopp festlegen|
|netusb.auto_stop|boolean|-|automatisch gestoppt|
|netusb.next|boolean|x|Weitersetzen|
|netusb.prev|boolean|x|Zurückspulen festlegen|
|netusb.shuffle|boolean|x|Zufallswiedergabe umschalten|
|netusb.shuffle_stat|Text|-|Shuffle-Status|
|netusb.repeat|boolean|x|Wiederholung umschalten|
|netusb.repeat_stat|text|-|Wiederholungsstatus|
|netusb.artist|text|-|Künstlername|
|netusb.album|Text|-|Albumname|
|netusb.track|Text|-|Titelname|
|netusb.albumart_url|text|-|http-Adresse für Albumcover|
|netusb.albumart_id|Wert|-|Albumcover-ID|
|netusb.play_time|Wert|-|Spielzeit in s|
|netusb.play_queue_type|text|-|netusb-Warteschlangentyp|
|netusb.total_time|Wert|-|Gesamtspielzeit in s|
|netusb.recent_info|json|-|Verlauf der gespielten Elemente|
|netusb.preset_info|json|-|gespeicherte Voreinstellungen/Favoriten|
|netusb.presetrecallnumber|value|x|ruft die # in der Favoritenliste ab|
|netusb.usb_devicetype|text|-|Typ des angeschlossenen USB-Geräts|
|netusb.attribute|value|-|über welche Möglichkeiten verfügt der Dienst, dekodiert zu werden|
|netusb.recallRecentItem|value|x|welche Möglichkeiten hat der Dienst, zu dekodieren|

### System
|Objekt|Wert|einstellbar|Beschreibung|
|--------|-------|:-:|--------|
|system.api_version|Wert|-|API-Version|
|system.system_version|Wert|-|Systemversion|
|system.inputs.{service}|Wert|-|verfügbarer Eingabedienst|
|system.inputs.{service}.account_enable|value|-|verfügbarer Eingabedienst aktiviert|
|system.inputs.{service}.distribution_enable|value|-|verfügbarer Eingabedienst, verteilbar|
|system.inputs.{service}.play_info_type|Wert|-|verfügbarer Eingabediensttyp|

### CD-Spieler
|Objekt|Wert|einstellbar|Beschreibung|
|--------|-------|:-:|--------|
|cd.playPause|boolean|x|Wiedergabe/Pause festlegen|
|CD-Wiedergabe|Text|-|Status CD-Player|
|cd.stop|boolean|x|Stopp festlegen|
|cd.next|boolean|x|Vorwärts setzen|
|cd.prev|boolean|x|Zurückspulen festlegen|
|cd.shuffle|boolean|x|Zufallswiedergabe umschalten|
|cd.shuffle_stat|Text|-|Zufallsstatus|
|cd.repeat|boolean|x|Wiederholung umschalten|
|cd.repeat_stat|text|-|Wiederholungsstatus|
|cd.device_stat|text|-|Gerätestatus|
|cd.playtime|Wert|-|aktuelle Wiedergabezeit|
|cd.totaltime|Wert|-|Gesamtzeit des aktuellen Titels|
|cd.disctime|Wert|-|CD-Gesamtzeit|
|cd.tracknumber|value|-|aktueller Track in Wiedergabe|
|cd.totaltracks|Wert|-|Gesamtzahl der CD-Titel|
|CD.Interpret|Text|-|Name des Interpreten|
|cd.album|text|-|Albumname|
|cd.track|text|-|Titelname|

### Tuner
|Objekt|Wert|einstellbar|Beschreibung|
|--------|-------|:-:|--------|
|tuner.common_preset_info|array|-|Voreinstellungsinformationen|
|tuner.am.preset_info|array|-|Voreingestellte AM-Informationen|
|tuner.fm.preset_info|array|-|Voreingestellte FM-Informationen|
|tuner.dab.preset_info|array|-|Voreingestellte DAB-Informationen|
|tuner.am.preset|Nummer|x|AM-Voreinstellungsnummer|
|tuner.am.freq|Nummer|x|AM-Frequenz in kHz|
|tuner.am.tuned|boolean|-|AM abgestimmt|
|tuner.fm.preset|Nummer|x|FM-Voreinstellungsnummer|
|tuner.fm.freq|Nummer|x|FM-Frequenz in kHz|
|tuner.fm.tuned|boolean|-|FM eingestellt|
|tuner.fm.audio_mode|Zeichenfolge|-|FM Mono/Stereo|
|tuner.dab.preset|Nummer|x|DAB-Voreinstellungsnummer|
|tuner.dab.id|Nummer|-|DAB-Sender-ID|
|tuner.dab.status|Zeichenfolge|-|DAB-Status|
|tuner.dab.freq|Nummer|-|DAB-Frequenz|
|tuner.dab.category|string|-|primär/sekundär|
|tuner.dab.audio_mode|Zeichenfolge|-|DAB Mono/Stereo|
|tuner.dab.bit_rate|Zahl|-|DAB-Bitrate in kpbs|
|tuner.dab.quality|Nummer|-|DAB-Qualität 0-100|
|tuner.dab.tune_aid|number|-|DAB-Signalstärke 0-100|
|tuner.dab.off_air|boolean|-|DAB Off-Air|
|tuner.dab.dab_plus|boolean|-|DAB+|
|tuner.dab.program_type|string|-|DAB-Programmtyp|
|tuner.dab.ch_label|Zeichenfolge|-|DAB-CH-Bezeichnung|
|tuner.dab.service_label|string|-|DAB-Dienstbezeichnung|
|tuner.dab.dls|Zeichenfolge|-|DAB DLS|
|tuner.dab.ensemble_label|string|-|DAB-Ensemblebezeichnung|
|tuner.dab.initial_scan_progress|Nummer|-|DAB-Fortschritt des ersten Scans 0-100|
|tuner.dab.total_station_num|Nummer|-|DAB-Sender insgesamt 0-255|
|tuner.rds.program_type|string|-|RDS-Programmtyp|
|tuner.rds.program_service|string|-|RDS-Programmdienst|
|tuner.rds.radio_text_a|Zeichenfolge|-|RDS-Text A|
|tuner.rds.radio_text_b|string|-|RDS-Text B|

### Uhr
|Objekt|Wert|einstellbar|Beschreibung|
|--------|-------|:-:|--------|
|clock.auto_sync|boolean|x|Automatische Synchronisierung der Uhr|
|clock.format|string|x|Uhrformat 12h/24h|
|clock.alarm_on|boolean|x|Uhralarmstatus ein/aus|
|clock.volume|number|x|Lautstärke des Weckers|
|clock.fade_interval|Nummer|x|Ausblendintervall des Weckers|
|clock.fade_type|Nummer|x|Uhralarm-Fade-Typ|
|clock.mode|string|x|Uhrweckermodus eintägig/wöchentlich|
|clock.repeat|boolean|x|Uhralarm wird wiederholt, wenn ein Tag angegeben ist|
|clock.{day}.enable|boolean|x|Gültigkeit der Uhreinstellung|
|clock.{day}.time|string|-|Startzeit des Weckers hhmm 00-23,00-59|
|clock.{day}.beep|boolean|x|Gültigkeit des Uhrsignaltons|
|clock.{day}.playback_type|string|-|Wiedergabetyp des Weckers fortsetzen/voreinstellen|
|clock.{day}.resume_input|string|-|Eingabe-ID für Wiederaufnahme des Uhralarms|
|clock.{day}.preset_type|string|-|Voreingestellter Typ des Uhralarms|
|clock.{day}.preset_num|Nummer|-|Eingabe-ID für voreingestellten Uhralarm|
|clock.{day}.preset_netusb_input|string|-|Netusb-Eingabe-ID des Uhralarms|
|clock.{day}.preset_netusb_text|string|-|Uhrwecker-Netusb-Text|
|clock.{day}.preset_tuner_band|string|-|Uhrwecker-Tunerband|
|clock.{day}.preset_tuner_number|Nummer|-|Uhrwecker-Tunerfrequenz oder Sender-ID|

## Aufgaben
* Unterstützung von Listen
* Änderung der Interaktionswerte in eine ansprechende Benennung
* Schnellvorlauf/Schnellrücklauf für NETUSB/CD
* Bluetooth
* Dialogebene

## 1.0.0 WICHTIGE ÄNDERUNGEN
* die Geräte-ID war vorher die System-ID, die nicht eindeutig ist. Jetzt wird die Geräte-ID verwendet, das ändert den Objektbaum
* Musiccast API 2.0.0
* Die Gerätesuche kann jetzt mehr als 1 Gerät zurückgeben
* neue Ausgabe für Entwickler im Admin-Bereich
* mehr asynchron/warten
* Tests korrigiert

#### 0.2.2
* Musiccast-API 0.0.14

#### 0.2.1
* Lizenz 2022
* Abhängigkeitskorrektur

#### 0.2.0
* Refactoring mit „Adapter erstellen“
* asynchron/warten

#### 0,1,5
* (Scrounger) Fehlerbehandlung, wenn das Gerät nicht erreichbar ist

#### 0.1.4
* (Scrounger) Korrektur der Typ-Nichtübereinstimmung (Array-Objekt)

#### 0.1.3
* (foxthefox) Text für linkControl/linkAudioDelay/linkAudioQuality hinzugefügt

#### 0.1.2
* (Scrounger) Korrektur von Typenkonflikten (String Boolean)

#### 0.1.1
* Korrektur für Uhr "oneday"

#### 0.1.0
* Kompaktmodus
* yamaha-yxc-nodejs 0.0.8
* Widget-Update

#### 0.0.9
* adminV3 verwendet values2table und fügt die Schaltfläche wieder hinzu
* Zone2/3/4 funktioniert jetzt
* erweiterte automatische Tests
* Button im Admin zum Sammeln von JSON-Antworten

#### 0.0.8
* Automatisches Test-Update
* Vorname auf der Admin-Seite, der im Objekt (Gerät) erscheinen soll

#### 0.0.7
* Tuner-Unterstützung
* Uhr-Unterstützung (hauptsächlich Informationen)
* Unterstützung von mehr Zonen
* Unterstützung von mc-link
* Einstellen von Min- und Max-Werten entsprechend den Features
* Administrator v3

#### 0.0.6
* Widget-Set passend zu den Objekten und Steuerung
* cd.shuffle_stat boolean -> Text
* neues netusb.shuffle_stat (Text)
* Statusaktualisierung durch Abonnieren von UDP-Nachrichten
* Schalter zum Aktualisieren der Spielzeitinformationen (Deaktivierung reduziert den Datenverkehr)

#### 0,0,5
* Bereinigung der Admin-Seite
* Verbesserung für die Objekterstellung
* mehr Objekte auf netusb
* mehr Objekte im System
* Unterstützung für CD hinzugefügt

#### 0.0.4
* neue Objekte und Funktionen (Input, Sound_Prog, EQ, ClearVoice)
* Suche/Entdeckung auf der Admin-Seite

#### 0.0.3
* mehr Objekte implementiert

#### 0.0.2
* kleinere Korrekturen

#### 0.0.1
* Erstveröffentlichung mit IP-Einstellung auf der Konfigurationsseite,
* Verfügbare Befehle Power, Stumm, Lautstärke

## Changelog

### 1.1.4
* fixed main.surround_ai
* update devDeps, eslint corrections
* IOB checker corrections

### 1.1.3
* translation with adapter-dev

### 1.1.2
* new version yamahe-yxc library

### 1.1.1
*  (scrounger) added datapoint isOnline, used by ioBroker.device-watcher

### 1.1.0 (npm)
* improved testing

### 1.0.8
* error correction add_to_group/remove_from_group

#### 1.0.7
* error correction in link/unlink/distribution

#### 1.0.6
* (scrounger) recallRecentItem added

#### 1.0.5
* usage of new IOB test library

#### 1.0.4
* correction for setting the input ("setInput")

#### 1.0.3
* new datapoint "extra_bass"
* new datapoint "adaptive_drc"
* new datapoint "dts_dialogue_control"
* new datapoint "adaptive_dsp_level"
* these are only read in, most likely they are commands, but the API is unknown

#### 1.0.2
* new datapoint "input_text"

#### 1.0.1
* changed algorithm for developer support

## License

The MIT License (MIT)

Copyright (c) 2017 - 2024 foxthefox <foxthefox@wysiwis.net>
Copyright (c) 2024 foxthefox <foxthefox@wysiwis.net>