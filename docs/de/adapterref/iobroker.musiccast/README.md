---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.musiccast/README.md
title: ioBroker.musiccast
hash: T5qSweTthdZEApvP+6oMSEZA/qXiooHxcYxHPtmHTrc=
---
![Logo](../../../en/adapterref/iobroker.musiccast/admin/musiccast.png)

![Anzahl der Installationen](http://iobroker.live/badges/musiccast-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.musiccast.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.musiccast.svg)

# IoBroker.musiccast
**Tests:** ![Test und Freigabe](https://github.com/foxthefox/ioBroker.musiccast/workflows/Test%20and%20Release/badge.svg)

Adapter für Yamaha MusicCast-Geräte wie WX-010/030, YSP-1600

## Installation:
Für die Installation ist mindestens NodeJS v10 erforderlich

von npm

```javascript
npm install iobroker.musiccast
```

aktuelle Version von Github (dies funktioniert möglicherweise nicht immer, wenn die Entwicklung im Gange ist)

```javascript
npm install https://github.com/foxthefox/ioBroker.musiccast/tarball/master --production
```

## Einstellungen
Auf der Admin-Seite kann das „+“ zum manuellen Hinzufügen von IP-Adresse, Geräte-ID, Typ und Name verwendet werden.
Klicken Sie zum Entdecken auf die Suchtaste. Wenn Sie mehrere Geräte haben, müssen Sie die Taste mehrmals drücken, bis alle Geräte erkannt werden. Leider gibt die Erkennung jeweils nur ein Objekt zurück und dies könnte eines Ihrer MusicCast-Geräte sein. Wenn der Return mit dem bereits in der Tabelle enthaltenen identisch ist, müssen Sie den Button erneut drücken. Manchmal hilft es, die Damin-Seite zu speichern und erneut zu öffnen.

Im unwahrscheinlichen Fall, dass zwei oder mehr Geräte dieselbe ID liefern, ändern Sie eine ID geringfügig. Andernfalls kann der Adapter nicht zwischen den beiden Geräten unterscheiden.

Wenn Sie möchten, dass die Spielzeit für die von Ihnen gehörten Titel aktualisiert wird, aktivieren/aktivieren Sie bitte das entsprechende Kontrollkästchen. Beachten Sie, dass sich dadurch die Nachrichtenanzahl erhöht (jede Sekunde für jedes Gerät der Pingpong von Updates).

## Verfügbare Objekte
Derzeit sind folgende Objekte implementiert:

### Basic (Zone)
|Objekt|Wert|einstellbar|Beschreibung|
|--------|-------|:-:|--------|
|{zone}.power|boolean|x|true/false -> ON/Standby|
|{zone}.zone_b|boolean|?|true/false -> Zielzone ist Zone B|
|{zone}.mute|boolean|x|true/false -> stummgeschaltet/nicht stummgeschaltet|
|{zone}.volume|value|x|0...max (maximal abhängig vom Gerät)|
|{zone}.act_vol_mode|text|?|tatsächliche Lautstärke im dB-Modus|
|{zone}.act_vol_val|value|?|tatsächliche Lautstärke in dB-Wert|
|{zone}.act_vol_unit|text|-|tatsächliche Lautstärkeeinheit (sollte dB sein)|
|{zone}.act_vol_mode_list|text|-|tatsächliche Lautstärke in dB-Modi|
|{zone}.input|text|x|Eingaben je nach Gerät|
|{zone}.input_list|text|-|mögliche Eingaben|
|{zone}.input_text|text|-|ausgewählte Eingabe als Text|
|{zone}.sound_program|text|x|Soundprogramm einstellen|
|{zone}.sound_program_list|text|-|mögliche Soundprogramme|
|{zone}.surr_decoder_type|text|?|Surround-Typ festlegen|
|{zone}.surr_decoder_type_list|text|-|möglicher Surround-Decoder|
|{zone}.link_control|text|x|Link-Steuerung festlegen|
|{zone}.link_control_list|text|-|mögliche Linksteuerungseinstellungen|
|{zone}.link_audio_delay|text|x|Link-Audioverzögerung festlegen|
|{zone}.link_audio_delay_list|text|-|mögliche Link-Link-Audioverzögerungseinstellungen|
|{zone}.clearVoice|boolean|x|clear Sprachsteuerung|
|{zone}.low|value|x|level EQ low|
|{zone}.mid|value|x|level EQ mid|
|{zone}.high|value|x|level EQ high|
|{zone}.subwoofer_volume|value|x|level Subwoofer-Lautstärke|
|{zone}.bass|value|x|level bass|
|{zone}.treble|value|x|level treble|
|{zone}.tone_control_mode_list|text|-|möglicher Klangregelungsmodus|
|{zone}.tone_mode|boolean|?|Klangregelungsmodus|
|{zone}.balance|value|x|level balance|
|{zone}.direct|boolean|x|set direct|
|{zone}.pure_direct|boolean|x|set pure direct|
|{zone}.enhancer|boolean|x|set Enhancer|
|{zone}.bass_extension|boolean|x|Basserweiterung festlegen|
|{zone}.sleep|value|x|Sleep-Timer|
|{zone}.disable_flags|boolean|x|setdisable_flags|
|{zone}.contents_display|boolean|x|setcontents_display|
|{zone}.party_enable|boolean|x|set party_enable|
|{zone}.extra_bass|boolean|x|set extra_bass|
|{zone}.adaptive_drc|boolean|x|set adaptive_drc|
|{zone}.dts_dialogue_control|value|x|set dts_dialogue_control|
|{zone}.adaptive_dsp_level|boolean|x|set adaptive_dsp_level|

### Netusb
|Objekt|Wert|einstellbar|Beschreibung|
|--------|-------|:-:|--------|
|netusb.input|value|x|set/actual input|
|netusb.playPause|boolean|x|set Play/Pause|
|netusb.playback|text|-|status net player|
|netusb.stop|boolean|x|set Stop|
|netusb.auto_stop|boolean|-|automatisch gestoppt|
|netusb.next|boolean|x|set Forward|
|netusb.prev|boolean|x|set Rewind|
|netusb.shuffle|boolean|x|Shuffle umschalten|
|netusb.shuffle_stat|text|-|shuffle status|
|netusb.repeat|boolean|x|Toggle Repeat|
|netusb.repeat_stat|text|-|Wiederholungsstatus|
|netusb.artist|text|-|Künstlername|
|netusb.album|text|-|Albumname|
|netusb.track|text|-|Trackname|
|netusb.albumart_url|text|-|http-Adresse für Albumcover|
|netusb.albumart_id|value|-|Album-Cover-ID|
|netusb.play_time|value|-|abgespielte Zeit in s|
|netusb.play_queue_type|text|-|netusb-Warteschlangentyp|
|netusb.total_time|value|-|Gesamtspielzeit in s|
|netusb.recent_info|json|-|Verlauf der gespielten Elemente|
|netusb.preset_info|json|-|gespeicherte Voreinstellungen/Favoriten|
|netusb.presetrecallnumber|value|x|die # in der Favoritenliste abrufen|
|netusb.usb_devicetype|text|-|Typ des angeschlossenen USB-Geräts|
|netusb.attribute|value|-|Welche Möglichkeiten hat der Dienst, dekodiert zu werden|
|netusb.recallRecentItem|value|x|welche Möglichkeiten der zu dekodierende Dienst hat|

### System
|Objekt|Wert|einstellbar|Beschreibung|
|--------|-------|:-:|--------|
|system.api_version|value|-|API-Version|
|system.system_version|value|-|Systemversion|
|system.inputs.{service}|value|-|verfügbarer Eingabedienst|
|system.inputs.{service}.account_enable|value|-|verfügbarer Eingabedienst aktiviert|
|system.inputs.{service}.distribution_enable|value|-|verfügbarer Eingabedienst verteilbar|
|system.inputs.{service}.play_info_type|value|-|verfügbarer Eingabediensttyp|

### CD-Player
|Objekt|Wert|einstellbar|Beschreibung|
|--------|-------|:-:|--------|
|cd.playPause|boolean|x|set Play/Pause|
|cd.playback|text|-|status CD-Player|
|cd.stop|boolean|x|set Stop|
|cd.next|boolean|x|set Forward|
|cd.prev|boolean|x|set Rewind|
|cd.shuffle|boolean|x|toggle shuffle|
|cd.shuffle_stat|text|-|shuffle status|
|cd.repeat|boolean|x|Toggle Repeat|
|cd.repeat_stat|text|-|Wiederholungsstatus|
|cd.device_stat|text|-|Gerätestatus|
|cd.playtime|value|-|aktuelle Wiedergabezeit|
|cd.totaltime|value|-|Gesamtzeit des aktuellen Titels|
|cd.disctime|value|-|CD-Gesamtzeit|
|cd.tracknumber|value|-|aktueller Titel in der Wiedergabe|
|cd.totaltracks|value|-|gesamte CD-Titel|
|cd.artist|text|-|Künstlername|
|cd.album|text|-|Albumname|
|cd.track|text|-|Titelname|

### Tuner
|Objekt|Wert|einstellbar|Beschreibung|
|--------|-------|:-:|--------|
|tuner.common_preset_info|array|-|Voreinstellungsinformationen|
|tuner.am.preset_info|array|-|Voreingestellte AM-Informationen|
|tuner.fm.preset_info|array|-|Voreingestellte FM-Informationen|
|tuner.dab.preset_info|array|-|Voreingestellte DAB-Informationen|
|tuner.am.preset|number|x|AM-Preset-Nummer|
|tuner.am.freq|number|x|AM-Frequenz in kHz|
|tuner.am.tuned|boolean|-|AM tuned|
|tuner.fm.preset|number|x|FM-Preset-Nummer|
|tuner.fm.freq|number|x|UKW-Frequenz in kHz|
|tuner.fm.tuned|boolean|-|FM tuned|
|tuner.fm.audio_mode|string|-|FM mono/stereo|
|tuner.dab.preset|number|x|DAB-Preset-Nummer|
|tuner.dab.id|number|-|DAB-Sender-ID|
|tuner.dab.status|string|-|DAB-Status|
|tuner.dab.freq|number|-|DAB-Frequenz|
|tuner.dab.category|string|-|primär/sekundär|
|tuner.dab.audio_mode|string|-|DAB mono/stereo|
|tuner.dab.bit_rate|number|-|DAB-Bitrate in kpbs|
|tuner.dab.quality|number|-|DAB-Qualität 0-100|
|tuner.dab.tune_aid|number|-|DAB-Signalstärke 0-100|
|tuner.dab.off_air|boolean|-|DAB off air|
|tuner.dab.dab_plus|boolean|-|DAB+|
|tuner.dab.program_type|string|-|DAB-Programmtyp|
|tuner.dab.ch_label|string|-|DAB CH label|
|tuner.dab.service_label|string|-|DAB-Service-Label|
|tuner.dab.dls|string|-|DAB DLS|
|tuner.dab.ensemble_label|string|-|DAB ensmble label|
|tuner.dab.initial_scan_progress|number|-|DAB-Initial-Scan-Fortschritt 0-100|
|tuner.dab.total_station_num|number|-|DAB-Gesamtsender 0-255|
|tuner.rds.program_type|string|-|RDS-Programmtyp|
|tuner.rds.program_service|string|-|RDS-Programmdienst|
|tuner.rds.radio_text_a|string|-|RDS-Text A|
|tuner.rds.radio_text_b|string|-|RDS-Text B|

### Uhr
|Objekt|Wert|einstellbar|Beschreibung|
|--------|-------|:-:|--------|
|clock.auto_sync|boolean|x|Automatische Synchronisierung der Uhr|
|clock.format|string|x|Uhrformat 12h/24h|
|clock.alarm_on|boolean|x|Weckerstatus ein/aus|
|clock.volume|number|x|Lautstärke des Weckers|
|clock.fade_interval|number|x|Überblendungsintervall des Weckers|
|clock.fade_type|number|x|Wecker-Fade-Typ|
|clock.mode|string|x|Weckermodus eintägig/wöchentlich|
|clock.repeat|boolean|x|Wiederholung des Weckers, wenn ein Tag angegeben ist|
|clock.{day}.enable|boolean|x|Gültigkeit der Uhreinrichtung|
|clock.{day}.time|string|-|Startzeit des Weckers hhmm 00-23,00-59|
|clock.{day}.beep|boolean|x|Clock Beep Gültigkeit|
|clock.{day}.playback_type|string|-|Wecker-Wiedergabetyp fortsetzen/voreinstellen|
|clock.{day}.resume_input|string|-|Eingabe-ID zur Fortsetzung des Weckers|
|clock.{day}.preset_type|string|-|Uhralarm-Voreinstellungstyp|
|clock.{day}.preset_num|number|-|Uhralarm-Voreinstellungs-Eingangs-ID|
|clock.{day}.preset_netusb_input|string|-|Wecker-Netusb-Eingangs-ID|
|clock.{day}.preset_netusb_text|string|-|Wecker-Netusb-Text|
|clock.{day}.preset_tuner_band|string|-|Uhr-Wecker-Tuner-Band|
|clock.{day}.preset_tuner_number|number|-|Wecker-Tuner-Frequenz oder Sender-ID|

## Machen
* Unterstützung von Listen
* Änderung der Interaktionswerte zu schöner Benennung
* Schnellvorlauf/Schnellrücklauf für NETUSB/CD
* Bluetooth
* Dialogebene

## 1.0.0 BRANDNEUE ÄNDERUNGEN
* Die Geräte-ID war zuvor die System-ID, die nicht eindeutig ist. Jetzt wird die Geräte-ID verwendet, wodurch sich der Objektbaum ändert
* Musiccast-API 2.0.0
* Die Gerätesuche kann jetzt mehr als ein Gerät zurückgeben
* Neue Ausgabe für Entwickler im Admin-Panel
* mehr asynchron/warten
* Test korrigiert

#### 0.2.2
* Musiccast-API 0.0.14

#### 0.2.1
* Lizenz 2022
* Abhängigkeitskorrektur

#### 0.2.0
* Refactoring mit „Adapter erstellen“
* asynchron/warten

#### 0.1.5
* (Scrounger) Fehlerbehandlung, wenn das Gerät nicht erreichbar ist

#### 0.1.4
* (Schnorrer) Korrektur der Typinkongruenz (Array-Objekt)

#### 0.1.3
* (foxthefox) hat das Schreiben für linkControl/linkAudioDelay/linkAudioQuality hinzugefügt

#### 0.1.2
* (Scrounger) Korrektur der Typinkongruenz (String boolean)

#### 0.1.1
* Korrektur für Uhr „oneday“

#### 0.1.0
* Kompaktmodus
* yamaha-yxc-nodejs 0.0.8
* Widget-Update

#### 0.0.9
* adminV3 verwendet „values2table“ und die Schaltfläche „Hinzufügen“ erneut
* Zone2/3/4 funktioniert jetzt
* Erweiterte automatische Tests
* Schaltfläche im Adminbereich zum Sammeln von JSON-Antworten

#### 0.0.8
* Automatisches Testupdate
* Vorname auf der Admin-Seite, der im Objekt (Gerät) angezeigt werden soll

#### 0.0.7
* Tuner-Unterstützung
* Uhrunterstützung (hauptsächlich Informationen)
* Unterstützung weiterer Zonen
* Unterstützung von MC-Link
* Einstellung der Min.- und Max.-Werte entsprechend den Funktionen
* Admin v3

#### 0.0.6
* Widget-Set passend zu den Objekten und der Steuerung
* cd.shuffle_stat boolean -> Text
* neuer netusb.shuffle_stat (Text)
* Statusaktualisierung über abonnierte UDP-Nachrichten
* Schalter zur Aktualisierung der Spielzeitinformationen (durch Deaktivieren wird der Datenverkehr reduziert)

#### 0,0,5
* Bereinigung auf der Admin-Seite
* Verbesserung bei der Objekterstellung
* Weitere Objekte auf NetUSB
* mehr Objekte im System
* Unterstützung für CD hinzugefügt

#### 0.0.4
* neue Objekte und Funktionen (Input, Sound_Prog, EQ, ClearVoice)
* Suche/Erkennung auf der Admin-Seite

#### 0.0.3
* Weitere Objekte implementiert

#### 0.0.2
* kleinere Korrekturen

#### 0.0.1
* Erstveröffentlichung mit Einstellung der IP auf der Konfigurationsseite,
* Verfügbare Befehle Power, Stummschaltung, Lautstärke

## Changelog
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

Copyright (c) 2017 - 2023 foxthefox <foxthefox@wysiwis.net>