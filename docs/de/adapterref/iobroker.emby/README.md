---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.emby/README.md
title: ioBroker.emby
hash: INRdcmfwjy/KRgXm0pGzm0o8bpzqAigeg04Yz3xEbbQ=
---
![Logo](../../../en/adapterref/iobroker.emby/admin/emby.png)

![GitHub-Lizenz](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.emby)
![Downloads](https://img.shields.io/npm/dm/iobroker.emby.svg)
![GitHub-Repo-Größe](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.emby)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.emby)
![GitHub-Commits seit der letzten Veröffentlichung (nach Datum)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.emby/latest)
![GitHub letzter Commit](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.emby)
![GitHub-Probleme](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.emby)
![NPM-Version](http://img.shields.io/npm/v/iobroker.emby.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/emby-stable.svg)
![Anzahl der Installationen](https://iobroker.live/badges/emby-installed.svg)

# IoBroker.emby
[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/emby/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br> </br> **Version:** </br> </br> **Tests:** </br> [![Test und Veröffentlichung](https://github.com/iobroker-community-adapters/ioBroker.emby/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.emby/actions/workflows/test-and-release.yml) [![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.emby/actions/workflows/codeql.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.emby/actions/workflows/codeql.yml)

<!--

## Sentry **Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.
->
## EMBY-Adapter für ioBroker
Mit diesem Adapter können Sie eine Verbindung zu Ihrem Emby-Server herstellen und ihn steuern.

## Credits
Dieser Adapter wäre ohne die großartige Arbeit von @thewhobox <iobroker@mikegerst.de> nicht möglich gewesen, der die ersten Versionen dieses Adapters geschrieben und an die Organisation iobroker-community-adapters übergeben hat.

## Verwendung
Bitte befolgen Sie die Schritte, um sicherzustellen, dass der Adapter ordnungsgemäß funktioniert und Sie alle Geräte sehen können.

1. Bearbeiten Sie die Einstellungen und geben Sie die IP, den ApiKey und möglicherweise einige DeviceIds ein, die Sie ignorieren möchten.

```IP **with** Port => 192.168.0.100:8096```

2. Speichern Sie den Adapter und starten Sie ihn neu.

3. Um die ersten Elemente zu sehen, müssen Sie einen Emby-Client öffnen, um einige Daten zu erhalten.

```The Adapter will not get Data if **no** client is open.```

## Objekte
### Infos
| Befehl | Beschreibung | Infos |
| ------------- | ------------- | ------------- |
| x.info.Gerätename | Zeigt den Namen des Geräts | an |
| x.info.userName | Zeigt den Namen des am Gerät angemeldeten Benutzers | an |
| x.info.supportedCommands | Liste der unterstützten Befehle | |

### Medien
| Befehl | Beschreibung | Infos |
| ------------- | ------------- | ------------- |
| x.media.description | Beschreibung der angezeigten Datei. | |
| x.media.isMuted | Wenn Medien stummgeschaltet sind. | Dies wird nicht von allen Geräten unterstützt und ist „Falsch“. |
| x.media.state | Stand der Medien. | spielt, pausiert, untätig |
| x.media.title | Der Titel der angezeigten Datei. | |
| x.media.type | Der Typ der angezeigten Datei. | Episode, Film, Audio, Keine usw. |
| x.media.seasonName | Der Name der Saison | Nur wenn .media.type Episode ist, andernfalls ist es leer. |
| x.media.seriesName | Der Name der Serie | Nur wenn .media.type Episode ist, andernfalls ist es leer. |

### Befehle
| Befehl | Beschreibung | Infos |
| ------------- | ------------- | ------------- |
| x.command.dialog | Zeigt einen Dialog auf dem ausgewählten Gerät an. | Zum Beispiel: Header\|Einiger Text (wenn kein Header angegeben ist, wird ioBroker Header sein) |
| x.command.goHome | Sendet einen Befehl an das ausgewählte Gerät, das zum Startbildschirm | zurückkehrt |
| x.command.message | Zeigt 5 Sekunden lang eine Nachricht auf dem ausgewählten Gerät an. | |
| x.command.play | Spielt Medien ab | Nur wenn Medien angehalten sind |
| x.command.pause | Pausiert Medien | Nur wenn Medien abgespielt werden |
| x.command.toggleplay | Schaltet den Playstatus um | abspielen/pausieren |
| x.command.mute | Schaltet das Gerät stumm | |
| x.command.unmute | Hebt die Stummschaltung des Geräts auf | |
| x.command.togglemute | Schaltet die Stummschaltung des Geräts um | |
| x.command.volume | Legt die Lautstärke des ausgewählten Geräts fest. | Funktioniert auf den meisten Geräten nicht, da die TV-Lautstärke nicht gesteuert wird. |

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.1.1 (2023-11-20)
-   (mcm1957) Dependencies have been updated.

### 1.1.0 (2023-11-20)
-   (mcm1957) Adapter requires nodejs 16 now.
-   (mcm1957) Adapter has been moved into iobroker-community-adapters oragnization.
-   (thewhobox) An error causing multiple 'undefined' messages has been fixed. [#23]
-   (mcm1957) Dependencies have been updated.

### 1.0.3
* Added more info for playing item

### 1.0.0
* First stable public release
* Added support for Https and Http
* Added Url to Posters
* Added Datapoint for Endtime (hh:mm)

### 0.1.2
* Added more commands

### 0.1.1
* Added delay if you watch mor episodes

### 0.1.0
* Added automatic try reconnect after one minute

### 0.0.4
* added compact mode

### 0.0.3
* added new states, connection state and more improvment

### 0.0.2
* added more states
* added DisplayMessage

### 0.0.1
* Initial version

## License

MIT License

Copyright (c) 2023 iobroker-community-adapters
Copyright (c) 2020-2023 thewhobox

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