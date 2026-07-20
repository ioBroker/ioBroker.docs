---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.motioneye/README.md
title: ioBroker-Adapter für MotionEye
hash: MngFxWSppDM8hsTAl4lZqY4xQ01OZrvtxHqVMzRGj9U=
---
![Logo](../../../en/adapterref/iobroker.motioneye/admin/motioneye.png)

![Anzahl der Installationen](https://iobroker.live/badges/motioneye-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/motioneye-stable.svg)
![NPM-Version](https://nodei.co/npm/iobroker.motioneye.svg?style=shields&data=v,u,d&color=orange)
![Downloads](https://img.shields.io/npm/dm/iobroker.motioneye.svg)
![GEMEINSCHAFT](https://img.shields.io/badge/community%20-ioBroker%20|%20forum-blue.svg)
![WARTUNGSKRAFT](https://img.shields.io/badge/maintainer-skvarel%20@%20inventwo-yellowgreen.svg)
![KI](https://img.shields.io/badge/ai%20assisted-cursor-blue.svg)
![PayPal-Spende](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)

# IoBroker-Adapter für MotionEye
---

## Was dieser Adapter bewirkt
Verbinden Sie MotionEye-Kameras mit ioBroker für Bewegungserkennung, Schnappschüsse und Live-Streams. Steuern Sie die Erkennungsmodi (`off` / `still` / `sharp`) über ioBroker oder VIS und stellen Sie `streamUrl` HTML für jedes HTML-fähige Widget bereit – eine einfache API für Webhooks ist nicht erforderlich.

## Dokumentation
- 🇺🇸 [Dokumentation](docs/en/README.md)
- 🇩🇪 [Dokumentation](docs/de/README.md)

Häufig gestellte Fragen und Fehlerbehebung (Docker/Unraid, `unauthorized`, VIS-Stream): [[DE](docs/en/faq.md) · [DE](docs/de/faq.md)

## Merkmale
- Benutzerdefinierte Kameranamen in ioBroker (unabhängig von MotionEye-Labels)
- Dynamische Kanäle unter `motioneye.0.<name>.*` (Ordnernamen in Kleinbuchstaben)
- Integrierter Webhook-Server – keine Abhängigkeit von simple-api
- MotionEye Config API-Synchronisierung für Modi und Webhook-URLs
- `_info.connection` — Instanz, die angezeigt wird, wenn MotionEye nicht erreichbar ist
- Stream-Geschwister-Relink nach VIS-Neurendering (Multi-Kamera-Dashboards)

## Datenpunkte
### Pro Kamera (`motioneye.0.<name>.*`)
Die Namen der Kanalordner sind kleingeschrieben (z. B. `innenhof_ii`, `auffahrt`).

| Status | Typ | Lesen | Schreiben | Beschreibung |
|-------|------|------|-------|-------------|
| `mode` | Wert | ja | ja | `off` / `still` / `sharp` |
| `snapshot` | Schaltfläche | nein | ja | Snapshot auslösen |
| `stream` | Schalter | ja | ja | Live-MJPEG-Stream ein/aus |
| `streamPulse` | Schaltfläche | nein | ja | Stream kurzzeitig einschalten (automatische Abschaltung) |
| `streamUrl` | Text | Ja | Nein | HTML `<img>` für HTML-Widget |
| `status` | Text | Ja | Nein | Letzter Synchronisierungsstatus |
| `lastAction` | Text | Ja | Nein | Letzte API-Aktion |
| `webhookUrl` | URL | ja | nein | URL an MotionEye geschrieben |
| `motionEyeId` | Wert | ja | nein | MotionEye-Kamera-ID |
| `motionEyeName` | Text | Ja | Nein | Originalname in MotionEye |
| `motionEyeName` | Text | Ja | Nein | Ursprünglicher Name in MotionEye |

### Einstellungen pro Kameragerät (`motioneye.0.<name>.settings.*`)
| Status | Typ | Lesen | Schreiben | Beschreibung |
|-------|------|------|-------|-------------|
| `framerate` | Stufe | ja | ja | Aufnahmebildrate in fps |
| `availableResolutions` | Text | Ja | Nein | Unterstützte Auflösungen (kommagetrennt) |
| `rotation` | Ebene | ja | ja | Videorotation `0` / `90` / `180` / `270` |
| `autoBrightness` | Schalter | ja | ja | Automatische Helligkeit ein/aus |
| `privacyMask` | Schalter | Ja | Ja | Datenschutzmaske ein/aus (Maskierungsbereiche werden in der MotionEye-Benutzeroberfläche gezeichnet; siehe [Häufig gestellte Fragen](docs/en/faq.md#device-settings-settings)) |
| `privacyMask` | Schalter | ja | ja | Datenschutzmaske ein/aus (Maskierungsbereiche werden in der MotionEye-Benutzeroberfläche gezeichnet; siehe [FAQ](docs/en/faq.md#device-settings-settings)) |

Helligkeit / Kontrast / Sättigung / Farbton sind in MotionEye nur für lokale v4l2/USB-Kameras verfügbar, nicht für Netzwerkkameras (RTSP/MJPEG), daher werden sie nicht als Datenpunkte angezeigt.

### Textüberlagerung pro Kamera (`motioneye.0.<name>.overlay.*`)
| Status | Typ | Lesen | Schreiben | Beschreibung |
|-------|------|------|-------|-------------|
| `enabled` | Schalter | ja | ja | Textüberlagerung ein/aus |
| `rightText` | Text (Auswahlmenü) | ja | ja | Gleiche Optionen wie `leftText` |
| `customLeftText` | Text | Ja | Ja | Wird verwendet, wenn `leftText = custom-text` |
| `customRightText` | Text | Ja | Ja | Wird verwendet, wenn `rightText = custom-text` |
| `textScale` | Ebene | ja | ja | Textgröße, `1`–`10` |
| `textScale` | Ebene | ja | ja | Textgröße, `1`–`10` |

Wenn Sie `leftText`/`rightText` auf `custom-text` setzen, müssen Sie auch `customLeftText`/`customRightText` setzen – andernfalls zeigt MotionEye leeren Text an. Siehe [Häufig gestellte Fragen](docs/en/faq.md#text-overlay-overlay).

Diese Datenpunkte können auch pro Kamera auf der Registerkarte **Overlay** voreingestellt werden (praktisch bei der gleichzeitigen Konfiguration mehrerer Kameras). Siehe [Konfiguration](#configuration) und [FAQ]](docs/en/faq.md#text-overlay-overlay).

### Speicher pro Kamera (`motioneye.0.<name>.storage.*`)
| Status | Typ | Lesen | Schreiben | Beschreibung |
|-------|------|------|-------|-------------|
| `snapshotCount` | Wert | ja | nein | Anzahl der gespeicherten Snapshots |
| `usedSpaceMb` | Wert | ja | nein | Belegter Speicherplatz (Schnappschüsse + Videos), in MB |
| `lastRefresh` | Text | Ja | Nein | Zeitstempel der letzten erfolgreichen Aktualisierung |
| `refresh` | Schaltfläche | nein | ja | Jetzt aktualisieren |
| `Aktualisieren` | Schaltfläche | Nein | Ja | Jetzt aktualisieren |

Die Aktualisierung erfordert, dass MotionEye alle gespeicherten Dateien rekursiv scannt und prüft. Dies kann bei Kameras mit großen Medienbibliotheken lange dauern. Die Aktualisierung ist nicht Teil der regulären Statusabfrage. Sie können die Daten manuell über `refresh` aktualisieren oder eine langsame automatische Aktualisierung auf der Registerkarte **Speicher** aktivieren (`storagePollEnabled` + `storagePollIntervalSec`, Standard: deaktiviert). Dort können Sie auch einzelne Kameras von der automatischen Aktualisierung ausschließen, während der manuelle Datenpunkt `refresh` weiterhin verfügbar bleibt. Siehe [Häufig gestellte Fragen](docs/en/faq.md#storage-storage).

### Instanz (`motioneye.0._info.*`)
| Bundesland | Typ | Beschreibung |
|-------|------|-------------|
| `_info.connection` | boolescher Wert | MotionEye erreichbar |
| `_info.lastSync` | Text | Zeitstempel der letzten Statusabfrage |
| `_info.motionEyeVersion` | Text | MotionEye-Serverversion |
| `_info.motionVersion` | Text | Motion-Daemon-Version |
| `_info.motionVersion` | Text | Version des Motion-Daemons |

## Installation
1. Installieren Sie den Adapter über die ioBroker-Administrationsoberfläche.
2. Erstellen Sie eine neue Instanz
3. **Einstellungen konfigurieren**: MotionEye-Host, Ports, Anmeldeinformationen (optional), Webhook-Host
4. Fügen Sie Kameras auf der Registerkarte **Kameras** hinzu (Anzeigename, MotionEye-ID, optionaler Medienordner).
5. Speichern und starten Sie die Instanz neu – Datenpunkte werden erstellt und Webhook-URLs in MotionEye geschrieben.

### Kompatibilität der MotionEye-Versionen
| MotionEye | Adapter | Hinweise |
|-----------|---------|-------|
| **0.43.x** | 0.4.x oder **0.5.0+** | URL-Signatur-Authentifizierung |
| **0.44+** | **0.5.0+** erforderlich | Sitzungsanmeldung (`POST /login`); Adapter 0.4.x zeigt `unauthorized` an, obwohl die Webanmeldung funktioniert |
| **0.43.x** | **0.5.0+** | Sicheres Upgrade – abwärtskompatibel |

Details: [FAQ EN](docs/en/faq.md#motioneye-044-adapter-050) · [FAQ DE](docs/de/faq.md#motioneye-044-adapter-050)

### Kameramodi
| Modus | Bewegungserkennung | Videoaufzeichnung | Webhook |
|------|------------------|-----------------|---------|
| `off` | nein | nein | nein |
| `sharp` | ja | bewegungsaktiviertes MP4 | ja |
| `scharf` | ja | bewegungsaktiviertes MP4 | ja |

## Konfiguration
| Option | Standard | Beschreibung |
|--------|---------|-------------|
| `motionHost` | *(leer)* | Hostname oder IP-Adresse des MotionEye-Servers (erforderlich) |
| `motionEyeUser` | `admin` | MotionEye-Benutzeranmeldung |
| `motionEyePassword` | *(leer)* | MotionEye-Passwort (Klartext, verschlüsselt gespeichert) |
| `webhookHost` | *(erforderlich)* | ioBroker-Host-IP oder Hostname, der von MotionEye aus erreichbar ist (wird in Webhook-URLs verwendet) |
| `webhookPort` | `8090` | Integrierter Webhook-Listener-Port |
| `motionResetMs` | `15000` | Automatischer Reset für `.motion` nach Webhook |
| `statusPollIntervalSec` | `300` | Abfrageintervall für den MotionEye-Status |
| `useMotionEyeConfig` | `true` | Schreibmodus, Webhook-URLs und Stream ein/aus zu MotionEye (für den normalen Gebrauch aktiviert lassen) |
| `useMotionEyeConfig` | `true` | Schreibmodus, Webhook-URLs und Stream ein/aus für MotionEye (für den normalen Gebrauch aktiviert lassen) |

Pro Kamera (Registerkarte „Kameras“): Optionaler **Medienordnername** unter `/var/lib/motioneye` (z. B. `Bambu` anstelle des Standardordners `Camera8`). Wird beim Start des Adapters angewendet, wenn die Konfigurationssynchronisierung aktiviert ist. Vorhandene Ordner auf der Festplatte werden nicht umbenannt.

`storagePollEnabled` (Standard `false`) und `storagePollIntervalSec` (Standard `3600`) befinden sich auf der Registerkarte **Speicher**, nicht hier — siehe unten.

### Overlay-Registerkarte
Ein separater **Overlay**-Tab legt die `overlay.*`-Datenpunkte (Aktivieren, Text links/rechts, benutzerdefinierter Text, Textgröße) pro Kamera in einer Tabelle fest, wobei jede Zeile aus dem Tab „Kameras“ stammt. Dies ist eine Einwegfunktion und liest niemals Live-Datenpunktänderungen zurück in die Tabelle.

- **Neue Kamera**: Ausgefüllte Felder werden beim ersten Erstellen zum initialen Datenpunktwert.
- **Vorhandene Kamera**: Ausgefüllte Felder werden erst nach dem Klicken auf **Overlay-Einstellungen jetzt anwenden** wirksam – kein Speichern/Neustart erforderlich.
- Leere Felder bedeuten immer „unverändert lassen“.

Einzelheiten finden Sie in [Häufig gestellte Fragen](docs/en/faq.md#text-overlay-overlay).

### Speicher-Registerkarte
Ein eigener **Speicher**-Tab bündelt alles für `storage.*`: den globalen Schalter/das Intervall für die automatische Aktualisierung, eine Tabelle mit einer Zeile pro Kamera mit einem **Von automatischer Aktualisierung ausschließen**-Kontrollkästchen (standardmäßig deaktiviert) und einer Schaltfläche **Speicherstatistiken jetzt aktualisieren**:

- **Automatische Aktualisierung der Speicherstatistiken aktivieren** (`storagePollEnabled`, Standardwert: aus) + **Intervall in Sekunden** (`storagePollIntervalSec`, Standardwert: `3600`): Globaler Schalter und Intervall für die automatische Aktualisierung.
- **Kontrollkästchen „Von automatischer Aktualisierung ausschließen“** (pro Kamera, standardmäßig deaktiviert): Aktivieren Sie dieses Kontrollkästchen für unwichtige Kameras mit großen Medienbibliotheken, um diese beim automatischen Aktualisierungsintervall zu überspringen – ihre `storage.*`-Datenpunkte werden weiterhin jederzeit über den `storage.refresh`-Trigger aktualisiert.
- **Speicherstatistik jetzt aktualisieren**: Aktualisiert sofort alle Kameras in der Tabelle – kein Speichern/Neustart erforderlich, ignoriert das Ausschließen-Kontrollkästchen (ein manueller Klick aktualisiert immer alle aufgelisteten Kameras).

Einzelheiten finden Sie in [Häufig gestellte Fragen](docs/en/faq.md#storage-storage).

## Unterstützung
Wenn Ihnen unsere Arbeit gefällt und Sie uns unterstützen möchten, freuen wir uns über jede Spende.

(Dieser Link führt zu unserem PayPal-Konto und steht in keiner Verbindung zu ioBroker.)

[![Spenden](img/support.png)](https://www.paypal.com/donate?hosted_button_id=7W6M3TFZ4W9LW)

## Ältere Änderungen
- [CHANGELOG_OLD.md](CHANGELOG_OLD.md)

## Changelog

<!--
  ### **WORK IN PROGRESS**
-->
### 0.10.0 (2026-07-10)
- (skvarel) Fixed `snapshot` action failing with `404 not found` on some MotionEye/Motion combinations: snapshots are now triggered via MotionEye's own authenticated `/action/{id}/snapshot` endpoint (same connection as everything else) instead of a direct, unauthenticated call to Motion's raw webcontrol port. The `motionPort` setting is no longer needed and has been removed.

### 0.9.0 (2026-07-05)
- (skvarel) Per-camera storage stats under `storage.*`: snapshot count, video count, and occupied space in MB (`storage.snapshotCount`, `storage.videoCount`, `storage.usedSpaceMb`, `storage.lastRefresh`), refreshed on demand via `storage.refresh`
- (skvarel) New **Storage** config tab: global auto-refresh on/off switch + interval (`storagePollEnabled`, `storagePollIntervalSec`, off by default), a per-camera "Exclude from auto-refresh" checkbox to skip unimportant cameras, and a button to refresh all listed cameras immediately

### 0.8.0 (2026-07-04)
- (skvarel) New **Overlay** config tab: preset `overlay.*` (enabled/leftText/rightText/customLeftText/customRightText/textScale) per camera in a table, with a button to apply the table to already-running cameras immediately; values only ever flow from the config table to the datapoints, never back, so live datapoint changes are never overwritten on a restart

### 0.7.0 (2026-07-03)
- (skvarel) Per-camera text overlay under `overlay.*`: read and control overlay on/off, left/right text mode (camera name / timestamp / custom text / disabled), custom text strings, and text size (`overlay.enabled`, `overlay.leftText`, `overlay.rightText`, `overlay.customLeftText`, `overlay.customRightText`, `overlay.textScale`); `leftText`/`rightText` and their custom text are always saved together, in any order
- (skvarel) Fixed a race condition where setting two `settings.*` datapoints for the same camera at nearly the same time could silently drop one of the changes ("lost update"); config writes per camera are now serialized

### 0.6.1 (2026-07-03)
- (skvarel) Fixed privacy mask regions not surviving adapter restarts/updates: mask lines are now persisted to the settings channel's native config instead of only in memory

## License

MIT License

Copyright (c) 2026 skvarel <skvarel@inventwo.com>

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