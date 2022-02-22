---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.musiccast/README.md
title: ioBroker.musiccast
hash: 41PVavZQZPOUQv1i4MQXzrwU2Tre40zZbj/mDuJffK4=
---
![Logo](../../../en/adapterref/iobroker.musiccast/admin/musiccast.png)

![Anzahl der Installationen](http://iobroker.live/badges/musiccast-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.musiccast.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.musiccast.svg)

# IoBroker.musiccast
**Tests:** ![Testen und freigeben](https://github.com/foxthefox/ioBroker.musiccast/workflows/Test%20and%20Release/badge.svg)

Adapter für Yamaha MusicCast Geräte wie WX-010/030, YSP-1600

## Installation:
Die Installation erfordert mindestens nodejs v10

von npm

```javascript
npm install iobroker.musiccast
```

aktuelle Version von github (dies funktioniert möglicherweise nicht immer, wenn die Entwicklung im Gange ist)

```javascript
npm install https://github.com/foxthefox/ioBroker.musiccast/tarball/master --production
```

## Einstellungen
Auf der Admin-Seite kann das „+“ zum manuellen Hinzufügen von IP-Adresse, Geräte-ID, Typ und Name verwendet werden.
Drücken Sie die Suchtaste für die Entdeckung. Wenn Sie mehrere Geräte haben, müssen Sie die Taste mehrmals drücken, bis alle Geräte erkannt wurden. Leider gibt die Erkennung zu diesem Zeitpunkt nur ein Objekt zurück, und dies könnte eines Ihrer MusicCast-Geräte sein. Wenn die Rückkehr die gleiche wie bereits Teil der Tabelle ist, müssen Sie die Taste erneut drücken. Manchmal hilft es, die damin-Seite zu speichern und erneut zu öffnen.

In dem unwahrscheinlichen Fall, dass 2 oder mehr Geräte dieselbe ID liefern, ändern Sie eine ID geringfügig. Sonst kann der Adapter die 2 Geräte nicht unterscheiden.

Wenn Sie möchten, dass die Spielzeit für die von Ihnen gehörten Titel aktualisiert wird, aktivieren/markieren Sie bitte das entsprechende Kontrollkästchen. Beachten Sie, dass sich die Anzahl der Nachrichten erhöht (jede Sekunde für jedes Gerät das Pingpong von Updates).

## Verfügbare Objekte
Aktuell sind folgende Objekte implementiert:

### Einfach (Zone)
|Objekt|Wert|einstellbar|Beschreibung|
|--------|-------|:-:|--------|
|{zone}.power|boolesch|x|true/false -> ON/Standby|
|{zone}.zone_b|boolean|?|true/false -> Zielzone ist Zone B|
|{zone}.mute|boolean|x|true/false -> stummgeschaltet/ nicht stummgeschaltet|
|{zone}.volume|value|x|0...max (max je nach Gerät)|
|{zone}.act_vol_mode|text|?|tatsächliche Lautstärke im dB-Modus|
|{zone}.act_vol_val|value|?|tatsächliche Lautstärke in dB-Wert|
|{zone}.act_vol_unit|text|-|tatsächliche Lautstärkeeinheit (sollte dB sein)|
|{zone}.act_vol_mode_list|text|-|tatsächliche Lautstärke in dB-Modi|
|{zone}.input|text|x|Eingaben je nach Gerät|
|{zone}.input_list|text|-|mögliche Eingaben|
|{zone}.sound_program|text|x|Soundprogramm einstellen|
|{zone}.sound_program_list|text|-|mögliche Soundprogramme|
|{zone}.surr_decoder_type|Text|?|Surround-Typ festlegen|
|{zone}.surr_decoder_type_list|text|-|möglicher Surround-Decoder|
|{zone}.link_control|text|x|Linksteuerung festlegen|
|{zone}.link_control_list|text|-|mögliche Einstellungen für die Linksteuerung|
|{zone}.link_audio_delay|text|x|Link-Audioverzögerung festlegen|
|{zone}.link_audio_delay_list|text|-|möglicher Link Link Audioverzögerungseinstellungen|
|{zone}.clearVoice|boolean|x|Sprachsteuerung löschen|
|{zone}.low|value|x|level EQ niedrig|
|{zone}.mid|value|x|level EQ mid|
|{zone}.high|value|x|level EQ hoch|
|{zone}.subwoofer_volume|value|x|level Subwoofer-Lautstärke|
|{Zone}.bass|Wert|x|Basspegel|
|{zone}.höhen|wert|x|level höhen|
|{zone}.tone_control_mode_list|text|-|möglicher Tonsteuerungsmodus|
|{zone}.tone_mode|boolean|?|Tonsteuerungsmodus|
|{zone}.balance|value|x|level balance|
|{zone}.direct|boolesch|x|direkt setzen|
|{zone}.pure_direct|boolesch|x|rein direkt setzen|
|{zone}.enhancer|boolean|x|set-enhancer|
|{zone}.bass_extension|boolesch|x|Basserweiterung festlegen|
|{Zone}.sleep|Wert|x|Sleep-Timer|

### Netzusb
|Objekt|Wert|einstellbar|Beschreibung|
|--------|-------|:-:|--------|
|Netzusb.Eingang|Wert|x|Soll-/Ist-Eingang|
|netusb.playPause|boolesch|x|Wiedergabe/Pause einstellen|
|netusb.playback|text|-|status net player|
|netusb.stop|boolesch|x|set Stop|
|netusb.auto_stop|boolesch|-|automatisch gestoppt|
|netusb.next|boolesch|x|weiterleiten|
|netusb.prev|boolesch|x|Rücklauf einstellen|
|netusb.shuffle|boolesch|x|Zufallswiedergabe umschalten|
|netusb.shuffle_stat|text|-|Zufallsstatus|
|netusb.repeat|boolean|x|toggle repeat|
|netusb.repeat_stat|Text|-|Status wiederholen|
|netusb.artist|text|-|künstlername|
|netusb.album|Text|-|Albumname|
|netusb.track|Text|-|Titelname|
|netusb.albumart_url|text|-|http-Adresse für Albumcover|
|netusb.albumart_id|value|-|Albumcover-ID|
|netusb.play_time|value|-|gespielte Zeit in s|
|netusb.play_queue_type|text|-|netusb-Warteschlangentyp|
|netusb.total_time|value|-|Gesamtspielzeit in s|
|netusb.recent_info|json|-|Geschichte der gespielten Elemente|
|netusb.preset_info|json|-|gespeicherte Voreinstellungen/Favoriten|
|netusb.presetrecallnumber|value|x|rufe die # in der Favoritenliste auf|
|netusb.usb_devicetype|text|-|Typ des angeschlossenen USB-Geräts|
|netusb.attribute|value|-|welche Möglichkeiten der Dienst hat, zu entschlüsseln|

### System
|Objekt|Wert|einstellbar|Beschreibung|
|--------|-------|:-:|--------|
|system.api_version|value|-|API-Version|
|system.system_version|value|-|Systemversion|
|system.inputs.{Dienst}|Wert|-|verfügbarer Eingabedienst|
|system.inputs.{service}.account_enable|value|-|verfügbarer Eingabedienst aktiviert|
|system.inputs.{service}.distribution_enable|value|-|verfügbarer Eingabedienst verteilbar|
|system.inputs.{service}.play_info_type|value|-|verfügbarer Eingabediensttyp|

### CD-Player
|Objekt|Wert|einstellbar|Beschreibung|
|--------|-------|:-:|--------|
|cd.playPause|boolesch|x|Start/Pause einstellen|
|cd.playback|Text|-|Status CD-Player|
|cd.stop|boolesch|x|set Stop|
|cd.next|boolesch|x|weiterleiten|
|cd.prev|boolesch|x|Rücklauf einstellen|
|cd.shuffle|boolean|x|Zufallswiedergabe umschalten|
|cd.shuffle_stat|text|-|Zufallsstatus|
|cd.repeat|boolesch|x|Wiederholung umschalten|
|cd.repeat_stat|Text|-|Status wiederholen|
|cd.device_stat|text|-|Gerätestatus|
|cd.playtime|value|-|aktuelle Wiedergabezeit|
|cd.totaltime|value|-|Gesamtzeit des aktuellen Tracks|
|cd.disctime|value|-|CD-Gesamtzeit|
|cd.tracknumber|value|-|aktueller Track in der Wiedergabe|
|cd.totaltracks|value|-|gesamte CD-Tracks|
|cd.künstler|text|-|künstlername|
|cd.album|Text|-|Albumname|
|cd.track|text|-|Titelname|

### Tuner
|Objekt|Wert|einstellbar|Beschreibung|
|--------|-------|:-:|--------|
|tuner.common_preset_info|array|-|Preset-Informationen|
|tuner.am.preset_info|array|-|Voreingestellte AM-Informationen|
|tuner.fm.preset_info|array|-|Voreingestellte FM-Informationen|
|tuner.dab.preset_info|array|-|Voreingestellte DAB-Informationen|
|tuner.am.preset|Nummer|x|AM-Preset-Nummer|
|tuner.am.freq|Zahl|x|AM-Frequenz in kHz|
|tuner.am.tuned|boolesch|-|AM abgestimmt|
|tuner.fm.preset|Nummer|x|UKW-Voreinstellungsnummer|
|tuner.fm.freq|Zahl|x|UKW-Frequenz in kHz|
|tuner.fm.tuned|boolesch|-|FM abgestimmt|
|tuner.fm.audio_mode|string|-|UKW mono/stereo|
|tuner.dab.preset|Nummer|x|DAB-Preset-Nummer|
|tuner.dab.id|Nummer|-|ID des DAB-Senders|
|tuner.dab.status|string|-|DAB-Status|
|tuner.dab.freq|Nummer|-|DAB-Frequenz|
|tuner.dab.category|string|-|primär/sekundär|
|tuner.dab.audio_mode|string|-|DAB mono/stereo|
|tuner.dab.bit_rate|Zahl|-|DAB-Bitrate in kpbs|
|tuner.dab.quality|Nummer|-|DAB-Qualität 0-100|
|tuner.dab.tune_aid|Nummer|-|DAB Signalstärke 0-100|
|tuner.dab.off_air|boolesch|-|DAB off air|
|tuner.dab.dab_plus|boolean|-|DAB+|
|tuner.dab.program_type|string|-|DAB-Programmtyp|
|tuner.dab.ch_label|string|-|DAB CH Label|
|tuner.dab.service_label|string|-|DAB-Service-Label|
|tuner.dab.dls|string|-|DAB DLS|
|tuner.dab.ensemble_label|string|-|DAB-Ensmble-Label|
|tuner.dab.initial_scan_progress|number|-|DAB initial scan progress 0-100|
|tuner.dab.total_station_num|Anzahl|-|DAB Totalstationen 0-255|
|tuner.rds.program_type|string|-|RDS-Programmtyp|
|tuner.rds.program_service|string|-|RDS-Programmdienst|
|tuner.rds.radio_text_a|string|-|RDS-Text A|
|tuner.rds.radio_text_b|string|-|RDS-Text B|

### Uhr
|Objekt|Wert|einstellbar|Beschreibung|
|--------|-------|:-:|--------|
|clock.auto_sync|boolesch|x|Uhr automatisch synchronisieren|
|clock.format|string|x|Uhrformat 12h/24h|
|clock.alarm_on|boolean|x|Alarmstatus der Uhr ein/aus|
|clock.volume|number|x|Clock-Alarmlautstärke|
|clock.fade_interval|number|x|Clock-Alarm-Fade-Intervall|
|clock.fade_type|number|x|Clock-Alarm-Fade-Typ|
|clock.mode|string|x|Weckalarmmodus einmal täglich/wöchentlich|
|clock.repeat|boolean|x|Wiederholung des Uhralarms, wenn ein Tag angegeben ist|
|clock.{day}.enable|boolean|x|Gültigkeit der Uhreinstellung|
|clock.{day}.time|string|-|Startzeit des Uhralarms hhmm 00-23,00-59|
|clock.{day}.beep|boolean|x|Gültigkeit des Uhrsignals|
|clock.{day}.playback_type|string|-|Uhr-Alarm-Wiedergabetyp fortsetzen/voreinstellen|
|clock.{day}.resume_input|string|-|Uhralarm-Wiederaufnahme-Eingangs-ID|
|clock.{day}.preset_type|string|-|Voreingestellter Typ des Weckers|
|clock.{day}.preset_num|number|-|Voreingestellte Eingangs-ID des Uhralarms|
|clock.{day}.preset_netusb_input|string|-|Uhralarm-Netusb-Eingangs-ID|
|clock.{day}.preset_netusb_text|string|-|Uhralarm netusb text|
|clock.{day}.preset_tuner_band|string|-|Uhr-Alarm-Tuner-Band|
|clock.{day}.preset_tuner_number|number|-|Clock-Alarm-Tuner-Frequenz oder Sender-ID|

## Machen
* Unterstützung von Listen
* Änderung der Interaktionswerte zu netter Benennung
* schneller Vorlauf/schneller Rücklauf für NETUSB/CD
* Bluetooth
* Dialogebene

## 1.0.0 AKTUELLE ÄNDERUNGEN
* Die Geräte-ID war zuvor die System-ID, die nicht eindeutig ist. Jetzt wird die DeviceId verwendet, dies verändert den Objektbaum
* Musiccast-API 2.0.0
* Die Gerätesuche kann jetzt mehr als 1 Gerät zurückgeben
* Neue Ausgabe für Entwickler im Admin-Panel
* mehr async/await
* Korrigierte Tests

#### 0.2.2
* Musiccast-API 0.0.14

#### 0.2.1
* Lizenz 2022
* Abhängigkeitskorrektur

#### 0.2.0
* Refactoring mit "create adapter"
* asynchron/warten

#### 0.1.5
* (Scrounger) Fehlerbehandlung, wenn Gerät nicht erreichbar ist

#### 0.1.4
* (Scrounger) Korrektur von Type Mismatch (Array-Objekt)

#### 0.1.3
* (foxthefox) Schrift für linkControl/linkAudioDelay/linkAudioQuality hinzugefügt

#### 0.1.2
* (Scrounger) Korrektur des Typ-Mismatch (string boolean)

#### 0.1.1
* Korrektur für Uhr "oneday"

#### 0.1.0
* Kompaktmodus
* yamaha-yxc-nodejs 0.0.8
* Widget-Update

#### 0.0.9
* adminV3 verwendet values2table und fügt die Schaltfläche wieder hinzu
* zone2/3/4 funktioniert jetzt
* erweiterte automatische Prüfung
* Schaltfläche im Admin-Bereich zum Sammeln von JSON-Antworten

#### 0.0.8
* Automatisches Test-Update
* Vorname auf der Admin-Seite, der im Objekt (Gerät) angezeigt wird

#### 0.0.7
* Tuner-Unterstützung
* Uhrunterstützung (hauptsächlich Informationen)
* Unterstützung von mehr Zonen
* Unterstützung von Mc-Link
* Einstellung von Min- und Max-Werten je nach Ausstattung
* Administrator v3

#### 0.0.6
* Widget-Set passend zu Objekten und Steuerung
* cd.shuffle_stat boolean -> Text
* neu netusb.shuffle_stat (Text)
* Statusaktualisierung über das Abonnieren von UDP-Nachrichten
* Schalter für Aktualisierung der Spielzeitinformationen (Deaktivieren reduziert den Datenverkehr)

#### 0.0.5
* Bereinigung auf der Admin-Seite
* Verbesserung für die Objekterstellung
* mehr Objekte auf netusb
* mehr Objekte im System
* Unterstützung für CD hinzugefügt

#### 0.0.4
* neue Objekte und Funktionen (input, sound_prog, EQ, clearVoice)
* Suche/Entdeckung auf der Admin-Seite

#### 0.0.3
* weitere Objekte implementiert

#### 0.0.2
* kleinere Korrekturen

#### 0.0.1
* Erstveröffentlichung mit Einstellung der IP in der Konfigurationsseite,
* Verfügbare Befehle Power, Mute, Volume

## Changelog
### 1.0.01
* changed algorithm for developer support

## License

The MIT License (MIT)

Copyright (c) 2017 - 2022 foxthefox <foxthefox@wysiwis.net>