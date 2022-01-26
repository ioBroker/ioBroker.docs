---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.musiccast/README.md
title: ioBroker.musiccast
hash: wkBvhQ++frCk99DOENud8SfkZpKXrLLCwHJ4f60MGoo=
---
![Logo](../../../en/adapterref/iobroker.musiccast/admin/musiccast.png)

![Anzahl der Installationen](http://iobroker.live/badges/musiccast-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.musiccast.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.musiccast.svg)
![Build-Status](https://travis-ci.org/foxthefox/ioBroker.musiccast.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.musiccast.png?downloads=true)

#ioBroker.musiccast
Adapter für Yamaha MusicCast Geräte wie WX-010/030, YSP-1600

##Installation:
Die Installation erfordert mindestens nodejs v10

von npm

```javascript
npm install iobroker.musiccast
```

aktuelle Version von github (dies funktioniert möglicherweise nicht jedes Mal, wenn die Entwicklung im Gange ist)

```javascript
npm install https://github.com/foxthefox/ioBroker.musiccast/tarball/master --production
```

## Einstellungen
Auf der Admin-Seite kann das "+" verwendet werden, um die IP-Adresse, DeviceID, Typ und Name manuell hinzuzufügen.
Drücken Sie die Suchtaste, um die Suche zu starten. Wenn Sie mehrere Geräte haben, müssen Sie die Schaltfläche mehrmals drücken, bis alle Geräte erkannt werden. Leider gibt die Entdeckung jeweils nur ein Objekt zurück und dies könnte eines Ihrer MusicCast-Geräte sein. Wenn der Return der gleiche ist wie bereits ein Teil des Tisches, müssen Sie den Button erneut drücken. Manchmal hilft es, die Damin-Seite zu speichern und erneut zu öffnen.

Im unwahrscheinlichen Fall, dass 2 oder mehr Geräte dieselbe ID liefern, ändern Sie eine ID geringfügig. Sonst kann der Adapter nicht zwischen den 2 Geräten unterscheiden.

Wenn Sie die aktualisierte Wiedergabezeit der von Ihnen gehörten Titel sehen möchten, aktivieren/haken Sie bitte das entsprechende Kontrollkästchen an. Beachten Sie, dass die Anzahl der Nachrichten steigt (jede Sekunde für jedes Gerät das Pingpong der Updates).

## Verfügbare Objekte
Folgende Objekte sind derzeit implementiert:

### Basis (Zone)
|Objekt|Wert|einstellbar|Beschreibung|
|--------|-------|:-:|--------|
|{zone}.power|boolean|x|true/false -> ON/Standby|
|{zone}.zone_b|boolean|?|true/false -> Zielzone ist Zone B|
|{zone}.mute|boolean|x|true/false -> stumm/nicht stumm|
|{zone}.volume|value|x|0...max (max je nach Gerät)|
|{zone}.act_vol_mode|text|?|tatsächliche Lautstärke im dB-Modus|
|{zone}.act_vol_val|value|?|tatsächliche Lautstärke in dB-Wert|
|{zone}.act_vol_unit|text|-|tatsächliche Lautstärkeeinheit (sollte dB sein)|
|{zone}.act_vol_mode_list|text|-|tatsächliche Lautstärke in dB-Modi|
|{zone}.input|text|x|Eingaben je nach Gerät|
|{zone}.input_list|text|-|mögliche Eingaben|
|{zone}.sound_program|text|x|Soundprogramm einstellen|
|{zone}.sound_program_list|text|-|mögliche Soundprogramme|
|{zone}.surr_decoder_type|text|?|Surround-Typ einstellen|
|{zone}.surr_decoder_type_list|text|-|möglicher Surround-Decoder|
|{zone}.link_control|text|x|set link control|
|{zone}.link_control_list|text|-|mögliche Link-Kontrolleinstellungen|
|{zone}.link_audio_delay|text|x|Link-Audioverzögerung einstellen|
|{zone}.link_audio_delay_list|text|-|mögliche Link-Link-Audioverzögerungseinstellungen|
|{zone}.clearVoice|boolean|x|clear Sprachsteuerung|
|{zone}.low|value|x|level EQ niedrig|
|{zone}.mid|value|x|level EQ mid|
|{zone}.high|value|x|level EQ hoch|
|{zone}.subwoofer_volume|value|x|level subwoofer volume|
|{zone}.bass|value|x|level bass|
|{zone}.treble|value|x|level treble|
|{zone}.tone_control_mode_list|text|-|möglicher Tonsteuerungsmodus|
|{zone}.tone_mode|boolean|?|Tonsteuerungsmodus|
|{zone}.balance|value|x|level balance|
|{zone}.direct|boolean|x|set direct|
|{zone}.pure_direct|boolean|x|set pure direct|
|{zone}.enhancer|boolean|x|set Enhancer|
|{zone}.bass_extension|boolean|x|Basserweiterung einstellen|
|{zone}.sleep|value|x|Sleep-Timer|

### Netusb
|Objekt|Wert|einstellbar|Beschreibung|
|--------|-------|:-:|--------|
|netusb.input|value|x|Soll-/Ist-Eingang|
|netusb.playPause|boolean|x|set Play/Pause|
|netusb.playback|text|-|status net player|
|netusb.stop|boolean|x|set Stop|
|netusb.auto_stop|boolean|-|automatisch gestoppt|
|netusb.next|boolean|x|set Forward|
|netusb.prev|boolean|x|set Rewind|
|netusb.shuffle|boolean|x|Toggle Shuffle|
|netusb.shuffle_stat|text|-|Shuffle-Status|
|netusb.repeat|boolean|x|Toggle Repeat|
|netusb.repeat_stat|text|-|Wiederholungsstatus|
|netusb.artist|text|-|Künstlername|
|netusb.album|text|-|Albumname|
|netusb.track|text|-|Trackname|
|netusb.albumart_url|text|-|http-Adresse für Albumcover|
|netusb.albumart_id|value|-|Albumcover-ID|
|netusb.play_time|value|-|gespielte Zeit in s|
|netusb.play_queue_type|text|-|netusb-Warteschlangentyp|
|netusb.total_time|value|-|Gesamtspielzeit in s|
|netusb.recent_info|json|-|Geschichte der gespielten Gegenstände|
|netusb.preset_info|json|-|gespeicherte Voreinstellungen/Favoriten|
|netusb.presetrecallnumber|value|x|rufen Sie die # in der Favoritenliste zurück|
|netusb.usb_devicetype|text|-|Typ des angeschlossenen USB-Geräts|
|netusb.attribute|value|-|welche Möglichkeiten haben den Dienst, dekodiert zu werden|

### System
|Objekt|Wert|einstellbar|Beschreibung|
|--------|-------|:-:|--------|
|system.api_version|value|-|API-Version|
|system.system_version|value|-|Systemversion|
|system.inputs.{service}|value|-|verfügbarer Eingabeservice|
|system.inputs.{service}.account_enable|value|-|verfügbarer Eingabedienst aktiviert|
|system.inputs.{service}.distribution_enable|value|-|verfügbarer Eingabedienst verteilbar|
|system.inputs.{service}.play_info_type|value|-|verfügbarer Eingabediensttyp|

### CD-Player
|Objekt|Wert|einstellbar|Beschreibung|
|--------|-------|:-:|--------|
|cd.playPause|boolean|x|set Play/Pause|
|cd.playback|text|-|status CD-Player|
|cd.stop|boolean|x|set Stop|
|cd.next|boolean|x|vorwärts setzen|
|cd.prev|boolean|x|set Rewind|
|cd.shuffle|boolean|x|Toggle Shuffle|
|cd.shuffle_stat|text|-|Shuffle-Status|
|cd.repeat|boolean|x|toggle repeat|
|cd.repeat_stat|text|-|Wiederholungsstatus|
|cd.device_stat|text|-|Gerätestatus|
|cd.playtime|value|-|aktuelle Wiedergabezeit|
|cd.totaltime|value|-|aktuelle Track-Gesamtzeit|
|cd.disctime|value|-|CD-Gesamtzeit|
|cd.tracknumber|value|-|aktueller Track in der Wiedergabe|
|cd.totaltracks|value|-|Total CD-Tracks|
|cd.artist|text|-|Künstlername|
|cd.album|text|-|Albumname|
|cd.track|text|-|Trackname|

### Tuner
|Objekt|Wert|einstellbar|Beschreibung|
|--------|-------|:-:|--------|
|tuner.common_preset_info|array|-|Preset-Informationen|
|tuner.am.preset_info|array|-|Preset AM-Informationen|
|tuner.fm.preset_info|array|-|Preset FM-Informationen|
|tuner.dab.preset_info|array|-|Voreingestellte DAB-Informationen|
|tuner.am.preset|number|x|AM-Preset-Nummer|
|tuner.am.freq|number|x|AM-Frequenz in kHz|
|tuner.am.tuned|boolean|-|AM abgestimmt|
|tuner.fm.preset|number|x|FM-Preset-Nummer|
|tuner.fm.freq|number|x|FM-Frequenz in kHz|
|tuner.fm.tuned|boolean|-|FM abgestimmt|
|tuner.fm.audio_mode|string|-|FM Mono/Stereo|
|tuner.dab.preset|number|x|DAB-Preset-Nummer|
|tuner.dab.id|nummer|-|DAB-Sender-ID|
|tuner.dab.status|string|-|DAB-Status|
|tuner.dab.freq|Nummer|-|DAB-Frequenz|
|tuner.dab.category|string|-|primär/sekundär|
|tuner.dab.audio_mode|string|-|DAB mono/stereo|
|tuner.dab.bit_rate|number|-|DAB-Bitrate in kpbs|
|tuner.dab.quality|number|-|DAB-Qualität 0-100|
|tuner.dab.tune_aid|number|-|DAB-Signalstärke 0-100|
|tuner.dab.off_air|boolean|-|DAB off air|
|tuner.dab.dab_plus|boolean|-|DAB+|
|tuner.dab.program_type|string|-|DAB-Programmtyp|
|tuner.dab.ch_label|string|-|DAB CH-Label|
|tuner.dab.service_label|string|-|DAB-Service-Label|
|tuner.dab.dls|string|-|DAB DLS|
|tuner.dab.ensemble_label|string|-|DAB-Ensmble-Label|
|tuner.dab.initial_scan_progress|number|-|DAB-Initial-Scan-Fortschritt 0-100|
|tuner.dab.total_station_num|number|-|DAB-Totalstationen 0-255|
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
|clock.fade_interval|number|x|Intervall für die Überblendung des Uhralarms|
|clock.fade_type|number|x|Uhr-Alarm-Fade-Typ|
|clock.mode|string|x|Uhr-Alarm-Modus eintägig/wöchentlich|
|clock.repeat|boolean|x|Uhralarm wiederholen, wenn ein Tag angegeben ist|
|clock.{day}.enable|boolean|x|Gültigkeit der Uhrzeiteinstellung|
|clock.{day}.time|string|-|Startzeit des Weckers hhmm 00-23,00-59|
|clock.{day}.beep|boolean|x|Clock Beep Gültigkeit|
|clock.{day}.playback_type|string|-|Uhralarm-Wiedergabetyp fortsetzen/voreinstellen|
|clock.{day}.resume_input|string|-|Uhralarm-Resume-Eingangs-ID|
|clock.{day}.preset_type|string|-|Voreinstellungstyp des Weckers|
|clock.{day}.preset_num|number|-|Uhralarm voreingestellte Eingangs-ID|
|clock.{day}.preset_netusb_input|string|-|Uhralarm netusb-Eingangs-ID|
|clock.{day}.preset_netusb_text|string|-|Uhr-Alarm netusb-Text|
|clock.{day}.preset_tuner_band|string|-|Uhr-Wecker-Tuner-Band|
|clock.{day}.preset_tuner_number|number|-|Uhr-Wecker-Tuner-Frequenz oder Sender-ID|

## Machen
* Unterstützung von Listen
* Änderung der Interaktionswerte zu schöner Namensgebung
* schneller Vor-/Rücklauf für NETUSB/CD
* Bluetooth
* Dialogebene

## 1.0.0 BRECHENDE ÄNDERUNGEN
* die deviceId war zuvor die systemId, die nicht eindeutig ist. Jetzt wird die deviceId verwendet, dies ändert den Objektbaum
* Musikcast-API 2.0.0
* Gerätesuche kann jetzt mehr als 1 Gerät zurückgeben
* neue Ausgabe für Entwickler im Admin-Panel
* mehr asynchron/warten

#### 0.2.2
* Musikcast-API 0.0.14

#### 0.2.1
* Lizenz 2022
* Abhängigkeitskorrektur

#### 0.2.0
* Refactoring mit "Adapter erstellen"
* asynchron/wartet

#### 0.1.5
* (Scrounger) Fehlerbehandlung, wenn das Gerät nicht erreichbar ist

#### 0.1.4
* (Scrounger) Korrektur von Typ-Mismatch (Array-Objekt)

#### 0.1,3
* (foxthefox) Schreiben für linkControl/linkAudioDelay/linkAudioQuality hinzugefügt

#### 0.1.2
* (Scrounger) Korrektur von Typ-Mismatch (String Boolean)

#### 0.1.1
* Korrektur für Uhr "ein Tag"

#### 0.1,0
* Kompaktmodus
* yamaha-yxc-nodejs 0.0.8
* Widget-Update

#### 0.0.9
* adminV3 verwendet values2table und füge die Schaltfläche wieder zurück
* zone2/3/4 funktioniert jetzt
* erweiterte automatische Prüfung
* Schaltfläche im Admin zum Sammeln von JSON-Antworten

#### 0,0.8
* automatisches Test-Update
* Vorname auf der Admin-Seite, um im Objekt (Gerät) zu erscheinen

#### 0.0.7
* Tuner-Unterstützung
* Uhrunterstützung (hauptsächlich Informationen)
* Unterstützung von mehr Zonen
* Unterstützung von mc-link
* Einstellung von Min- und Max-Werten je nach Ausstattung
* admin v3

#### 0.0.6
* Widget-Set passend zu den Objekten und der Steuerung
* cd.shuffle_stat Boolean -> Text
* neu netusb.shuffle_stat (Text)
* Statusupdate über das Abonnieren von UDP-Nachrichten
* Schalter für Update der Spielzeitinformationen (Deaktivierung reduziert den Verkehr)

#### 0.0.5
* Bereinigung auf der Admin-Seite
* Verbesserung bei der Objekterstellung
* weitere Objekte auf netusb
* mehr Objekte im System
* Unterstützung von CDs hinzugefügt

#### 0.0.4
* neue Objekte und Funktionen (input, sound_prog, EQ, clearVoice)
* Suche/Entdeckung auf der Admin-Seite

#### 0.0.3
* weitere Objekte implementiert

#### 0.0.2
* kleinere Korrekturen

#### 0.0.1
* Erstveröffentlichung mit Einstellung der IP in der Konfigurationsseite,
* verfügbare Befehle Power, Mute, Volume

## Changelog

## License

The MIT License (MIT)

Copyright (c) 2017 - 2022 foxthefox <foxthefox@wysiwis.net>