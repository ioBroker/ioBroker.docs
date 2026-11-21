---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.anycubic-cloud/README.md
title: ioBroker.anycubic-cloud
hash: 39BZtGFRzD7S/dRW8pXUKRICspvFs2CbiHUpRmE08NE=
---
# ioBroker.anycubic-cloud

![NPM-Version](https://img.shields.io/npm/v/iobroker.anycubic-cloud.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.anycubic-cloud.svg)
![Test und Freigabe](https://github.com/hwiedermann/ioBroker.anycubic-cloud/actions/workflows/test-and-release.yml/badge.svg)

[Deutsche Anleitung](docs/de/README.md)

## Beschreibung

Liest den Status von Anycubic 3D-Druckern und der ACE Pro Filamentbox aus der Anycubic Cloud: Druckauftrag, Temperaturen, Lüfter, ACE-Steckplätze und das pro Steckplatz verwendete Filament. Der Adapter ist schreibgeschützt und sendet keine Befehle an den Drucker.

Getestet mit einem [Kobra S1](https://www.anycubic.com/products/kobra-s1-combo) und einem ACE 2 Pro (Hersteller: [Anycubic](https://www.anycubic.com) ). Andere Modelle, die mit der Anycubic-App kompatibel sind, sollten ebenfalls funktionieren; Feedback ist willkommen.

> \[!WARNUNG] Inoffiziell. Anycubic bietet keine öffentliche API. Der Adapter verwendet dieselben Cloud-Anfragen wie Anycubic Slicer Next und lädt die Anmeldeinformationen und Zertifikate der Anwendung zur Laufzeit aus dem Open-Source-Projekt [anycubic-cloud-api](https://pypi.org/project/anycubic-cloud-api/) . Sollte Anycubic seine Cloud ändern, funktioniert der Adapter möglicherweise nicht mehr.

Der Drucker muss mit der Anycubic-Cloud verbunden sein. Im LAN-Modus ist er nicht erreichbar.

## Installation

Der Adapter ist noch nicht im ioBroker-Repository enthalten. Installieren Sie ihn über npm:

```bash
iobroker url iobroker.anycubic-cloud
```

Voraussetzungen: Node.js 22.19 oder neuer, js-controller 6.0.11 oder neuer, Admin 7.6.20 oder neuer.

## Konfiguration

| Einstellung             | Beschreibung                                                                            |
| ----------------------- | --------------------------------------------------------------------------------------- |
| Slicer-Token            | Zugriffstoken für Anycubic Slicer Next, siehe unten                                     |
| REST-Resynchronisierung | Intervall für die vollständige Resynchronisierung via REST in Minuten (Standardwert 10) |
| Token-Warnung           | Tage vor Ablauf, wenn `info.tokenExpiring` ist eingestellt (Standardwert 14)             |

### Erhalt des Tokens

Anycubic bietet keine API-Anmeldung mit Benutzername und Passwort an. Der Adapter verwendet das Zugriffstoken, das Anycubic Slicer Next nach der Anmeldung speichert. Es ist etwa 90 Tage gültig.

Unter Windows das Skript[`tools/get-token.ps1`](https://github.com/hwiedermann/ioBroker.anycubic-cloud/blob/main/tools/get-token.ps1) Es erledigt die Arbeit. Es ist nicht Teil des npm-Pakets, laden Sie es von GitHub herunter.

1. Starten Sie Anycubic Slicer Next und melden Sie sich an.
2. Laufen `powershell -ExecutionPolicy Bypass -File .\get-token.ps1` Die
3. Das Skript liest die Slicer-Konfiguration. Neuere Slicer-Versionen verschlüsseln diese; anschließend fordert das Skript eine Speicherabbilddatei an: Task-Manager, Registerkarte „Details“, Rechtsklick `AnycubicSlicerNext.exe` "Dump-Datei erstellen". Führen Sie das Skript erneut aus; es findet die Datei in `%TEMP%` Die
4. Das Token wird in die Zwischenablage kopiert. Fügen Sie es in die Instanzeinstellungen ein.

Das Skript liest lediglich Dateien und sendet nichts über das Netzwerk. Es ist nicht signiert, daher kann Windows eine Bestätigung anfordern (`Unblock-File .\get-token.ps1` oder „Mehr Infos, trotzdem starten“.

Ohne das Skript: Ältere Slicer-Versionen speichern das Token im Klartext. `%APPDATA%\AnycubicSlicerNext\AnycubicSlicerNext.conf` (`anycubic_cloud.access_token` In einer Dump-Datei ist das Token eine lange Zeichenkette, die mit einem Buchstaben beginnt. `eyJ` und zwei Punkte enthaltend.

## Staaten

Ein Gerät pro Drucker, benannt nach seiner Cloud-ID.

| Zustand                                                        | Beschreibung                                                                                                                                                           |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `status`                                                       | Leerlauf, Herunterladen, Prüfen, Nivellieren, Aufheizen, Drucken, Anhalten, Fortsetzen, Abgeschlossen, Stoppen, Angehalten, Fehler                                     |
| `online`, `busy`, `model`, `firmware`, `firmwareUpdate`        | Druckerinformationen                                                                                                                                                   |
| `light`, `lightBrightness`                                     | Kammerlicht                                                                                                                                                            |
| `job.*`                                                        | Datei, Fortschritt, verbleibende und verstrichene Zeit, Schichten, Filament (mm, g, geplant), Start, Ende, Pausengrund                                                 |
| `temperature.*`                                                | Düse und Bett, Strom und Ziel                                                                                                                                          |
| `fan.*`                                                        | Teilekühlung, Zusatzlüfter und ACE-Lüfter                                                                                                                              |
| `ace.*`                                                        | Temperatur, Luftfeuchtigkeit, aktiver Schlitz, Trocknung                                                                                                               |
| `ace.slotN.*`                                                  | Farbe, Material, Artikelnummer, Restbetrag in %. `manual` Dies trifft auch auf Spulen zu, die ohne RFID-Chip manuell eingegeben wurden; sie haben keinen Restwert mehr. |
| `usage.last`, `usage.history`                                  | Verbrauchtes Filament pro Slot für den letzten Druck und die letzten 30 Drucke (JSON)                                                                                  |
| `event.finished`                                               | wahr, wenn ein Druckvorgang abgeschlossen ist, falsch, wenn der nächste beginnt                                                                                        |
| `message.*`                                                    | Letzte Fehlermeldung oder Benachrichtigung vom Drucker                                                                                                                 |
| `info.tokenExpiry`, `info.tokenDaysLeft`, `info.tokenExpiring` | Ablauf des Tokens                                                                                                                                                      |

Der Drucker sendet Temperaturdaten häufig nur, solange die App oder der Slicer geöffnet ist; andernfalls werden die Werte durch die REST-Synchronisierung aktualisiert. Die ACE-Temperatur und -Luftfeuchtigkeit werden ausschließlich über MQTT abgerufen: Die REST-Antwort liefert hierfür feste Werte.

### Nicht unterstützt

- Steuerung des Druckers (Pause, Stopp, Licht, Trocknung). Möglich über die Cloud, aber noch nicht implementiert.
- Kamerabilder. Die Cloud bietet nur einen Livestream, keine Schnappschüsse.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.3.7 (2026-10-31)

- (hwiedermann) Printer IDs from the cloud are restricted to letters, digits, `-` and `_`, every other character becomes `_`
- (hwiedermann) Adapter requires Node.js >= 22.19.0 now

### 0.3.6 (2026-10-27)

- (hwiedermann) Requests to the Anycubic cloud and to PyPI time out after 30 s instead of waiting indefinitely
- (hwiedermann) Printer IDs from the cloud are cleaned of forbidden characters before they are used as object IDs

### 0.3.5 (2026-10-08)

- (hwiedermann) ACE humidity no longer jumps to a fixed cloud value (e.g. 22 %) with every REST resync, only MQTT reports the real value

### 0.3.4 (2026-10-08)

- (hwiedermann) ACE temperature no longer drops to a fixed cloud value (e.g. 30 °C) with every REST resync, only MQTT reports the real value
- (hwiedermann) Printer is shown online again right after waking up from sleep (`lastWill/onlineReport` with state `online`)

### 0.3.3 (2026-10-05)

- (hwiedermann) Name and role of existing objects are updated on start, not only when a new value arrives

## License

GPL-3.0-or-later, see [LICENSE](LICENSE) and [COPYING](COPYING). Based on findings of the
[anycubic-cloud-api](https://pypi.org/project/anycubic-cloud-api/) project (GPL-3.0).

Copyright (c) 2026 Hendrik <iobroker@hwiedermann.de>