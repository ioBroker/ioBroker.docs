---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.dune-hd-remote/README.md
title: ioBroker.dune-hd-remote
hash: hrNpuqf2X/dmmuNWLYcD1naPNozwZxs6BsIZSo1qtoE=
---
# IoBroker.dune-hd-remote
![Logo](../../../en/adapterref/iobroker.dune-hd-remote/admin/dune-hd-remote.png)

Steuern Sie [Dune HD](https://dune-hd.com/) Mediaplayer über das IP-Netzwerk von ioBroker aus.

[Dune HD](https://dune-hd.com/) produziert hochwertige Netzwerk-Mediaplayer, die 4K-HDR-Wiedergabe, Blu-ray und eine Vielzahl weiterer Medienformate unterstützen. Alle Linux-basierten Dune HD-Player unterstützen die IP-Steuerung über die HTTP-API, die dieser Adapter nutzt, um die vollständige Fernsteuerung über ioBroker zu ermöglichen.

## Merkmale
- Volle Wiedergabesteuerung (Wiedergabe, Pause, Stopp, Suche, vorheriger/nächster Titel, Vor-/Zurückspulen)
- Navigation (Steuerkreuz, Eingabetaste, Return-Taste, Menüs)
- Lautstärke- und Stummschaltungsregelung
- Statusabfrage (Playerstatus, Position, Dauer, Lautstärke, Bitrate, Audiosprache, Videoauflösung)
- Integrierte PWA-Webfernbedienung – nutzen Sie Ihr Smartphone als Fernbedienung
- Intelligente Offline-Abfrage – reduziert die Abfragehäufigkeit, wenn der Spieler nicht erreichbar ist
- PWA-Texteingabe – Text direkt an die Bildschirmtastatur des Spielers senden
- PWA-Wiedergabe-URL – Starten Sie die Medienwiedergabe von jeder beliebigen URL direkt von der Fernbedienung aus.

## Unterstützte Modelle
Alle Dune HD Mediaplayer mit IP-Steuerungsunterstützung (Linux-basierte Firmware).
Getestet auf: **Dune HD Pro 4K** (Firmware mit XML-Antwortformat).

| Modelltyp | Standardanschluss |
|---|---|
| Linux-basiert (Pro 4K, Solo 4K usw.) | 80 |
| Android/ATV-basiert | 11080 |

## Konfiguration
### Spieler
| Feld | Beschreibung |
|---|---|
| Spielername | Anzeigename (nur zur Information) |
| Player-IP-Adresse | IP-Adresse des Dune HD-Players |
| Player-Port | HTTP-Port (Standard: 80) |
| Verbindungstimeout | Anfragetimeout in ms (Standard: 5000) |

### Statusabfrage
| Feld | Beschreibung |
|---|---|
| Statusabfrage aktivieren | Regelmäßige Statusaktualisierungen aktivieren |
| Abfrageintervall | Intervall in Sekunden, wenn der Spieler online ist (Standard: 5) |
| Offline-Abfrageintervall | Intervall in Sekunden, wenn der Spieler nicht erreichbar ist (Standard: 30) |

### PWA-Fernsteuerung
Aktivieren Sie die integrierte Webfernbedienung, um den Player von jedem Browser oder Mobilgerät aus zu steuern.

| Feld | Beschreibung |
|---|---|
| PWA-Fernsteuerung aktivieren | Integrierten Webserver starten |
| IP-Adresse binden | Netzwerkschnittstelle, an die gebunden werden soll (0.0.0.0 = alle Schnittstellen) |
| PWA-Server-Port | Port für die Webfernbedienung (Standard: 8765) |

Nach der Aktivierung öffnen Sie `http://<iobroker-host>:8765/` in Ihrem Browser.

Die URL wird auch im Zustand `info.pwaUrl` gespeichert.

**PWA-Funktionen:**

- Hauptregisterkarte: Steuerkreuz, Wiedergabesteuerung, Lautstärke, Suchfunktion
- Hauptregisterkarte: Texteingabefeld — sendet Text an die Tastatur des aktiven Spielers (`set_text` API)
- Hauptregisterkarte: Feld „Wiedergabe-URL“ – startet die Medienwiedergabe von einer beliebigen URL (`launch_media_url`-API)
- Registerkarte „Ziffern“: Zifferntasten, Farbtasten (A/B/C/D), Untertitel, Zoom, Auswurf, Aufnahme
- Registerkarte „Einstellungen“: Dunkles/Helles Design, Verbindungseinstellungen
- Funktioniert als installierbare PWA auf iOS und Android (Zum Startbildschirm hinzufügen)

### Dune Notify Plugin
Benachrichtigungen von ioBroker werden während der Videowiedergabe **über dem Video** angezeigt.
Hierfür muss das PHP-Plugin **dune-notify** auf dem Player installiert sein (siehe Ordner `dune-notify/`).

| Feld | Beschreibung |
|---|---|
| Benachrichtigungen aktivieren | Die Dune-Notify-Integration aktivieren |
| Benachrichtigung bei Anforderungs-Timeout | HTTP-Anforderungs-Timeout in ms (Standard: 3000) |

## Staaten
| Bundesland | Typ | Beschreibung |
|---|---|---|
| `info.connection` | boolescher Wert | Spieler erreichbar |
| `info.playerModel` | Zeichenkette | Spielermodellname |
| `info.firmwareVersion` | Zeichenkette | Firmware-Version |
| `status.playerStatus` | Zeichenkette | Wiedergabe / gestoppt / pausiert |
| `status.position` | Nummer | Wiedergabeposition (Sekunden) |
| `status.duration` | Nummer | Gesamtdauer (Sekunden) |
| `status.volume` | Nummer | Lautstärkepegel |
| `status.mute` | boolescher Wert | Stummschaltungszustand |
| `status.caption` | Zeichenkette | Aktueller Medientitel |
| `status.audioLang` | Zeichenkette | Audiosprache |
| `status.videoWidth/Height` | Nummer | Videoauflösung |
| `status.bitrate` | Nummer | Aktuelle Bitrate (Bit/s) |
| `control.play/pause/stop` | Boolescher Wert | Wiedergabeaktionen auslösen |
| `control.volume` | Nummer | Lautstärke einstellen |
| `navigation.up/down/left/right/ok/back` | Boolescher Wert | Navigationsschaltflächen |
| `media.playUrl` | Zeichenkette | Medien von URL abspielen |
| `media.seek` | Nummer | Position anvisieren (Sekunden) |
| `notify.send` | Zeichenkette | Benachrichtigung senden (Text oder JSON) |
| `notify.hide` | Boolescher Wert | Aktuelle Benachrichtigung ausblenden |
| `notify.lastResult` | Zeichenkette | Ergebnis der letzten Benachrichtigungsanfrage |
| `notify.lastResult` | Zeichenkette | Ergebnis der letzten Benachrichtigungsanfrage |

## Changelog

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 1.2.1
- Fix E8915: add dependabot cooldown (7 days) to reduce supply chain risk
- Fix deploy step: use Node.js 24 for trusted publishing compatibility
- Remove redundant `eslint` and `prettier` devDependencies (included via `@iobroker/eslint-config`)
- Add manufacturer link and device description to README
- Add CHANGELOG_OLD.md for older changelog entries

### 1.2.0
- Add dune-notify plugin integration: show notifications on screen during playback
- New states: `notify.send`, `notify.hide`, `notify.lastResult`
- New config options: `notifyEnabled`, `notifyTimeout`

### 1.1.5
- Fixed README: added missing changelog entry for 1.1.4

### 1.1.4
- Fixed README changelog (E6006), added `needs: check-and-lint` to adapter-tests job (S3014)

### 1.1.3
- Use standard workflow and testing scripts as provided by create-adapter
- Added `needs: check-and-lint` to adapter-tests job
- Restructured test directory to match ioBroker.example template

### 1.1.2
- Use `node:` prefix for all built-in Node.js modules (fs, http, path, url)

### 1.1.1
- Fixed prettier formatting errors in lib files
- Added `test:integration` script for CI/CD compatibility

For older changelog entries see [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT © 2026 sadam6752-tech

Copyright (c) 2026 sadam6752-tech <sadam6752@gmail.com>