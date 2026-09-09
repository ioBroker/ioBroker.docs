---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.emby/README.md
title: ioBroker.emby
hash: xU+R3riE+Sv4vrLF/hIzNfMFj0WJ+cWJLcKIUN9Hng0=
---
![Logo](../../../en/adapterref/iobroker.emby/admin/emby.png)

![GitHub-Lizenz](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.emby)
![Downloads](https://img.shields.io/npm/dm/iobroker.emby.svg)
![GitHub-Repository-Größe](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.emby)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/emby/svg-badge.svg)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.emby)
![GitHub-Commits seit der letzten Veröffentlichung (nach Datum)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.emby/latest)
![Letzter Commit auf GitHub](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.emby)
![GitHub-Probleme](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.emby)
![NPM-Version](http://img.shields.io/npm/v/iobroker.emby.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/emby-stable.svg)
![Anzahl der Installationen](https://iobroker.live/badges/emby-installed.svg)
![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.emby/actions/workflows/test-and-release.yml/badge.svg)
![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.emby/actions/workflows/codeql.yml/badge.svg)

# ioBroker.emby

</br>
**Version:** </br>
</br>
**Tests:** </br>

<!--
## Sentry
**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.**
For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.
-->

## EMBY-Adapter für ioBroker

Mit diesem Adapter können Sie eine Verbindung zu Ihrem Emby-Server herstellen und ihn steuern.

## Credits

Dieser Adapter wäre ohne die großartige Arbeit von @thewhobox <iobroker@mikegerst.de> nicht möglich gewesen, der die ersten Versionen dieses Adapters geschrieben und ihn der iobroker-community-adapters-Organisation zur Verfügung gestellt hat.

## Verwendung

Bitte befolgen Sie die Schritte, um sicherzustellen, dass der Adapter ordnungsgemäß funktioniert und Sie alle Geräte sehen können.

1. Bearbeiten Sie die Einstellungen und geben Sie die IP-Adresse, den API-Schlüssel und gegebenenfalls einige Geräte-IDs ein, die Sie ignorieren möchten.

`IP **with** Port => 192.168.0.100:8096`

2. Adapter speichern und neu starten.

3. Um die ersten Elemente zu sehen, müssen Sie einen Emby-Client öffnen, um Daten zu empfangen.

`The Adapter will not get Data if **no** client is open.`

## Objekte

### Infos

| Befehl                   | Beschreibung                                                 | Info |
| ------------------------ | ------------------------------------------------------------ | ---- |
| x.info.deviceName        | Zeigt den Namen des Geräts an                                |      |
| x.info.userName          | Zeigt den Namen des auf dem Gerät angemeldeten Benutzers an. |      |
| x.info.supportedCommands | Liste der unterstützten Befehle                              |      |

### Medien

| Befehl             | Beschreibung                          | Info                                                                  |
| ------------------ | ------------------------------------- | --------------------------------------------------------------------- |
| x.mediadescription | Beschreibung der angezeigten Datei.   |                                                                       |
| x.media.isMuted    | Wenn die Medien stummgeschaltet sind. | Nicht alle Geräte unterstützen dies, und die Antwort lautet „Falsch“. |
| x.media.state      | Zustand der Medien.                   | spielend, pausiert, im Leerlauf                                       |
| x.media.title      | Der Titel der angezeigten Datei.      |                                                                       |
| xmediatype         | Der Typ der angezeigten Datei.        | Episode, Film, Audio, Keine Angabe usw.                               |
| x.media.seasonName | Der Name der Jahreszeit               | Nur wenn .media.type den Wert Episode hat, ansonsten bleibt es leer.  |
| x.media.seriesName | Der Name der Serie                    | Nur wenn .media.type den Wert Episode hat, ansonsten bleibt es leer.  |

### Befehle

| Befehl               | Beschreibung                                                                       | Info                                                                                              |
| -------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| x.command.dialog     | Zeigen Sie einen Dialog auf dem ausgewählten Gerät an.                             | Beispiel: Header\|Etwas Text (wenn kein Header angegeben ist, wird ioBroker als Header verwendet) |
| x.command.goHome     | Sendet einen Befehl an das ausgewählte Gerät, das zum Startbildschirm zurückkehrt. |                                                                                                   |
| x.command.message    | Eine Meldung wird 5 Sekunden lang auf dem ausgewählten Gerät angezeigt.            |                                                                                                   |
| x.command.play       | Plays Media                                                                        | Nur wenn die Medienwiedergabe pausiert ist                                                        |
| x.command.pause      | Pausen Medien                                                                      | Nur wenn Medien abgespielt werden                                                                 |
| x.command.toggleplay | Schaltet den Wiedergabestatus um                                                   | Wiedergabe/Pause                                                                                  |
| x.command.mute       | Schaltet das Gerät stumm.                                                          |                                                                                                   |
| x.command.unmute     | Entstummschaltung des Geräts                                                       |                                                                                                   |
| x.command.togglemute | Schaltet die Stummschaltung des Geräts ein/aus                                     |                                                                                                   |
| x.command.volume     | Legt die Lautstärke des ausgewählten Geräts fest.                                  | Funktioniert auf den meisten Geräten nicht, da es die TV-Lautstärke nicht steuert.                |

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 1.3.0 (2026-03-03)
- (mcm1957) Adapter requires node.js >= 20 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (mcm1957) Dependencies have been updated

### 1.2.0 (2024-04-14)

* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.1.1 (2023-11-20)
-   (mcm1957) Dependencies have been updated.

### 1.1.0 (2023-11-20)
-   (mcm1957) Adapter requires nodejs 16 now.
-   (mcm1957) Adapter has been moved into iobroker-community-adapters oragnization.
-   (thewhobox) An error causing multiple 'undefined' messages has been fixed. [#23]
-   (mcm1957) Dependencies have been updated.

### 1.0.3
* Added more info for playing item

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.emby/blob/master/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
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