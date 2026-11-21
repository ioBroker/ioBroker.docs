---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.emby/README.md
title: ioBroker.emby
hash: s4A5YxBEA/iKR3cZjzRcUPoZQLhJ3hEhTFRf1RABw+4=
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
![NPM-Version](https://img.shields.io/npm/v/iobroker.emby.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/emby-stable.svg)
![Anzahl der Installationen](https://iobroker.live/badges/emby-installed.svg)
![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.emby/actions/workflows/test-and-release.yml/badge.svg)

# ioBroker.emby

</br>
**Version:** </br>
</br>
**Tests:** </br>

> \[!WICHTIG] Dieser Adapter kann nicht von GitHub installiert werden. Installieren Sie ihn über die Adapterliste in der ioBroker-Administration. Die Dateien auf GitHub enthalten lediglich den Quellcode; die Programmdateien werden erst bei der Veröffentlichung einer Version auf npm erstellt.

## Emby-Adapter für ioBroker

Verbindet ioBroker mit Ihrem [Emby-](https://emby.media) Medienserver. In ioBroker sehen Sie, was auf Ihren Emby-Apps (Fernseher, Smartphone, Tablet, Webbrowser) wiedergegeben wird und können diese steuern, zum Beispiel:

- Zeigen Sie den Titel und das Poster des aktuellen Films oder der aktuellen Folge in Ihrer Visualisierung an.
- Das Fernsehprogramm wird pausiert, wenn es an der Tür klingelt.
- Eine Nachricht im Fernsehen anzeigen („Jemand ist an der Tür“),
- Drehen Sie die Lautstärke nachts leiser.

## Credits

Dieser Adapter wäre ohne die großartige Arbeit von @thewhobox <iobroker@mikegerst.de> nicht möglich gewesen, der die ersten Versionen dieses Adapters geschrieben und ihn der iobroker-community-adapters-Organisation gespendet hat.

## Schnellstart

1. **Installieren Sie den Adapter** aus der Adapterliste in ioBroker Admin und erstellen Sie eine Instanz.
2. **Erstellen Sie einen API-Schlüssel in Emby:** Öffnen Sie die Emby-Weboberfläche, gehen Sie zu _Einstellungen (Zahnradsymbol) > Erweitert > API-Schlüssel_ , klicken Sie auf _Neuer API-Schlüssel_ (+) und geben Sie einen Namen ein, z. B. „API-Schlüssel“. `ioBroker` Kopieren Sie den Schlüssel. Ohne Schlüssel können Sie zwar sehen, was gerade abgespielt wird, aber nichts steuern.
3. **Füllen Sie die Instanzeinstellungen aus:**
   - _Adresse des Emby-Servers_ : die IP-Adresse oder der Hostname **mit Port** , z. B. `192.168.0.100:8096` Sie sehen es in der Adressleiste Ihres Browsers, wenn die Emby-Weboberfläche geöffnet ist.
   - _Sichere Verbindung (https)_ : Aktivieren Sie diese Option nur, wenn Sie Emby mit `https://` (z. B. hinter einem Reverse-Proxy).
   - _API-Schlüssel_ : Fügen Sie den Schlüssel aus Schritt 2 ein.
   - Speichern und schließen. Die Instanz wird grün, sobald sie mit dem Server verbunden ist.
4. **Öffnen Sie eine Emby-App** (TV, Smartphone, Browser) und starten Sie eine Anwendung. Innerhalb weniger Sekunden erscheint im Objektbaum unter einem Ordner ein Ordner mit dem Namen des Geräts. `emby.0` Emby meldet nur geöffnete Apps, daher wird jedes Gerät nur beim ersten Öffnen angezeigt.
5. **Verwenden Sie die Objekte** in Ihrer Visualisierung oder Ihren Skripten: Was gerade abgespielt wird, befindet sich darunter. `media`, die Tasten und Einstellungen zur Steuerung des Geräts unter `command` (siehe [Objekte](#objects) ).

Voraussetzungen: Emby Server (getestet mit 4.10), den ioBroker erreichen kann, Node.js 22.19 oder neuer, js-controller 6.0.11 oder neuer, Admin 7.7.22 oder neuer.

## Einstellungen

| Einstellung                                | Was es tut                                                                                                                                                                                                                                                         | Empfehlung                                                                                |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| Adresse des Emby-Servers                   | IP-Adresse oder Hostname des Emby-Servers mit Port                                                                                                                                                                                                                 | z.B `192.168.0.100:8096`                                                                   |
| Sichere Verbindung (https)                 | Verbindet sich mit https statt http                                                                                                                                                                                                                                | Nur wenn Sie Emby öffnen mit `https://`                                                    |
| API-Schlüssel                              | Ermöglicht ioBroker die Steuerung Ihrer Emby-Anwendungen. Verschlüsselte Speicherung.                                                                                                                                                                              | Immer eins eingeben                                                                       |
| Zu ignorierende Geräte                     | Geräte, die in ioBroker nicht angezeigt werden sollen, durch Kommas getrennt. Geben Sie den Ordnernamen unter ein. `emby.0` (oder der Wert von `info.deviceId` Bereits erstellte Ordner können dann im Objektbaum gelöscht werden.                                   | Leer lassen                                                                               |
| Verzögerung vor "pausiert" / "im Leerlauf" | Wenn die Wiedergabe stoppt, `media.state` Es wartet so lange, bevor es sich ändert. Zwischen zwei Episoden bleibt der Zustand dann bestehen. `playing` statt zu flackern.                                                                                            | 500 ms; erhöhen (z. B. 3000), falls der Zustand zwischen den Episoden weiterhin flackert. |
| Aktualisierungsintervall                   | Wie oft fragt ioBroker den Server nach dem aktuellen Status aller Geräte ab? Emby meldet Änderungen ohnehin sofort; dadurch bleibt die Kontrolle erhalten. `info.lastActivity` muss auf dem neuesten Stand sein und wird für die automatische Bereinigung benötigt. | 60er Jahre                                                                                |
| In Emby gelöschte Geräte entfernen         | Wenn Sie ein Gerät in Emby löschen ( _Einstellungen > Geräte_ ), wird auch dessen Ordner in ioBroker entfernt.                                                                                                                                                     | An                                                                                        |
| Entfernen Sie inaktive Geräte nach (Tagen) | Entfernt die Ordner von Geräten, die seit so vielen Tagen nicht mehr verwendet wurden, z. B. alte Handys oder Browser. Skripte und Verlaufseinstellungen dieser Geräte gehen dabei verloren.                                                                       | 0 (nie); z. B. 90, wenn sich viele alte Geräte ansammeln                                  |

## Geräte in ioBroker

Jede Emby-App erhält ihren eigenen Ordner unter `emby.0` Der Ordnername wird von der Geräte-ID abgeleitet, die Emby der App zuweist, und bleibt daher nach Neustarts und erneuten Verbindungen unverändert. Der angezeigte Ordnername entspricht dem Gerätenamen in Emby; Sie können ihn in Emby unter _Einstellungen > Geräte_ ändern.

- Mehrere Browser-Tabs mit Emby zählen als ein Gerät.
- Ausgeschaltete Geräte behalten ihren Ordner bei `info.online = false` Skripte und Visualisierungen funktionieren somit weiterhin. Sie werden wie in [den Einstellungen](#settings) beschrieben entfernt oder können manuell gelöscht werden.
- Lange Geräte-IDs (z. B. von Webbrowsern) werden auf einen 16-stelligen Code verkürzt.

### Upgrade von Version 2.x auf 3.0.0

Bis Version 2.x entsprachen die Ordnernamen den Emby-Sitzungs-IDs, die sich bei einer erneuten App-Verbindung ändern. Ab Version 3.0.0 werden sie von der Geräte-ID abgeleitet. Vorhandene Objekte werden beim ersten Start (Version 2.x) bzw. bei der nächsten Nutzung der App (Version 1.3.0) automatisch verschoben, einschließlich Werten, Verlaufseinstellungen und Raum-/Funktionszuweisungen. Skripte, Visualisierungen und Aliase, die die alten IDs verwenden, müssen angepasst werden; das Protokoll zeigt dies an. `Migrated objects of "…" from <old id> to <new id>` Für jedes Gerät. Bereits aufgezeichnete Verlaufsdaten bleiben unter den alten IDs erhalten.

## Objekte

Die Tabellen dienen als Referenz für Skripte und Visualisierungen. `x` steht für den Ordner eines Geräts.

### Adapter

| Objekt                    | Beschreibung                                                                      |
| ------------------------- | --------------------------------------------------------------------------------- |
| Info-Verbindung           | `true` solange die WebSocket-Verbindung zum Server geöffnet ist                   |
| Servername                | Name des Emby-Servers                                                             |
| server.version            | Version des Emby-Servers                                                          |
| server.updateAvailable    | `true` wenn ein Serverupdate verfügbar ist                                        |
| Serverneustart ausstehend | `true` wenn der Server neu gestartet werden muss (z. B. nach einem Plugin-Update) |
| server.refreshLibrary     | Schaltfläche: Durchsucht alle Bibliotheken                                        |

Die Serverzustände werden alle 10 Minuten ausgelesen und benötigen den API-Schlüssel.

### Info

| Objekt                   | Beschreibung                                          | Info                                                                                                                                                    |
| ------------------------ | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| x.info.online            | Die Sitzung wird aktuell vom Server gemeldet.         | `false` nachdem der Client geschlossen oder ausgeschaltet wurde                                                                                         |
| x.info.deviceId          | Emby-Geräte-ID des Clients                            |                                                                                                                                                         |
| x.info.sessionId         | Aktuelle Emby-Sitzungs-ID                             | Änderungen beim erneuten Verbinden des Clients                                                                                                          |
| x.info.deviceName        | Name des Geräts                                       |                                                                                                                                                         |
| x.info.userName          | Name des Benutzers, der auf dem Gerät angemeldet ist  |                                                                                                                                                         |
| x.info.supportedCommands | Vom Client unterstützte Befehle (JSON-Array)          |                                                                                                                                                         |
| x.info.lastActivity      | Zeitpunkt der letzten vom Server gemeldeten Aktivität | Zeitstempel (ms). Emby speichert Sitzungen geschlossener Clients eine Zeit lang, daher zeigt dieser Wert an, ob ein Client tatsächlich in Gebrauch ist. |

### Medien

| Objekt                | Beschreibung                                | Info                                                                                                                   |
| --------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| x.media.state         | Zustand des Mandanten                       | `playing`, `paused`, `idle`                                                                                            |
| x.media.title         | Titel des Artikels                          |                                                                                                                        |
| x.media.originaltitle | Originaltitel                               |                                                                                                                        |
| x.media.description   | Artikelbeschreibung                         |                                                                                                                        |
| xmediatype            | Art des Artikels                            | `Episode`, `Movie`, `Audio`, `None`, …                                                                                |
| x.media.seriesName    | Name der Serie                              | Nur für Episoden, ansonsten leer                                                                                       |
| x.media.seasonName    | Name der Jahreszeit                         | Nur für Episoden, ansonsten leer                                                                                       |
| x.media.endtime       | Voraussichtliches Ende der Wiedergabe       | `HH:MM`                                                                                                                |
| x.media.elapsed       | Wiedergabeposition in Sekunden              | `null` Falls unbekannt, meldet Emby die Position nur bei Änderungen (Start, Pause, Suche) und mit der Sitzungsabfrage. |
| x.media.duration      | Dauer des Elements in Sekunden              | `null` falls unbekannt                                                                                                 |
| x.media.rating        | Community-Bewertung                         | `null` falls unbekannt                                                                                                 |
| x.media.agerating     | Offizielle Altersfreigabe                   |                                                                                                                        |
| x.media.year          | Produktionsjahr                             | `null` falls unbekannt                                                                                                 |
| x.mediagenres         | Genres (durch Komma getrennt)               |                                                                                                                        |
| x.media.tags          | Slogans (durch Komma getrennt)              |                                                                                                                        |
| x.media.backdropimage | Hintergrundbild-Tags (durch Komma getrennt) |                                                                                                                        |
| x.media.ratio         | Seitenverhältnis des Hauptbildes            | `null` falls unbekannt                                                                                                 |
| x.media.isMuted       | Der Client ist stummgeschaltet.             | Nicht alle Kunden melden dies.                                                                                         |

### Poster

| Objekt            | Beschreibung                           | Info             |
| ----------------- | -------------------------------------- | ---------------- |
| x.posters.main    | URL des Hauptplakats (Film oder Serie) |                  |
| x.posters.season  | URL des Saisonplakats                  | Nur für Episoden |
| x.posters.episode | URL des Episodenbildes                 | Nur für Episoden |

### Befehle

Nur für Clients erstellt, die Fernsteuerung unterstützen, und nur für Befehle, die der Client meldet.

| Objekt                   | Beschreibung                                                                      | Info                                                                                                                                                                  |
| ------------------------ | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| x.command.play           | Wiedergabe fortsetzen                                                             | Taste                                                                                                                                                                 |
| x.command.pause          | Wiedergabe pausieren                                                              | Taste                                                                                                                                                                 |
| x.command.toggleplay     | Wiedergabe/Pause umschalten                                                       | Taste                                                                                                                                                                 |
| x.command.stop           | Wiedergabe stoppen                                                                | Taste                                                                                                                                                                 |
| x.command.next           | Nächster Eintrag (Folge, Titel)                                                   | Taste                                                                                                                                                                 |
| x.command.previous       | Vorheriger Eintrag                                                                | Schaltfläche. Die iOS-App kehrt erst dann zuverlässig zurück, nachdem das Element einige Minuten lang abgespielt wurde (siehe [Getestete Clients](#tested-clients) ). |
| x.command.seek           | Wiedergabeposition in %                                                           | Zeigt auch die aktuelle Position an; geben Sie einen Wert zwischen 0 und 100 ein, um dorthin zu springen.                                                             |
| x.command.generalCommand | Senden Sie einen beliebigen allgemeinen Befehl der Emby-API.                      | JSON, z. B. `{"Name": "SetSubtitleStreamIndex", "Arguments": {"Index": 2}}` Die vom Client unterstützten Namen sind in `info.supportedCommands`                         |
| x.command.mute           | Stumm                                                                             | Taste                                                                                                                                                                 |
| x.command.unmute         | Stummschaltung aufheben                                                           | Taste                                                                                                                                                                 |
| x.command.togglemute     | Stummschaltung umschalten                                                         | Taste                                                                                                                                                                 |
| x.command.goHome         | Zum Startbildschirm wechseln                                                      | Taste                                                                                                                                                                 |
| x.command.goToSearch     | Suche öffnen                                                                      | Taste                                                                                                                                                                 |
| x.command.back           | Zurück                                                                            | Taste                                                                                                                                                                 |
| x.command.volume         | Band 0-100                                                                        | Zeigt außerdem die vom Client gemeldete aktuelle Lautstärke an. Die Android-TV-Apps ändern die Lautstärke nicht (siehe [Getestete Clients](#tested-clients) ).        |
| x.command.message        | Zeigen Sie eine kurze Nachricht an                                                | Text. Die Apps zeigen ihn nur für etwa 2-3 Sekunden an. Für wichtige Nachrichten verwenden Sie `command.dialog`                                                        |
| x.command.dialog         | Zeigen Sie einen Dialog an, der so lange angezeigt wird, bis er geschlossen wird. | `Header\|Text`, ohne `\|` Der Header lautet "ioBroker"                                                                                                                |

## Nachrichten von Skripten (sendTo)

Zeigt eine Nachricht auf einem Client an, z. B. wenn die Türklingel klingelt:

```js
sendTo('emby.0', 'message', {
    text: 'Someone is at the door',
    header: 'Doorbell', // optional, default "ioBroker"
    timeoutMs: 10000, // optional; without it the message stays until it is closed (recommended)
    device: 'Living room TV', // optional: device name, object ID, device ID or session ID; without it all connected clients that can show messages
}, result => log(JSON.stringify(result))); // { result: 'ok', sent: ['<object id>', ...] } or { error: '...' }
```

Eine einfache Zeichenkette wird ebenfalls akzeptiert: `sendTo('emby.0', 'message', 'Hello')` Die

Wie lange eine Nachricht angezeigt wird, entscheidet die App: mit `timeoutMs` Alle getesteten Apps zeigten es nur für etwa 2-3 Sekunden an, unabhängig vom Wert. Ohne `timeoutMs` Die Meldung bleibt so lange sichtbar, bis sie geschlossen wird (im Webclient als Popup). Bei einer Türklingel lassen Sie bitte Folgendes weg: `timeoutMs` Die

## Getestete Kunden

Der Adapter sendet dieselben Befehle an alle Clients; was dann passiert, hängt von der Emby-Anwendung ab. Getestet mit Emby Server 4.10.2:

|                                                             | Webclient (Firefox) | Android-Smartphone | iPad (iOS)                                                                                          | Android TV (NVIDIA Shield, Fire TV)          |
| ----------------------------------------------------------- | ------------------- | ------------------ | --------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| Wiedergabe, Pause, Stopp, Suche, Nächste                    | ✓                   | ✓                  | ✓                                                                                                   | ✓                                            |
| Vorherige                                                   | ✓                   | ✓                  | Erst nach einigen Minuten Wiedergabe, andernfalls startet die App das Element neu oder springt vor. | ✓ (getestet nach wenigen Minuten Wiedergabe) |
| Lautstärke, Stummschaltung                                  | ✓                   | ✓                  | ✓                                                                                                   | – (keine Wirkung)                            |
| Nachricht mit Anzeigezeit (`command.message`, `timeoutMs`) | etwa 2-3 Sekunden   | etwa 2-3 Sekunden  | etwa 2-3 Sekunden                                                                                   | etwa 2-3 Sekunden                            |
| Dialog (`command.dialog`, Nachricht ohne `timeoutMs`)      | ✓ (Popup)           | ✓                  | ✓                                                                                                   | ✓                                            |

Webbrowser können die Wiedergabe blockieren, die ohne Klick im Tab gestartet wird (Autoplay).

## Probleme?

| Problem                                                                 | Lösung                                                                                                                                                                                                    |
| ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Der Status bleibt rot/gelb.                                             | Überprüfen Sie Adresse und Port (offen). `http://<address>` in einem Browser im selben Netzwerk) und der Einstellung _für sichere Verbindungen_ . Das Protokoll der Instanz zeigt den Grund.               |
| Es wird kein Gerät angezeigt                                            | Emby meldet nur geöffnete Apps. Öffnen Sie eine Emby-App oder die Weboberfläche und starten Sie eine Anwendung. Prüfen Sie, ob das Gerät nicht in der _Liste der zu ignorierenden Geräte aufgeführt_ ist. |
| Es gibt kein `command` Ordner / Schaltflächen haben keine Funktion       | Geben Sie einen API-Schlüssel ein. Einige Apps unterstützen die Fernsteuerung überhaupt nicht; die von einer App unterstützten Befehle sind aufgelistet in `info.supportedCommands` Die                    |
| Lautstärke und Stummschaltung haben keine Auswirkung auf den Fernseher. | Die Emby-Apps für Android TV (NVIDIA Shield, Fire TV) ignorieren diese Befehle, siehe [Getestete Clients](#tested-clients) .                                                                              |
| Eine Nachricht verschwindet nach 2-3 Sekunden.                          | Das entscheidet die App. `command.dialog` oder `sendTo` ohne `timeoutMs` Siehe [Meldungen von Skripten](#messages-from-scripts-sendto) .                                                                     |
| `media.state` springt zu `idle` zwischen zwei Episoden                   | _Verzögerung vor "Pausiert" / "Leerlauf"_ erhöhen.                                                                                                                                                        |
| Alte Geräte stapeln sich                                                | Löschen Sie sie in Emby ( _Einstellungen > Geräte_ ) oder stellen Sie ein _, dass inaktive Geräte nach (Tagen) entfernt werden sollten_ .                                                                 |

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 3.1.2 (2026-11-17)
- (Schimi1983) Repository checker suggestions: @iobroker/testing updated to 6.3.2, .vscode/settings.json with JSON schemas added
- (Schimi1983) README rewritten for users without technical background (quick start, settings with recommendations, problem solving); texts of the settings page made clearer in all languages

### 3.1.1 (2026-11-04)
- (Schimi1983) Roles of existing states corrected to the official ioBroker state roles (e.g. button.play, media.genre, media.cover, text); object IDs and values are unchanged

### 3.1.0 (2026-11-03)
- (GermanBluefox) Repository maintenance: added email to copyright line in README and LICENSE (#330)
- (Schimi1983) New commands stop, next, previous, seek (in %) and generalCommand; new states media.elapsed and media.duration
- (Schimi1983) New server states (name, version, update available, restart pending) and button to scan all libraries
- (Schimi1983) Messages can be sent from scripts with sendTo('emby.0', 'message', {...})

### 3.0.0 (2026-10-29)
- (Schimi1983) **BREAKING:** Clients are identified by the Emby device ID instead of the session ID, so the object IDs no longer change when a client reconnects. Existing objects including values, history settings and room/function assignments are migrated automatically; scripts and visualisations using the old IDs have to be adjusted (see README)
- (Schimi1983) New states info.deviceId and info.sessionId; several sessions of one client (e.g. browser tabs) are shown as one device
- (Schimi1983) Objects that older versions created for ioBroker connections (other instances, version 1.3.0) are removed and no longer created
- (Schimi1983) Integration test against a mock Emby server added

### 2.0.0 (2026-10-29)
- (copilot) Adapter requires node.js >= 22.19.0 now
- (Schimi1983) Connection is re-established after the server closes it (e.g. server restart), KeepAlive is sent, info.connection reflects the real state
- (Schimi1983) Only "Sessions" messages are processed as sessions, invalid messages no longer cause errors
- (Schimi1983) Fixed command.volume (always failed), command.unmute is created for clients reporting "Unmute"
- (Schimi1983) Messages and dialogs with quotes or line breaks work now
- (Schimi1983) Commands use https if SSL is enabled, API key is sent as header and no longer logged
- (Schimi1983) API key is stored encrypted, an existing key is converted automatically (one restart)
- (Schimi1983) New states info.online and info.lastActivity per session; sessions that disappear are reset to idle
- (Schimi1983) Current sessions are read via REST right after connecting, the server pushes them only on the next change
- (Schimi1983) Sessions are polled every 60 s (configurable) to keep info.lastActivity current
- (Schimi1983) Optional cleanup: objects of clients deleted in Emby (default on) or inactive for a configurable number of days (default off) are removed
- (Schimi1983) Object types of buttons fixed, empty numbers are written as null, states are only written on change
- (Schimi1983) Dependencies "request" and "websocket" replaced by native fetch and WebSocket
- (Schimi1983) API key is entered in a password field
- (Schimi1983) The adapter no longer shows up as its own device, it connects with a device ID per instance
- (Schimi1983) Objects of an old session are removed when the same client connects with a new session ID
- (Schimi1983) Command states are created as soon as a client reports remote control support, not only on adapter start
- (Schimi1983) Device names follow the display name set in the Emby dashboard; REST calls use the adapter's device ID so they do not appear as an extra client
- (Schimi1983) README updated: configuration, all objects, broken CodeQL badge removed
- (Schimi1983) Admin UI migrated to jsonConfig (based on #275), API key is entered in a password field, short-form i18n files
- (GermanBluefox) Dependencies updated (@iobroker/adapter-core 3.4.3)
- (GermanBluefox) Package content defined via "files" in package.json, tsconfig added for type checking
- (GermanBluefox) The adapter was refactored to TypeScript

## License

MIT License

Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2020-2023 thewhobox <admin@mikegerst.de>

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