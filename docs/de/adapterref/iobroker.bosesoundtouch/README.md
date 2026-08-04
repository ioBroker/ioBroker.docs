---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.bosesoundtouch/README.md
title: ioBroker.bosesoundtouch
hash: tRUq1CtamiFkHWUlCmVlUJHHrhkrWRQqGJrM8+mYHvU=
---
![Logo](../../../en/adapterref/iobroker.bosesoundtouch/admin/bosesoundtouch.png)

![Anzahl der Installationen](http://iobroker.live/badges/bosesoundtouch-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.bosesoundtouch.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.bosesoundtouch.svg)

# IoBroker.bosesoundtouch
![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.bosesoundtouch/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/bosesoundtouch/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Bose SoundTouch Adapter für die ioBroker IoT-Plattform

## Kontrollzustände
Zur Steuerung Ihres Lautsprechers können folgende Objekte geschrieben werden:

| Bundesland | Beschreibung |
| :---           | :---        |
| Schlüssel | Einer der folgenden Schlüssel zum Senden:<br><br> SPIELEN<br> PAUSE<br> STOPPEN<br> VORHERIGER TRACK<br> NÄCHSTER TRACK<br> DAUMEN HOCH<br> DAUMEN RUNTER<br> LESEZEICHEN<br> LEISTUNG<br> STUMM<br> LAUTSTÄRKE_UP<br> LAUTSTÄRKE_LEISER<br> VOREINSTELLUNG_1<br> VOREINSTELLUNG_2<br> VOREINSTELLUNG_3<br> VOREINSTELLUNG_4<br> VOREINSTELLUNG_5<br> VOREINSTELLUNG_6<br> AUX_INPUT<br> ZUFALLSPASS_AUS<br> ZUFALLSFUNKTION AN<br> WIEDERHOLUNG AUS<br> WIEDERHOLEN_EINS<br> ALLE WIEDERHOLEN<br> Wiedergabe/Pause<br> HINZUFÜGEN_ZU_FAVORITEN<br> FAVORITEN ENTFERNEN<br> UNGÜLTIGER_SCHLÜSSEL |
| stummgeschaltet | Gerät stummschalten oder Stummschaltung aufheben. |
| ein | Gerät ein- oder ausschalten. |
| überall abspielen | Definieren Sie einen Lautsprecher als Zonenmaster und geben Sie dessen Inhalte auf allen anderen Lautsprechern wieder. |
| Lautstärke | Ändern Sie die Gerätelautstärke zwischen 0 und 100. |
| Livestream | Spielen Sie direkt einen HTTP/HTTPS-Audio-Livestream ab. Z. B. http://liveradio.swr.de/sw282p3/swr3/play.mp3 |

## Info-Staaten
Folgende Informationen werden von Ihrem Lautsprecher (schreibgeschützter Zustand) erfasst:

### Geräteinformationen
| Bundesland | Beschreibung |
| :---       | :---        |
| ipAddress | Die IP-Adresse des Geräts, normalerweise dieselbe, die Sie in den Adaptereinstellungen konfiguriert haben. |
| macAddress | Die MAC-Adresse des Geräts |
| Name | Der Name, den Sie in Ihrer SoundTouch App konfiguriert haben. |
| Typ | Der Gerätetyp (z. B. SoundTouch 300). |

### Aktuell läuft
| Bundesland | Beschreibung |
| :---       | :---        |
| Album | Das aktuell abgespielte Album. |
| Kunst | Die URL des Quellbildes. |
| Künstler | Der aktuell spielende Künstler. |
| Genre | Das Genre des aktuell abgespielten Titels. |
| Quelle | Die Art oder der Name des wiedergegebenen Dienstes. Um festzustellen, ob sich das Produkt im Standby-Modus befindet, prüfen Sie, ob Quelle == STANDBY. |
| Sender | Der Name des Senders oder der Playlist. |
| Titel | Der aktuell abgespielte Titel. |

### Voreinstellungen
Für jede der 6 verfügbaren Voreinstellungen sind folgende Zustände vorhanden:

| Bundesland | Beschreibung |
| :---       | :---        |
| iconUrl | Die URL des Quellbildes. |
| Name | Der Name des Albums, Senders, der Playlist, des Liedes, der Telefonnummer usw., abhängig von der Quelle. |
| Quelle | Die Art oder der Name des Dienstes. |

### Zonen
Die folgende Beschreibung hilft Ihnen beim Erstellen von Gruppen in Ihrem Multiroom-System. Die schreibgeschützten Felder werden von den SoundTouch-Geräten automatisch aktualisiert, auch wenn Sie die Gruppen über die SoundTouch-App ändern.

| Bundesland | Beschreibung |
| :---       | :---        |
| masterOf | Zeigt die MAC-Adressen der Slaves eines Lautsprechers an (getrennt durch ";") (schreibgeschützt) |
| memberOf | Zeigt die MAC-Adresse des Masters dieses Lautsprechers an (schreibgeschützt)|
| addMasterOf| MAC-Adresse des Lautsprechers hinzufügen, den Sie diesem Master-Lautsprecher hinzufügen möchten. Es ist auch möglich, mehrere Lautsprecher hinzuzufügen (getrennt durch ";").|
| removeMasterOf| Geben Sie die MAC-Adresse des Lautsprechers ein, den Sie von diesem Master-Lautsprecher entfernen möchten. Es können auch mehrere Lautsprecher angegeben werden (getrennt durch ";").|

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.13.0 (2026-07-11)
- (JR-home) Control objects have been extended to suppiort playing a livestream directly
- (mcm1957) Deprecated delete state has been migrated.
- (mcm1957) Dependencies have been updated

### 0.12.0 (2026-05-09)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (mcm1957) Dependencies have been updated
- (copilot) Migrated to ESLint 9 and @iobroker/eslint-config following ioBroker community standards

### 0.11.1 (2024-04-03)
* (mcm1957) Release workflow has been fixed

### 0.11.0 (2024-04-03)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Testing has been changed to support node 18 and 20
* (mcm1957) Dependencies have been updated

### 0.10.3 (2022-06-17)
* (Apollon77) Fix crash case reported by Sentry

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2019-2022 SwedishChef <swedish.chef@gmx.at>

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